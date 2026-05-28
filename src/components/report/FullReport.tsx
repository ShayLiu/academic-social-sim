'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { RadarChart } from './RadarChart'
import { TimelineView } from './TimelineView'
import { MineAnalysis } from './MineAnalysis'
import { ReviewList } from '../result/ReviewList'
import type { ScenarioResult } from '@/types/game'
import type { ReportData } from '@/lib/report/report-generator'

interface FullReportProps {
  result: ScenarioResult
  reportData: ReportData
  onExportPdf?: () => void
}

export function FullReport({ result, reportData, onExportPdf }: FullReportProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'mines' | 'reviews'>('overview')

  const tabs = [
    { key: 'overview' as const, label: '总览', icon: '📊' },
    { key: 'timeline' as const, label: '决策时间线', icon: '⏱️' },
    { key: 'mines' as const, label: '地雷复盘', icon: '💥' },
    { key: 'reviews' as const, label: '身后评价', icon: '💬' },
  ]

  return (
    <div id="full-report" className="max-w-2xl mx-auto">
      {/* 标题区 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <p className="text-xs text-text-muted">完整诊断报告</p>
        <h2 className="text-lg font-bold text-text-primary mt-1">
          {result.ending.name}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-xs px-2 py-0.5 rounded bg-academic-blue/20 text-academic-blue-light">
            {reportData.personalityTag}
          </span>
          <span className="text-xs text-text-muted">
            生存分: {result.survivalScore}
          </span>
        </div>
      </motion.div>

      {/* 性格描述 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 p-4 rounded-lg bg-surface-light border border-surface-lighter text-center"
      >
        <p className="text-sm text-text-secondary leading-relaxed">
          {reportData.personalityDescription}
        </p>
      </motion.div>

      {/* Tab 切换 */}
      <div className="flex gap-1 mb-6 p-1 bg-surface rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex-1 py-2 text-xs rounded transition-colors flex items-center justify-center gap-1',
              activeTab === tab.key
                ? 'bg-surface-lighter text-text-primary shadow-sm'
                : 'text-text-muted hover:text-text-secondary'
            )}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 内容 */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 雷达图 */}
            <div className="p-4 rounded-lg bg-surface-light border border-surface-lighter">
              <h3 className="text-sm font-medium text-text-primary mb-3">六维能力评估</h3>
              <RadarChart dimensions={reportData.dimensions} />
              <div className="grid grid-cols-3 gap-2 mt-3">
                {Object.entries(reportData.dimensions).map(([key, value]) => {
                  const labels: Record<string, string> = {
                    socialAwareness: '察言观色',
                    rhythmControl: '节奏控制',
                    recoveryAbility: '尴尬恢复',
                    hierarchyNavigation: '层级推进',
                    energyManagement: '能量管理',
                    informationControl: '信息掌控',
                  }
                  return (
                    <div key={key} className="text-center p-2 rounded bg-surface-lighter/50">
                      <p className={cn(
                        'text-lg font-bold font-mono',
                        value >= 70 ? 'text-emerald-400' : value >= 40 ? 'text-yellow-400' : 'text-red-400'
                      )}>
                        {value}
                      </p>
                      <p className="text-[10px] text-text-muted">{labels[key]}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 关键洞察 */}
            {reportData.keyInsights && reportData.keyInsights.length > 0 && (
              <div className="p-4 rounded-lg bg-surface-light border border-surface-lighter">
                <h3 className="text-sm font-medium text-text-primary mb-3">🔍 关键洞察</h3>
                <ul className="space-y-2">
                  {reportData.keyInsights.map((insight, i) => (
                    <li key={i} className="text-xs text-text-secondary flex items-start gap-2">
                      <span className="text-academic-blue-light mt-0.5 flex-shrink-0">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 统计数据 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-surface-light border border-surface-lighter">
                <h4 className="text-xs text-text-muted mb-2">决策统计</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">总决策数</span>
                    <span className="text-text-primary font-mono">{reportData.stats.totalChoices}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">平均能量消耗</span>
                    <span className="text-text-primary font-mono">{reportData.stats.avgEnergyPerChoice}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-surface-light border border-surface-lighter">
                <h4 className="text-xs text-text-muted mb-2">能量统计</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">最终能量</span>
                    <span className={cn(
                      'font-mono',
                      result.energyFinal < 30 ? 'text-red-400' : 'text-text-primary'
                    )}>
                      {result.energyFinal}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">最终一致性</span>
                    <span className={cn(
                      'font-mono',
                      result.consistencyFinal < 50 ? 'text-red-400' : 'text-text-primary'
                    )}>
                      {result.consistencyFinal}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 同阶段对比 */}
            <div className="p-4 rounded-lg bg-surface-light border border-surface-lighter">
              <h3 className="text-sm font-medium text-text-primary mb-3">📈 同阶段对比</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="h-3 bg-surface-lighter rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${reportData.comparisonData.percentile}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-academic-blue rounded-full"
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-text-muted">你的排名</span>
                      <span className="text-xs text-text-primary font-medium">
                        前 {100 - reportData.comparisonData.percentile}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded bg-surface-lighter">
                    <p className="text-xs text-text-muted">你的分数</p>
                    <p className="text-sm font-bold text-text-primary">{reportData.comparisonData.playerScore}</p>
                  </div>
                  <div className="p-2 rounded bg-surface-lighter">
                    <p className="text-xs text-text-muted">平均分数</p>
                    <p className="text-sm font-mono text-text-secondary">{reportData.comparisonData.avgScore}</p>
                  </div>
                  <div className="p-2 rounded bg-surface-lighter">
                    <p className="text-xs text-text-muted">参与人数</p>
                    <p className="text-sm font-mono text-text-secondary">{reportData.comparisonData.totalPlayers}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 改进建议 */}
            {reportData.improvementSuggestions.length > 0 && (
              <div className="p-4 rounded-lg bg-surface-light border border-surface-lighter">
                <h3 className="text-sm font-medium text-text-primary mb-3">💡 改进建议</h3>
                <ul className="space-y-2">
                  {reportData.improvementSuggestions.map((s, i) => (
                    <li key={i} className="text-xs text-text-secondary flex items-start gap-2">
                      <span className="text-academic-blue-light mt-0.5 flex-shrink-0">{i + 1}.</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="p-4 rounded-lg bg-surface-light border border-surface-lighter">
            <h3 className="text-sm font-medium text-text-primary mb-4">关键决策时间线</h3>
            <TimelineView events={reportData.events} />
          </div>
        )}

        {activeTab === 'mines' && (
          <div className="p-4 rounded-lg bg-surface-light border border-surface-lighter">
            <MineAnalysis
              minesTriggered={result.finalPlayerState.triggeredMines}
              minesTotal={result.minesTotal}
              mineDetails={reportData.mineDetails}
            />
          </div>
        )}

        {activeTab === 'reviews' && (
          <ReviewList evaluations={result.behindEvaluations} />
        )}
      </motion.div>

      {/* PDF 导出按钮 */}
      {onExportPdf && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <button
            onClick={onExportPdf}
            className="text-sm px-6 py-2.5 rounded-lg border border-surface-lighter text-text-secondary hover:bg-surface-light hover:border-academic-blue/30 transition-all"
          >
            📄 导出 PDF 报告
          </button>
          <p className="text-[10px] text-text-muted mt-2">
            PDF 报告包含完整诊断内容，方便保存和分享
          </p>
        </motion.div>
      )}
    </div>
  )
}
