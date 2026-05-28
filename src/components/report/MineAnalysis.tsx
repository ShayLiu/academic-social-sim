'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { MineDetail } from '@/lib/report/report-generator'

interface MineAnalysisProps {
  minesTriggered: string[]
  minesTotal: number
  mineDetails?: MineDetail[]
}

const severityColors = {
  1: 'text-yellow-400 bg-yellow-950/20 border-yellow-800/30',
  2: 'text-orange-400 bg-orange-950/20 border-orange-800/30',
  3: 'text-red-400 bg-red-950/20 border-red-800/30',
}

const severityLabels = {
  1: '轻微',
  2: '中等',
  3: '严重',
}

export function MineAnalysis({ minesTriggered, minesTotal, mineDetails }: MineAnalysisProps) {
  const avoided = minesTotal - minesTriggered.length
  const triggerRate = minesTotal > 0 ? Math.round((minesTriggered.length / minesTotal) * 100) : 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-text-primary">社交地雷复盘</h4>
        <span className="text-xs text-text-muted">
          触发率: {triggerRate}%
        </span>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-lg bg-red-950/20 border border-red-800/30 text-center">
          <p className="text-2xl font-bold text-red-400">{minesTriggered.length}</p>
          <p className="text-xs text-text-muted mt-1">已触发</p>
        </div>
        <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/30 text-center">
          <p className="text-2xl font-bold text-emerald-400">{avoided}</p>
          <p className="text-xs text-text-muted mt-1">成功避开</p>
        </div>
        <div className="p-3 rounded-lg bg-surface-lighter text-center">
          <p className="text-2xl font-bold text-text-secondary">{minesTotal}</p>
          <p className="text-xs text-text-muted mt-1">地雷总数</p>
        </div>
      </div>

      {/* 进度条 */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-text-muted">
          <span>安全通过</span>
          <span>{100 - triggerRate}%</span>
        </div>
        <div className="h-2 bg-surface-lighter rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${100 - triggerRate}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className={cn(
              'h-full rounded-full',
              triggerRate <= 20 ? 'bg-emerald-500' :
              triggerRate <= 50 ? 'bg-yellow-500' :
              triggerRate <= 75 ? 'bg-orange-500' : 'bg-red-500'
            )}
          />
        </div>
      </div>

      {/* 触发的地雷详情 */}
      {mineDetails && mineDetails.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-text-muted font-medium">触发的地雷详情：</p>
          {mineDetails.map((mine, idx) => (
            <motion.div
              key={mine.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className={cn(
                'p-3 rounded-lg border space-y-1',
                severityColors[mine.severity]
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">💥</span>
                  <span className="text-sm font-medium">{mine.name}</span>
                </div>
                <span className="text-xs px-1.5 py-0.5 rounded bg-black/20">
                  {severityLabels[mine.severity]}
                </span>
              </div>
              <p className="text-xs opacity-80">{mine.description}</p>
              <p className="text-xs opacity-60 italic">后果：{mine.consequence}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* 没有地雷详情时显示简化版 */}
      {(!mineDetails || mineDetails.length === 0) && minesTriggered.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-text-muted font-medium">触发的地雷：</p>
          {minesTriggered.map((mine, idx) => (
            <motion.div
              key={mine}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.2 }}
              className="p-2 rounded bg-red-950/10 border border-red-900/20 text-xs text-red-300"
            >
              💥 {mine}
            </motion.div>
          ))}
        </div>
      )}

      {/* 完美避雷提示 */}
      {minesTriggered.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-800/30 text-center"
        >
          <p className="text-lg mb-1">🎯</p>
          <p className="text-sm text-emerald-400 font-medium">完美避雷！</p>
          <p className="text-xs text-emerald-300/70 mt-1">
            你成功识别并绕开了所有社交地雷，展现了出色的社交敏感度
          </p>
        </motion.div>
      )}

      {/* 改进提示 */}
      {minesTriggered.length > 0 && (
        <div className="p-3 rounded-lg bg-surface-lighter border border-surface-lighter text-xs text-text-secondary">
          <p className="font-medium text-text-primary mb-1">💡 避雷提示</p>
          <p>
            地雷通常隐藏在敏感话题、不当提问或过于直接的表态中。
            观察角色的禁忌话题和隐藏目的，可以帮助你预判风险。
          </p>
        </div>
      )}
    </div>
  )
}
