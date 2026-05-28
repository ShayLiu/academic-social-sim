import type { PlayerState, ScenarioResult, SocialMine, KnowledgeItem } from '@/types/game'

export interface ReportDimensions {
  socialAwareness: number      // 察言观色
  rhythmControl: number        // 节奏控制
  recoveryAbility: number      // 尴尬恢复
  hierarchyNavigation: number  // 层级推进
  energyManagement: number     // 能量管理
  informationControl: number   // 信息掌控
}

export interface ReportEvent {
  timestamp: number
  type: 'choice' | 'mine' | 'info_exposed' | 'urgency_alert' | 'attitude_change' | 'contradiction'
  description: string
  impact: string
  severity?: 'low' | 'medium' | 'high'
  characterName?: string
}

export interface MineDetail {
  id: string
  name: string
  description: string
  consequence: string
  severity: 1 | 2 | 3
  timestamp: number
}

export interface ComparisonData {
  avgScore: number
  playerScore: number
  percentile: number
  totalPlayers: number
  phaseStats: {
    avgScore: number
    topScore: number
  }
}

export interface ReportData {
  dimensions: ReportDimensions
  events: ReportEvent[]
  mineDetails: MineDetail[]
  behindEvaluations: any[]
  personalityTag: string
  personalityDescription: string
  improvementSuggestions: string[]
  comparisonData: ComparisonData
  keyInsights: string[]
  stats: {
    totalChoices: number
    avgEnergyPerChoice: number
    riskyChoices: number
    safeChoices: number
    breakdownChoices: number
  }
}

export function generateReport(
  result: ScenarioResult,
  mines?: SocialMine[],
  knowledgeItems?: KnowledgeItem[]
): ReportData {
  const { finalPlayerState, behindEvaluations, survivalScore } = result

  const dimensions = calculateDimensions(finalPlayerState, result)
  const events = extractKeyEvents(finalPlayerState, result, mines, knowledgeItems)
  const mineDetails = extractMineDetails(finalPlayerState, mines, result.timeSpent)
  const { personalityTag, personalityDescription } = determinePersonality(dimensions, result)
  const improvementSuggestions = generateSuggestions(dimensions, result)
  const keyInsights = generateKeyInsights(dimensions, result, mineDetails)
  const stats = calculateStats(finalPlayerState, result)

  const comparisonData: ComparisonData = generateComparisonData(result)

  return {
    dimensions,
    events,
    mineDetails,
    behindEvaluations,
    personalityTag,
    personalityDescription,
    improvementSuggestions,
    comparisonData,
    keyInsights,
    stats,
  }
}

function calculateDimensions(
  playerState: PlayerState,
  result: ScenarioResult
): ReportDimensions {
  const { consistency, emotionalEnergy, triggeredMines, contradictions, dialogHistory, stanceHistory } = playerState

  // 察言观色：基于触发地雷数量和矛盾数量
  const minePenalty = triggeredMines.length * 15
  const contradictionPenalty = contradictions.length * 8
  const socialAwareness = Math.round(
    Math.max(0, Math.min(100, 100 - minePenalty - contradictionPenalty))
  )

  // 节奏控制：基于对话数量和能量管理
  const dialogCount = dialogHistory.length
  const avgTimePerChoice = dialogCount > 0 ? result.timeSpent / dialogCount : 60
  const rhythmScore = avgTimePerChoice > 30 && avgTimePerChoice < 90 ? 20 : 0
  const energyBonus = emotionalEnergy > 50 ? 15 : emotionalEnergy > 30 ? 5 : -10
  const rhythmControl = Math.round(
    Math.max(0, Math.min(100, 50 + rhythmScore + energyBonus + (dialogCount > 5 ? 15 : 0)))
  )

  // 尴尬恢复：如果触发地雷后仍然存活，说明恢复能力强
  const mineRecoveryScore = triggeredMines.length > 0
    ? Math.min(40, (result.survivalScore / 1.5) - triggeredMines.length * 5)
    : 30
  const recoveryAbility = Math.round(
    Math.max(0, Math.min(100, 50 + mineRecoveryScore + (emotionalEnergy > 40 ? 10 : -10)))
  )

  // 层级推进：基于一致性和态度变化
  const consistencyBonus = consistency * 0.4
  const hierarchyNavigation = Math.round(
    Math.max(0, Math.min(100, consistencyBonus + (100 - triggeredMines.length * 12) * 0.6))
  )

  // 能量管理：基于最终能量和能量消耗
  const avgEnergyLoss = dialogCount > 0 ? (100 - emotionalEnergy) / dialogCount : 0
  const energyScore = avgEnergyLoss < 8 ? 25 : avgEnergyLoss < 12 ? 10 : -10
  const energyManagement = Math.round(
    Math.max(0, Math.min(100, emotionalEnergy * 0.6 + energyScore + (dialogCount > 3 ? 10 : 0)))
  )

  // 信息掌控：基于暴露信息和立场记录
  const infoExposurePenalty = playerState.exposedInfo.length * 12
  const stanceBonus = stanceHistory.length > 3 ? 10 : stanceHistory.length > 1 ? 5 : 0
  const informationControl = Math.round(
    Math.max(0, Math.min(100, 85 - infoExposurePenalty + stanceBonus))
  )

  return {
    socialAwareness,
    rhythmControl,
    recoveryAbility,
    hierarchyNavigation,
    energyManagement,
    informationControl,
  }
}

