import type {
  AcademicPhase,
  Character,
  DialogThread,
  DialogNode,
  SocialMine,
  KnowledgeItem,
  Ending,
  BehindEvaluation,
} from './game'

export interface ScenarioCharacter extends Character {
  role: 'protagonist' | 'antagonist' | 'ally' | 'neutral' | 'wildcard'
  initialPosition: string        // 场景中的位置描述
  relationship: string           // 与玩家的关系
}

export interface ScenarioData {
  id: string
  phase: AcademicPhase
  title: string
  subtitle: string               // 副标题
  description: string            // 场景背景描述
  briefing: string               // 进入前的剧情简报
  difficulty: 1 | 2 | 3 | 4 | 5
  estimatedMinutes: number
  characters: ScenarioCharacter[]
  threads: DialogThread[]
  dialogNodes: DialogNode[]
  mines: SocialMine[]
  knowledgeItems: KnowledgeItem[]
  endings: Ending[]
  behindEvaluationTemplates: BehindEvaluation[]
  playerRole: string             // 玩家扮演的角色描述
  setting: string                // 场景地点
  timeOfDay: string              // 时间
  atmosphere: string             // 氛围描述
}

export interface ScenarioListItem {
  id: string
  phase: AcademicPhase
  title: string
  subtitle: string
  difficulty: 1 | 2 | 3 | 4 | 5
  estimatedMinutes: number
  description: string
  locked: boolean
  playerRole: string
}
