'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import type { TeamSeason, MetricKey } from '@/lib/chart/types'
import { getMetric } from '@/lib/chart/selectors'
import { getTeamColor } from '@/lib/chart/colors'
import { formatNumber, getMetricFormat } from '@/lib/chart/format'
import ChartContainer from './ChartContainer'
import LegendChips from '@/components/ui/LegendChips'
import TooltipCard, { TooltipRow } from '@/components/ui/TooltipCard'
import DeltaBadge from '@/components/snapshot/DeltaBadge'

interface SnapshotBarChartWithDeltaProps {
  rows: TeamSeason[]
  year: number
  metric: MetricKey
  teams?: string[]
  previousYear?: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    dataKey: string
    value: number
    payload: Record<string, number | string>
  }>
  metric: MetricKey
}

function CustomTooltip({ active, payload, metric }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const firstPayload = payload[0]
  const team = firstPayload.payload.team as string
  const year = firstPayload.payload.year as number
  const rawData = firstPayload.payload.raw as unknown as TeamSeason

  if (!rawData) {
    return null
  }

  const metricValue = firstPayload.value as number
  const formatOptions = getMetricFormat(metric)
  const formattedValue = formatNumber(metricValue, formatOptions)

  return (
    <TooltipCard title={`${team} (${year})`}>
      <TooltipRow label={metric} value={formattedValue} />
      <TooltipRow
        label="Power Score"
        value={formatNumber(rawData.powerScore)}
      />
      <TooltipRow label="Total WAR" value={formatNumber(rawData.totalWar)} />
    </TooltipCard>
  )
}

export default function SnapshotBarChartWithDelta({
  rows,
  year,
  metric,
  teams,
  previousYear,
}: SnapshotBarChartWithDeltaProps) {
  // 해당 연도 데이터 필터링
  let filteredData = rows.filter(row => row.year === year)

  // 팀 필터링
  if (teams && teams.length > 0) {
    filteredData = filteredData.filter(row => teams.includes(row.team))
  }

  // 전년도 데이터 가져오기
  const previousData =
    previousYear !== undefined
      ? rows.filter(row => row.year === previousYear)
      : []

  const previousMap = new Map<string, number>()
  previousData.forEach(row => {
    previousMap.set(row.team, getMetric(row, metric))
  })

  // 메트릭 값으로 변환 및 정렬
  const chartData = filteredData
    .map(row => ({
      team: row.team,
      value: getMetric(row, metric),
      year: row.year,
      raw: row,
      previous: previousMap.get(row.team) || null,
    }))
    .sort((a, b) => b.value - a.value) // 내림차순 정렬

  // 범례 항목 생성
  const legendItems = chartData.map((item, index) => ({
    label: item.team,
    color: getTeamColor(item.team, index),
  }))

  const formatOptions = getMetricFormat(metric)
  const yLabel = metric

  return (
    <ChartContainer
      title={`${year}년 ${metric} 비교`}
      description={`${year}년도 팀별 ${metric} 비교입니다.`}
    >
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="team"
            stroke="#6b7280"
            tick={{ fill: '#6b7280' }}
            angle={-45}
            textAnchor="end"
            height={80}
            label={{
              value: '팀',
              position: 'insideBottom',
              offset: -10,
              style: { fill: '#6b7280' },
            }}
          />
          <YAxis
            stroke="#6b7280"
            tick={{ fill: '#6b7280' }}
            label={{
              value: yLabel,
              angle: -90,
              position: 'insideLeft',
              style: { fill: '#6b7280' },
            }}
          />
          <Tooltip content={<CustomTooltip metric={metric} />} />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="square"
            formatter={value => value}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {chartData.map((item, index) => (
              <Cell key={item.team} fill={getTeamColor(item.team, index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2">
        <div className="flex flex-wrap gap-2">
          {chartData.map(item => (
            <div
              key={item.team}
              className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md"
            >
              <span className="text-sm font-medium text-gray-900">
                {item.team}:
              </span>
              <span className="text-sm text-gray-700">
                {formatNumber(item.value, formatOptions)}
              </span>
              {previousYear !== undefined && (
                <DeltaBadge
                  current={item.value}
                  previous={item.previous}
                  formatValue={value => formatNumber(value, formatOptions)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <LegendChips items={legendItems} className="mt-4" />
    </ChartContainer>
  )
}
