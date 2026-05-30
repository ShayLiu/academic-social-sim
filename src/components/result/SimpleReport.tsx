'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import type { ScenarioResult } from '@/types/game'

interface SimpleReportProps {
  result: ScenarioResult
}

function ScoreRing({ score, color }: { score: number; color: string }) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animatedScore / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0
      const interval = setInterval(() => {
        current += 1
        if (current >= score) {
          setAnimatedScore(score)
          clearInterval(interval)
        } else {
          setAnimatedScore(current)
        }
      }, 15)
      return () => clearInterval(interval)
    }, 500)
    return () => clearTimeout(timer)
  }, [score])

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        <motion.circle
          cx="50" cy="50" r={radius} fill="none"
          stroke="url(#scoreGradient)" strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn('text-4xl font-black font-mono')} style={{ color }}>
          {animatedScore}
        </span>
        <span className="text-[10px] text-text-muted mt-1">生存分数</span>
      </div>
    </div>
  )
}

export function SimpleReport({ result }: SimpleReportProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#34d399'
    if (score >= 60) return '#fbbf24'
    if (score >= 40) return '#fb923c'
    return '#f87171'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return '游刃有余'
    if (score >= 60) return '勉强幸存'
    if (score >= 40) return '遍体鳞伤'
    return '社死现场'
  }

  const scoreColor = getScoreColor(result.survivalScore)

  return (
    <div className="max-w-lg mx-auto space-y-8">
      {/* 结局名称 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <p className="text-xs text-text-muted mb-2 uppercase tracking-wider">结局</p>
        <h2 className="text-2xl text-text-primary font-black text-glow">{result.ending.name}</h2>
        <p className="text-sm text-text-secondary mt-3 leading-relaxed">{result.ending.description}</p>
      </motion.div>

      {/* 分数圆环 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <ScoreRing score={result.survivalScore} color={scoreColor} />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-sm font-bold mt-2"
          style={{ color: scoreColor }}
        >
          {getScoreLabel(result.survivalScore)}
        </motion.p>
      </motion.div>

      {/* 一句话总结 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="card-game text-center p-5 rounded-xl"
      >
        <p className="text-xs text-text-muted mb-2 uppercase tracking-wider">印象总结</p>
        <p className="text-sm text-text-primary italic leading-relaxed">
          &ldquo;{result.impressionSummary}&rdquo;
        </p>
      </motion.div>

      {/* 关键数据 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="grid grid-cols-3 gap-3"
      >
        <div className="card-game text-center p-4 rounded-xl">
          <p className="text-[10px] text-text-muted mb-1 uppercase">地雷</p>
          <p className={cn(
            'text-2xl font-black font-mono',
            result.minesTriggered > 0 ? 'text-red-400 text-glow-red' : 'text-emerald-400 text-glow-green'
          )}>
            {result.minesTriggered}/{result.minesTotal}
          </p>
          <p className="text-[10px] text-text-muted mt-0.5">
            {result.minesTriggered === 0 ? '完美避雷' : '已触发'}
          </p>
        </div>
        <div className="card-game text-center p-4 rounded-xl">
          <p className="text-[10px] text-text-muted mb-1 uppercase">一致性</p>
          <p className={cn(
            'text-2xl font-black font-mono',
            result.consistencyFinal < 50 ? 'text-red-400' : result.consistencyFinal < 70 ? 'text-yellow-400' : 'text-text-primary'
          )}>
            {result.consistencyFinal}
          </p>
          <p className="text-[10px] text-text-muted mt-0.5">
            {result.consistencyFinal >= 70 ? '立场坚定' : result.consistencyFinal >= 50 ? '略有动摇' : '自相矛盾'}
          </p>
        </div>
        <div className="card-game text-center p-4 rounded-xl">
          <p className="text-[10px] text-text-muted mb-1 uppercase">能量</p>
          <p className={cn(
            'text-2xl font-black font-mono',
            result.energyFinal < 30 ? 'text-red-400' : result.energyFinal < 60 ? 'text-yellow-400' : 'text-emerald-400'
          )}>
            {result.energyFinal}
          </p>
          <p className="text-[10px] text-text-muted mt-0.5">
            {result.energyFinal >= 60 ? '游刃有余' : result.energyFinal >= 30 ? '精疲力竭' : '濒临崩溃'}
          </p>
        </div>
      </motion.div>

      {/* 游戏时长 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center"
      >
        <p className="text-xs text-text-muted font-mono">
          {Math.floor(result.timeSpent / 60)}:{(result.timeSpent % 60).toString().padStart(2, '0')}
        </p>
      </motion.div>
    </div>
  )
}
