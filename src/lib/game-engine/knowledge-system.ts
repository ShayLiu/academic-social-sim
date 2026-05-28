import type { KnowledgeItem, InfoVisibility } from '../../types/game'

/**
 * 信息差系统。
 * 管理玩家和角色之间的信息不对称，追踪信息暴露事件。
 */
export class KnowledgeSystem {
  private items: Map<string, KnowledgeItem>
  /** 暴露事件标记：info ID -> 是否刚刚暴露（用于触发 UI 气氛骤变） */
  private recentExposures: Set<string> = new Set()

  constructor(knowledgeItems: KnowledgeItem[]) {
    this.items = new Map(knowledgeItems.map((k) => [k.id, { ...k }]))
  }

  /** 返回某个持有者可见的信息列表 */
  getVisibleKnowledge(playerId: string): KnowledgeItem[] {
    const visible: KnowledgeItem[] = []
    const allItems = Array.from(this.items.values())
    for (const item of allItems) {
      if (
        item.visibility === 'knownToUser' ||
        item.visibility === 'knownToUserButHidden' ||
        item.holders.includes(playerId)
      ) {
        visible.push({ ...item })
      }
    }
    return visible
  }

  /**
   * 检查某个选项是否导致信息暴露。
   * 返回即将暴露的 KnowledgeItem，如果没有则返回 null。
   */
  checkExposure(optionId: string, mineId?: string): KnowledgeItem | null {
    const allItems = Array.from(this.items.values())
    for (const item of allItems) {
      if (!item.revealCondition) continue

      // 已经暴露过的跳过
      if (item.visibility === 'knownToUser') continue

      if (
        item.revealCondition.type === 'option_selected' &&
        item.revealCondition.value === optionId
      ) {
        return { ...item }
      }

      if (
        mineId &&
        item.revealCondition.type === 'mine_triggered' &&
        item.revealCondition.value === mineId
      ) {
        return { ...item }
      }
    }
    return null
  }

  /**
   * 检查是否有信息因 urgency 阈值而暴露
   */
  checkUrgencyExposure(urgency: number): KnowledgeItem[] {
    const exposed: KnowledgeItem[] = []
    const allItems = Array.from(this.items.values())
    for (const item of allItems) {
      if (
        item.revealCondition?.type === 'urgency_threshold' &&
        typeof item.revealCondition.value === 'number' &&
        urgency >= item.revealCondition.value &&
        item.visibility !== 'knownToUser'
      ) {
        exposed.push({ ...item })
      }
    }
    return exposed
  }

  /**
   * 暴露某条信息，将其 visibility 设为 knownToUser，并标记为刚暴露。
   */
  exposeInfo(infoId: string): void {
    const item = this.items.get(infoId)
    if (!item) return

    item.visibility = 'knownToUser'
    this.recentExposures.add(infoId)
  }

  /** 返回玩家尚不知道的信息数量（knownToOthersButNotUser） */
  getHiddenCount(): number {
    let count = 0
    const allItems = Array.from(this.items.values())
    for (const item of allItems) {
      if (item.visibility === 'knownToOthersButNotUser') {
        count++
      }
    }
    return count
  }

  /** 消费最近暴露标记（UI 读取后清除，避免重复触发气氛骤变动画） */
  consumeRecentExposures(): string[] {
    const ids = Array.from(this.recentExposures)
    this.recentExposures.clear()
    return ids
  }

  /** 获取所有信息项（用于结局计算等） */
  getAllItems(): KnowledgeItem[] {
    return Array.from(this.items.values()).map((i) => ({ ...i }))
  }

  /** 获取单条信息 */
  getItem(infoId: string): KnowledgeItem | undefined {
    const item = this.items.get(infoId)
    return item ? { ...item } : undefined
  }
}
