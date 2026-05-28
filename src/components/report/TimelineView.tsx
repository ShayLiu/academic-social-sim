'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReportEvent } from '@/lib/report/report-generator'

interface TimelineViewProps {
  events: ReportEvent[]
}

const typeIcons: Record<string, string> = {
  choice: '🎯',
  mine: '💥',
  info_exposed: '🔓',
  urgency_alert: '⏰',
  attitude_change: '😤',
  contradiction: '⚡',
}

const typeColors: Record<string, string> = {
  choice: 'border-academic-blue/50',
  mine: 'border-red-500/50',
  info_exposed: 'border-orange-500/50',
  urgency_alert: 'border-yellow-500/50',
  attitude_change: 'border-purple-500/50',
  contradiction: 'border-pink-500/50',
}

const severityBg: Record<string, string> = {
  low: 'bg-surface-light',
  medium: 'bg-orange-950/10',
  high: 'bg-red-950/20',
}

const typeLabels: Record<string, string> = {
  choice: '关键决策',
  mine: '地雷触发',
  info_exposed: '信息暴露',
  urgency_alert: '紧急提醒',
  attitude_change: '态度变化',
  contradiction: '立场矛盾',
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function TimelineView({ events }: TimelineViewProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-text-muted text-sm">
        <p className="text-2xl mb-2">📋</p>
        <p>本局没有关键事件记录</p>
        <p className="text-xs mt-1 opacity-60">这可能是因为游戏结束得太快</p>
      </div>
    )
  }

  // 按时间排序并分组
  const sortedEvents = [...events].sort((a, b) => a.timestamp - b.timestamp)

  // 统计各类型事件数量
  const eventCounts = events.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-4">
      {/* 事件统计 */}
      <div className="flex flex-wrap gap-2 pb-3 border-b border-surface-lighter">
        {Object.entries(eventCounts).map(([type, count]) => (
          <div
            key={type}
            className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-surface-lighter"
          >
            <span>{typeIcons[type] || '📌'}</span>
            <span className="text-text-muted">{typeLabels[type] || type}</span>
            <span className="text-text-primary font-medium">{count}</span>
          </div>
        ))}
      </div>

      {/* 时间线 */}
      <div className="relative">
        {/* 时间轴线 */}
        <div className="absolute left-[14px] top-0 bottom-0 w-0.5 bg-surface-lighter" />

        <div className="space-y-3">
          {sortedEvents.map((event, idx) => (
            <motion.div
              key={`${event.type}-${idx}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative flex gap-3"
            >
              {/* 图标 */}
              <div
                className={cn(
                  'relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-sm',
                  event.severity === 'high' ? 'bg-red-950/50' :
                  event.severity === 'medium' ? 'bg-orange-950/50' : 'bg-surface-light'
                )}
              >
                {typeIcons[event.type] || '📌'}
              </div>

              {/* 内容 */}
              <div
                className={cn(
                  'flex-1 pb-3 border-l-2 pl-3',
                  typeColors[event.type] || 'border-surface-lighter'
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-text-muted">
                    {formatTime(event.timestamp)}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-surface-lighter text-text-secondary">
                    {typeLabels[event.type] || event.type}
                  </span>
                  {event.severity === 'high' && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-red-950/50 text-red-400">
                      高危
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-primary">{event.description}</p>
                <p className="text-xs text-text-muted mt-1 italic">
                  → {event.impact}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 时间线说明 */}
      <div className="pt-3 border-t border-surface-lighter">
        <p className="text-xs text-text-muted text-center">
          时间线展示了本局游戏中的关键事件，按发生时间排序
        </p>
      </div>
    </div>
  )
}
