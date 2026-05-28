import type {
  DialogNode,
  DialogOption,
  PlayerState,
  CharacterAttitude,
} from '../../types/game'

export interface ResolveResult {
  option: DialogOption
  nextNodeId: string
  energyCost: number
  consistencyImpact: number
  triggersMineId?: string
  exposesInfoId?: string
  stanceRecord?: { topic: string; stance: string }
  attitudeShift?: { characterId: string; from: CharacterAttitude; to: CharacterAttitude }
  characterReaction: string
  isEmotionalBreakdown: boolean
}

/**
 * 对话树解析器。
 * 根据当前对话节点和玩家状态过滤可用选项，解析选择结果及副作用。
 */
export class DialogResolver {
  private nodes: Map<string, DialogNode>

  constructor(nodes: DialogNode[]) {
    this.nodes = new Map(nodes.map((n) => [n.id, n]))
  }

  /** 获取当前节点的所有可用选项（根据玩家状态过滤） */
  getAvailableOptions(nodeId: string, playerState: PlayerState): DialogOption[] {
    const node = this.nodes.get(nodeId)
    if (!node) return []

    return node.options.filter((option) => {
      // 能量不足的选项不显示
      if (
        option.requiredEnergy !== undefined &&
        playerState.emotionalEnergy < option.requiredEnergy
      ) {
        return false
      }

      // 情绪失控选项只在低能量时可用
      if (option.isEmotionalBreakdown && playerState.emotionalEnergy >= 30) {
        return false
      }

      return true
    })
  }

  /** 处理玩家选择的选项，返回结果和副作用 */
  resolveOption(optionId: string): ResolveResult | null {
    // 遍历所有节点寻找该选项
    for (const node of Array.from(this.nodes.values())) {
      const option = node.options.find((o) => o.id === optionId)
      if (!option) continue

      return {
        option,
        nextNodeId: option.nextNodeId,
        energyCost: option.energyCost,
        consistencyImpact: option.consistencyImpact,
        triggersMineId: option.triggersMine,
        exposesInfoId: option.exposesInfo,
        stanceRecord: option.stanceRecord
          ? { topic: option.stanceRecord.topic, stance: option.stanceRecord.stance }
          : undefined,
        attitudeShift: option.attitudeShift
          ? {
              characterId: option.attitudeShift.characterId,
              from: option.attitudeShift.from,
              to: option.attitudeShift.to,
            }
          : undefined,
        characterReaction: option.characterReaction,
        isEmotionalBreakdown: option.isEmotionalBreakdown ?? false,
      }
    }

    return null
  }

  /** 获取对话节点 */
  getNode(nodeId: string): DialogNode | undefined {
    const node = this.nodes.get(nodeId)
    return node ? { ...node } : undefined
  }

  /** 获取线程恶化时的自动回应节点 */
  getAutoResponseNode(threadId: string): DialogNode | undefined {
    for (const node of Array.from(this.nodes.values())) {
      if (node.threadId === threadId && node.isAutoResponse) {
        return { ...node }
      }
    }
    return undefined
  }

  /**
   * 根据条件筛选出应当激活的节点。
   * 用于动态条件触发（例如能量低于阈值后出现新对话节点）。
   */
  getConditionalNodes(playerState: PlayerState): DialogNode[] {
    const result: DialogNode[] = []

    for (const node of Array.from(this.nodes.values())) {
      if (!node.condition) continue

      let match = false
      switch (node.condition.type) {
        case 'energy_below':
          match =
            playerState.emotionalEnergy <
            (typeof node.condition.value === 'number'
              ? node.condition.value
              : parseInt(node.condition.value as string, 10))
          break

        case 'mine_triggered':
          match = playerState.triggeredMines.includes(
            node.condition.value as string
          )
          break

        case 'info_exposed':
          match = playerState.exposedInfo.includes(
            node.condition.value as string
          )
          break

        case 'consistency_below':
          match =
            playerState.consistency <
            (typeof node.condition.value === 'number'
              ? node.condition.value
              : parseInt(node.condition.value as string, 10))
          break

        case 'attitude_is':
          if (node.condition.characterId) {
            match =
              playerState.attitudes[node.condition.characterId] ===
              (node.condition.value as CharacterAttitude)
          }
          break
      }

      if (match) {
        result.push({ ...node })
      }
    }

    return result
  }
}
