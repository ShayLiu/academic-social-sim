'use client'

import { create } from 'zustand'
import type { SubscriptionTier } from '@/types/payment'

interface UserState {
  isLoggedIn: boolean
  userId: string | null
  displayName: string | null
  email: string | null
  avatarUrl: string | null
  tier: SubscriptionTier
  proExpiresAt: string | null
  monthlyPlaysUsed: number
  totalSessions: number

  setUser: (user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }) => void
  setProfile: (profile: {
    subscription_tier: SubscriptionTier
    pro_expires_at: string | null
    monthly_plays_used: number
    total_sessions: number
  }) => void
  clearUser: () => void
  isPro: () => boolean
}

export const useUserStore = create<UserState>((set, get) => ({
  isLoggedIn: false,
  userId: null,
  displayName: null,
  email: null,
  avatarUrl: null,
  tier: 'free',
  proExpiresAt: null,
  monthlyPlaysUsed: 0,
  totalSessions: 0,

  setUser: (user) =>
    set({
      isLoggedIn: true,
      userId: user.id,
      displayName: user.name ?? null,
      email: user.email ?? null,
      avatarUrl: user.image ?? null,
    }),

  setProfile: (profile) =>
    set({
      tier: profile.subscription_tier,
      proExpiresAt: profile.pro_expires_at,
      monthlyPlaysUsed: profile.monthly_plays_used,
      totalSessions: profile.total_sessions,
    }),

  clearUser: () =>
    set({
      isLoggedIn: false,
      userId: null,
      displayName: null,
      email: null,
      avatarUrl: null,
      tier: 'free',
      proExpiresAt: null,
      monthlyPlaysUsed: 0,
      totalSessions: 0,
    }),

  isPro: () => {
    const { tier, proExpiresAt } = get()
    if (tier !== 'pro') return false
    if (!proExpiresAt) return true
    return new Date(proExpiresAt) > new Date()
  },
}))
