'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

interface PlayerSelectorProps {
  players: string[]
  selectedPlayer: string | null
  playerType: 'batter' | 'pitcher'
  selectedYear: number
  selectedTeam: string | null
  selectedMetric: string
  placeholder?: string
}

export default function PlayerSelector({
  players,
  selectedPlayer,
  playerType,
  selectedYear,
  selectedTeam,
  selectedMetric,
  placeholder = '선수 이름 검색...',
}: PlayerSelectorProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPlayers = useMemo(() => {
    if (!searchQuery.trim()) {
      return players.slice(0, 50) // 검색어가 없으면 최대 50개만 표시
    }
    return players.filter(player => player.includes(searchQuery)).slice(0, 50)
  }, [players, searchQuery])

  const handleSelect = (player: string) => {
    const params = new URLSearchParams()
    params.set('type', playerType)
    params.set('year', selectedYear.toString())
    if (selectedTeam) {
      params.set('team', selectedTeam)
    }
    params.set('player', player)
    params.set('metric', selectedMetric)
    router.push(`/player?${params.toString()}`)
    setSearchQuery('')
  }

  return (
    <div className="card-sporty animate-fade-in">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        선수 검색
      </label>

      <div className="space-y-3">
        {/* 검색 입력 필드 */}
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
        />

        {/* 선수 목록 */}
        {searchQuery.trim() && (
          <div className="max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            {filteredPlayers.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                검색 결과가 없습니다
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredPlayers.map(player => (
                  <button
                    key={player}
                    type="button"
                    onClick={() => handleSelect(player)}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                      selectedPlayer === player
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {player}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 선택된 선수 표시 */}
        {selectedPlayer && (
          <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              선택된 선수:
            </p>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {selectedPlayer}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
