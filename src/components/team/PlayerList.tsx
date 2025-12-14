'use client'

import { formatNumber } from '@/lib/chart/format'

interface BattingPlayer {
  Name: string
  WAR: number
  OPS: number
  PA: number
  AB: number
  H: number
  HR: number
}

interface PitchingPlayer {
  Name: string
  WAR: number
  ERA: number
  FIP: number
  IP: number
}

interface PlayerListProps {
  batters: BattingPlayer[]
  pitchers: PitchingPlayer[]
}

export default function PlayerList({ batters, pitchers }: PlayerListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 타자 리스트 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">타자 TOP 10</h3>
        <div className="space-y-3">
          {batters.length === 0 ? (
            <p className="text-sm text-gray-500">데이터가 없습니다</p>
          ) : (
            batters.map((player, index) => (
              <div
                key={`${player.Name}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500 w-6">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {player.Name}
                    </span>
                  </div>
                  <div className="ml-8 mt-1 text-xs text-gray-600">
                    OPS: {formatNumber(player.OPS, { decimals: 3 })}
                    {player.PA > 0 && (
                      <span className="ml-2">
                        PA: {formatNumber(player.PA, { decimals: 0 })}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-blue-600">
                    {formatNumber(player.WAR)} WAR
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 투수 리스트 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">투수 TOP 10</h3>
        <div className="space-y-3">
          {pitchers.length === 0 ? (
            <p className="text-sm text-gray-500">데이터가 없습니다</p>
          ) : (
            pitchers.map((player, index) => (
              <div
                key={`${player.Name}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500 w-6">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {player.Name}
                    </span>
                  </div>
                  <div className="ml-8 mt-1 text-xs text-gray-600">
                    ERA: {formatNumber(player.ERA, { decimals: 2 })}
                    <span className="ml-2">
                      FIP: {formatNumber(player.FIP, { decimals: 2 })}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-blue-600">
                    {formatNumber(player.WAR)} WAR
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
