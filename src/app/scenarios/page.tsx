'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getScenarioList } from '@/data/scenarios'
import { PHASE_LABELS } from '@/types/game'
import { DIFFICULTY_LABELS, DIFFICULTY_COLORS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { AcademicPhase } from '@/types/game'

function ScenarioListInner() {
  const searchParams = useSearchParams()
  const phaseFilter = searchParams.get('phase') as AcademicPhase | null
  const scenarios = getScenarioList()

  const filtered = phaseFilter
    ? scenarios.filter((s) => s.phase === phaseFilter)
    : scenarios

  const phases: AcademicPhase[] = ['undergrad', 'masters', 'phd', 'postdoc', 'faculty']

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 返回 */}
        <Link
          href="/"
          className="text-sm text-text-muted hover:text-text-secondary transition-colors"
        >
          &larr; 返回首页
        </Link>

        <h1 className="text-2xl font-bold text-text-primary mt-4 mb-2">
          场景选择
        </h1>
        <p className="text-sm text-text-muted mb-6">
          每个场景都是一场没有正确答案的修罗试炼
        </p>

        {/* 阶段筛选 */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <Link
            href="/scenarios"
            className={cn(
              'text-xs px-3 py-1.5 rounded-full border transition-colors',
              !phaseFilter
                ? 'border-academic-blue bg-academic-blue/20 text-academic-blue-light'
                : 'border-surface-lighter text-text-muted hover:text-text-secondary'
            )}
          >
            全部
          </Link>
          {phases.map((p) => (
            <Link
              key={p}
              href={`/scenarios?phase=${p}`}
              className={cn(
                'text-xs px-3 py-1.5 rounded-full border transition-colors',
                phaseFilter === p
                  ? 'border-academic-blue bg-academic-blue/20 text-academic-blue-light'
                  : 'border-surface-lighter text-text-muted hover:text-text-secondary'
              )}
            >
              {PHASE_LABELS[p]}
            </Link>
          ))}
        </div>

        {/* 场景列表 */}
        <div className="space-y-4">
          {filtered.map((scenario, idx) => (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={`/play/${scenario.id}`}
                className="block p-5 rounded-lg border border-surface-lighter bg-surface-light hover:bg-surface-lighter hover:border-academic-blue/20 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-1.5 py-0.5 rounded bg-surface-lighter text-text-muted">
                        {PHASE_LABELS[scenario.phase]}
                      </span>
                      <span className={cn('text-xs', DIFFICULTY_COLORS[scenario.difficulty])}>
                        {DIFFICULTY_LABELS[scenario.difficulty]}
                      </span>
                    </div>
                    <h3 className="text-base font-medium text-text-primary group-hover:text-academic-blue-light transition-colors">
                      {scenario.title}
                    </h3>
                    <p className="text-xs text-text-secondary mt-0.5">
                      {scenario.subtitle}
                    </p>
                    <p className="text-xs text-text-muted mt-2">
                      {scenario.description}
                    </p>
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <span className="text-xs text-text-muted">
                      ~{scenario.estimatedMinutes}分钟
                    </span>
                    <p className="text-xs text-text-muted mt-1">
                      扮演: {scenario.playerRole}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            该阶段暂无可用场景
          </div>
        )}
      </div>
    </div>
  )
}

export default function ScenariosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center text-text-muted">加载中...</div>}>
      <ScenarioListInner />
    </Suspense>
  )
}
