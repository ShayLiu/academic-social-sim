import type { StanceRecord, Contradiction } from '../../types/game'
import {
  INITIAL_CONSISTENCY,
  CONTRADICTION_PENALTY,
  CONSISTENCY_QUESTION_THRESHOLD,
} from '../constants'

/** 质疑话术模板 */
const QUESTION_TEMPLATES = [
  '你刚才不是说"{stanceA}"吗？怎么现在又变成"{stanceB}"了？',
  '等等，你之前关于{topic}的说法好像不太一样啊...',
  '我记得你刚才可不是这么说的，关于{topic}你到底什么意思？',
  '你这前后矛盾了吧？先说{stanceA}，现在又说{stanceB}？',
  '（皱眉）你这个说法和你之前的态度不太一致啊...',
]

export interface QuestionResult {
  shouldQuestion: boolean
  template?: string
  latestContradiction?: Contradiction
}

/**
 * 一致性追踪系统（隐藏数值）。
 * 记录玩家在不同话题上的立场，检测矛盾并扣分。
 */
export class ConsistencyTracker {
  private score: number = INITIAL_CONSISTENCY
  private stanceHistory: StanceRecord[] = []
  private contradictions: Contradiction[] = []
  private gameTime: number = 0

  constructor() {}

  /** 更新游戏内时间（用于给立场记录打时间戳） */
  setGameTime(time: number): void {
    this.gameTime = time
  }

  /** 记录玩家在某话题上的立场 */
  recordStance(topic: string, stance: string, witnessIds: string[]): void {
    this.stanceHistory.push({
      topic,
      stance,
      timestamp: this.gameTime,
      witnessIds: [...witnessIds],
    })
  }

  /**
   * 检查新立场是否与该话题的历史立场矛盾。
   * 如果矛盾，自动扣分并记录。返回检测到的矛盾，无矛盾返回 null。
   */
  checkContradiction(topic: string, stance: string): Contradiction | null {
    // 找到同一话题的最新历史立场
    const previousStances = this.stanceHistory.filter(
      (s) => s.topic === topic && s.stance !== stance
    )

    if (previousStances.length === 0) return null

    const latest = previousStances[previousStances.length - 1]

    // 已经记录过完全相同的矛盾就不重复扣分
    const alreadyDetected = this.contradictions.some(
      (c) =>
        c.topic === topic &&
        ((c.stanceA === latest.stance && c.stanceB === stance) ||
          (c.stanceA === stance && c.stanceB === latest.stance))
    )
    if (alreadyDetected) return null

    const contradiction: Contradiction = {
      topic,
      stanceA: latest.stance,
      stanceB: stance,
      detectedAt: this.gameTime,
      penaltyApplied: CONTRADICTION_PENALTY,
    }

    this.contradictions.push(contradiction)
    this.score = Math.max(0, this.score - CONTRADICTION_PENALTY)

    return contradiction
  }

  /** 直接施加一致性变化（正值恢复，负值扣除） */
  applyImpact(impact: number): void {
    this.score = Math.max(0, Math.min(100, this.score + impact))
  }

  /**
   * 当 consistency < CONSISTENCY_QUESTION_THRESHOLD 时，返回质疑信息。
   * 角色会当面质疑玩家的前后矛盾。
   */
  shouldQuestionPlayer(): QuestionResult {
    if (this.score >= CONSISTENCY_QUESTION_THRESHOLD) {
      return { shouldQuestion: false }
    }

    if (this.contradictions.length === 0) {
      return {
        shouldQuestion: true,
        template: '（对方看你的眼神变得怀疑...）',
      }
    }

    const latest = this.contradictions[this.contradictions.length - 1]
    const template =
      QUESTION_TEMPLATES[
        Math.floor(Math.random() * QUESTION_TEMPLATES.length)
      ]

    const filled = template
      .replace('{topic}', latest.topic)
      .replace('{stanceA}', latest.stanceA)
      .replace('{stanceB}', latest.stanceB)

    return {
      shouldQuestion: true,
      template: filled,
      latestContradiction: latest,
    }
  }

  /** 返回当前一致性分数 */
  getScore(): number {
    return this.score
  }

  /** 返回所有立场历史 */
  getStanceHistory(): StanceRecord[] {
    return [...this.stanceHistory]
  }

  /** 返回所有矛盾记录 */
  getContradictions(): Contradiction[] {
    return [...this.contradictions]
  }
}
