'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

interface TeamSelectorProps {
  availableTeams: string[]
  selectedTeam: string | null
  playerType: 'batter' | 'pitcher'
  selectedYear: number
  selectedPlayer?: string | null
  selectedMetric: string
  compact?: boolean
}

export default function TeamSelector({
  availableTeams,
  selectedTeam,
  playerType,
  selectedYear,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectedPlayer: _selectedPlayer,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectedMetric: _selectedMetric,
  compact = false,
}: TeamSelectorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isInitialMount = useRef(true)

  const [team, setTeam] = useState<string>(selectedTeam || '')

  // selectedTeam이 변경될 때 state 동기화
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const newTeamValue = selectedTeam || ''
    if (newTeamValue !== team) {
      setTeam(newTeamValue)
    }
  }, [selectedTeam, team])

  // URL search params 동기화 (team state가 변경될 때만)
  useEffect(() => {
    if (isInitialMount.current) {
      return
    }

    // 현재 URL 파라미터 읽기 (useEffect 내부에서만 읽기)
    const currentTeam = searchParams.get('team')
    const newTeam = team || null

    // team이 실제로 변경되었는지 확인
    if (currentTeam === newTeam) {
      return
    }

    // 현재 URL의 다른 파라미터들을 유지
    const params = new URLSearchParams()
    params.set('type', playerType)

    // 현재 URL에서 다른 파라미터들을 가져와서 유지
    const currentYear = searchParams.get('year')
    const currentPlayer = searchParams.get('player')
    const currentMetric = searchParams.get('metric')

    if (currentYear) {
      params.set('year', currentYear)
    } else {
      // year가 없으면 prop에서 가져오기
      params.set('year', selectedYear.toString())
    }

    if (newTeam) {
      params.set('team', newTeam)
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
  }, [team, router, playerType, selectedYear])

  if (compact) {
    return (
      <select
        value={team}
        onChange={e => setTeam(e.target.value)}
        className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
      >
        <option value="">전체 팀</option>
        {availableTeams.map(t => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    )
  }

  return (
    <div className="card-sporty animate-fade-in">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        팀 선택
      </label>
      <select
        value={team}
        onChange={e => setTeam(e.target.value)}
        className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
      >
        <option value="">전체 팀</option>
        {availableTeams.map(t => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {selectedYear}년에 존재하는 팀만 표시됩니다
      </p>
    </div>
  )
}
