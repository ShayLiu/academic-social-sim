import { createServerClient } from '@/lib/supabase/server'
import type { SubscriptionTier } from '@/types/payment'

export interface UserProfile {
  id: string
  user_id: string
  display_name: string | null
  email: string | null
  avatar_url: string | null
  subscription_tier: SubscriptionTier
  pro_expires_at: string | null
  monthly_plays_used: number
  monthly_plays_reset_at: string | null
  total_sessions: number
  created_at: string
  updated_at: string
}

const FREE_MONTHLY_LIMIT = 5

export async function getProfile(userId: string): Promise<UserProfile | null> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error || !data) return null
  return data as UserProfile
}

export async function upsertProfile(
  userId: string,
  data: Partial<UserProfile>
): Promise<UserProfile> {
  const supabase = createServerClient()
  const { data: profile, error } = await supabase
    .from('user_profiles')
    .upsert(
      { user_id: userId, ...data },
      { onConflict: 'user_id' }
    )
    .select()
    .single()

  if (error) throw new Error(`Failed to upsert profile: ${error.message}`)
  return profile as UserProfile
}

export async function incrementPlays(userId: string): Promise<void> {
  const supabase = createServerClient()

  // Check if monthly counter needs reset
  const profile = await getProfile(userId)
  if (profile?.monthly_plays_reset_at) {
    const resetAt = new Date(profile.monthly_plays_reset_at)
    if (resetAt <= new Date()) {
      await supabase
        .from('user_profiles')
        .update({
          monthly_plays_used: 1,
          monthly_plays_reset_at: getNextMonthStart(),
        })
        .eq('user_id', userId)
      return
    }
  }

  const { error } = await supabase.rpc('increment_plays_used', {
    p_user_id: userId,
  })

  // Fallback if RPC doesn't exist: manual increment
  if (error) {
    await supabase
      .from('user_profiles')
      .update({
        monthly_plays_used: (profile?.monthly_plays_used ?? 0) + 1,
      })
      .eq('user_id', userId)
  }
}

export async function canPlay(userId: string): Promise<boolean> {
  const profile = await getProfile(userId)
  if (!profile) return true // New user, will be created on first play

  // Pro users have unlimited plays
  if (await isPro(userId)) return true

  // Check if monthly counter needs reset
  if (profile.monthly_plays_reset_at) {
    const resetAt = new Date(profile.monthly_plays_reset_at)
    if (resetAt <= new Date()) return true // Counter will reset
  }

  return profile.monthly_plays_used < FREE_MONTHLY_LIMIT
}

export async function isPro(userId: string): Promise<boolean> {
  const profile = await getProfile(userId)
  if (!profile) return false

  if (profile.subscription_tier !== 'pro') return false

  // Check if pro hasn't expired
  if (profile.pro_expires_at) {
    return new Date(profile.pro_expires_at) > new Date()
  }

  return true
}

export async function upgradeTier(
  userId: string,
  tier: SubscriptionTier,
  expiresAt?: Date
): Promise<void> {
  const supabase = createServerClient()
  const { error } = await supabase
    .from('user_profiles')
    .update({
      subscription_tier: tier,
      pro_expires_at: expiresAt?.toISOString() ?? null,
    })
    .eq('user_id', userId)

  if (error) throw new Error(`Failed to upgrade tier: ${error.message}`)
}

export async function downgradeTier(userId: string): Promise<void> {
  const supabase = createServerClient()
  const { error } = await supabase
    .from('user_profiles')
    .update({
      subscription_tier: 'free',
      pro_expires_at: null,
    })
    .eq('user_id', userId)

  if (error) throw new Error(`Failed to downgrade tier: ${error.message}`)
}

function getNextMonthStart(): string {
  const now = new Date()
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  return next.toISOString()
}
