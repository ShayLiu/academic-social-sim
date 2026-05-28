'use client'

import { motion } from 'framer-motion'
import { ReviewCard } from './ReviewCard'
import type { BehindEvaluation } from '@/types/game'

interface ReviewListProps {
  evaluations: BehindEvaluation[]
}

export function ReviewList({ evaluations }: ReviewListProps) {
  if (!evaluations || evaluations.length === 0) {
    return (
      <div className="text-center py-8 text-text-muted text-sm">
        <p className="text-2xl mb-2">🔇</p>
        <p>没有收集到身后评价</p>
        <p className="text-xs mt-1 opacity-60">可能游戏结束得太快</p>
      </div>
    )
  }

  // 按语气分组
  const groupedEvaluations = {
    positive: evaluations.filter(e => e.tone === 'positive'),
    neutral: evaluations.filter(e => e.tone === 'neutral'),
    sarcastic: evaluations.filter(e => e.tone === 'sarcastic'),
    negative: evaluations.filter(e => e.tone === 'negative'),
  }

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <p className="text-lg mb-1">💬</p>
        <h3 className="text-lg text-text-primary font-medium">身后评价</h3>
        <p className="text-xs text-text-muted mt-1">
          你离开后，他们是这么说的...
        </p>
      </motion.div>

      {/* 语气统计 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-3 flex-wrap"
      >
        {groupedEvaluations.positive.length > 0 && (
          <span className="text-xs px-2 py-1 rounded bg-emerald-950/30 text-emerald-400 border border-emerald-800/30">
            😊 好评 {groupedEvaluations.positive.length}
          </span>
        )}
        {groupedEvaluations.neutral.length > 0 && (
          <span className="text-xs px-2 py-1 rounded bg-gray-800/30 text-gray-400 border border-gray-700/30">
            😐 中立 {groupedEvaluations.neutral.length}
          </span>
        )}
        {groupedEvaluations.sarcastic.length > 0 && (
          <span className="text-xs px-2 py-1 rounded bg-yellow-950/30 text-yellow-400 border border-yellow-800/30">
            😏 阴阳 {groupedEvaluations.sarcastic.length}
          </span>
        )}
        {groupedEvaluations.negative.length > 0 && (
          <span className="text-xs px-2 py-1 rounded bg-red-950/30 text-red-400 border border-red-800/30">
            😤 差评 {groupedEvaluations.negative.length}
          </span>
        )}
      </motion.div>

      {/* 评价列表 */}
      <div className="space-y-4 mt-6">
        {evaluations.map((evaluation, index) => (
          <ReviewCard
            key={`${evaluation.characterId}-${index}`}
            evaluation={evaluation}
            delay={index * 1500}
          />
        ))}
      </div>

      {/* 底部提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: evaluations.length * 1.5 + 0.5 }}
        className="text-center pt-6 border-t border-surface-lighter mt-6"
      >
        <p className="text-xs text-text-muted">
          身后评价反映了角色们对你的真实看法
        </p>
        <p className="text-xs text-text-muted mt-1 opacity-60">
          每个角色都有自己的立场和目的，评价不一定代表客观事实
        </p>
      </motion.div>
    </div>
  )
}
