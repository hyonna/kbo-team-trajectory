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
        <div
          key={team.team}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">{team.team}</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">연도</span>
              <span className="text-sm font-medium text-gray-900">
                {team.year}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Power Rank</span>
              <span className="text-sm font-medium text-gray-900">
                {formatNumber(team.powerRank, { decimals: 0, unit: '위' })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Power Score</span>
              <span className="text-sm font-medium text-gray-900">
                {formatNumber(team.powerScore)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total WAR</span>
              <span className="text-sm font-medium text-gray-900">
                {formatNumber(team.totalWar)}
              </span>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="text-xs text-gray-500 mb-2">타자</div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">OPS</span>
                  <span className="text-xs font-medium text-gray-900">
                    {formatNumber(team.batting.ops, { decimals: 3 })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">WAR</span>
                  <span className="text-xs font-medium text-gray-900">
                    {formatNumber(team.batting.battingWar)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">wRC+</span>
                  <span className="text-xs font-medium text-gray-900">
                    {formatNumber(team.batting.wrcPlus, { decimals: 1 })}
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="text-xs text-gray-500 mb-2">투수</div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">ERA</span>
                  <span className="text-xs font-medium text-gray-900">
                    {formatNumber(team.pitching.era, { decimals: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">FIP</span>
                  <span className="text-xs font-medium text-gray-900">
                    {formatNumber(team.pitching.fip, { decimals: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">WAR</span>
                  <span className="text-xs font-medium text-gray-900">
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
