'use client'

import { memo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { TrajectoryData } from '@/lib/chart/transform'
import type { MetricKey, TeamSeason } from '@/lib/chart/types'
import { calculateYDomain } from '@/lib/chart/domain'
import { getTeamColor } from '@/lib/chart/colors'
import { formatNumber, getMetricFormat } from '@/lib/chart/format'
import ChartContainer from './ChartContainer'
import LegendChips from '@/components/ui/LegendChips'
import TooltipCard, { TooltipRow } from '@/components/ui/TooltipCard'

interface TrajectoryLineChartProps {
  data: TrajectoryData
  metric: MetricKey
  height?: number
  yDomain?: { min: number; max: number } | 'auto'
  formatter?: (v: number) => string
  title?: string
  description?: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    dataKey: string
    value: number
    payload: Record<string, number | string | null | TeamSeason>
  }>
  label?: number
  metric: MetricKey
  formatter?: (v: number) => string
}

function CustomTooltip({
  active,
  payload,
  label,
  metric,
  formatter,
}: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0 || !label) {
    return null
  }

  // 첫 번째 유효한 데이터 포인트 찾기
  const firstPayload = payload.find(p => p.value !== null)
  if (!firstPayload) {
    return null
  }

  const team = firstPayload.dataKey as string
  const rawData = firstPayload.payload[`${team}_raw`] as unknown as
    | TeamSeason
    | undefined

  if (!rawData) {
    return null
  }

  const metricValue = firstPayload.value as number
  const formatOptions = getMetricFormat(metric)
  const formattedValue = formatter
    ? formatter(metricValue)
    : formatNumber(metricValue, formatOptions)

  return (
    <TooltipCard title={`${team} (${label})`}>
      <TooltipRow label={metric} value={formattedValue} />
      <TooltipRow
        label="Power Score"
        value={formatNumber(rawData.powerScore)}
      />
      <TooltipRow label="Total WAR" value={formatNumber(rawData.totalWar)} />
    </TooltipCard>
  )
}

function TrajectoryLineChart({
  data,
  metric,
  height = 500,
  yDomain = 'auto',
  formatter,
  title,
  description,
}: TrajectoryLineChartProps) {
  // Recharts용 데이터 포맷으로 변환
  const chartData = data.years.map(year => {
    const dataPoint: Record<string, number | string | null | TeamSeason> = {
      year,
    }

    data.series.forEach(series => {
      const point = series.points.find(p => p.x === year)
      if (point && !isNaN(point.y)) {
        dataPoint[series.team] = point.y
        // raw 데이터도 함께 저장
        if (point.raw) {
          dataPoint[`${series.team}_raw`] = point.raw
        }
      } else {
        dataPoint[series.team] = null
      }
    })

    return dataPoint
  })

  // 범례 항목 생성
  const legendItems = data.series.map((series, index) => ({
    label: series.team,
    color: getTeamColor(series.team, index),
  }))

  // Y축 도메인 계산
  const finalYDomain: [number, number] =
    yDomain === 'auto'
      ? calculateYDomain(data, { padding: 0.1 })
      : [yDomain.min, yDomain.max]

  return (
    <ChartContainer
      title={title || '팀 추이'}
      description={description || `${metric} 추이를 보여줍니다.`}
    >
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="year"
            stroke="#6b7280"
            tick={{ fill: '#6b7280' }}
            label={{
              value: '연도',
              position: 'insideBottom',
              offset: -10,
              style: { fill: '#6b7280' },
            }}
          />
          <YAxis
            stroke="#6b7280"
            tick={{ fill: '#6b7280' }}
            domain={finalYDomain}
            label={{
              value: metric,
              angle: -90,
              position: 'insideLeft',
              style: { fill: '#6b7280' },
            }}
          />
          <Tooltip
            content={<CustomTooltip metric={metric} formatter={formatter} />}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
            formatter={value => value}
          />
          {data.series.map((series, index) => (
            <Line
              key={series.team}
              type="monotone"
              dataKey={series.team}
              stroke={getTeamColor(series.team, index)}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <LegendChips items={legendItems} className="mt-4" />
    </ChartContainer>
  )
}

export default memo(TrajectoryLineChart)
