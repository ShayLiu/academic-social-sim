import type { ScenarioData } from '../../types/scenario'
import type {
  PlayerState,
  CharacterAttitude,
  DialogThread,
  DialogNode,
  DialogOption,
  KnowledgeItem,
  ScenarioResult,
  MineTriggerEvent,
  UrgencyAlert,
} from '../../types/game'
import {
  INITIAL_ENERGY,
  INITIAL_CONSISTENCY,
  DEFAULT_SCENARIO_TIME,
} from '../constants'

import { ThreadManager } from './thread-manager'
import { KnowledgeSystem } from './knowledge-system'
import { MineDetector, type MineConsequence } from './mine-detector'
import { ConsistencyTracker } from './consistency-tracker'
import { EnergySystem, type EnergyLevel } from './energy-system'
import { DialogResolver, type ResolveResult } from './dialog-resolver'
import { EndingCalculator } from './ending-calculator'
import { ReviewGenerator } from './review-generator'

// ==================== 副作用事件类型 ====================

export interface SelectOptionResult {
  /** 对话解析结果 */
  resolveResult: ResolveResult
  /** 下一个对话节点 */
  nextNode: DialogNode | undefined
  /** 触发的地雷（如果有） */
  mineTriggered?: MineTriggerEvent
  /** 地雷后果详情 */
  mineConsequence?: MineConsequence
  /** 暴露的信息差（如果有） */
  exposedInfo?: KnowledgeItem
  /** 检测到的立场矛盾（如果有） */
  contradiction?: { topic: string; stanceA: string; stanceB: string }
  /** 态度变化列表 */
  attitudeChanges: Array<{ characterId: string; to: CharacterAttitude }>
  /** 当前能量等级 */
  energyLevel: EnergyLevel
  /** 是否触发情绪宕机 */
  isShutdown: boolean
  /** 角色质疑（一致性过低时） */
  questionEvent?: { template: string }
}

/**
 * 游戏引擎主类。
 * 组装所有子系统，提供统一的游戏逻辑接口。
 */
export class GameEngine {
  // 子系统
  readonly threadManager: ThreadManager
  readonly knowledgeSystem: KnowledgeSystem
  readonly mineDetector: MineDetector
  readonly consistencyTracker: ConsistencyTracker
  readonly energySystem: EnergySystem
  readonly dialogResolver: DialogResolver
  readonly endingCalculator: EndingCalculator
  readonly reviewGenerator: ReviewGenerator

  // 场景数据
  private scenario: ScenarioData
  private gameTime: number = 0
  private maxTime: number

  // 玩家状态
  private attitudes: Record<string, CharacterAttitude> = {}
  private reputation: Record<string, number> = {}
  private dialogHistory: Array<{
    threadId: string
    optionId: string
    timestamp: number
  }> = []
  private forbiddenTopics: string[] = []

  constructor(scenario: ScenarioData) {
    this.scenario = scenario
    this.maxTime = scenario.estimatedMinutes * 60 || DEFAULT_SCENARIO_TIME

    // 初始化角色名映射
    const characterNames = new Map<string, string>()
    for (const char of scenario.characters) {
      characterNames.set(char.id, char.name)
      this.attitudes[char.id] = char.initialAttitude
      this.reputation[char.id] = 50 // 初始声誉中性值
    }

    // 初始化子系统
    this.threadManager = new ThreadManager(scenario.threads, characterNames)
    this.knowledgeSystem = new KnowledgeSystem(scenario.knowledgeItems)
    this.mineDetector = new MineDetector(scenario.mines)
    this.consistencyTracker = new ConsistencyTracker()
    this.energySystem = new EnergySystem()
    this.dialogResolver = new DialogResolver(scenario.dialogNodes)
    this.endingCalculator = new EndingCalculator(scenario.endings)
    this.reviewGenerator = new ReviewGenerator(scenario.characters)
  }

  // ==================== 主循环 ====================

  /** 每帧/每秒调用，驱动时间流逝和 urgency 增长 */
  tick(deltaSeconds: number): void {
    this.gameTime += deltaSeconds
    this.consistencyTracker.setGameTime(this.gameTime)
    this.threadManager.tick(deltaSeconds)
  }

  // ==================== 玩家操作 ====================

  /** 选择线程（切换正在回应的对话） */
  selectThread(threadId: string): void {
    this.threadManager.selectThread(threadId)
  }

