'use client'

import { memo, useState } from 'react'
import type {
  BattingRecord,
  PitchingRecord,
} from '@/lib/dataset/loadPlayerStats'
import type { PlayerMetricKey } from '@/lib/chart/transformPlayer'
import { formatNumber } from '@/lib/chart/format'

interface PlayerDataTableProps {
  records: (BattingRecord | PitchingRecord)[]
  playerType: 'batter' | 'pitcher'
  selectedMetric: PlayerMetricKey
}

function PlayerDataTable({
  records,
  playerType,
  selectedMetric,
}: PlayerDataTableProps) {
  const [displayCount, setDisplayCount] = useState(20)

  // 최근 데이터 순으로 정렬 (연도 내림차순)
  const sortedRecords = [...records].sort((a, b) => b.Year - a.Year)
  const displayedRecords = sortedRecords.slice(0, displayCount)
  const hasMore = sortedRecords.length > displayCount

  // 더보기 버튼 클릭 핸들러
  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + 20, sortedRecords.length))
  }

  if (records.length === 0) {
    return (
      <div className="card-sporty">
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          데이터가 없습니다
        </p>
      </div>
    )
  }

  // 타자/투수에 따른 컬럼 정의
  const batterColumns = [
    { key: 'Year', label: '연도' },
    { key: 'Team', label: '팀' },
    {
      key: 'WAR',
      label: 'WAR',
      format: (v: number) => formatNumber(v, { decimals: 2 }),
    },
    {
      key: 'OPS',
      label: 'OPS',
      format: (v: number) => formatNumber(v, { decimals: 3 }),
    },
    {
      key: 'PA',
      label: '타석',
      format: (v: number) => formatNumber(v, { decimals: 0 }),
    },
    {
      key: 'AB',
      label: '타수',
      format: (v: number) => formatNumber(v, { decimals: 0 }),
    },
    {
      key: 'H',
      label: '안타',
      format: (v: number) => formatNumber(v, { decimals: 0 }),
    },
    {
      key: 'HR',
      label: '홈런',
      format: (v: number) => formatNumber(v, { decimals: 0 }),
    },
  ]

  const pitcherColumns = [
    { key: 'Year', label: '연도' },
    { key: 'Team', label: '팀' },
    {
      key: 'WAR',
      label: 'WAR',
      format: (v: number) => formatNumber(v, { decimals: 2 }),
    },
    {
      key: 'ERA',
      label: 'ERA',
      format: (v: number) => formatNumber(v, { decimals: 2 }),
    },
    {
      key: 'FIP',
      label: 'FIP',
      format: (v: number) => formatNumber(v, { decimals: 2 }),
    },
    {
      key: 'IP',
      label: '이닝',
      format: (v: number) => formatNumber(v, { decimals: 2 }),
    },
    {
      key: 'WHIP',
      label: 'WHIP',
      format: (v: number) => formatNumber(v, { decimals: 2 }),
    },
    {
      key: 'K9',
      label: 'K9',
      format: (v: number) => formatNumber(v, { decimals: 2 }),
    },
    {
      key: 'BB9',
      label: 'BB9',
      format: (v: number) => formatNumber(v, { decimals: 2 }),
    },
    {
      key: 'KBB',
      label: 'K/BB',
      format: (v: number) => formatNumber(v, { decimals: 2 }),
    },
  ]

  const columns = playerType === 'batter' ? batterColumns : pitcherColumns

  return (
    <div className="card-sporty animate-fade-in overflow-x-auto">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        시즌별 상세 데이터
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-700">
              {columns.map(col => {
                const isSelectedMetric = col.key === selectedMetric
                return (
                  <th
                    key={col.key}
                    className={`px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 ${
                      isSelectedMetric
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : ''
                    }`}
                  >
                    {col.label}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {displayedRecords.map((record, index) => (
              <tr
                key={`${record.Year}-${record.Team}-${index}`}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                {columns.map(col => {
                  let rawValue = record[col.key as keyof typeof record]

                  // 파생 지표(K9, BB9, K/BB)는 실시간 계산
                  if (playerType === 'pitcher') {
                    const pitchingRecord = record as PitchingRecord
                    const ip =
                      typeof pitchingRecord.IP === 'number' &&
                      pitchingRecord.IP > 0
                        ? pitchingRecord.IP
                        : 0
                    if (col.key === 'K9') {
                      const so =
                        typeof pitchingRecord.SO === 'number'
                          ? pitchingRecord.SO
                          : 0
                      rawValue = ip > 0 ? (so * 9) / ip : 0
                    } else if (col.key === 'BB9') {
                      const bb =
                        typeof pitchingRecord.BB === 'number'
                          ? pitchingRecord.BB
                          : 0
                      rawValue = ip > 0 ? (bb * 9) / ip : 0
                    } else if (col.key === 'KBB') {
                      const so =
                        typeof pitchingRecord.SO === 'number'
                          ? pitchingRecord.SO
                          : 0
                      const bb =
                        typeof pitchingRecord.BB === 'number'
                          ? pitchingRecord.BB
                          : 0
                      rawValue = bb > 0 ? so / bb : 0
                    }
                  }

                  const value = rawValue
                  const isSelectedMetric = col.key === selectedMetric
                  let displayValue: string | number

                  if (typeof value === 'number' && col.format) {
                    displayValue = col.format(value)
                  } else if (value !== null && value !== undefined) {
                    displayValue = String(value)
                  } else {
                    displayValue = '-'
                  }

                  return (
                    <td
                      key={col.key}
                      className={`px-4 py-3 text-sm text-gray-700 dark:text-gray-300 ${
                        isSelectedMetric
                          ? 'bg-blue-50 dark:bg-blue-900/20 font-semibold text-blue-700 dark:text-blue-300'
                          : ''
                      }`}
                    >
                      {displayValue}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 더보기 버튼 */}
      {hasMore && (
        <div className="flex justify-center items-center py-4">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all hover:scale-105 active:scale-95"
          >
            더보기 ({sortedRecords.length - displayCount}개 남음)
          </button>
        </div>
      )}
      {!hasMore && displayedRecords.length > 0 && (
        <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
          모든 데이터를 불러왔습니다 ({sortedRecords.length}개)
        </div>
      )}
    </div>
  )
}

export default memo(PlayerDataTable)
