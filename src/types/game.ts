// ==================== 学术阶段 ====================
export type AcademicPhase = 'undergrad' | 'masters' | 'phd' | 'postdoc' | 'faculty'

export const PHASE_LABELS: Record<AcademicPhase, string> = {
  undergrad: '本科生',
  masters: '硕士生',
  phd: '博士生',
  postdoc: '博士后',
  faculty: '青椒',
}

// ==================== 角色系统 ====================
export type GreetingStyle = 'formal' | 'casual' | 'warm' | 'dismissive'

export interface CharacterSocialParams {
  approachability: number        // 可接近度 0-100
  attentionSpan: number          // 注意力时长(秒)
  preferredTopics: string[]      // 喜欢的话题
  forbiddenTopics: string[]      // 禁忌话题
  networkValue: number           // 连接价值 0-100
  gossipFactor: number           // 传闲话概率 0-1
  greetingStyle: GreetingStyle
  exitSignals: string[]          // 退出信号话术
  memoryDuration: number         // 记忆时长(月)
}

export interface CharacterPersonality {
  faceWeight: number             // 面子权重 0-1
  powerIndex: number             // 权力指数 0-100
  grudgeMemory: number           // 记仇深度 0-10
  allianceFlexibility: number   // 结盟灵活度 0-1
  emotionalVolatility: number   // 情绪波动性 0-1
}

export type CharacterAttitude = 'friendly' | 'neutral' | 'wary' | 'hostile'

export interface Character {
  id: string
  name: string                   // 匿名名如"某杰青（海归严厉型）"
  title: string                  // 职称
  age: number
  description: string            // 简介
  avatar: string                 // 头像标识符
  personality: CharacterPersonality
  socialParams: CharacterSocialParams
  hiddenAgenda: string           // 隐藏目的
  initialAttitude: CharacterAttitude
}

// ==================== 对话线程系统 ====================
export type ThreadStatus = 'active' | 'waiting' | 'escalated' | 'deteriorated' | 'resolved'

export interface DialogThread {
  id: string
  characterId: string
  label: string                  // 线程简述
  urgency: number                // 0-100+
  status: ThreadStatus
  currentNodeId: string          // 当前对话节点
  lastInteractedAt: number       // 上次交互时间戳(游戏内秒)
  autoMessages: string[]         // urgency>=80时的催促消息队列
  deteriorateEvent: string       // urgency>=100时的恶化事件描述
}

// ==================== 对话树系统 ====================
export interface DialogOption {
  id: string
  text: string
  energyCost: number             // 情绪能量消耗
  consistencyImpact: number      // 一致性影响 (正或负)
  riskTag?: string               // 风险提示标签
  requiredEnergy?: number        // 最低能量要求(不满足则不显示)
  isEmotionalBreakdown?: boolean // 是否为情绪失控选项(能量<30解锁)
  triggersMine?: string          // 触发的地雷ID
  exposesInfo?: string           // 暴露的信息差ID
  stanceRecord?: {               // 立场记录(用于一致性追踪)
    topic: string
    stance: string
  }
  nextNodeId: string             // 跳转到的下一个对话节点
  characterReaction: string      // 角色反应描述
  attitudeShift?: {              // 角色态度变化
    characterId: string
    from: CharacterAttitude
    to: CharacterAttitude
  }
}

export interface DialogNode {
  id: string
  threadId: string
  speaker: string                // 角色ID 或 'narrator'
  text: string                   // 对话内容
  emotion?: string               // 角色情绪标签
  options: DialogOption[]
  isAutoResponse?: boolean       // 是否为后台自动推进的节点
  condition?: {                  // 显示条件
    type: 'energy_below' | 'mine_triggered' | 'info_exposed' | 'consistency_below' | 'attitude_is'
    value: string | number
    characterId?: string
  }
}

// ==================== 信息差系统 ====================
export type InfoVisibility =
  | 'knownToUser'
  | 'knownToUserButHidden'
  | 'knownToOthersButNotUser'
  | 'aboutToExpose'