  /**
   * 选择对话选项 —— 核心方法。
   * 依次调用各子系统处理选项的副作用。
   */
  selectOption(threadId: string, optionId: string): SelectOptionResult | null {
    // 1. 解析选项
    const resolveResult = this.dialogResolver.resolveOption(optionId)
    if (!resolveResult) return null

    const attitudeChanges: Array<{ characterId: string; to: CharacterAttitude }> = []

    // 2. 检查地雷
    let mineTriggered: MineTriggerEvent | undefined
    let mineConsequence: MineConsequence | undefined

    if (resolveResult.triggersMineId) {
      const mine = this.mineDetector.checkOption(optionId)
      if (mine) {
        const consequence = this.mineDetector.triggerMine(mine.id)
        if (consequence) {
          mineConsequence = consequence
          mineTriggered = {
            mineId: mine.id,
            mineName: mine.name,
            severity: mine.severity,
            consequence: mine.consequence,
            timestamp: this.gameTime,
          }

          // 应用态度变化
          for (const shift of consequence.attitudeChanges) {
            this.attitudes[shift.characterId] = shift.to
            attitudeChanges.push(shift)
          }

          // 添加禁忌话题
          if (consequence.forbiddenTopicAdded) {
            this.forbiddenTopics.push(consequence.forbiddenTopicAdded)
          }
        }
      }
    }

    // 3. 检查信息暴露
    let exposedInfo: KnowledgeItem | undefined
    if (resolveResult.exposesInfoId) {
      const info = this.knowledgeSystem.checkExposure(
        optionId,
        resolveResult.triggersMineId
      )
      if (info) {
        this.knowledgeSystem.exposeInfo(info.id)
        exposedInfo = info
      }
    }

    // 4. 记录立场 & 检查矛盾
    let contradiction: { topic: string; stanceA: string; stanceB: string } | undefined
    if (resolveResult.stanceRecord) {
      const { topic, stance } = resolveResult.stanceRecord

      // 获取当前线程的相关角色作为证人
      const thread = this.threadManager.getThread(threadId)
      const witnessIds = thread ? [thread.characterId] : []

      // 先检查矛盾
      const detected = this.consistencyTracker.checkContradiction(topic, stance)
      if (detected) {
        contradiction = {
          topic: detected.topic,
          stanceA: detected.stanceA,
          stanceB: detected.stanceB,
        }
      }

      // 再记录立场
      this.consistencyTracker.recordStance(topic, stance, witnessIds)
    }

    // 5. 应用一致性影响
    if (resolveResult.consistencyImpact !== 0) {
      this.consistencyTracker.applyImpact(resolveResult.consistencyImpact)
    }

    // 6. 消耗能量
    if (resolveResult.energyCost > 0) {
      this.energySystem.consume(resolveResult.energyCost)
    } else if (resolveResult.energyCost < 0) {
      // 负值表示恢复能量
      this.energySystem.recover(Math.abs(resolveResult.energyCost))
    }

    // 7. 应用选项自带的态度变化
    if (resolveResult.attitudeShift) {
      const { characterId, to } = resolveResult.attitudeShift
      this.attitudes[characterId] = to
      // 避免重复
      if (!attitudeChanges.some((a) => a.characterId === characterId)) {
        attitudeChanges.push({ characterId, to })
      }
    }

    // 8. 更新线程状态
    this.threadManager.updateCurrentNode(threadId, resolveResult.nextNodeId)

    // 记录对话历史
    this.dialogHistory.push({
      threadId,
      optionId,
      timestamp: this.gameTime,
    })

    // 9. 检查一致性质疑
    let questionEvent: { template: string } | undefined
    const questionResult = this.consistencyTracker.shouldQuestionPlayer()
    if (questionResult.shouldQuestion && questionResult.template) {
      questionEvent = { template: questionResult.template }
    }

    // 获取下一个节点
    const nextNode = this.dialogResolver.getNode(resolveResult.nextNodeId)

    return {
      resolveResult,
      nextNode,
      mineTriggered,
      mineConsequence,
      exposedInfo,
      contradiction,
      attitudeChanges,
      energyLevel: this.energySystem.getEnergyLevel(),
      isShutdown: this.energySystem.isShutdown(),
      questionEvent,
    }
  }

