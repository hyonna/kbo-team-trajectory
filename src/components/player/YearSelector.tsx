'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

interface YearSelectorProps {
  availableYears: number[]
  initialYear?: number
  playerType: 'batter' | 'pitcher'
  selectedTeam?: string | null
  selectedPlayer?: string | null
  selectedMetric: string
  compact?: boolean
}

export default function YearSelector({
  availableYears,
  initialYear,
  playerType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectedTeam: _selectedTeam,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectedPlayer: _selectedPlayer,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectedMetric: _selectedMetric,
  compact = false,
}: YearSelectorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isInitialMount = useRef(true)
  const defaultYear = availableYears[availableYears.length - 1]

  const [year, setYear] = useState<number>(initialYear || defaultYear)

  // initialYear이 변경될 때 state 동기화
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    if (initialYear !== undefined && initialYear !== year) {
      setYear(initialYear)
    }
  }, [initialYear, year])

  // URL search params 동기화 (year state가 변경될 때만)
  useEffect(() => {
    if (isInitialMount.current) {
      return
    }

    // 현재 URL 파라미터 읽기 (useEffect 내부에서만 읽기)
    const currentYear = searchParams.get('year')
    const newYear = year.toString()

    // year가 실제로 변경되었는지 확인
    if (currentYear === newYear) {
      return
    }

    // 현재 URL의 다른 파라미터들을 유지
    const params = new URLSearchParams()
    params.set('type', playerType)
    params.set('year', newYear)

    // 현재 URL에서 다른 파라미터들을 가져와서 유지
    const currentTeam = searchParams.get('team')
    const currentPlayer = searchParams.get('player')
    const currentMetric = searchParams.get('metric')

    if (currentTeam) {
      params.set('team', currentTeam)
    }
    if (currentPlayer) {
      params.set('player', currentPlayer)
    }
    if (currentMetric && currentMetric !== 'WAR') {
      params.set('metric', currentMetric)
    }

    // URL 파라미터를 문자열로 비교하여 실제 변경이 있을 때만 업데이트
    const newUrlParams = params.toString()
    const currentUrlParams = searchParams.toString()

    if (newUrlParams !== currentUrlParams) {
      router.replace(`/player?${newUrlParams}`, { scroll: false })
    }
    // searchParams는 의존성에서 제거 - useEffect 내부에서만 읽기
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, router, playerType])

  if (compact) {
    return (
      <select
        value={year}
        onChange={e => setYear(Number(e.target.value))}
        className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
      >
        {availableYears.map(y => (
          <option key={y} value={y}>
            {y}년
          </option>
        ))}
      </select>
    )
  }

  return (
    <div className="card-sporty animate-fade-in">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        연도 선택
      </label>
      <select
        value={year}
        onChange={e => setYear(Number(e.target.value))}
        className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
      >
        {availableYears.map(y => (
          <option key={y} value={y}>
            {y}년
          </option>
        ))}
      </select>
    </div>
  )
}
