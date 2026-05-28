'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { MineTriggerEvent } from '@/types/game'
import { MINE_SILENCE_DURATION } from '@/lib/constants'

interface MineTriggerProps {
  event: MineTriggerEvent | null
  isAnimating: boolean
  onComplete: () => void
}

export function MineTrigger({ event, isAnimating, onComplete }: MineTriggerProps) {
  const [phase, setPhase] = useState<'flash' | 'silence' | 'done'>('done')

  useEffect(() => {
    if (!event || !isAnimating) return

    setPhase('flash')

    const flashTimer = setTimeout(() => {
      setPhase('silence')
    }, 600)

    const silenceTimer = setTimeout(() => {
      setPhase('done')
      onComplete()
    }, 600 + MINE_SILENCE_DURATION)

    return () => {
      clearTimeout(flashTimer)
      clearTimeout(silenceTimer)
    }
  }, [event, isAnimating, onComplete])

  if (!event || phase === 'done') return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] pointer-events-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {phase === 'flash' && (
          <motion.div
            className="absolute inset-0 bg-red-600/60 animate-mine-shake"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.4, 0.7, 0.3, 0] }}
            transition={{ duration: 0.6 }}
          />
        )}

        {phase === 'silence' && (
          <motion.div
            className="absolute inset-0 bg-black/80 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-center max-w-md px-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="text-red-500 text-4xl mb-4">
                {event.severity === 3 ? '💥' : event.severity === 2 ? '⚠️' : '❗'}
              </div>
              <p className="text-red-400 text-lg font-medium mb-2">
                社交地雷触发
              </p>
              <p className="text-text-secondary text-sm">
                {event.consequence}
              </p>
              <p className="text-text-muted text-xs mt-4">
                全场陷入安静...
              </p>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