  // ==================== 状态查询 ====================

  /** 返回完整的 PlayerState 快照 */
  getState(): PlayerState {
    return {
      consistency: this.consistencyTracker.getScore(),
      emotionalEnergy: this.energySystem.getEnergy(),
      reputation: { ...this.reputation },
      attitudes: { ...this.attitudes },
      triggeredMines: this.mineDetector
        .getTriggeredMines()
        .map((m) => m.id),
      exposedInfo: this.knowledgeSystem
        .getAllItems()
        .filter((i) => i.visibility === 'knownToUser')
        .map((i) => i.id),
      stanceHistory: this.consistencyTracker.getStanceHistory(),
      contradictions: this.consistencyTracker.getContradictions(),
      forbiddenTopics: [...this.forbiddenTopics],
      dialogHistory: [...this.dialogHistory],
    }
  }

  /** 返回所有线程 */
  getVisibleThreads(): DialogThread[] {
    return this.threadManager.getAllThreads()
  }

  /** 返回玩家可见的信息差 */
  getVisibleKnowledge(): KnowledgeItem[] {
    return this.knowledgeSystem.getVisibleKnowledge('player')
  }

  /** 获取 urgency 催促 */
  getUrgencyAlerts(): UrgencyAlert[] {
    return this.threadManager.getUrgencyAlerts()
  }

  /** 获取恶化的线程 */
  getDeterioratedThreads(): DialogThread[] {
    return this.threadManager.getDeterioratedThreads()
  }

  /** 获取某线程的当前对话节点 */
  getCurrentNode(threadId: string): DialogNode | undefined {
    const thread = this.threadManager.getThread(threadId)
    if (!thread) return undefined
    return this.dialogResolver.getNode(thread.currentNodeId)
  }

  /** 获取当前对话节点可用选项 */
  getAvailableOptions(nodeId: string): DialogOption[] {
    return this.dialogResolver.getAvailableOptions(nodeId, this.getState())
  }

  /** 获取游戏已过时间（秒） */
  getGameTime(): number {
    return this.gameTime
  }

  /** 获取剩余时间（秒） */
  getRemainingTime(): number {
    return Math.max(0, this.maxTime - this.gameTime)
  }

  // ==================== 游戏结束判定 ====================

  /** 检查游戏是否结束 */
  isGameOver(): boolean {
    // 能量归零 -> 宕机结局
    if (this.energySystem.isShutdown()) return true

    // 所有线程都已完结
    if (this.threadManager.allThreadsFinished()) return true

    // 时间到
    if (this.gameTime >= this.maxTime) return true

    return false
  }

  /** 返回游戏结束原因 */
  getGameOverReason(): string | null {
    if (this.energySystem.isShutdown()) return 'energy_shutdown'
    if (this.threadManager.allThreadsFinished()) return 'all_threads_finished'
    if (this.gameTime >= this.maxTime) return 'time_up'
    return null
  }

  // ==================== 结局计算 ====================

  /** 计算最终结局和身后评价 */
  getResult(): ScenarioResult {
    const playerState = this.getState()
    const ending = this.endingCalculator.calculateEnding(playerState)
    const survivalScore =
      this.endingCalculator.calculateSurvivalScore(playerState)
    const impressionSummary =
      this.endingCalculator.generateImpressionSummary(ending, playerState)
    const behindEvaluations = this.reviewGenerator.generateReviews(
      playerState,
      this.scenario.characters
    )

    return {
      endingId: ending.id,
      ending,
      finalPlayerState: playerState,
      behindEvaluations,
      survivalScore,
      impressionSummary,
      timeSpent: this.gameTime,
      minesTriggered: this.mineDetector.getTriggeredMines().length,
      minesTotal: this.mineDetector.getTotalMines(),
      consistencyFinal: playerState.consistency,
      energyFinal: playerState.emotionalEnergy,
    }
  }
}

// 导出所有子模块
export { ThreadManager } from './thread-manager'
export { KnowledgeSystem } from './knowledge-system'
export { MineDetector, type MineConsequence } from './mine-detector'
export { ConsistencyTracker } from './consistency-tracker'
export { EnergySystem, type EnergyLevel } from './energy-system'
export { DialogResolver, type ResolveResult } from './dialog-resolver'
export { EndingCalculator } from './ending-calculator'
export { ReviewGenerator } from './review-generator'
