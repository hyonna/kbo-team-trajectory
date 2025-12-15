'use client'

import { memo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { PlayerTrajectoryData } from '@/lib/chart/transformPlayer'
import type {
  BattingRecord,
  PitchingRecord,
} from '@/lib/dataset/loadPlayerStats'
import { formatNumber } from '@/lib/chart/format'
import ChartContainer from './ChartContainer'
import TooltipCard, { TooltipRow } from '@/components/ui/TooltipCard'

interface PlayerLineChartProps {
  data: PlayerTrajectoryData
  metric: string
  height?: number
  yDomain?: { min: number; max: number } | 'auto'
  title?: string
  description?: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    payload: {
      x: number
      y: number
      raw: BattingRecord | PitchingRecord
    }
  }>
  metric: string
}

function CustomTooltip({ active, payload, metric }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const data = payload[0].payload
  if (!data || !data.raw) {
    return null
  }

  const record = data.raw as BattingRecord | PitchingRecord
  if (!record) {
    return null
  }

  const playerName = record.Name || 'Unknown'
  const year = data.x || 'N/A'
  const metricValue =
    typeof data.y === 'number' && !isNaN(data.y) ? data.y : null

  return (
    <TooltipCard title={`${playerName} - ${year}년`}>
      <TooltipRow label="연도" value={year} />
      {metricValue !== null && (
        <TooltipRow
          label={metric}
          value={formatNumber(metricValue, { decimals: 2 })}
        />
      )}
      {'Team' in record && record.Team && (
        <TooltipRow label="팀" value={record.Team} />
      )}
      {'WAR' in record &&
        typeof record.WAR === 'number' &&
        !isNaN(record.WAR) && (
          <TooltipRow
            label="WAR"
            value={formatNumber(record.WAR, { decimals: 2 })}
          />
        )}
    </TooltipCard>
  )
}

function PlayerLineChart({
  data,
  metric,
  height = 500,
  yDomain = 'auto',
  title,
  description,
}: PlayerLineChartProps) {
  if (data.series.length === 0 || data.series[0].points.length === 0) {
    return (
      <div className="card-sporty h-[500px] flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">데이터가 없습니다</p>
      </div>
    )
  }

  const series = data.series[0]
  // 모든 데이터를 사용 (최근 10개만 보이지만 스크롤로 전체 확인 가능)
  const chartData = series.points.map(point => ({
    year: point.x,
    value: point.y,
    raw: point.raw,
  }))

  // Y축 도메인 계산
  let domain: [number, number] = [0, 100]
  if (yDomain === 'auto') {
    const values = chartData.map(d => d.value).filter(v => !isNaN(v))
    if (values.length > 0) {
      const min = Math.min(...values)
      const max = Math.max(...values)
      const padding = (max - min) * 0.1
      domain = [Math.max(0, min - padding), max + padding]
    }
  } else {
    domain = [yDomain.min, yDomain.max]
  }

  // 메트릭에 따른 포맷터
  const formatter = (value: number) => {
    if (
      metric === 'WAR' ||
      metric === 'ERA' ||
      metric === 'FIP' ||
      metric === 'WHIP' ||
      metric === 'K9' ||
      metric === 'BB9' ||
      metric === 'KBB'
    ) {
      return formatNumber(value, { decimals: 2 })
    }
    if (metric === 'OPS') {
      return formatNumber(value, { decimals: 3 })
    }
    if (metric === 'IP') {
      return formatNumber(value, { decimals: 2 })
    }
    return formatNumber(value, { decimals: 0 })
  }

  // 차트 너비 계산 (데이터 포인트당 100px, 최소 1000px)
  const chartWidth =
    chartData.length > 10 ? Math.max(chartData.length * 100, 1000) : undefined

  return (
    <ChartContainer title={title || ''} description={description || ''}>
      <div className="relative" style={{ zIndex: 1 }}>
        <div
          className="overflow-x-auto"
          style={{
            width: '100%',
            maxWidth: '100%',
            overflowY: 'visible',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: chartWidth || '100%',
              minWidth: chartWidth ? `${chartWidth}px` : '100%',
            }}
          >
            <ResponsiveContainer width={chartWidth || '100%'} height={height}>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-gray-300 dark:stroke-gray-700"
                />
                <XAxis
                  dataKey="year"
                  className="text-gray-600 dark:text-gray-400"
                  tick={{ fill: 'currentColor' }}
                />
                <YAxis
                  domain={domain}
                  className="text-gray-600 dark:text-gray-400"
                  tick={{ fill: 'currentColor' }}
                  tickFormatter={formatter}
                  width={60}
                />
                <Tooltip
                  content={<CustomTooltip metric={metric} />}
                  cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
                  wrapperStyle={{ zIndex: 9999 }}
                  contentStyle={{ zIndex: 9999 }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                  activeDot={{ r: 7 }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </ChartContainer>
  )
}

export default memo(PlayerLineChart)
