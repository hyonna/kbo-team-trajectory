'use client'

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
import type { TeamSeason } from '@/lib/chart/types'
import { getTeamColor } from '@/lib/chart/colors'
import { formatNumber } from '@/lib/chart/format'
import ChartContainer from './ChartContainer'
import LegendChips from '@/components/ui/LegendChips'
import TooltipCard, { TooltipRow } from '@/components/ui/TooltipCard'

interface RankTrajectoryChartProps {
  data: TrajectoryData
  height?: number
  maxRank?: number // default 10
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    dataKey: string
    value: number
    payload: Record<string, number | string | null | TeamSeason>
  }>
  label?: number
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0 || !label) {
    return null
  }

  // 첫 번째 유효한 데이터 포인트 찾기
  const firstPayload = payload.find(p => p.value !== null)
  if (!firstPayload) {
    return null
  }

  const team = firstPayload.dataKey as string
  // payload에서 raw 데이터 찾기
  const rawData = firstPayload.payload[`${team}_raw`] as unknown as
    | TeamSeason
    | undefined

  if (!rawData) {
    return null
  }

  return (
    <TooltipCard title={`${team} (${label})`}>
      <TooltipRow
        label="순위"
        value={formatNumber(rawData.powerRank, { decimals: 0, unit: '위' })}
      />
      <TooltipRow
        label="Power Score"
        value={formatNumber(rawData.powerScore)}
      />
    </TooltipCard>
  )
}

export default function RankTrajectoryChart({
  data,
  height = 500,
  maxRank = 10,
}: RankTrajectoryChartProps) {
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

  // Y 도메인: [1, maxRank], 반전되어 1이 위로
  const yDomain: [number, number] = [1, maxRank]

  return (
    <ChartContainer
      title="팀 순위 추이"
      description="연도별 팀 Power Rank 추이를 보여줍니다. 1위가 위쪽에 표시됩니다."
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
            reversed
            domain={yDomain}
            label={{
              value: '순위',
              angle: -90,
              position: 'insideLeft',
              style: { fill: '#6b7280' },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
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
