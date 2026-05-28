'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: '🧵',
    title: '多线程对话',
    description: '同时面对多个角色的独立对话线程。你只能回应一个，其他在后台推进——urgency越高越危险。',
  },
  {
    icon: '🔍',
    title: '信息差博弈',
    description: '每个角色知道不同的信息。你不知道的秘密可能随时暴露，你知道的秘密可能成为武器或软肋。',
  },
  {
    icon: '💣',
    title: '社交地雷',
    description: '每个场景预埋3-5个禁忌话题。一旦踩中——全场安静，角色态度骤变，话题永久封禁。',
  },
  {
    icon: '🎭',
    title: '一致性追踪',
    description: '系统暗中记录你的每一个立场。前后矛盾会被角色发现："你上次不是这么说的？"',
  },
  {
    icon: '⚡',
    title: '情绪能量',
    description: '每次回应消耗能量。能量过低解锁失控选项——哭、怼、语无伦次。归零直接宕机结局。',
  },
  {
    icon: '👁️',
    title: '身后评价',
    description: '你看不见的声誉影响：导师晚上发的消息、行政群里的备注、小圈子里的评价。',
  },
]

export function FeatureGrid() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-text-primary text-center mb-2">
          六大核心机制
        </h2>
        <p className="text-sm text-text-muted text-center mb-10">
          不是选择题训练，是修罗场生存模拟
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-lg border border-surface-lighter bg-surface-light hover:border-academic-blue/20 transition-colors"
            >
              <span className="text-2xl">{feature.icon}</span>
              <h3 className="text-sm font-medium text-text-primary mt-3">
                {feature.title}
              </h3>
              <p className="text-xs text-text-muted mt-1.5 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