function extractKeyEvents(
  playerState: PlayerState,
  result: ScenarioResult,
  mines?: SocialMine[],
  knowledgeItems?: KnowledgeItem[]
): ReportEvent[] {
  const events: ReportEvent[] = []

  // 从对话历史提取关键决策
  const dialogHistory = playerState.dialogHistory || []
  dialogHistory.forEach((dialog, idx) => {
    if (idx === 0 || idx === Math.floor(dialogHistory.length / 2) || idx === dialogHistory.length - 1) {
      events.push({
        timestamp: dialog.timestamp,
        type: 'choice',
        description: `关键决策 #${idx + 1}`,
        impact: '影响了后续走向',
        severity: 'low',
      })
    }
  })

  // 地雷触发事件
  for (const mineId of playerState.triggeredMines) {
    const mine = mines?.find(m => m.id === mineId)
    events.push({
      timestamp: 0,
      type: 'mine',
      description: mine?.name || `触发社交地雷: ${mineId}`,
      impact: mine?.consequence || '全场态度骤变',
      severity: 'high',
    })
  }

  // 立场矛盾事件
  for (const contradiction of playerState.contradictions) {
    events.push({
      timestamp: contradiction.detectedAt,
      type: 'contradiction',
      description: `立场矛盾: 关于"${contradiction.topic}"前后说法不一`,
      impact: `一致性 -${contradiction.penaltyApplied}`,
      severity: 'medium',
    })
  }

  // 信息暴露事件
  for (const infoId of playerState.exposedInfo) {
    const info = knowledgeItems?.find(k => k.id === infoId)
    events.push({
      timestamp: 0,
      type: 'info_exposed',
      description: info?.content || `信息暴露: ${infoId}`,
      impact: info?.exposureConsequence || '引发连锁反应',
      severity: 'medium',
    })
  }

  // 按时间排序
  return events.sort((a, b) => a.timestamp - b.timestamp)
}

function extractMineDetails(
  playerState: PlayerState,
  mines?: SocialMine[],
  totalTime?: number
): MineDetail[] {
  if (!mines) {
    return playerState.triggeredMines.map((id, idx) => ({
      id,
      name: `地雷 #${idx + 1}`,
      description: '场景中预埋的社交地雷',
      consequence: '触发了负面后果',
      severity: 2 as const,
      timestamp: Math.floor((idx + 1) * (totalTime || 60) / (playerState.triggeredMines.length + 1)),
    }))
  }

  return playerState.triggeredMines.map((id, idx) => {
    const mine = mines.find(m => m.id === id)
    return {
      id,
      name: mine?.name || `地雷 #${idx + 1}`,
      description: mine?.description || '场景中预埋的社交地雷',
      consequence: mine?.consequence || '触发了负面后果',
      severity: mine?.severity || 2,
      timestamp: Math.floor((idx + 1) * (totalTime || 60) / (playerState.triggeredMines.length + 1)),
    }
  })
}

