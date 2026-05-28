'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-academic-blue-dark/20 to-transparent" />
      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight">
            学术社交模拟器
          </h1>
          <p className="text-xl text-text-secondary mt-4 font-medium">
            没有正确答案，只有不同代价的输法
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-sm text-text-muted mt-6 max-w-lg mx-auto leading-relaxed"
        >
          覆盖中国学术圈全生命周期的社交生存训练。从保研面试到院士博弈，
          10个高复杂度场景、30+角色、多线程对话、社交地雷、信息差博弈。
          不是社交礼仪教学——是学术生存压力模拟器。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="/scenarios"
            className="px-8 py-3 rounded-lg bg-academic-blue text-white font-medium hover:bg-academic-blue-light transition-colors"
          >
            开始生存训练
          </Link>
          <Link
            href="/pricing"
            className="px-8 py-3 rounded-lg border border-surface-lighter text-text-secondary hover:bg-surface-light transition-colors"
          >
            查看方案
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-xs text-text-muted mt-4"
        >
          免费体验 · 无需注册即可试玩
        </motion.p>
      </div>
    </section>
  )
}
