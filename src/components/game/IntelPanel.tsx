'use client'

import { cn } from '@/lib/utils'
import type { KnowledgeItem, InfoVisibility } from '@/types/game'
import { motion, AnimatePresence } from 'framer-motion'
import { INFO_EXPOSE_WARNING_TIME } from '@/lib/constants'

interface IntelPanelProps {
  knowledgeItems: KnowledgeItem[]
  exposedInfoIds: string[]
  minesTriggered: number
  minesTotal: number
  consistency: number
  isOpen: boolean
}

const visibilityLabels: Record<InfoVisibility, string> = {
  knownToUser: '已知情报',
  knownToUserButHidden: '你知道但未表露',
  knownToOthersButNotUser: '未知',
  aboutToExpose: '即将暴露',
}

export function IntelPanel({
  knowledgeItems,
  exposedInfoIds,
  minesTriggered,
  minesTotal,
  isOpen,
}: IntelPanelProps) {
  if (!isOpen) return null

  const visibleItems = knowledgeItems.filter(
    (item) =>
      item.visibility === 'knownToUser' ||
      item.visibility === 'knownToUserButHidden' ||
      item.visibility === 'aboutToExpose'
  )

  const hiddenCount = knowledgeItems.filter(
    (item) => item.visibility === 'knownToOthersButNotUser'
  ).length

  return (
    <div className="h-full flex flex-col bg-surface border-l border-surface-lighter">
      <div className="px-3 py-2 border-b border-surface-lighter">
        <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider">
          情报面板
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3">
        {/* 地雷状态 */}
        <div className="space-y-1">
          <span className="text-[10px] text-text-muted uppercase tracking-wider">
            社交地雷
          </span>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: minesTotal }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-2 h-2 rounded-full',
                    i < minesTriggered ? 'bg-red-500' : 'bg-surface-lighter'
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-text-muted">
              {minesTriggered}/{minesTotal} 已触发
            </span>
          </div>
        </div>

        {/* 已知情报 */}
        <div className="space-y-1.5">
          <span className="text-[10px] text-text-muted uppercase tracking-wider">
            已知情报 ({visibleItems.length})
          </span>
          <AnimatePresence>
            {visibleItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={cn(
                  'text-xs p-2 rounded border',
                  item.visibility === 'knownToUser' &&
                    'border-academic-blue/30 bg-academic-blue/10 text-text-primary',
                  item.visibility === 'knownToUserButHidden' &&
                    'border-gray-600 bg-gray-900/30 text-text-muted italic',
                  item.visibility === 'aboutToExpose' &&
                    'border-orange-500/50 bg-orange-950/20 text-orange-300 animate-pulse-danger',
                  exposedInfoIds.includes(item.id) &&
                    'border-red-500/50 bg-red-950/20 text-red-300'
                )}
              >
                <div className="flex items-start justify-between gap-1">
                  <span>{item.content}</span>
                  <span
                    className={cn(
                      'text-[10px] whitespace-nowrap px-1 py-0.5 rounded',
                      item.visibility === 'aboutToExpose'
                        ? 'bg-orange-900/50 text-orange-400'
                        : item.visibility === 'knownToUserButHidden'
                        ? 'bg-gray-800 text-gray-400'
                        : 'bg-academic-blue/20 text-academic-blue-light'
                    )}
                  >
                    {visibilityLabels[item.visibility]}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 隐藏情报计数 */}
        {hiddenCount > 0 && (
          <div className="text-xs text-text-muted p-2 rounded border border-dashed border-surface-lighter text-center">
            还有 {hiddenCount} 条你不知道的情报
          </div>
        )}
      </div>
    </div>
  )
}