export interface KnowledgeItem {
  id: string
  content: string                // 信息内容
  visibility: InfoVisibility
  holders: string[]              // 持有该信息的角色ID列表
  revealCondition?: {            // 揭露条件
    type: 'option_selected' | 'mine_triggered' | 'urgency_threshold' | 'time_elapsed'
    value: string | number
  }
  exposureConsequence?: string   // 暴露后果描述
}

// ==================== 社交地雷系统 ====================
export interface SocialMine {
  id: string
  name: string                   // 地雷名称(如"暴露偷听")
  description: string            // 描述
  triggerOptionIds: string[]     // 触发选项ID列表
  triggerKeywords: string[]      // 触发关键词
  severity: 1 | 2 | 3           // 严重程度
  consequence: string            // 后果描述
  affectedCharacterIds: string[] // 受影响角色
  attitudeShifts: Array<{        // 触发后的态度变化
    characterId: string
    to: CharacterAttitude
  }>
  forbiddenTopicAfter?: string   // 触发后该话题进入禁忌
  triggered: boolean
}

// ==================== 玩家状态 ====================
export interface StanceRecord {
  topic: string
  stance: string
  timestamp: number              // 游戏内秒
  witnessIds: string[]           // 在场旁观者
}

export interface Contradiction {
  topic: string
  stanceA: string
  stanceB: string
  detectedAt: number
  penaltyApplied: number
}

export interface PlayerState {
  consistency: number            // 初始100, 隐藏
  emotionalEnergy: number        // 初始100
  reputation: Record<string, number>  // characterId -> 声誉值
  attitudes: Record<string, CharacterAttitude>  // characterId -> 当前态度
  triggeredMines: string[]       // 已触发地雷ID
  exposedInfo: string[]          // 已暴露信息差ID
  stanceHistory: StanceRecord[]
  contradictions: Contradiction[]
  forbiddenTopics: string[]      // 禁忌话题列表
  dialogHistory: Array<{
    threadId: string
    optionId: string
    timestamp: number
  }>
}

// ==================== 结局系统 ====================
export interface Ending {
  id: string
  name: string                   // 结局名
  description: string            // 结局描述
  conditions: {                  // 达成条件
    minConsistency?: number
    maxConsistency?: number
    minEnergy?: number
    maxEnergy?: number
    requiredMines?: string[]     // 必须触发的地雷
    forbiddenMines?: string[]    // 不能触发的地雷
    requiredExposures?: string[] // 必须暴露的信息
    requiredAttitudes?: Array<{ characterId: string; attitude: CharacterAttitude }>
  }
  priority: number               // 优先级(高的先匹配)
}

// ==================== 身后评价系统 ====================
export interface BehindEvaluation {
  characterId: string
  characterName: string
  channel: string                // 评价渠道："某人在实验室群提到..."
  content: string                // 评价内容
  tone: 'positive' | 'neutral' | 'negative' | 'sarcastic'
  revealedInfo?: string          // 顺带揭露的你不知道的信息
}

export interface ScenarioResult {
  endingId: string
  ending: Ending
  finalPlayerState: PlayerState
  behindEvaluations: BehindEvaluation[]
  survivalScore: number          // 0-100 生存分
  impressionSummary: string      // 一句话总结
  timeSpent: number              // 用时(秒)
  minesTriggered: number
  minesTotal: number
  consistencyFinal: number
  energyFinal: number
}

// ==================== UI状态 ====================
export interface MineTriggerEvent {
  mineId: string
  mineName: string
  severity: 1 | 2 | 3
  consequence: string
  timestamp: number
}

export interface UrgencyAlert {
  threadId: string
  characterName: string
  message: string
  urgencyLevel: number
}

export type GamePhase = 'idle' | 'selecting' | 'briefing' | 'playing' | 'paused' | 'ended'
