'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderNo = searchParams.get('orderNo')

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-sm w-full text-center p-8 rounded-xl bg-surface-light border border-surface-lighter"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-text-primary">支付成功</h1>
        <p className="text-sm text-text-muted mt-2">感谢购买，功能已解锁</p>
        {orderNo && (
          <p className="text-xs text-text-muted mt-3">订单号: {orderNo}</p>
        )}
        <div className="mt-6 space-y-2">
          <Link
            href="/scenarios"
            className="block w-full py-2 rounded-lg bg-academic-blue text-white text-sm hover:bg-academic-blue-light transition-colors"
          >
            继续游戏
          </Link>
          <Link
            href="/"
            className="block w-full py-2 rounded-lg border border-surface-lighter text-text-secondary text-sm hover:bg-surface-lighter transition-colors"
          >
            返回首页
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <SuccessContent />
    </Suspense>
  )
}
