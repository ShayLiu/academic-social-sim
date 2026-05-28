'use client'

import { cn } from '@/lib/utils'
import type { SubscriptionTier } from '@/types/payment'

interface SubscriptionBadgeProps {
  tier: SubscriptionTier
  expiresAt?: string | null
}

export function SubscriptionBadge({ tier, expiresAt }: SubscriptionBadgeProps) {
  const isPro = tier === 'pro'
  const isExpiringSoon =
    isPro && expiresAt && new Date(expiresAt).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded',
        isPro ? 'bg-academic-blue/20 text-academic-blue-light' : 'bg-surface-lighter text-text-muted'
      )}
    >
      {isPro ? 'Pro' : tier === 'paid' ? '已购报告' : 'Free'}
      {isPro && expiresAt && (
        <span className={cn('text-[10px]', isExpiringSoon ? 'text-orange-400' : 'text-text-muted')}>
          {isExpiringSoon ? '即将到期' : `至${new Date(expiresAt).toLocaleDateString('zh-CN')}`}
        </span>
      )}
    </span>
  )
}
