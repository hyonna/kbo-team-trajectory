'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import type { MetricKey } from '@/lib/chart/types'

interface FilterBarProps {
  availableTeams: string[]
  availableYears: number[]
  initialTeams?: string[]
  initialYearRange?: { from: number; to: number }
  initialMetric?: MetricKey
}

const METRICS: Array<{ value: MetricKey; label: string }> = [
  { value: 'powerRank', label: 'Power Rank' },
  { value: 'powerScore', label: 'Power Score' },
  { value: 'totalWar', label: 'Total WAR' },
  { value: 'batting.ops', label: 'Batting OPS' },
  { value: 'batting.war', label: 'Batting WAR' },
  { value: 'batting.wrcPlus', label: 'wRC+' },
  { value: 'pitching.era', label: 'ERA' },
  { value: 'pitching.fip', label: 'FIP' },
  { value: 'pitching.whip', label: 'WHIP' },
  { value: 'pitching.war', label: 'Pitching WAR' },
]

export default function FilterBar({
  availableTeams,
  availableYears,
  initialTeams = [],
  initialYearRange,
  initialMetric = 'powerRank',
}: FilterBarProps) {
  const router = useRouter()

  const [teams, setTeams] = useState<string[]>(initialTeams)
  const [yearFrom, setYearFrom] = useState<number>(
    initialYearRange?.from || availableYears[0]
  )
  const [yearTo, setYearTo] = useState<number>(
    initialYearRange?.to || availableYears[availableYears.length - 1]
  )
  const [metric, setMetric] = useState<MetricKey>(initialMetric)

  // URL search params 동기화
  useEffect(() => {
    const params = new URLSearchParams()

    if (teams.length > 0) {
      params.set('teams', teams.join(','))
    }
    if (yearFrom !== availableYears[0]) {
      params.set('from', yearFrom.toString())
    }
    if (yearTo !== availableYears[availableYears.length - 1]) {
      params.set('to', yearTo.toString())
    }
    if (metric !== 'powerRank') {
      params.set('metric', metric)
    }

    const newUrl = params.toString()
      ? `/trajectory?${params.toString()}`
      : '/trajectory'

    router.replace(newUrl, { scroll: false })
  }, [teams, yearFrom, yearTo, metric, router, availableYears])

  const handleTeamToggle = (team: string) => {
    setTeams(prev => {
      if (prev.includes(team)) {
        return prev.filter(t => t !== team)
      } else if (prev.length < 4) {
        return [...prev, team]
      }
      return prev
    })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          팀 선택 (최대 4개)
        </label>
        <div className="flex flex-wrap gap-2">
          {availableTeams.map(team => (
            <button
              key={team}
              type="button"
              onClick={() => handleTeamToggle(team)}
              disabled={!teams.includes(team) && teams.length >= 4}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                teams.includes(team)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {team}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            시작 연도
          </label>
          <select
            value={yearFrom}
            onChange={e => setYearFrom(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            종료 연도
          </label>
          <select
            value={yearTo}
            onChange={e => setYearTo(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          지표 선택
        </label>
        <select
          value={metric}
          onChange={e => setMetric(e.target.value as MetricKey)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {METRICS.map(m => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
