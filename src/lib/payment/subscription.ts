import { createServerClient } from '@/lib/supabase/server'
import { upgradeTier, downgradeTier } from '@/lib/db/user-profiles'
import { unlockReport } from '@/lib/db/game-sessions'
import type { ProductType, SubscriptionStatus } from '@/types/payment'

export async function grantBenefit(
  userId: string,
  productType: ProductType,
  orderNo: string,
  sessionId?: string
): Promise<void> {
  const supabase = createServerClient()

  if (productType === 'single_report') {
    if (sessionId) {
      await unlockReport(sessionId)
    }
    await upgradeTier(userId, 'paid')
  } else if (productType === 'pro_monthly') {
    const expiresAt = new Date()
    expiresAt.setMonth(expiresAt.getMonth() + 1)
    await upgradeTier(userId, 'pro', expiresAt)

    await supabase.from('subscriptions').upsert(
      {
        user_id: userId,
        plan_type: 'pro_monthly',
        status: 'active' as SubscriptionStatus,
        current_period_start: new Date().toISOString(),
        current_period_end: expiresAt.toISOString(),
        cancel_at_period_end: false,
      },
      { onConflict: 'user_id' }
    )
  } else if (productType === 'pro_yearly') {
    const expiresAt = new Date()
    expiresAt.setFullYear(expiresAt.getFullYear() + 1)
    await upgradeTier(userId, 'pro', expiresAt)

    await supabase.from('subscriptions').upsert(
      {
        user_id: userId,
        plan_type: 'pro_yearly',
        status: 'active' as SubscriptionStatus,
        current_period_start: new Date().toISOString(),
        current_period_end: expiresAt.toISOString(),
        cancel_at_period_end: false,
      },
      { onConflict: 'user_id' }
    )
  }
}

export async function checkAndExpireSubscriptions(): Promise<{ expired: number }> {
  const supabase = createServerClient()
  const now = new Date().toISOString()

  const { data: expiredSubs } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('status', 'active')
    .lt('current_period_end', now)

  if (!expiredSubs || expiredSubs.length === 0) {
    return { expired: 0 }
  }

  for (const sub of expiredSubs) {
    await supabase
      .from('subscriptions')
      .update({ status: 'expired' as SubscriptionStatus })
      .eq('user_id', sub.user_id)
      .eq('status', 'active')

    await downgradeTier(sub.user_id)
  }

  return { expired: expiredSubs.length }
}

export async function cancelSubscription(userId: string): Promise<void> {
  const supabase = createServerClient()
  await supabase
    .from('subscriptions')
    .update({ cancel_at_period_end: true })
    .eq('user_id', userId)
    .eq('status', 'active')
}

export interface SubscriptionInfo {
  planType: string
  status: SubscriptionStatus
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
}

export async function getSubscriptionInfo(
  userId: string
): Promise<SubscriptionInfo | null> {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .in('status', ['active', 'cancelled'])
    .single()

  if (!data) return null

  return {
    planType: data.plan_type,
    status: data.status,
    currentPeriodStart: data.current_period_start,
    currentPeriodEnd: data.current_period_end,
    cancelAtPeriodEnd: data.cancel_at_period_end,
  }
}
