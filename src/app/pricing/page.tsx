'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PRODUCTS } from '@/types/payment'
import type { ProductType } from '@/types/payment'
import { PaymentModal } from '@/components/payment/PaymentModal'
import Link from 'next/link'

const features: Record<ProductType, string[]> = {
  single_report: [
    '五维雷达图诊断',
    '信息差完整复盘',
    '身后评价全文',
    '个性化改进建议',
    '同阶段对比数据',
    'PDF报告导出',
  ],
  pro_monthly: [
    '全部10个场景无限重玩',
    '每次通关完整PDF报告',
    '解锁全部角色扮演',
    '角色自定义改名',
    '时光倒流无限次',
    '尴尬恢复训练mini副本',
    '永久历史存档',
  ],
  pro_yearly: [
    '包含月度所有功能',
    '年付省46元',
    '优先体验新场景',
    '专属成就徽章',
  ],
}

export default function PricingPage() {
  const [paymentProduct, setPaymentProduct] = useState<ProductType | null>(null)

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/" className="text-sm text-text-muted hover:text-text-secondary">
          &larr; 返回首页
        </Link>

        <div className="text-center mt-6 mb-10">
          <h1 className="text-2xl font-bold text-text-primary">选择方案</h1>
          <p className="text-sm text-text-muted mt-2">
            没有正确答案，只有不同代价的输法——但至少你可以知道自己怎么输的
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-surface-lighter bg-surface-light p-6"
          >
            <h3 className="text-base font-medium text-text-primary">免费版</h3>
            <p className="text-2xl font-bold text-text-primary mt-2">¥0</p>
            <p className="text-xs text-text-muted mt-1">永久免费</p>
            <ul className="mt-6 space-y-2">
              {['每月5次场景体验', '基础结局 + 生存分', '简版报告', '时光倒流1次/场景'].map((f) => (
                <li key={f} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-text-muted mt-0.5">·</span>{f}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href="/scenarios"
                className="block text-center text-sm py-2 rounded border border-surface-lighter text-text-secondary hover:bg-surface-lighter transition-colors"
              >
                开始体验
              </Link>
            </div>
          </motion.div>

          {/* Single Report */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-lg border border-surface-lighter bg-surface-light p-6"
          >
            <h3 className="text-base font-medium text-text-primary">
              {PRODUCTS.single_report.name}
            </h3>
            <p className="text-2xl font-bold text-text-primary mt-2">
              {PRODUCTS.single_report.displayPrice}
            </p>
            <p className="text-xs text-text-muted mt-1">单次购买</p>
            <ul className="mt-6 space-y-2">
              {features.single_report.map((f) => (
                <li key={f} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-academic-blue-light mt-0.5">+</span>{f}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <button
                onClick={() => setPaymentProduct('single_report')}
                className="w-full text-sm py-2 rounded bg-academic-blue text-white hover:bg-academic-blue-light transition-colors"
              >
                购买单次报告
              </button>
            </div>
          </motion.div>

          {/* Pro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border-2 border-academic-blue bg-surface-light p-6 relative"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-3 py-0.5 rounded-full bg-academic-blue text-white">
              推荐
            </span>
            <h3 className="text-base font-medium text-text-primary">Pro 订阅</h3>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-2xl font-bold text-text-primary">¥12</p>
              <span className="text-sm text-text-muted">/月</span>
            </div>
            <p className="text-xs text-text-muted mt-1">或 ¥98/年（省46元）</p>
            <ul className="mt-6 space-y-2">
              {features.pro_monthly.map((f) => (
                <li key={f} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-academic-blue-light mt-0.5">+</span>{f}
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2">
              <button
                onClick={() => setPaymentProduct('pro_monthly')}
                className="w-full text-sm py-2 rounded bg-academic-blue text-white hover:bg-academic-blue-light transition-colors"
              >
                订阅 Pro 月度
              </button>
              <button
                onClick={() => setPaymentProduct('pro_yearly')}
                className="w-full text-sm py-2 rounded border border-academic-blue/50 text-academic-blue-light hover:bg-academic-blue/10 transition-colors"
              >
                订阅 Pro 年度（¥98）
              </button>
            </div>
          </motion.div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-lg font-medium text-text-primary text-center mb-6">常见问题</h2>
          <div className="space-y-4">
            {[
              { q: '支持什么支付方式？', a: '支持支付宝和微信支付。' },
              { q: 'Pro 可以退款吗？', a: '不支持退款，但可以随时取消续费，当前订阅周期内功能保留。' },
              { q: '免费用户能玩多少次？', a: '每月5次场景体验（每月1号重置），通关后可查看简版报告。' },
              { q: '单次报告和 Pro 有什么区别？', a: '单次报告是一次性解锁某次通关的完整诊断。Pro 包含无限次报告和更多高级功能。' },
            ].map((item) => (
              <div key={item.q} className="p-4 rounded-lg bg-surface-light border border-surface-lighter">
                <p className="text-sm font-medium text-text-primary">{item.q}</p>
                <p className="text-xs text-text-muted mt-1">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {paymentProduct && (
        <PaymentModal
          isOpen={true}
          onClose={() => setPaymentProduct(null)}
          productType={paymentProduct}
          onSuccess={() => setPaymentProduct(null)}
        />
      )}
    </div>
  )
}
