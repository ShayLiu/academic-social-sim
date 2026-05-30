import type { Ending, PlayerState } from '../../types/game'

/**
 * 结局计算器。
 * 根据玩家最终状态匹配最佳结局，计算生存分。
 */
export class EndingCalculator {
  private endings: Ending[]

  constructor(endings: Ending[]) {
    // 按 priority 降序排列，高优先级先匹配
    this.endings = [...endings].sort((a, b) => b.priority - a.priority)
  }

  /** 根据最终 PlayerState 匹配最佳结局 */
  calculateEnding(playerState: PlayerState): Ending {
    for (const ending of this.endings) {
      if (this.matchesConditions(ending, playerState)) {
        return ending
      }
    }

    // 兜底结局：如果没有任何条件匹配，返回最后一个（最低优先级的通用结局）
    return this.endings[this.endings.length - 1]
  }

  /** 检查玩家状态是否满足某结局的全部条件 */
  private matchesConditions(ending: Ending, playerState: PlayerState): boolean {
    const c = ending.conditions

    if (c.minConsistency !== undefined && playerState.consistency < c.minConsistency) {
      return false
    }
    if (c.maxConsistency !== undefined && playerState.consistency > c.maxConsistency) {
      return false
    }
    if (c.minEnergy !== undefined && playerState.emotionalEnergy < c.minEnergy) {
      return false
    }
    if (c.maxEnergy !== undefined && playerState.emotionalEnergy > c.maxEnergy) {
      return false
    }

    // 必须触发的地雷
    if (c.requiredMines) {
      for (const mineId of c.requiredMines) {
        if (!playerState.triggeredMines.includes(mineId)) {
          return false
        }
      }
    }

    // 不能触发的地雷
    if (c.forbiddenMines) {
      for (const mineId of c.forbiddenMines) {
        if (playerState.triggeredMines.includes(mineId)) {
          return false
        }
      }
    }

    // 必须暴露的信息
    if (c.requiredExposures) {
      for (const infoId of c.requiredExposures) {
        if (!playerState.exposedInfo.includes(infoId)) {
          return false
        }
      }
    }

    // 要求特定角色的态度
    if (c.requiredAttitudes) {
      for (const req of c.requiredAttitudes) {
        if (playerState.attitudes[req.characterId] !== req.attitude) {
          return false
        }
      }
    }

    return true
  }

  /**
   * 计算生存分 (0-100)。
   * 综合考虑一致性、能量、地雷触发比例、信息暴露情况等。
   */
  calculateSurvivalScore(playerState: PlayerState): number {
    const mineCount = playerState.triggeredMines.length
    const contradictionCount = playerState.contradictions.length

    // 基础分：一致性（0-100 → 0-35分）
    const consistencyScore = (playerState.consistency / 100) * 35

    // 能量分（0-100 → 0-25分）
    const energyScore = (playerState.emotionalEnergy / 100) * 25

    // 地雷分：没踩雷满分，每踩一个扣10分（0-20分）
    const mineScore = Math.max(0, 20 - mineCount * 10)

    // 矛盾分：没矛盾满分，每一个矛盾扣5分（0-10分）
    const contradictionScore = Math.max(0, 10 - contradictionCount * 5)

    // 态度分：所有角色态度加权（0-10分）
    const attitudeValues: Record<string, number> = {
      friendly: 10, neutral: 6, wary: 3, hostile: 0,
    }
    const attitudes = Object.values(playerState.attitudes)
    const attitudeAvg = attitudes.length > 0
      ? attitudes.reduce((sum, att) => sum + (attitudeValues[att] ?? 0), 0) / attitudes.length
      : 5
    const attitudeScore = attitudeAvg

    const total = Math.round(consistencyScore + energyScore + mineScore + contradictionScore + attitudeScore)
    return Math.max(0, Math.min(100, total))
  }

  /** 根据结局和玩家状态生成一句话总结 */
  generateImpressionSummary(ending: Ending, playerState: PlayerState): string {
    const score = this.calculateSurvivalScore(playerState)

    if (playerState.emotionalEnergy <= 0) {
      return `你在学术社交的压力下彻底崩溃了。${ending.name}——这或许就是大多数人不愿说出口的结局。`
    }

    if (score >= 80) {
      return `你在这场学术社交中游刃有余，${ending.name}。众人对你印象深刻，但没人知道你内心也在演戏。`
    }

    if (score >= 60) {
      return `你勉强撑过了这场局面，${ending.name}。有些话说对了，有些话不该说——但至少你还站着。`
    }

    if (score >= 40) {
      return `${ending.name}。你的表现引起了一些人的怀疑，好在学术圈的记忆并不长久——或者说，不会当面提起。`
    }

    return `${ending.name}。你在这场社交中留下了不少把柄，而学术圈最不缺的就是记忆力好的人。`
  }
}
