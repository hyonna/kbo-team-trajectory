'use client'

import type { TeamSeason } from '@/lib/chart/types'
import { formatNumber } from '@/lib/chart/format'

interface TeamSummaryCardsProps {
  data: TeamSeason[]
  teams: string[]
}

export default function TeamSummaryCards({
  data,
  teams,
}: TeamSummaryCardsProps) {
  // 각 팀의 마지막 연도 데이터 찾기
  const latestData = teams
    .map(team => {
      const teamData = data
        .filter(row => row.team === team)
        .sort((a, b) => b.year - a.year)
      return teamData.length > 0 ? teamData[0] : null
    })
    .filter((item): item is TeamSeason => item !== null)

  if (latestData.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {latestData.map(team => (
        <div key={team.team} className="card-sporty animate-fade-in">
          <h3 className="text-xl font-bold gradient-text mb-4">{team.team}</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                연도
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {team.year}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Power Rank
              </span>
              <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {formatNumber(team.powerRank, { decimals: 0, unit: '위' })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Power Score
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {formatNumber(team.powerScore)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Total WAR
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {formatNumber(team.totalWar)}
              </span>
            </div>
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                타자
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    OPS
                  </span>
                  <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                    {formatNumber(team.batting.ops, { decimals: 3 })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    WAR
                  </span>
                  <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                    {formatNumber(team.batting.battingWar)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    wRC+
                  </span>
                  <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                    {formatNumber(team.batting.wrcPlus, { decimals: 1 })}
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                투수
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    ERA
                  </span>
                  <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                    {formatNumber(team.pitching.era, { decimals: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    FIP
                  </span>
                  <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                    {formatNumber(team.pitching.fip, { decimals: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    WAR
                  </span>
                  <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                    {formatNumber(team.pitching.pitchingWar)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
