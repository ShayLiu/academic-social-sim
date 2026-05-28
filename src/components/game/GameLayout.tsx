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
}: GameLayoutProps) {
  return (
    <div className="h-screen w-screen bg-surface flex flex-col overflow-hidden">
      {/* 顶部状态栏 */}
      <header className="flex-shrink-0 h-12 border-b border-surface-lighter bg-surface-light px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-xs px-2 py-0.5 rounded bg-academic-blue/20 text-academic-blue-light font-medium">
            {PHASE_LABELS[phase]}
          </span>
          <span className="text-sm text-text-primary font-medium">
            {scenarioTitle}
          </span>
        </div>
        <div className="flex items-center gap-4 flex-1 max-w-md mx-8">
          <EnergyBar energy={energy} />
        </div>
        <div className="flex items-center gap-3">
          <GameTimer
            totalSeconds={totalTime}
            elapsedSeconds={elapsedTime}
            isPaused={isPaused}
          />
          <button
            onClick={isPaused ? onResume : onPause}
            className="text-xs px-2 py-1 rounded border border-surface-lighter text-text-secondary hover:bg-surface-lighter transition-colors"
          >
            {isPaused ? '继续' : '暂停'}
          </button>
        </div>
      </header>

      {/* 主游戏区 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧线程列表 */}
        <div className="w-56 flex-shrink-0">
          {threadPanel}
        </div>

        {/* 中央对话区 */}
        <div className="flex-1 flex flex-col border-x border-surface-lighter">
          <div className="flex-1 overflow-hidden">
            {dialogPanel}
          </div>
          <div className="flex-shrink-0 border-t border-surface-lighter p-3 bg-surface-light max-h-[40%] overflow-y-auto">
            {choicePanel}
          </div>
        </div>

        {/* 右侧情报面板 */}
        <div className="w-60 flex-shrink-0">
          {intelPanel}
        </div>
      </div>

      {/* 全屏覆盖层 (地雷效果等) */}
      {overlay}
    </div>
  )
}
