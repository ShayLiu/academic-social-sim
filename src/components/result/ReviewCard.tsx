'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { BehindEvaluation } from '@/types/game'

interface ReviewCardProps {
  evaluation: BehindEvaluation
  delay?: number
}

const toneStyles = {
  positive: 'border-emerald-800/50 bg-emerald-950/10 hover:bg-emerald-950/20',
  neutral: 'border-gray-700/50 bg-gray-900/20 hover:bg-gray-900/30',
  negative: 'border-red-800/50 bg-red-950/10 hover:bg-red-950/20',
  sarcastic: 'border-yellow-800/50 bg-yellow-950/10 hover:bg-yellow-950/20',
}

const toneIcons = {
  positive: '😊',
  neutral: '😐',
  negative: '😤',
  sarcastic: '😏',
}

const toneLabels = {
  positive: '正面',
  neutral: '中立',
  negative: '负面',
  sarcastic: '阴阳',
}

export function ReviewCard({ evaluation, delay = 0 }: ReviewCardProps) {
  const [displayText, setDisplayText] = useState('')
  const [isRevealed, setIsRevealed] = useState(false)
  const [showRevealedInfo, setShowRevealedInfo] = useState(false)

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setIsRevealed(true)
      let index = 0
      const interval = setInterval(() => {
        setDisplayText(evaluation.content.slice(0, index + 1))
        index++
        if (index >= evaluation.content.length) {
          clearInterval(interval)
          // 延迟显示隐藏信息
          if (evaluation.revealedInfo) {
            setTimeout(() => setShowRevealedInfo(true), 800)
          }
        }
      }, 40)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(startDelay)
  }, [evaluation.content, evaluation.revealedInfo, delay])

  if (!isRevealed) {
    return (
      <div className="p-4 rounded-lg border border-surface-lighter bg-surface-light animate-pulse">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-surface-lighter" />
          <div className="h-3 bg-surface-lighter rounded w-24" />
        </div>
        <div className="h-4 bg-surface-lighter rounded w-3/4 mb-2" />
        <div className="h-3 bg-surface-lighter rounded w-1/2" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'p-4 rounded-lg border transition-colors',
        toneStyles[evaluation.tone]
      )}
    >
      {/* 顶部信息 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm">{toneIcons[evaluation.tone]}</span>
          <span className="text-xs text-text-muted">{evaluation.channel}</span>
        </div>
        <span className={cn(
          'text-xs px-1.5 py-0.5 rounded',
          evaluation.tone === 'positive' ? 'bg-emerald-900/30 text-emerald-400' :
          evaluation.tone === 'negative' ? 'bg-red-900/30 text-red-400' :
          evaluation.tone === 'sarcastic' ? 'bg-yellow-900/30 text-yellow-400' :
          'bg-gray-800/30 text-gray-400'
        )}>
          {toneLabels[evaluation.tone]}
        </span>
      </div>

      {/* 角色头像和名字 */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-surface-lighter flex items-center justify-center text-sm text-text-secondary flex-shrink-0 border border-surface-lighter">
          {evaluation.characterName.replace(/^某/, '').charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-text-muted mb-1.5 font-medium">
            {evaluation.characterName}
          </p>
          
          {/* 打字机效果的评论内容 */}
          <p className="text-sm text-text-primary leading-relaxed">
            {displayText}
            {displayText.length < evaluation.content.length && (
              <span className="inline-block w-0.5 h-4 bg-academic-blue ml-0.5 animate-pulse" />
            )}
          </p>

          {/* 隐藏信息揭露 */}
          {evaluation.revealedInfo && showRevealedInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3"
            >
              <div className="p-2.5 rounded bg-orange-950/20 border border-orange-800/30">
                <p className="text-xs text-orange-400 flex items-start gap-1.5">
                  <span className="flex-shrink-0">🔓</span>
                  <span>
                    <span className="font-medium">隐藏信息：</span>
                    {evaluation.revealedInfo}
                  </span>
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
