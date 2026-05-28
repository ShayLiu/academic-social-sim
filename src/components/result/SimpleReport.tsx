'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ScenarioResult } from '@/types/game'

interface SimpleReportProps {
  result: ScenarioResult
}

export function SimpleReport({ result }: SimpleReportProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400'
    if (score >= 60) return 'text-yellow-400'
    if (score >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return '游刃有余'
    if (score >= 60) return '勉强幸存'
    if (score >= 40) return '遍体鳞伤'
    return '社死现场'
  }

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-emerald-500/20 to-emerald-600/5'
    if (score >= 60) return 'from-yellow-500/20 to-yellow-600/5'
    if (score >= 40) return 'from-orange-500/20 to-orange-600/5'
    return 'from-red-500/20 to-red-600/5'
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* 结局名称 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-xs text-text-muted mb-2">结局</p>
        <h2 className="text-xl text-text-primary font-bold">
          {result.ending.name}
        </h2>
        <p className="text-sm text-text-secondary mt-2 leading-relaxed">
          {result.ending.description}
        </p>
      </motion.div>

      {/* 生存分数 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className={cn(
          'text-center py-8 rounded-xl bg-gradient-to-b',
          getScoreGradient(result.survivalScore)
        )}
      >
        <p className="text-xs text-text-muted mb-2">生存分数</p>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={cn('text-6xl font-bold font-mono block', getScoreColor(result.survivalScore))}
        >
          {result.survivalScore}
        </motion.span>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={cn('text-sm mt-2 font-medium', getScoreColor(result.survivalScore))}
        >
          {getScoreLabel(result.survivalScore)}
        </motion.p>
      </motion.div>

      {/* 一句话总结 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center p-4 rounded-lg border border-surface-lighter bg-surface-light"
      >
        <p className="text-xs text-text-muted mb-2">印象总结</p>
        <p className="text-sm text-text-primary italic leading-relaxed">
          &ldquo;{result.impressionSummary}&rdquo;
        </p>
      </motion.div>

      {/* 关键数据 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="grid grid-cols-3 gap-3"
      >
        <div className="text-center p-4 rounded-lg bg-surface-light border border-surface-lighter">
          <p className="text-xs text-text-muted mb-1">地雷触发</p>
          <p className={cn(
            'text-xl font-mono font-bold',
            result.minesTriggered > 0 ? 'text-red-400' : 'text-emerald-400'
          )}>
            {result.minesTriggered}/{result.minesTotal}
          </p>
          <p className="text-[10px] text-text-muted mt-0.5">
            {result.minesTriggered === 0 ? '完美避雷' : `${Math.round((1 - result.minesTriggered / result.minesTotal) * 100)}% 安全`}
          </p>
        </div>
        <div className="text-center p-4 rounded-lg bg-surface-light border border-surface-lighter">
          <p className="text-xs text-text-muted mb-1">最终一致性</p>
          <p className={cn(
            'text-xl font-mono font-bold',
            result.consistencyFinal < 50 ? 'text-red-400' : result.consistencyFinal < 70 ? 'text-yellow-400' : 'text-text-primary'
          )}>
            {result.consistencyFinal}
          </p>
          <p className="text-[10px] text-text-muted mt-0.5">
            {result.consistencyFinal >= 70 ? '立场坚定' : result.consistencyFinal >= 50 ? '略有动摇' : '自相矛盾'}
          </p>
        </div>
        <div className="text-center p-4 rounded-lg bg-surface-light border border-surface-lighter">
          <p className="text-xs text-text-muted mb-1">剩余能量</p>
          <p className={cn(
            'text-xl font-mono font-bold',
            result.energyFinal < 30 ? 'text-red-400' : result.energyFinal < 60 ? 'text-yellow-400' : 'text-emerald-400'
          )}>
            {result.energyFinal}
          </p>
          <p className="text-[10px] text-text-muted mt-0.5">
            {result.energyFinal >= 60 ? '游刃有余' : result.energyFinal >= 30 ? '精疲力竭' : '濒临崩溃'}
          </p>
        </div>
      </motion.div>

      {/* 游戏时长 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="text-center"
      >
        <p className="text-xs text-text-muted">
          游戏时长: {Math.floor(result.timeSpent / 60)}分{result.timeSpent % 60}秒
        </p>
      </motion.div>

      {/* 解锁完整报告提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center p-5 rounded-lg border border-dashed border-academic-blue/30 bg-academic-blue/5"
      >
        <p className="text-sm text-text-secondary mb-2">
          解锁完整诊断报告
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-xs text-text-muted mb-3">
          <span className="px-2 py-0.5 rounded bg-surface-lighter">📊 六维雷达图</span>
          <span className="px-2 py-0.5 rounded bg-surface-lighter">⏱️ 决策时间线</span>
          <span className="px-2 py-0.5 rounded bg-surface-lighter">💥 地雷详细分析</span>
          <span className="px-2 py-0.5 rounded bg-surface-lighter">💡 改进建议</span>
        </div>
        <p className="text-xs text-academic-blue-light">
          ¥9.9 单次解锁 · 即将推出
        </p>
      </motion.div>
    </div>
  )
}
