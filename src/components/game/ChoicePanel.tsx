'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { DialogOption } from '@/types/game'
import { ENERGY_BREAKDOWN_THRESHOLD } from '@/lib/constants'

interface ChoicePanelProps {
  options: DialogOption[]
  currentEnergy: number
  disabled: boolean
  onSelect: (optionId: string) => void
}

export function ChoicePanel({
  options,
  currentEnergy,
  disabled,
  onSelect,
}: ChoicePanelProps) {
  const visibleOptions = options.filter((opt) => {
    if (opt.isEmotionalBreakdown) {
      return currentEnergy <= ENERGY_BREAKDOWN_THRESHOLD
    }
    if (opt.requiredEnergy && currentEnergy < opt.requiredEnergy) {
      return false
    }
    return true
  })

  const getOptionStyle = (opt: DialogOption) => {
    if (opt.isEmotionalBreakdown) {
      return 'border-red-600/50 bg-red-950/30 hover:bg-red-950/50 text-red-300'
    }
    if (opt.triggersMine) {
      return 'border-mine-gold/30 bg-surface-light hover:bg-surface-lighter'
    }
    if (opt.energyCost > 20) {
      return 'border-orange-500/30 bg-surface-light hover:bg-surface-lighter'
    }
    return 'border-surface-lighter bg-surface-light hover:bg-surface-lighter'
  }

  const labels = ['A', 'B', 'C', 'D', 'E']

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-text-muted">选择你的回应</span>
        <span className="text-xs text-text-muted">
          当前能量: {currentEnergy}
        </span>
      </div>
      {visibleOptions.map((opt, idx) => (
        <motion.button
          key={opt.id}
          onClick={() => onSelect(opt.id)}
          disabled={disabled}
          className={cn(
            'w-full text-left p-3 rounded-lg border transition-all',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            getOptionStyle(opt)
          )}
          whileHover={!disabled ? { x: 4 } : undefined}
          whileTap={!disabled ? { scale: 0.99 } : undefined}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <div className="flex items-start gap-3">
            <span
              className={cn(
                'flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs font-bold',
                opt.isEmotionalBreakdown
                  ? 'bg-red-600/50 text-red-200'
                  : 'bg-academic-blue/50 text-academic-blue-light'
              )}
            >
              {labels[idx] || idx + 1}
            </span>
            <div className="flex-1">
              <p className="text-sm text-text-primary">{opt.text}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <span
                  className={cn(
                    'text-xs',
                    opt.energyCost > 20
                      ? 'text-orange-400'
                      : opt.energyCost > 10
                      ? 'text-yellow-400'
                      : 'text-text-muted'
                  )}
                >
                  -{opt.energyCost} 能量
                </span>
                {opt.consistencyImpact < 0 && (
                  <span className="text-xs text-red-400">
                    一致性 {opt.consistencyImpact}
                  </span>
                )}
                {opt.riskTag && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-red-900/50 text-red-300">
                    {opt.riskTag}
                  </span>
                )}
                {opt.isEmotionalBreakdown && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-red-900/50 text-red-300 animate-pulse-danger">
                    情绪失控
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.button>
      ))}
      {visibleOptions.length === 0 && (
        <div className="text-center py-8 text-text-muted text-sm">
          没有可用的选项...
        </div>
      )}
    </div>
  )
}
