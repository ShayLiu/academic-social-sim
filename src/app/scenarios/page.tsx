'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getScenarioList } from '@/data/scenarios'
import { PHASE_LABELS } from '@/types/game'
import { cn } from '@/lib/utils'
import type { AcademicPhase } from '@/types/game'

const difficultyConfig: Record<number, { stars: number; color: string; label: string }> = {
  1: { stars: 1, color: 'text-green-400', label: '入门' },
  2: { stars: 2, color: 'text-emerald-400', label: '简单' },
  3: { stars: 3, color: 'text-yellow-400', label: '中等' },
  4: { stars: 4, color: 'text-orange-400', label: '困难' },
  5: { stars: 5, color: 'text-red-400', label: '地狱' },
}

function Stars({ count, color }: { count: number; color: string }) {
  return (
    <span className={cn('text-xs tracking-tight', color)}>
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </span>
  )
}

function ScenarioListInner() {
  const searchParams = useSearchParams()
  const phaseFilter = searchParams.get('phase') as AcademicPhase | null
  const scenarios = getScenarioList()
  const filtered = phaseFilter ? scenarios.filter((s) => s.phase === phaseFilter) : scenarios
  const phases: AcademicPhase[] = ['undergrad', 'masters', 'phd', 'postdoc', 'faculty']

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/" className="text-sm text-text-muted hover:text-academic-blue-light transition-colors">
          &larr; 返回首页
        </Link>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 mb-8"
        >
          <h1 className="text-2xl font-black text-text-primary text-glow">场景选择</h1>
          <p className="text-sm text-text-muted mt-1">每个场景都是一场没有正确答案的修罗试炼</p>
        </motion.div>

        {/* 阶段筛选 */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <Link
            href="/scenarios"
            className={cn(
              'text-xs px-4 py-1.5 rounded-full border transition-all',
              !phaseFilter
                ? 'border-academic-blue bg-academic-blue/20 text-academic-blue-light shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                : 'border-surface-lighter text-text-muted hover:border-surface-lighter hover:text-text-secondary'
            )}
          >
            全部
          </Link>
          {phases.map((p) => (
            <Link
              key={p}
              href={`/scenarios?phase=${p}`}
              className={cn(
                'text-xs px-4 py-1.5 rounded-full border transition-all',
                phaseFilter === p
                  ? 'border-academic-blue bg-academic-blue/20 text-academic-blue-light shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                  : 'border-surface-lighter text-text-muted hover:border-surface-lighter hover:text-text-secondary'
              )}
            >
              {PHASE_LABELS[p]}
            </Link>
          ))}
        </div>

        {/* 场景列表 */}
        <div className="space-y-3">
          {filtered.map((scenario, idx) => {
            const diff = difficultyConfig[scenario.difficulty]
            return (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  href={`/play/${scenario.id}`}
                  className="card-game glow-border block p-5 rounded-xl group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-academic-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center gap-4">
                    {/* 左侧难度 */}
                    <div className="flex-shrink-0 w-16 text-center">
                      <Stars count={diff.stars} color={diff.color} />
                      <p className={cn('text-[10px] mt-0.5', diff.color)}>{diff.label}</p>
                    </div>

                    {/* 中间内容 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-lighter/80 text-text-muted">
                          {PHASE_LABELS[scenario.phase]}
                        </span>
                        <span className="text-[10px] text-text-muted">~{scenario.estimatedMinutes}min</span>
                      </div>
                      <h3 className="text-base font-bold text-text-primary group-hover:text-academic-blue-light transition-colors">
                        {scenario.title}
                        <span className="text-text-muted font-normal ml-2 text-sm">{scenario.subtitle}</span>
                      </h3>
                      <p className="text-xs text-text-muted mt-1 truncate">{scenario.description}</p>
                    </div>

                    {/* 右侧箭头 */}
                    <motion.div
                      className="flex-shrink-0 text-text-muted group-hover:text-academic-blue-light transition-colors"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-lg opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-text-muted">该阶段暂无可用场景</div>
        )}
      </div>
    </div>
  )
}

export default function ScenariosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-text-muted">加载中...</div>}>
      <ScenarioListInner />
    </Suspense>
  )
}
