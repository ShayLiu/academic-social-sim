'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { EnergyBar } from './EnergyBar'
import { GameTimer } from './GameTimer'
import { PHASE_LABELS } from '@/types/game'
import type { AcademicPhase } from '@/types/game'

interface MobileGameLayoutProps {
  phase: AcademicPhase
  scenarioTitle: string
  energy: number
  totalTime: number
  elapsedTime: number
  isPaused: boolean
  threadPanel: React.ReactNode
  dialogPanel: React.ReactNode
  choicePanel: React.ReactNode
  intelPanel: React.ReactNode
  overlay?: React.ReactNode
  onPause: () => void
  onResume: () => void
}

type MobileTab = 'dialog' | 'threads' | 'intel'

export function MobileGameLayout({
  phase,
  scenarioTitle,
  energy,
  totalTime,
  elapsedTime,
  isPaused,
  threadPanel,
  dialogPanel,
  choicePanel,
  intelPanel,
  overlay,
  onPause,
  onResume,
}: MobileGameLayoutProps) {
  const [activeTab, setActiveTab] = useState<MobileTab>('dialog')

  const tabs: { key: MobileTab; label: string; icon: string }[] = [
    { key: 'threads', label: '线程', icon: '💬' },
    { key: 'dialog', label: '对话', icon: '🎭' },
    { key: 'intel', label: '情报', icon: '🔍' },
  ]

  return (
    <div className="h-screen w-screen bg-surface flex flex-col overflow-hidden">
      {/* 顶部状态栏 - 精简版 */}
      <header className="flex-shrink-0 border-b border-surface-lighter bg-surface-light px-3 py-2">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-academic-blue/20 text-academic-blue-light">
              {PHASE_LABELS[phase]}
            </span>
            <span className="text-xs text-text-primary font-medium truncate max-w-[150px]">
              {scenarioTitle}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <GameTimer totalSeconds={totalTime} elapsedSeconds={elapsedTime} isPaused={isPaused} />
            <button
              onClick={isPaused ? onResume : onPause}
              className="text-[10px] px-1.5 py-0.5 rounded border border-surface-lighter text-text-secondary"
            >
              {isPaused ? '继续' : '暂停'}
            </button>
          </div>
        </div>
        <EnergyBar energy={energy} />
      </header>

      {/* 主内容区 */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'threads' && (
          <div className="h-full overflow-y-auto">{threadPanel}</div>
        )}
        {activeTab === 'dialog' && (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-hidden">{dialogPanel}</div>
            <div className="flex-shrink-0 border-t border-surface-lighter p-2 bg-surface-light max-h-[45%] overflow-y-auto">
              {choicePanel}
            </div>
          </div>
        )}
        {activeTab === 'intel' && (
          <div className="h-full overflow-y-auto">{intelPanel}</div>
        )}
      </div>

      {/* 底部 Tab 栏 */}
      <nav className="flex-shrink-0 border-t border-surface-lighter bg-surface-light">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'flex-1 py-2.5 text-center transition-colors',
                activeTab === tab.key
                  ? 'text-academic-blue-light bg-academic-blue/5'
                  : 'text-text-muted'
              )}
            >
              <span className="text-lg block">{tab.icon}</span>
              <span className="text-[10px]">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {overlay}
    </div>
  )
}
