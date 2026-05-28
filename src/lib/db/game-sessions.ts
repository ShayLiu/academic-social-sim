import { createServerClient } from '@/lib/supabase/server'

export interface PlaySession {
  id: string
  user_id: string
  scenario_id: string
  role_id: string | null
  perspective: string
  stage: string | null
  player_state: Record<string, unknown> | null
  scenario_result: Record<string, unknown> | null
  ending_id: string | null
  ending_score: number | null
  report_unlocked: boolean
  started_at: string
  ended_at: string | null
  duration_seconds: number | null
}

export async function createSession(
  userId: string,
  scenarioId: string
): Promise<string> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('play_sessions')
    .insert({
      user_id: userId,
      scenario_id: scenarioId,
    })
    .select('id')
    .single()

  if (error) throw new Error(`Failed to create session: ${error.message}`)
  return data.id
}

export async function endSession(
  sessionId: string,
  result: {
    player_state?: Record<string, unknown>
    scenario_result?: Record<string, unknown>
    ending_id?: string
    ending_score?: number
    duration_seconds?: number
  }
): Promise<void> {
  const supabase = createServerClient()
  const { error } = await supabase
    .from('play_sessions')
    .update({
      player_state: result.player_state ?? null,
      scenario_result: result.scenario_result ?? null,
      ending_id: result.ending_id ?? null,
      ending_score: result.ending_score ?? null,
      duration_seconds: result.duration_seconds ?? null,
      ended_at: new Date().toISOString(),
    })
    .eq('id', sessionId)

  if (error) throw new Error(`Failed to end session: ${error.message}`)
}

export async function getSession(
  sessionId: string
): Promise<PlaySession | null> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('play_sessions')
    .select('*')
    .eq('id', sessionId)
    .single()

  if (error || !data) return null
  return data as PlaySession
}

export async function getUserSessions(
  userId: string,
  limit: number = 20
): Promise<PlaySession[]> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('play_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('started_at', { ascending: false })
    .limit(limit)

  if (error) throw new Error(`Failed to get user sessions: ${error.message}`)
  return (data ?? []) as PlaySession[]
}

export async function getLatestSession(
  userId: string
): Promise<PlaySession | null> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('play_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('started_at', { ascending: false })
    .limit(1)
    .single()

  if (error || !data) return null
  return data as PlaySession
}

export async function unlockReport(sessionId: string): Promise<void> {
  const supabase = createServerClient()
  const { error } = await supabase
    .from('play_sessions')
    .update({ report_unlocked: true })
    .eq('id', sessionId)

  if (error) throw new Error(`Failed to unlock report: ${error.message}`)
}
