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

export function ChoicePanel({ options, currentEnergy, disabled, onSelect }: ChoicePanelProps) {
  const visibleOptions = options.filter((opt) => {
    if (opt.isEmotionalBreakdown) return currentEnergy <= ENERGY_BREAKDOWN_THRESHOLD
    if (opt.requiredEnergy && currentEnergy < opt.requiredEnergy) return false
    return true
  })

  const getLeftBarColor = (opt: DialogOption) => {
    if (opt.isEmotionalBreakdown) return 'bg-red-500'
    if (opt.triggersMine) return 'bg-mine-gold'
    if (opt.energyCost > 15) return 'bg-orange-500'
    if (opt.energyCost > 8) return 'bg-yellow-500'
    return 'bg-academic-blue'
  }

  const labels = ['A', 'B', 'C', 'D', 'E']

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-text-muted uppercase tracking-wider">选择你的回应</span>
        <span className="text-[10px] text-text-muted font-mono">
          ⚡ {currentEnergy}
        </span>
      </div>
      {visibleOptions.map((opt, idx) => (
        <motion.button
          key={opt.id}
          onClick={() => onSelect(opt.id)}
          disabled={disabled}
          className={cn(
            'w-full text-left rounded-lg border border-surface-lighter/50 transition-all relative overflow-hidden',
            'disabled:opacity-30 disabled:cursor-not-allowed',
            'hover:border-academic-blue/40 hover:bg-surface-lighter/30',
            opt.isEmotionalBreakdown && 'border-red-600/50 hover:border-red-500/60'
          )}
          whileHover={!disabled ? { x: 6 } : undefined}
          whileTap={!disabled ? { scale: 0.98 } : undefined}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.08 }}
        >
          <div className="flex">
            {/* 左侧彩色竖条 */}
            <div className={cn('w-1 flex-shrink-0 rounded-l-lg', getLeftBarColor(opt))} />
            <div className="flex-1 p-3 flex items-start gap-3">
              <span className={cn(
                'flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black',
                opt.isEmotionalBreakdown
                  ? 'bg-red-600/30 text-red-300'
                  : 'bg-academic-blue/20 text-academic-blue-light'
              )}>
                {labels[idx] || idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary leading-relaxed">{opt.text}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className={cn(
                    'text-[10px] font-mono',
                    opt.energyCost > 15 ? 'text-orange-400' : opt.energyCost > 8 ? 'text-yellow-400' : 'text-text-muted'
                  )}>
                    ⚡-{opt.energyCost}
                  </span>
                  {opt.consistencyImpact < 0 && (
                    <span className="text-[10px] font-mono text-red-400">🎭{opt.consistencyImpact}</span>
                  )}
                  {opt.consistencyImpact > 0 && (
                    <span className="text-[10px] font-mono text-emerald-400">🎭+{opt.consistencyImpact}</span>
                  )}
                  {opt.riskTag && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-900/40 text-red-300 border border-red-800/30">
                      ⚠ {opt.riskTag}
                    </span>
                  )}
                  {opt.isEmotionalBreakdown && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-900/50 text-red-300 animate-pulse-danger">
                      💥 情绪失控
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.button>
      ))}
      {visibleOptions.length === 0 && (
        <div className="text-center py-8 text-text-muted text-sm">没有可用的选项...</div>
      )}
    </div>
  )
}
