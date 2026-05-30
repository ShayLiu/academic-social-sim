'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { PHASE_LABELS } from '@/types/game'
import type { AcademicPhase } from '@/types/game'

const phases: { phase: AcademicPhase; desc: string; icon: string; color: string }[] = [
  { phase: 'undergrad', desc: '保研厮杀、毕设答辩', icon: '📚', color: 'from-green-500/20 to-green-600/5' },
  { phase: 'masters', desc: '转博谈判、求职拉扯', icon: '🎓', color: 'from-blue-500/20 to-blue-600/5' },
  { phase: 'phd', desc: '开题互撕、论文大修', icon: '🔬', color: 'from-purple-500/20 to-purple-600/5' },
  { phase: 'postdoc', desc: '教职面试、基金暗战', icon: '🏛️', color: 'from-orange-500/20 to-orange-600/5' },
  { phase: 'faculty', desc: '非升即走、招生博弈', icon: '👔', color: 'from-red-500/20 to-red-600/5' },
]

const features = [
  { icon: '🧵', title: '多线程对话', desc: '同时应对多个角色，顾此失彼' },
  { icon: '🔍', title: '信息差博弈', desc: '你不知道的秘密随时可能暴露' },
  { icon: '💣', title: '社交地雷', desc: '踩中禁忌，全场安静' },
  { icon: '🎭', title: '一致性追踪', desc: '前后矛盾会被发现' },
  { icon: '⚡', title: '情绪能量', desc: '能量耗尽，情绪失控' },
  { icon: '👁️', title: '身后评价', desc: '你看不到的背后议论' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-surface-lighter/50">
        <span className="text-sm font-bold text-text-primary tracking-wide">学术社交模拟器</span>
        <Link href="/scenarios" className="text-xs px-4 py-1.5 rounded-full border border-academic-blue/50 text-academic-blue-light hover:bg-academic-blue/10 transition-all">
          全部场景
        </Link>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl"
        >
          <motion.h1
            className="text-5xl font-black text-text-primary text-glow mb-4"
            initial={{ filter: 'blur(10px)', opacity: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            学术社交模拟器
          </motion.h1>
          <motion.p
            className="text-sm text-text-muted mt-3 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            从保研面试到院士博弈，每个场景都是修罗场
          </motion.p>
        </motion.div>

        {/* 阶段选择 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-16 w-full max-w-4xl"
        >
          <h2 className="text-xs text-text-muted uppercase tracking-widest text-center mb-8">
            选择你的学术阶段
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {phases.map((p, idx) => (
              <motion.div
                key={p.phase}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + idx * 0.1 }}
              >
                <Link
                  href={`/scenarios?phase=${p.phase}`}
                  className={`card-game glow-border block p-5 rounded-xl text-center group relative overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${p.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="relative">
                    <motion.span
                      className="text-3xl block mb-3"
                      whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      {p.icon}
                    </motion.span>
                    <h3 className="text-sm font-bold text-text-primary group-hover:text-academic-blue-light transition-colors">
                      {PHASE_LABELS[p.phase]}
                    </h3>
                    <p className="text-[10px] text-text-muted mt-1 leading-relaxed">{p.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 快速开始按钮 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-10"
        >
          <Link
            href="/play/s01"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-academic-blue text-white font-medium hover:bg-academic-blue-light transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95"
          >
            <span>立即挑战</span>
            <span className="text-lg">→</span>
          </Link>
        </motion.div>
      </div>

      {/* 机制介绍 */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-xl font-bold text-text-primary text-center mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            六大核心机制
          </motion.h2>
          <p className="text-sm text-text-muted text-center mb-12">不是选择题训练，是修罗场生存模拟</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((f, idx) => (
              <motion.div
                key={f.title}
                className="card-game p-5 rounded-xl text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <span className="text-2xl block mb-2">{f.icon}</span>
                <h3 className="text-sm font-bold text-text-primary">{f.title}</h3>
                <p className="text-xs text-text-muted mt-1">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-text-muted border-t border-surface-lighter/30">
        学术社交模拟器 · 不是社交礼仪教学，是学术生存压力模拟器
      </footer>
    </div>
  )
}
