import type { SocialMine, CharacterAttitude } from '../../types/game'

export interface MineConsequence {
  mine: SocialMine
  attitudeChanges: Array<{
    characterId: string
    to: CharacterAttitude
  }>
  forbiddenTopicAdded?: string
}

/**
 * 社交地雷检测器。
 * 检查玩家选项或文本是否触发社交地雷，并计算后果。
 */
export class MineDetector {
  private mines: Map<string, SocialMine>

  constructor(mines: SocialMine[]) {
    this.mines = new Map(mines.map((m) => [m.id, { ...m }]))
  }

  /** 检查某个选项是否触发地雷，返回匹配的地雷或 null */
  checkOption(optionId: string): SocialMine | null {
    for (const mine of Array.from(this.mines.values())) {
      if (mine.triggered) continue
      if (mine.triggerOptionIds.includes(optionId)) {
        return { ...mine }
      }
    }
    return null
  }

  /** 检查文本中是否包含地雷关键词，返回第一个匹配的地雷或 null */
  checkKeywords(text: string): SocialMine | null {
    const lowerText = text.toLowerCase()
    for (const mine of Array.from(this.mines.values())) {
      if (mine.triggered) continue
      for (const keyword of mine.triggerKeywords) {
        if (lowerText.includes(keyword.toLowerCase())) {
          return { ...mine }
        }
      }
    }
    return null
  }

  /** 触发地雷，标记为已触发并返回后果 */
  triggerMine(mineId: string): MineConsequence | null {
    const mine = this.mines.get(mineId)
    if (!mine || mine.triggered) return null

    mine.triggered = true

    return {
      mine: { ...mine },
      attitudeChanges: mine.attitudeShifts.map((shift) => ({
        characterId: shift.characterId,
        to: shift.to,
      })),
      forbiddenTopicAdded: mine.forbiddenTopicAfter,
    }
  }

  /** 返回已触发的地雷列表 */
  getTriggeredMines(): SocialMine[] {
    const result: SocialMine[] = []
    for (const mine of Array.from(this.mines.values())) {
      if (mine.triggered) {
        result.push({ ...mine })
      }
    }
    return result
  }

  /** 返回尚未触发的地雷数量 */
  getRemainingMines(): number {
    let count = 0
    for (const mine of Array.from(this.mines.values())) {
      if (!mine.triggered) count++
    }
    return count
  }

  /** 返回地雷总数 */
  getTotalMines(): number {
    return this.mines.size
  }

  /** 根据 ID 获取地雷 */
  getMine(mineId: string): SocialMine | undefined {
    const m = this.mines.get(mineId)
    return m ? { ...m } : undefined
  }
}
