'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useGameStore } from '@/store/game-store'
import { SimpleReport } from '@/components/result/SimpleReport'
import { FullReport } from '@/components/report/FullReport'
import { ReviewList } from '@/components/result/ReviewList'
import { PaymentModal } from '@/components/payment/PaymentModal'
import { generateReport } from '@/lib/report/report-generator'
import { exportReportToPdf } from '@/lib/report/pdf-exporter'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type { ScenarioResult } from '@/types/game'
import type { ScenarioData } from '@/types/scenario'

export default function ResultPage() {
  const params = useParams()
  const scenarioId = params.id as string
  const { result: storeResult, scenario: storeScenario } = useGameStore()

  const [cachedResult, setCachedResult] = useState<ScenarioResult | null>(null)
  const [cachedScenario, setCachedScenario] = useState<ScenarioData | null>(null)

  useEffect(() => {
    if (!storeResult || !storeScenario) {
      try {
        const savedResult = sessionStorage.getItem('lastGameResult')
        const savedScenario = sessionStorage.getItem('lastGameScenario')
        if (savedResult) setCachedResult(JSON.parse(savedResult))
        if (savedScenario) setCachedScenario(JSON.parse(savedScenario))
      } catch {}
    }
  }, [storeResult, storeScenario])

  const result = storeResult || cachedResult
  const scenario = storeScenario || cachedScenario

  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [reportUnlocked, setReportUnlocked] = useState(false)

  const isPro = false
  const showFullReport = reportUnlocked

  // 生成报告数据，传入场景的地雷和知识项
  const reportData = useMemo(() => {
    if (!result) return null
    return generateReport(
      result,
      scenario?.mines,
      scenario?.knowledgeItems
    )
  }, [result, scenario])

  const handleExportPdf = useCallback(async () => {
    try {
      await exportReportToPdf('full-report')
    } catch (error) {
      console.error('PDF导出失败:', error)
    }
  }, [])

  if (!result || !scenario) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-muted mb-4">没有找到游戏结果</p>
          <Link
            href={`/play/${scenarioId}`}
            className="text-sm text-academic-blue-light hover:underline"
          >
            重新开始场景
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <p className="text-xs text-text-muted">场景完成</p>
          <h1 className="text-xl text-text-primary font-bold mt-1">
            {scenario.title}
          </h1>
          <p className="text-xs text-text-muted mt-1">{scenario.subtitle}</p>
        </motion.div>

        {showFullReport && reportData ? (
          <FullReport
            result={result}
            reportData={reportData}
            onExportPdf={handleExportPdf}
          />
        ) : (
          <>
            <SimpleReport result={result} />
            
            <div className="my-10 border-t border-surface-lighter" />
            
            <ReviewList evaluations={result.behindEvaluations} />

            {/* 付费墙 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-8 p-6 rounded-lg border border-academic-blue/30 bg-academic-blue/5 text-center"
            >
              <h3 className="text-base font-medium text-text-primary">
                解锁完整诊断报告
              </h3>
              <p className="text-xs text-text-muted mt-2 max-w-sm mx-auto">
                查看六维雷达图、决策时间线、地雷复盘分析、改进建议和同阶段对比数据
              </p>
              <div className="flex flex-wrap justify-center gap-2 my-4 text-xs">
                <span className="px-2 py-1 rounded bg-surface-lighter text-text-secondary">📊 六维雷达图</span>
                <span className="px-2 py-1 rounded bg-surface-lighter text-text-secondary">⏱️ 时间线</span>
                <span className="px-2 py-1 rounded bg-surface-lighter text-text-secondary">💥 地雷分析</span>
                <span className="px-2 py-1 rounded bg-surface-lighter text-text-secondary">💡 建议</span>
              </div>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="px-6 py-2.5 rounded-lg bg-academic-blue text-white hover:bg-academic-blue-light transition-colors text-sm font-medium"
              >
                ¥9.9 解锁完整报告
              </button>
              <p className="text-[10px] text-text-muted mt-2">
                或 <Link href="/pricing" className="text-academic-blue-light hover:underline">升级 Pro</Link> 享受无限报告
              </p>
            </motion.div>
          </>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-10 flex justify-center gap-4"
        >
          <Link
            href={`/play/${scenarioId}`}
            className="px-6 py-2 rounded-lg border border-surface-lighter text-text-secondary hover:bg-surface-light transition-colors text-sm"
          >
            重新挑战
          </Link>
          <Link
            href="/scenarios"
            className="px-6 py-2 rounded-lg bg-academic-blue text-white hover:bg-academic-blue-light transition-colors text-sm"
          >
            选择其他场景
          </Link>
        </motion.div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        productType="single_report"
        onSuccess={() => {
          setReportUnlocked(true)
          setShowPaymentModal(false)
        }}
      />
    </div>
  )
}