function determinePersonality(
  dimensions: ReportDimensions,
  result: ScenarioResult
): { personalityTag: string; personalityDescription: string } {
  const avg = Object.values(dimensions).reduce((a, b) => a + b, 0) / 6
  const { socialAwareness, energyManagement, hierarchyNavigation, recoveryAbility, rhythmControl, informationControl } = dimensions

  // 根据最高维度和整体表现确定性格标签
  const maxDimension = Math.max(socialAwareness, energyManagement, hierarchyNavigation, recoveryAbility, rhythmControl, informationControl)
  
  let tag = ''
  let description = ''

  if (avg >= 80) {
    tag = '学术圈老狐狸'
    description = '深谙学术圈的潜规则，在社交博弈中游刃有余。你知道什么时候该说什么话，也知道什么话绝对不能说。'
  } else if (result.survivalScore >= 90) {
    tag = '完美幸存者'
    description = '虽然有些惊险时刻，但你凭借出色的应变能力和情商，成功在修罗场中全身而退。'
  } else if (socialAwareness >= 80 && socialAwareness === maxDimension) {
    tag = '察言观色型选手'
    description = '你对人际关系的敏感度极高，能够迅速捕捉到对话中的微妙信号，并及时调整策略。'
  } else if (energyManagement >= 80 && energyManagement === maxDimension) {
    tag = '情绪管理大师'
    description = '在高压环境下依然能保持冷静，懂得控制自己的情绪消耗，避免陷入崩溃状态。'
  } else if (hierarchyNavigation >= 80 && hierarchyNavigation === maxDimension) {
    tag = '层级游泳健将'
    description = '你很清楚学术圈的地位规则，知道如何在不同层级的角色之间周旋。'
  } else if (recoveryAbility >= 80 && recoveryAbility === maxDimension) {
    tag = '绝地反击型'
    description = '即使踩中地雷，你也能迅速调整状态，将损失降到最低并找到翻盘的机会。'
  } else if (rhythmControl >= 80 && rhythmControl === maxDimension) {
    tag = '节奏控制者'
    description = '你善于把握对话的节奏，知道什么时候该快、什么时候该慢，让对手跟着你的节奏走。'
  } else if (informationControl >= 80 && informationControl === maxDimension) {
    tag = '信息博弈专家'
    description = '你对信息的掌控极为精准，知道什么信息该暴露、什么该隐藏，把信息差变成武器。'
  } else if (avg >= 60) {
    tag = '有潜力的学术社交者'
    description = '虽然还有进步空间，但你已经展现出了不错的社交意识。继续练习会更上一层楼。'
  } else if (avg >= 40) {
    tag = '学术社交菜鸟'
    description = '学术圈的潜规则对你来说还是太复杂了，但不要气馁，每一次踩雷都是成长的机会。'
  } else if (socialAwareness < 30) {
    tag = '社交地雷踩踏机'
    description = '你对社交危险信号的感知力几乎为零，学术圈的修罗场对你来说太过残酷。'
  } else if (result.minesTriggered >= 3) {
    tag = '修罗场活靶子'
    description = '在这个场景里，你几乎踩中了所有能踩的雷。不过没关系，失败是最好的老师。'
  } else {
    tag = '学术圈纯真少年'
    description = '你带着纯粹的学术理想进入这个圈子，但现实可能比想象中更加复杂。'
  }

  return { personalityTag: tag, personalityDescription: description }
}

function generateSuggestions(
  dimensions: ReportDimensions,
  result: ScenarioResult
): string[] {
  const suggestions: string[] = []

  if (dimensions.socialAwareness < 50) {
    suggestions.push('注意观察对话中的敏感词和禁忌话题。每个场景都有预埋的社交地雷，仔细阅读角色的描述和态度变化。')
  }
  
  if (dimensions.rhythmControl < 50) {
    suggestions.push('不要急于回应所有线程。优先处理 urgency 最高的对话，但也不要完全忽略其他角色。')
  }
  
  if (dimensions.recoveryAbility < 50) {
    suggestions.push('触发地雷后不要慌张。及时转移话题或适当示弱可以降低伤害，记住：活着比面子更重要。')
  }
  
  if (dimensions.hierarchyNavigation < 50) {
    suggestions.push('注意维持立场一致性。对同一话题的态度不要前后矛盾，角色们会记住你说过的话。')
  }
  
  if (dimensions.energyManagement < 50) {
    suggestions.push('高能量消耗的选项不一定更好。有时低调回应反而更安全，学会在关键时刻保存能量。')
  }
  
  if (dimensions.informationControl < 50) {
    suggestions.push('信息是武器也是弱点。不要轻易暴露你知道的内幕，有些事看破不说破才是上策。')
  }

  if (result.minesTriggered >= 2) {
    suggestions.push('多次触发地雷说明对场景潜规则认知不足。建议重玩并关注信息差面板，了解每个角色的隐藏目的。')
  }

  if (result.consistencyFinal < 50) {
    suggestions.push('你的立场一致性过低，角色们开始质疑你的可信度。记住你之前的表态，避免自相矛盾。')
  }

  if (result.energyFinal < 30) {
    suggestions.push('你的情绪能量消耗过快。在高压场景中，学会选择那些能量消耗更低但效果不错的选项。')
  }

  return suggestions.slice(0, 5)
}

