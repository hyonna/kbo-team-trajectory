import PlayerDataTable from '@/components/player/PlayerDataTable'
import PlayerDropdown from '@/components/player/PlayerDropdown'
import TeamSelector from '@/components/player/TeamSelector'
import YearSelector from '@/components/player/YearSelector'
import { PageSkeleton } from '@/components/ui/Skeleton'
import {
  buildBatterTrajectoryData,
  buildPitcherTrajectoryData,
  type PlayerMetricKey,
} from '@/lib/chart/transformPlayer'
import {
  getBattersByYearAndTeam,
  getBatterSeasons,
  getPitchersByYearAndTeam,
  getPitcherSeasons,
  getTeamsByYear,
  type BattingRecord,
  type PitchingRecord,
} from '@/lib/dataset/loadPlayerStats'
import { getYears } from '@/lib/dataset/loadTeamSeason'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// 차트 컴포넌트 동적 임포트
const PlayerLineChart = dynamic(
  () => import('@/components/charts/PlayerLineChart'),
  {
    loading: () => (
      <div className="card-sporty h-[500px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ),
    ssr: true,
  }
)

interface PlayerPageProps {
  searchParams: Promise<{
    player?: string
    type?: 'batter' | 'pitcher'
    year?: string
    team?: string
    metric?: string
  }>
}

interface PlayerContentProps {
  searchParams: {
    player?: string
    type?: 'batter' | 'pitcher'
    year?: string
    team?: string
    metric?: string
  }
}

const BATTER_METRICS: Array<{ value: PlayerMetricKey; label: string }> = [
  { value: 'WAR', label: 'WAR' },
  { value: 'OPS', label: 'OPS' },
  { value: 'PA', label: '타석 (PA)' },
  { value: 'AB', label: '타수 (AB)' },
  { value: 'H', label: '안타 (H)' },
  { value: 'HR', label: '홈런 (HR)' },
]

const PITCHER_METRICS: Array<{ value: PlayerMetricKey; label: string }> = [
  { value: 'WAR', label: 'WAR' },
  { value: 'FIP', label: 'FIP' },
  { value: 'ERA', label: 'ERA' },
  { value: 'WHIP', label: 'WHIP' },
  { value: 'IP', label: '이닝 (IP)' },
  { value: 'K9', label: 'K9 (K/9)' },
  { value: 'BB9', label: 'BB9 (BB/9)' },
  { value: 'KBB', label: 'K/BB' },
]

async function PlayerContent({ searchParams }: PlayerContentProps) {
  const params = searchParams
  const playerType = params.type || 'batter'
  const availableYears = getYears()
  const defaultYear = availableYears[availableYears.length - 1]
  const selectedYear = params.year ? Number(params.year) : defaultYear
  const selectedTeam = params.team || null
  const selectedPlayer = params.player || null
  const selectedMetric = (params.metric as PlayerMetricKey) || 'WAR'

  // 선택한 연도에 존재하는 팀 목록
  const availableTeams = getTeamsByYear(selectedYear)

  // 선수 목록 로드 (연도/팀 필터링 적용)
  // 연도와 팀이 모두 선택되어야만 선수 목록 표시
  let availablePlayers: string[] = []
  if (selectedTeam) {
    // 특정 연도와 팀의 선수만 표시
    if (playerType === 'batter') {
      availablePlayers = getBattersByYearAndTeam(selectedYear, selectedTeam)
    } else {
      availablePlayers = getPitchersByYearAndTeam(selectedYear, selectedTeam)
    }
  }

  // 선택된 선수의 데이터
  let trajectoryData = null
  let playerSeasons: Array<BattingRecord | PitchingRecord> = []
  if (selectedPlayer) {
    if (playerType === 'batter') {
      const batterSeasons = getBatterSeasons(selectedPlayer)
      playerSeasons = batterSeasons
      trajectoryData = buildBatterTrajectoryData(batterSeasons, selectedMetric)
    } else {
      const pitcherSeasons = getPitcherSeasons(selectedPlayer)
      playerSeasons = pitcherSeasons
      trajectoryData = buildPitcherTrajectoryData(
        pitcherSeasons,
        selectedMetric
      )
    }
  }

  const availableMetrics =
    playerType === 'batter' ? BATTER_METRICS : PITCHER_METRICS

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4 md:p-8">
      <div className="mx-auto space-y-6">
        {/* 헤더 */}
        <div className="animate-fade-in text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold gradient-text mb-1">
            선수별 추이 분석
          </h1>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            선수 유형·연도·팀·선수를 선택해 시즌별 성적 흐름과 세부 데이터를
            확인합니다.
          </p>
        </div>

        {/* 대시보드 레이아웃: 좌측 사이드바 + 우측 차트/테이블 */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          {/* 사이드바: 필터 카드 */}
          <aside className="w-full md:w-72 lg:w-80 shrink-0 md:sticky md:top-24 self-start">
            <div className="card-sporty animate-fade-in">
              <div className="grid grid-cols-1 gap-4">
                {/* 선수 유형 선택 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    선수 유형
                  </label>
                  <div className="flex gap-2">
                    <a
                      href={`/player?type=batter&year=${selectedYear}${selectedTeam ? `&team=${selectedTeam}` : ''}`}
                      className={`flex-1 px-4 py-2.5 text-center rounded-lg text-sm font-semibold transition-all ${
                        playerType === 'batter'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      타자
                    </a>
                    <a
                      href={`/player?type=pitcher&year=${selectedYear}${selectedTeam ? `&team=${selectedTeam}` : ''}`}
                      className={`flex-1 px-4 py-2.5 text-center rounded-lg text-sm font-semibold transition-all ${
                        playerType === 'pitcher'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      투수
                    </a>
                  </div>
                </div>

                {/* 연도 선택 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    연도
                  </label>
                  <YearSelector
                    availableYears={availableYears}
                    initialYear={selectedYear}
                    playerType={playerType}
                    selectedTeam={selectedTeam}
                    selectedPlayer={selectedPlayer}
                    selectedMetric={selectedMetric}
                    compact={true}
                  />
                </div>

                {/* 팀 선택 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    팀
                  </label>
                  <TeamSelector
                    availableTeams={availableTeams}
                    selectedTeam={selectedTeam}
                    playerType={playerType}
                    selectedYear={selectedYear}
                    selectedPlayer={selectedPlayer}
                    selectedMetric={selectedMetric}
                    compact={true}
                  />
                </div>

                {/* 선수 선택 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    선수
                  </label>
                  <PlayerDropdown
                    players={availablePlayers}
                    selectedPlayer={selectedPlayer}
                    playerType={playerType}
                    selectedYear={selectedYear}
                    selectedTeam={selectedTeam}
                    selectedMetric={selectedMetric}
                    compact={true}
                    disabled={!selectedTeam}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* 메인 영역: 지표 선택 + 차트 + 테이블 */}
          <section className="flex-1 space-y-6">
            {/* 지표 선택 */}
            {selectedPlayer && (
              <div className="card-sporty animate-fade-in">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  지표 선택
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableMetrics.map(m => (
                    <a
                      key={m.value}
                      href={`/player?type=${playerType}&year=${selectedYear}${selectedTeam ? `&team=${selectedTeam}` : ''}&player=${encodeURIComponent(selectedPlayer)}&metric=${m.value}`}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        selectedMetric === m.value
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {m.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* 차트 */}
            {selectedPlayer && trajectoryData && (
              <Suspense
                fallback={
                  <div className="card-sporty h-[500px] flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                }
              >
                <PlayerLineChart
                  data={trajectoryData}
                  metric={selectedMetric}
                  yDomain="auto"
                  title={`${selectedPlayer} - ${availableMetrics.find(m => m.value === selectedMetric)?.label || selectedMetric} 추이`}
                  description={`${playerType === 'batter' ? '타자' : '투수'} ${selectedPlayer}의 시즌별 ${
                    availableMetrics.find(m => m.value === selectedMetric)
                      ?.label || selectedMetric
                  } 추이`}
                />
              </Suspense>
            )}

            {/* 데이터 테이블 */}
            {selectedPlayer && playerSeasons.length > 0 && (
              <PlayerDataTable
                records={playerSeasons}
                playerType={playerType}
                selectedMetric={selectedMetric}
              />
            )}

            {selectedPlayer && !trajectoryData && (
              <div className="card-sporty h-[500px] flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  {selectedPlayer} 선수의 데이터를 찾을 수 없습니다
                </p>
              </div>
            )}

            {!selectedPlayer && (
              <div className="card-sporty p-12 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
                  왼쪽에서 연도와 팀을 선택한 뒤, 선수를 선택해 주세요.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default async function PlayerPage({ searchParams }: PlayerPageProps) {
  const resolvedParams = await searchParams

  return (
    <Suspense fallback={<PageSkeleton />}>
      <PlayerContent searchParams={resolvedParams} />
    </Suspense>
  )
}
