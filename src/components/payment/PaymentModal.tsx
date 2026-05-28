'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { PRODUCTS } from '@/types/payment'
import type { ProductType, PaymentChannel } from '@/types/payment'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  productType: ProductType
  sessionId?: string
  onSuccess?: () => void
}

export function PaymentModal({
  isOpen,
  onClose,
  productType,
  sessionId,
  onSuccess,
}: PaymentModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderNo, setOrderNo] = useState<string | null>(null)
  const [polling, setPolling] = useState(false)

  const product = PRODUCTS[productType]

  const handlePay = useCallback(
    async (channel: PaymentChannel) => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch('/api/payment/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ channel, productType, sessionId }),
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error)

        setOrderNo(data.orderNo)

        if (channel === 'alipay' && data.formHtml) {
          const win = window.open('', '_blank')
          if (win) {
            win.document.write(data.formHtml)
            win.document.close()
          }
          setPolling(true)
        } else if (channel === 'wechat' && data.codeUrl) {
          window.open(data.codeUrl, '_blank')
          setPolling(true)
        }
      } catch (err: any) {
        setError(err.message || '创建订单失败')
      } finally {
        setLoading(false)
      }
    },
    [productType, sessionId]
  )

  useEffect(() => {
    if (!polling || !orderNo) return

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/payment/status?orderNo=${orderNo}`)
        const data = await res.json()
        if (data.status === 'paid') {
          setPolling(false)
          onSuccess?.()
          onClose()
        }
      } catch {}
    }, 3000)

    return () => clearInterval(interval)
  }, [polling, orderNo, onSuccess, onClose])

  useEffect(() => {
    if (!isOpen) {
      setLoading(false)
      setError(null)
      setOrderNo(null)
      setPolling(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/60" onClick={onClose} />
        <motion.div
          className="relative bg-surface-light border border-surface-lighter rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-text-muted hover:text-text-secondary text-lg"
          >
            &times;
          </button>

          <h3 className="text-base font-medium text-text-primary">
            {product.name}
          </h3>
          <p className="text-xs text-text-muted mt-1">{product.description}</p>

          <div className="text-center my-6">
            <span className="text-3xl font-bold text-text-primary">
              {product.displayPrice}
            </span>
          </div>

          {error && (
            <p className="text-xs text-red-400 mb-4 text-center">{error}</p>
          )}

          {polling ? (
            <div className="text-center py-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-academic-blue-light"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-sm text-text-secondary">等待支付完成...</span>
              </div>
              <p className="text-xs text-text-muted">
                订单号: {orderNo}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={() => handlePay('alipay')}
                disabled={loading}
                className="w-full py-2.5 rounded-lg bg-[#1677ff] text-white text-sm font-medium hover:bg-[#1266d9] transition-colors disabled:opacity-50"
              >
                {loading ? '处理中...' : '支付宝支付'}
              </button>
              <button
                onClick={() => handlePay('wechat')}
                disabled={loading}
                className="w-full py-2.5 rounded-lg bg-[#07c160] text-white text-sm font-medium hover:bg-[#06ae56] transition-colors disabled:opacity-50"
              >
                {loading ? '处理中...' : '微信支付'}
              </button>
            </div>
          )}

          <p className="text-[10px] text-text-muted text-center mt-4">
            支付即表示同意服务条款 · 不支持退款
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
