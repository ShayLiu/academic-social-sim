'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ThreadStatus } from '@/types/game'
import {
  URGENCY_WARN_THRESHOLD,
  URGENCY_ALERT_THRESHOLD,
  URGENCY_CRITICAL_THRESHOLD,
} from '@/lib/constants'

interface ThreadCardProps {
  threadId: string
  characterName: string
  characterAvatar: string
  label: string
  urgency: number
  status: ThreadStatus
  lastMessage?: string
  isActive: boolean
  onClick: () => void
}

export function ThreadCard({
  characterName,
  label,
  urgency,
  status,
  lastMessage,
  isActive,
  onClick,
}: ThreadCardProps) {
  const getUrgencyColor = () => {
    if (urgency >= URGENCY_CRITICAL_THRESHOLD) return 'border-red-600 bg-red-950/40'
    if (urgency >= URGENCY_ALERT_THRESHOLD) return 'border-red-500 bg-red-950/20'
    if (urgency >= URGENCY_WARN_THRESHOLD) return 'border-yellow-500 bg-yellow-950/20'
    return 'border-surface-lighter bg-surface-light'
  }

  const getDotColor = () => {
    if (status === 'resolved') return 'bg-gray-500'
    if (status === 'deteriorated') return 'bg-red-600'
    if (urgency >= URGENCY_CRITICAL_THRESHOLD) return 'bg-red-500'
    if (urgency >= URGENCY_ALERT_THRESHOLD) return 'bg-red-400'
    if (urgency >= URGENCY_WARN_THRESHOLD) return 'bg-yellow-400'
    return 'bg-emerald-400'
  }

  const isEscalated = urgency >= URGENCY_ALERT_THRESHOLD
  const isDeteriorated = status === 'deteriorated'
  const isResolved = status === 'resolved'

  return (
    <motion.button
      onClick={onClick}
      disabled={isResolved}
      className={cn(
        'w-full text-left p-3 rounded-lg border transition-all duration-200',
        'hover:brightness-110 cursor-pointer',
        getUrgencyColor(),
        isActive && 'ring-2 ring-academic-blue-light',
        isResolved && 'opacity-40 cursor-not-allowed',
        isEscalated && !isResolved && 'animate-urgency-pulse'
      )}
      whileHover={!isResolved ? { scale: 1.02 } : undefined}
      whileTap={!isResolved ? { scale: 0.98 } : undefined}
    >
      <div className="flex items-start gap-2">
        <div className="relative mt-1">
          <div className={cn('w-2.5 h-2.5 rounded-full', getDotColor())} />
          {isEscalated && !isResolved && (
            <motion.div
              className="absolute inset-0 rounded-full bg-red-500"
              animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-primary truncate">
              {characterName}
            </span>
            {!isResolved && (
              <span
                className={cn(
                  'text-xs font-mono ml-2',
                  urgency >= URGENCY_ALERT_THRESHOLD
                    ? 'text-red-400'
                    : urgency >= URGENCY_WARN_THRESHOLD
                    ? 'text-yellow-400'
                    : 'text-text-muted'
                )}
              >
                {Math.round(urgency)}
              </span>
            )}
          </div>
          <p className="text-xs text-text-muted mt-0.5 truncate">{label}</p>
          {lastMessage && (
            <p
              className={cn(
                'text-xs mt-1 truncate',
                isDeteriorated ? 'text-red-400' : 'text-text-secondary'
              )}
            >
              {lastMessage}
            </p>
          )}
          {isDeteriorated && (
            <span className="text-xs text-red-500 font-medium mt-1 block">
              已恶化
            </span>
          )}
        </div>
      </div>
    </motion.button>
  )
}
