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

  const getGradient = () => {
    if (energy <= 15) return 'from-red-700 via-red-500 to-red-400'
    if (energy <= ENERGY_BREAKDOWN_THRESHOLD) return 'from-red-600 via-red-500 to-orange-400'
    if (energy <= 50) return 'from-orange-600 via-orange-500 to-yellow-400'
    if (energy <= 75) return 'from-yellow-600 via-yellow-500 to-emerald-400'
    return 'from-emerald-600 via-emerald-500 to-cyan-400'
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
      <span className="text-[10px] text-text-muted whitespace-nowrap uppercase tracking-wider">
        能量
      </span>
      <div className={cn(
        'relative flex-1 h-4 rounded-full overflow-hidden',
        'bg-surface-lighter/50 border border-surface-lighter',
        isCritical && 'animate-heartbeat border-red-500/50'
      )}>
        <motion.div
          className={cn(
            'h-full rounded-full bg-gradient-to-r',
            getGradient(),
          )}
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        {isCritical && (
          <motion.div
            className="absolute inset-0 rounded-full bg-red-500/20"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
        <div className="absolute inset-0 rounded-full" style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)'
        }} />
      </div>
      <span className={cn(
        'text-xs font-mono font-bold min-w-[3rem] text-right',
        isCritical ? 'text-red-400 text-glow-red' : isLow ? 'text-orange-400' : 'text-emerald-400'
      )}>
        {energy}
      </span>
      <span className={cn(
        'text-[10px] min-w-[4rem] hidden sm:block',
        isCritical ? 'text-red-400' : isLow ? 'text-orange-400' : 'text-text-muted'
      )}>
        {getLabel()}
      </span>
    </div>
  )
}
