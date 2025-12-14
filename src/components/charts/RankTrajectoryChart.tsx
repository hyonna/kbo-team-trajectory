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
  ReferenceLine,
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
    color?: string
  }>
  label?: number
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0 || !label) {
    return null
  }

  // 모든 유효한 데이터 포인트 수집
  const validPayloads = payload.filter(
    p => p.value !== null && p.payload[`${p.dataKey}_raw`]
  )

  if (validPayloads.length === 0) {
    return null
  }

  // 여러 팀이 같은 연도에 있을 수 있으므로 모두 표시
  return (
    <TooltipCard title={`${label}년`}>
      {validPayloads.map(p => {
        const team = p.dataKey as string
        const rawData = p.payload[`${team}_raw`] as TeamSeason
        if (!rawData) return null

        return (
          <div key={team} className="mb-2 last:mb-0">
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: p.color || getTeamColor(team, 0) }}
              />
              <span className="font-bold text-gray-900 dark:text-gray-100">
                {team}
              </span>
            </div>
            <div className="ml-5 space-y-0.5">
              <TooltipRow
                label="순위"
                value={formatNumber(rawData.powerRank, {
                  decimals: 0,
                  unit: '위',
                })}
              />
              <TooltipRow
                label="Power Score"
                value={formatNumber(rawData.powerScore)}
              />
              <TooltipRow
                label="Total WAR"
                value={formatNumber(rawData.totalWar)}
              />
            </div>
          </div>
        )
      })}
    </TooltipCard>
  )
}

function RankTrajectoryChart({
  data,
  height = 600,
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

  // 순위 구간별 배경색 (1-3위: 상위권, 4-7위: 중위권, 8-10위: 하위권)
  const topZone = maxRank >= 3 ? 3 : maxRank
  const midZone = maxRank >= 7 ? 7 : maxRank

  return (
    <ChartContainer
      title="팀 순위 추이"
      description="연도별 팀 Power Rank 추이를 보여줍니다. 1위가 위쪽에 표시됩니다."
    >
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 40, bottom: 40 }}
        >
          <defs>
            {/* 상위권 배경 그라데이션 */}
            <linearGradient id="topZone" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="rgba(34, 197, 94, 0.1)"
                stopOpacity={1}
              />
              <stop
                offset="100%"
                stopColor="rgba(34, 197, 94, 0.05)"
                stopOpacity={1}
              />
            </linearGradient>
            {/* 중위권 배경 그라데이션 */}
            <linearGradient id="midZone" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="rgba(251, 191, 36, 0.1)"
                stopOpacity={1}
              />
              <stop
                offset="100%"
                stopColor="rgba(251, 191, 36, 0.05)"
                stopOpacity={1}
              />
            </linearGradient>
            {/* 하위권 배경 그라데이션 */}
            <linearGradient id="bottomZone" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="rgba(239, 68, 68, 0.1)"
                stopOpacity={1}
              />
              <stop
                offset="100%"
                stopColor="rgba(239, 68, 68, 0.05)"
                stopOpacity={1}
              />
            </linearGradient>
          </defs>

          {/* 순위 구간 배경 */}
          {maxRank >= 3 && (
            <ReferenceLine
              y={topZone + 0.5}
              stroke="rgba(34, 197, 94, 0.3)"
              strokeWidth={2}
              strokeDasharray="5 5"
              label={{ value: '상위권', position: 'right', fill: '#22c55e' }}
            />
          )}
          {maxRank >= 7 && (
            <ReferenceLine
              y={midZone + 0.5}
              stroke="rgba(251, 191, 36, 0.3)"
              strokeWidth={2}
              strokeDasharray="5 5"
              label={{ value: '중위권', position: 'right', fill: '#fbbf24' }}
            />
          )}

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            strokeOpacity={0.5}
            vertical={false}
            className="dark:stroke-gray-700"
          />
          <XAxis
            dataKey="year"
            stroke="#6b7280"
            tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
            tickLine={{ stroke: '#6b7280' }}
            label={{
              value: '연도',
              position: 'insideBottom',
              offset: -10,
              style: {
                fill: '#6b7280',
                fontSize: 14,
                fontWeight: 600,
              },
            }}
            className="dark:text-gray-400"
          />
          <YAxis
            stroke="#6b7280"
            tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }}
            tickLine={{ stroke: '#6b7280' }}
            reversed
            domain={yDomain}
            ticks={Array.from({ length: maxRank }, (_, i) => i + 1)}
            label={{
              value: '순위',
              angle: -90,
              position: 'insideLeft',
              style: {
                fill: '#6b7280',
                fontSize: 14,
                fontWeight: 600,
              },
            }}
            className="dark:text-gray-400"
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: '#94a3b8',
              strokeWidth: 1,
              strokeDasharray: '5 5',
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
            formatter={value => value}
            iconSize={16}
          />
          {data.series.map((series, index) => {
            const teamColor = getTeamColor(series.team, index)
            return (
              <Line
                key={series.team}
                type="monotone"
                dataKey={series.team}
                stroke={teamColor}
                strokeWidth={3}
                dot={{
                  r: 5,
                  fill: teamColor,
                  strokeWidth: 2,
                  stroke: '#fff',
                }}
                activeDot={{
                  r: 8,
                  fill: teamColor,
                  strokeWidth: 3,
                  stroke: '#fff',
                  style: { filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' },
                }}
                connectNulls={false}
                isAnimationActive={true}
                animationDuration={500}
              />
            )
          })}
        </LineChart>
      </ResponsiveContainer>
      <LegendChips
        items={legendItems}
        className="mt-6 flex-wrap gap-3 justify-center"
      />
    </ChartContainer>
  )
}

export default memo(RankTrajectoryChart)
