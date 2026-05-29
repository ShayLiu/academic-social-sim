'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useGameStore } from '@/store/game-store'
import { SimpleReport } from '@/components/result/SimpleReport'
import { FullReport } from '@/components/report/FullReport'
import { ReviewList } from '@/components/result/ReviewList'
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

  const reportData = useMemo(() => {
    if (!result) return null
    return generateReport(result, scenario?.mines, scenario?.knowledgeItems)
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

        <SimpleReport result={result} />

        <div className="my-10 border-t border-surface-lighter" />

        <ReviewList evaluations={result.behindEvaluations} />

        {reportData && (
          <>
            <div className="my-10 border-t border-surface-lighter" />
            <FullReport
              result={result}
              reportData={reportData}
              onExportPdf={handleExportPdf}
            />
          </>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
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
    </div>
  )
}
