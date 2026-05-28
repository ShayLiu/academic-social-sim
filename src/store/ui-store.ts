'use client'

import { create } from 'zustand'
import type { MineTriggerEvent, UrgencyAlert, GamePhase } from '@/types/game'

interface UIState {
  // 地雷触发效果
  activeMineEvent: MineTriggerEvent | null
  isMineAnimating: boolean

  // urgency 催促提示
  urgencyAlerts: UrgencyAlert[]

  // 信息暴露效果
  isInfoExposing: boolean
  exposedInfoId: string | null

  // 面板状态
  activePanel: 'threads' | 'dialog' | 'intel'
  isIntelPanelOpen: boolean

  // 游戏阶段
  gamePhase: GamePhase

  // 音效
  soundEnabled: boolean

  // Actions
  triggerMineEffect: (event: MineTriggerEvent) => void
  clearMineEffect: () => void
  addUrgencyAlert: (alert: UrgencyAlert) => void
  removeUrgencyAlert: (threadId: string) => void
  clearUrgencyAlerts: () => void
  triggerInfoExposure: (infoId: string) => void
  clearInfoExposure: () => void
  setActivePanel: (panel: 'threads' | 'dialog' | 'intel') => void
  toggleIntelPanel: () => void
  setGamePhase: (phase: GamePhase) => void
  toggleSound: () => void
  reset: () => void
}

const initialState = {
  activeMineEvent: null,
  isMineAnimating: false,
  urgencyAlerts: [],
  isInfoExposing: false,
  exposedInfoId: null,
  activePanel: 'dialog' as const,
  isIntelPanelOpen: true,
  gamePhase: 'idle' as GamePhase,
  soundEnabled: true,
}

export const useUIStore = create<UIState>((set) => ({
  ...initialState,

  triggerMineEffect: (event) => {
    set({ activeMineEvent: event, isMineAnimating: true })
    setTimeout(() => {
      set({ isMineAnimating: false })
    }, 2600)
  },

  clearMineEffect: () => set({ activeMineEvent: null, isMineAnimating: false }),

  addUrgencyAlert: (alert) =>
    set((state) => ({
      urgencyAlerts: [
        ...state.urgencyAlerts.filter((a) => a.threadId !== alert.threadId),
        alert,
      ],
    })),

  removeUrgencyAlert: (threadId) =>
    set((state) => ({
      urgencyAlerts: state.urgencyAlerts.filter((a) => a.threadId !== threadId),
    })),

  clearUrgencyAlerts: () => set({ urgencyAlerts: [] }),

  triggerInfoExposure: (infoId) => {
    set({ isInfoExposing: true, exposedInfoId: infoId })
    setTimeout(() => {
      set({ isInfoExposing: false, exposedInfoId: null })
    }, 2000)
  },

  clearInfoExposure: () => set({ isInfoExposing: false, exposedInfoId: null }),

  setActivePanel: (panel) => set({ activePanel: panel }),
  toggleIntelPanel: () => set((s) => ({ isIntelPanelOpen: !s.isIntelPanelOpen })),
  setGamePhase: (phase) => set({ gamePhase: phase }),
  toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
  reset: () => set(initialState),
}))