function generateKeyInsights(
  dimensions: ReportDimensions,
  result: ScenarioResult,
  mineDetails: MineDetail[]
): string[] {
  const insights: string[] = []

  // 最强能力
  const maxKey = Object.entries(dimensions).reduce((a, b) => b[1] > a[1] ? b : a)
  const dimensionLabels: Record<string, string> = {
    socialAwareness: '察言观色',
    rhythmControl: '节奏控制',
    recoveryAbility: '尴尬恢复',
    hierarchyNavigation: '层级推进',
    energyManagement: '能量管理',
    informationControl: '信息掌控',
  }
  insights.push(`你的核心优势是「${dimensionLabels[maxKey[0]]}」(${maxKey[1]}分)，这是你在学术社交中最重要的武器。`)

  // 最弱能力
  const minKey = Object.entries(dimensions).reduce((a, b) => b[1] < a[1] ? b : a)
  insights.push(`你需要加强「${dimensionLabels[minKey[0]]}」(${minKey[1]}分)的训练，这是你最大的短板。`)

  // 地雷相关
  if (mineDetails.length === 0) {
    insights.push('完美避雷！你成功识别并绕开了所有社交地雷，这展现了出色的社交敏感度。')
  } else if (mineDetails.length >= 2) {
    const mineNames = mineDetails.map(m => m.name).join('、')
    insights.push(`你触发了 ${mineDetails.length} 个地雷（${mineNames}），这些都是可以避免的失误。`)
  }

  // 生存分数分析
  if (result.survivalScore >= 80) {
    insights.push(`生存分 ${result.survivalScore} 分意味着你不仅活下来了，还活得不错。继续保持这种社交智慧。`)
  } else if (result.survivalScore >= 50) {
    insights.push(`生存分 ${result.survivalScore} 分说明你勉强过关。还有很多提升空间，建议重新挑战。`)
  } else {
    insights.push(`生存分 ${result.survivalScore} 分... 学术圈的修罗场这次把你打得很惨，但失败是最好的老师。`)
  }

  return insights
}

function calculateStats(
  playerState: PlayerState,
  result: ScenarioResult
): ReportData['stats'] {
  const totalChoices = playerState.dialogHistory?.length || 0
  const avgEnergyPerChoice = totalChoices > 0 
    ? Math.round((100 - result.energyFinal) / totalChoices * 10) / 10 
    : 0

  // 这些需要更详细的追踪，目前用估算
  const riskyChoices = Math.floor(totalChoices * 0.3)
  const safeChoices = Math.floor(totalChoices * 0.5)
  const breakdownChoices = result.energyFinal < 30 ? Math.floor(totalChoices * 0.1) : 0

  return {
    totalChoices,
    avgEnergyPerChoice,
    riskyChoices,
    safeChoices,
    breakdownChoices,
  }
}

function generateComparisonData(result: ScenarioResult): ComparisonData {
  // 在实际应用中，这些数据应该从数据库获取
  // 这里使用模拟数据，但会根据玩家分数进行合理调整
  const playerScore = result.survivalScore
  
  // 根据阶段生成不同的基准数据
  const phaseMultipliers: Record<string, number> = {
    undergrad: 1.0,
    masters: 0.95,
    phd: 0.9,
    postdoc: 0.85,
    faculty: 0.8,
  }
  
  const multiplier = phaseMultipliers[result.endingId.split('-')[0]] || 1.0
  
  // 平均分通常在50-60之间
  const avgScore = Math.round(55 * multiplier)
  
  // 玩家百分比排名
  let percentile = 50
  if (playerScore >= 90) percentile = 95
  else if (playerScore >= 80) percentile = 85
  else if (playerScore >= 70) percentile = 75
  else if (playerScore >= 60) percentile = 65
  else if (playerScore >= 50) percentile = 50
  else if (playerScore >= 40) percentile = 35
  else if (playerScore >= 30) percentile = 20
  else percentile = 10

  return {
    avgScore,
    playerScore,
    percentile,
    totalPlayers: 1247 + Math.floor(Math.random() * 500),
    phaseStats: {
      avgScore,
      topScore: Math.min(100, Math.round(avgScore * 1.6)),
    },
  }
}
