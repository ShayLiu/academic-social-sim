'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { PHASE_LABELS } from '@/types/game'
import type { AcademicPhase } from '@/types/game'
import { FeatureGrid } from '@/components/landing/FeatureGrid'
import { FAQ } from '@/components/landing/FAQ'

const phases: { phase: AcademicPhase; desc: string; icon: string }[] = [
  { phase: 'undergrad', desc: '保研厮杀、毕设答辩', icon: '📚' },
  { phase: 'masters', desc: '转博谈判、求职拉扯', icon: '🎓' },
  { phase: 'phd', desc: '开题互撕、论文大修', icon: '🔬' },
  { phase: 'postdoc', desc: '教职面试、基金暗战', icon: '🏛️' },
  { phase: 'faculty', desc: '非升即走、招生博弈', icon: '👔' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <nav className="flex items-center justify-between px-6 py-3 border-b border-surface-lighter">
        <span className="text-sm font-medium text-text-primary">学术社交模拟器</span>
        <div className="flex items-center gap-4">
          <Link href="/pricing" className="text-xs text-text-muted hover:text-text-secondary">定价</Link>
        </div>
      </nav>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl"
        >
          <h1 className="text-4xl font-bold text-text-primary mb-3">
            学术社交模拟器
          </h1>
          <p className="text-lg text-text-secondary mb-2">
            没有正确答案，只有不同代价的输法
          </p>
          <p className="text-sm text-text-muted max-w-md mx-auto">
            覆盖中国学术圈全生命周期的社交生存训练。从保研面试到院士博弈，
            每个场景都是修罗场。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 w-full max-w-3xl"
        >
          <h2 className="text-sm text-text-muted uppercase tracking-wider text-center mb-6">
            选择你的学术阶段
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {phases.map((p, idx) => (
              <motion.div
                key={p.phase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
              >
                <Link
                  href={`/scenarios?phase=${p.phase}`}
                  className="block p-6 rounded-lg border border-surface-lighter bg-surface-light hover:bg-surface-lighter hover:border-academic-blue/30 transition-all group"
                >
                  <span className="text-2xl block mb-3">{p.icon}</span>
                  <h3 className="text-base font-medium text-text-primary group-hover:text-academic-blue-light transition-colors">
                    {PHASE_LABELS[p.phase]}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">{p.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8"
        >
          <Link
            href="/scenarios"
            className="text-sm text-academic-blue-light hover:underline"
          >
            查看全部场景 &rarr;
          </Link>
        </motion.div>
      </div>

      <FeatureGrid />
      <FAQ />

      <footer className="text-center py-6 text-xs text-text-muted border-t border-surface-lighter">
        学术社交模拟器 · 不是社交礼仪教学，是学术生存压力模拟器
      </footer>
    </div>
  )
}
