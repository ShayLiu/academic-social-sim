'use client'

import { cn } from '@/lib/utils'
import { EnergyBar } from './EnergyBar'
import { GameTimer } from './GameTimer'
import { PHASE_LABELS } from '@/types/game'
import type { AcademicPhase } from '@/types/game'

interface GameLayoutProps {
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

export function GameLayout({
  phase, scenarioTitle, energy, totalTime, elapsedTime, isPaused,
  threadPanel, dialogPanel, choicePanel, intelPanel, overlay,
  onPause, onResume,
}: GameLayoutProps) {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* 顶部状态栏 */}
      <header className="flex-shrink-0 h-14 border-b border-surface-lighter/50 bg-surface-light/80 backdrop-blur-sm px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-academic-blue/20 text-academic-blue-light font-bold uppercase tracking-wider border border-academic-blue/20">
            {PHASE_LABELS[phase]}
          </span>
          <span className="text-sm text-text-primary font-bold">{scenarioTitle}</span>
        </div>
        <div className="flex items-center gap-4 flex-1 max-w-lg mx-8">
          <EnergyBar energy={energy} />
        </div>
        <div className="flex items-center gap-3">
          <GameTimer totalSeconds={totalTime} elapsedSeconds={elapsedTime} isPaused={isPaused} />
          <button
            onClick={isPaused ? onResume : onPause}
            className={cn(
              'text-xs px-3 py-1.5 rounded-lg border transition-all',
              isPaused
                ? 'border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10'
                : 'border-surface-lighter text-text-secondary hover:bg-surface-lighter'
            )}
          >
            {isPaused ? '▶ 继续' : '⏸ 暂停'}
          </button>
        </div>
      </header>

      {/* 主游戏区 */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-56 flex-shrink-0">{threadPanel}</div>
        <div className="flex-1 flex flex-col border-x border-surface-lighter/50">
          <div className="flex-1 overflow-hidden">{dialogPanel}</div>
          <div className="flex-shrink-0 border-t border-surface-lighter/50 p-3 bg-surface-light/50 backdrop-blur-sm max-h-[40%] overflow-y-auto">
            {choicePanel}
          </div>
        </div>
        <div className="w-60 flex-shrink-0">{intelPanel}</div>
      </div>

      {overlay}
    </div>
  )
}
