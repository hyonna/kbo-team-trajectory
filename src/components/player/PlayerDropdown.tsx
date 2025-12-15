'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

interface PlayerDropdownProps {
  players: string[]
  selectedPlayer: string | null
  playerType: 'batter' | 'pitcher'
  selectedYear: number
  selectedTeam: string | null
  selectedMetric: string
  compact?: boolean
  disabled?: boolean
}

export default function PlayerDropdown({
  players,
  selectedPlayer,
  playerType,
  selectedYear,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectedTeam: _selectedTeam,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectedMetric: _selectedMetric,
  compact = false,
  disabled = false,
}: PlayerDropdownProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isInitialMount = useRef(true)
  const [player, setPlayer] = useState<string>(selectedPlayer || '')

  // URL 동기화 (선택 시) - disabled일 때는 업데이트하지 않음
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    // disabled 상태이거나 player가 비어있으면 업데이트하지 않음
    if (disabled || !player) {
      return
    }

    // 현재 URL 파라미터 읽기 (useEffect 내부에서만 읽기)
    const currentPlayer = searchParams.get('player')
    const newPlayer = player

    // player가 실제로 변경되었는지 확인
    if (currentPlayer === newPlayer) {
      return
    }

    // 현재 URL의 다른 파라미터들을 유지
    const params = new URLSearchParams()
    params.set('type', playerType)

    // 현재 URL에서 다른 파라미터들을 가져와서 유지
    const currentYear = searchParams.get('year')
    const currentTeam = searchParams.get('team')
    const currentMetric = searchParams.get('metric')

    if (currentYear) {
      params.set('year', currentYear)
    } else {
      // year가 없으면 prop에서 가져오기
      params.set('year', selectedYear.toString())
    }

    if (currentTeam) {
      params.set('team', currentTeam)
    }

    if (player) {
      params.set('player', player)
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
  }, [player, playerType, selectedYear, router, disabled])

  // 외부에서 선택된 값이 바뀔 때 반영
  useEffect(() => {
    setPlayer(selectedPlayer || '')
  }, [selectedPlayer])

  if (compact) {
    return (
      <select
        value={player}
        onChange={e => setPlayer(e.target.value)}
        disabled={disabled}
        className={`w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all ${
          disabled
            ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-900'
            : ''
        }`}
      >
        <option value="">
          {disabled ? '연도와 팀을 먼저 선택하세요' : '선수를 선택하세요'}
        </option>
        {players.map(p => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    )
  }

  return (
    <div className="card-sporty animate-fade-in">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        선수 선택
      </label>
      <select
        value={player}
        onChange={e => setPlayer(e.target.value)}
        disabled={disabled}
        className={`w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all ${
          disabled
            ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-900'
            : ''
        }`}
      >
        <option value="">
          {disabled ? '연도와 팀을 먼저 선택하세요' : '선수를 선택하세요'}
        </option>
        {players.map(p => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {disabled
          ? '연도와 팀을 선택하면 해당 조건의 선수 목록이 표시됩니다'
          : '검색 없이 드롭다운에서 선수를 선택하세요'}
      </p>
    </div>
  )
}
