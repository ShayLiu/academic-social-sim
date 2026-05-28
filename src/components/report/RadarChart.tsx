'use client'

import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import type { ReportDimensions } from '@/lib/report/report-generator'

interface RadarChartProps {
  dimensions: ReportDimensions
}

const DIMENSION_LABELS: Record<keyof ReportDimensions, string> = {
  socialAwareness: '察言观色',
  rhythmControl: '节奏控制',
  recoveryAbility: '尴尬恢复',
  hierarchyNavigation: '层级推进',
  energyManagement: '能量管理',
  informationControl: '信息掌控',
}

const DIMENSION_DESCRIPTIONS: Record<keyof ReportDimensions, string> = {
  socialAwareness: '识别社交风险和机会的能力',
  rhythmControl: '掌控对话节奏和时机的能力',
  recoveryAbility: '从失误中恢复和翻盘的能力',
  hierarchyNavigation: '在权力结构中游走的能力',
  energyManagement: '控制情绪能量消耗的能力',
  informationControl: '管理信息暴露的能力',
}

export function RadarChart({ dimensions }: RadarChartProps) {
  const data = Object.entries(dimensions).map(([key, value]) => ({
    dimension: DIMENSION_LABELS[key as keyof ReportDimensions],
    value,
    fullMark: 100,
    key,
  }))

  // 计算平均值
  const avgValue = Math.round(
    Object.values(dimensions).reduce((a, b) => a + b, 0) / 6
  )

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={280}>
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid 
            stroke="#2d2d4a" 
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: '#9ca3af', fontSize: 10 }}
            tickLine={false}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#6b7280', fontSize: 8 }}
            tickCount={5}
            axisLine={{ stroke: '#2d2d4a' }}
          />
          <Radar
            name="能力值"
            dataKey="value"
            stroke="#2a5a8c"
            fill="#1a3a5c"
            fillOpacity={0.6}
            strokeWidth={2}
            dot={{
              fill: '#2a5a8c',
              strokeWidth: 2,
              r: 3,
            }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload
                const key = item.key as keyof ReportDimensions
                return (
                  <div className="bg-surface-light border border-surface-lighter rounded-lg p-2 shadow-lg">
                    <p className="text-sm font-medium text-text-primary">
                      {item.dimension}: {item.value}
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      {DIMENSION_DESCRIPTIONS[key]}
                    </p>
                  </div>
                )
              }
              return null
            }}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>

      {/* 平均分指示 */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="text-center px-3 py-1 rounded-full bg-surface-lighter/50 text-xs">
          <span className="text-text-muted">综合评分：</span>
          <span className={`font-bold ml-1 ${
            avgValue >= 70 ? 'text-emerald-400' :
            avgValue >= 50 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {avgValue}
          </span>
        </div>
      </div>
    </div>
  )
}
