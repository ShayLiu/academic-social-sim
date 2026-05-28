import type { ScenarioData, ScenarioListItem } from '../../types/scenario'
import { s01SummerCamp } from './s01-summer-camp'
import { s02ThesisDefense } from './s02-thesis-defense'
import { s03TransferPhd } from './s03-transfer-phd'
import { s04JobVsPaper } from './s04-job-vs-paper'
import { s05ProposalDefense } from './s05-proposal-defense'
import { s06PaperRevision } from './s06-paper-revision'
import { s07JobTalk } from './s07-job-talk'
import { s08GrantEve } from './s08-grant-eve'
import { s09TenureReview } from './s09-tenure-review'
import { s10FirstStudent } from './s10-first-student'

export const ALL_SCENARIOS: ScenarioData[] = [
  s01SummerCamp,
  s02ThesisDefense,
  s03TransferPhd,
  s04JobVsPaper,
  s05ProposalDefense,
  s06PaperRevision,
  s07JobTalk,
  s08GrantEve,
  s09TenureReview,
  s10FirstStudent,
]

export function getScenario(id: string): ScenarioData | undefined {
  return ALL_SCENARIOS.find(s => s.id === id)
}

export function getScenarioList(): ScenarioListItem[] {
  return ALL_SCENARIOS.map(s => ({
    id: s.id,
    phase: s.phase,
    title: s.title,
    subtitle: s.subtitle,
    difficulty: s.difficulty,
    estimatedMinutes: s.estimatedMinutes,
    description: s.description,
    locked: false,
    playerRole: s.playerRole,
  }))
}
