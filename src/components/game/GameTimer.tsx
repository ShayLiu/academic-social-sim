'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface GameTimerProps {
  totalSeconds: number
  elapsedSeconds: number
  isPaused: boolean
}

export function GameTimer({ totalSeconds, elapsedSeconds, isPaused }: GameTimerProps) {
  const remaining = Math.max(0, totalSeconds - elapsedSeconds)
  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60
  const percentage = (remaining / totalSeconds) * 100
  const isUrgent = percentage < 20

  return (
    <div className="flex items-center gap-2">
      {isPaused && (
        <span className="text-xs px-1.5 py-0.5 rounded bg-yellow-900/50 text-yellow-400">
          暂停
        </span>
      )}
      <span
        className={cn(
          'font-mono text-sm',
          isUrgent ? 'text-red-400 animate-pulse-danger' : 'text-text-secondary'
        )}
      >
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  )
}
