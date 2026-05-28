import { createServerClient } from '@/lib/supabase/server'

export interface Report {
  id: string
  user_id: string
  session_id: string
  dimensions: Record<string, unknown> | null
  events: Record<string, unknown> | null
  behind_evaluations: Record<string, unknown> | null
  personality_tag: string | null
  improvement_suggestions: Record<string, unknown> | null
  comparison_data: Record<string, unknown> | null
  pdf_url: string | null
  created_at: string
}

export interface CreateReportData {
  dimensions?: Record<string, unknown>
  events?: Record<string, unknown>
  behind_evaluations?: Record<string, unknown>
  personality_tag?: string
  improvement_suggestions?: Record<string, unknown>
  comparison_data?: Record<string, unknown>
}

export async function createReport(
  userId: string,
  sessionId: string,
  data: CreateReportData
): Promise<string> {
  const supabase = createServerClient()
  const { data: report, error } = await supabase
    .from('reports')
    .insert({
      user_id: userId,
      session_id: sessionId,
      dimensions: data.dimensions ?? null,
      events: data.events ?? null,
      behind_evaluations: data.behind_evaluations ?? null,
      personality_tag: data.personality_tag ?? null,
      improvement_suggestions: data.improvement_suggestions ?? null,
      comparison_data: data.comparison_data ?? null,
    })
    .select('id')
    .single()

  if (error) throw new Error(`Failed to create report: ${error.message}`)
  return report.id
}

export async function getReport(sessionId: string): Promise<Report | null> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('session_id', sessionId)
    .single()

  if (error || !data) return null
  return data as Report
}

export async function updatePdfUrl(
  reportId: string,
  pdfUrl: string
): Promise<void> {
  const supabase = createServerClient()
  const { error } = await supabase
    .from('reports')
    .update({ pdf_url: pdfUrl })
    .eq('id', reportId)

  if (error) throw new Error(`Failed to update PDF URL: ${error.message}`)
}
