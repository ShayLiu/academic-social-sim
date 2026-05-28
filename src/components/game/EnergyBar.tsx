'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ENERGY_BREAKDOWN_THRESHOLD } from '@/lib/constants'

interface EnergyBarProps {
  energy: number
  maxEnergy?: number
}

export function EnergyBar({ energy, maxEnergy = 100 }: EnergyBarProps) {
  const percentage = Math.max(0, Math.min(100, (energy / maxEnergy) * 100))
  const isCritical = energy <= ENERGY_BREAKDOWN_THRESHOLD
  const isLow = energy <= 50

  const getBarColor = () => {
    if (energy <= 15) return 'bg-red-600'
    if (energy <= ENERGY_BREAKDOWN_THRESHOLD) return 'bg-red-500'
    if (energy <= 50) return 'bg-orange-500'
    if (energy <= 75) return 'bg-yellow-500'
    return 'bg-emerald-500'
  }

  const getLabel = () => {
    if (energy <= 0) return '已宕机'
    if (energy <= 15) return '濒临崩溃'
    if (energy <= ENERGY_BREAKDOWN_THRESHOLD) return '情绪失控'
    if (energy <= 50) return '精疲力竭'
    if (energy <= 75) return '略显疲惫'
    return '状态正常'
  }

  return (
    <div className="flex items-center gap-3 w-full">
      <span className="text-xs text-text-secondary whitespace-nowrap min-w-[4rem]">
        情绪能量
      </span>
      <div className="relative flex-1 h-3 bg-surface-lighter rounded-full overflow-hidden">
        <motion.div
          className={cn(
            'h-full rounded-full transition-colors duration-500',
            getBarColor(),
            isCritical && 'animate-pulse-danger'
          )}
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        {isCritical && (
          <motion.div
            className="absolute inset-0 rounded-full bg-red-500/30"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>
      <span
        className={cn(
          'text-xs font-mono min-w-[3rem] text-right',
          isCritical ? 'text-red-400 animate-heartbeat' : isLow ? 'text-orange-400' : 'text-text-secondary'
        )}
      >
        {energy}/{maxEnergy}
      </span>
      <span
        className={cn(
          'text-xs min-w-[5rem]',
          isCritical ? 'text-red-400' : isLow ? 'text-orange-400' : 'text-text-muted'
        )}
      >
        {getLabel()}
      </span>
    </div>
  )
}
