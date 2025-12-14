import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import FilterBar from '@/components/trajectory/FilterBar'
import TeamSummaryCards from '@/components/trajectory/TeamSummaryCards'
import { buildTrajectoryData } from '@/lib/chart/transform'
import type { MetricKey } from '@/lib/chart/types'
import {
  getTeams,
  getYears,
  loadTeamSeasons,
} from '@/lib/dataset/loadTeamSeason'

// 차트 컴포넌트 동적 임포트
const RankTrajectoryChart = dynamic(
  () => import('@/components/charts/RankTrajectoryChart'),
  {
    loading: () => (
      <div className="card-sporty h-[500px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ),
    ssr: true,
  }
)

const TrajectoryLineChart = dynamic(
  () => import('@/components/charts/TrajectoryLineChart'),
  {
    loading: () => (
      <div className="card-sporty h-[500px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ),
    ssr: true,
  }
)

interface TrajectoryPageProps {
  searchParams: Promise<{
    teams?: string
    from?: string
    to?: string
    metric?: string
  }>
}

interface TrajectoryContentProps {
  searchParams: {
    teams?: string
    from?: string
    to?: string
    metric?: string
  }
}

async function TrajectoryContent({ searchParams }: TrajectoryContentProps) {
  const params = searchParams
  const teamsParam = params.teams
  const fromParam = params.from
  const toParam = params.to
  const metricParam = params.metric

  // 데이터 로드
  const allData = loadTeamSeasons()
  const availableTeams = getTeams()
  const availableYears = getYears()

  // URL params 파싱
  const selectedTeams =
    teamsParam && teamsParam.length > 0
      ? teamsParam.split(',').filter(t => availableTeams.includes(t))
      : []

  const yearFrom = fromParam ? Number(fromParam) : availableYears[0]
  const yearTo = toParam
    ? Number(toParam)
    : availableYears[availableYears.length - 1]

  const metric: MetricKey = (metricParam as MetricKey) || 'powerRank'

  // 차트 데이터 생성
  const displayTeams =
    selectedTeams.length > 0 ? selectedTeams : availableTeams.slice(0, 4)

  const trajectoryData = buildTrajectoryData(
    allData,
    displayTeams,
    { from: yearFrom, to: yearTo },
    metric
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-extrabold gradient-text mb-4">
            팀 추이 분석
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            팀별 성적 추이를 시각화하고 비교합니다
          </p>
        </div>

        <FilterBar
          availableTeams={availableTeams}
          availableYears={availableYears}
          initialTeams={selectedTeams}
          initialYearRange={{ from: yearFrom, to: yearTo }}
          initialMetric={metric}
        />

        <Suspense
          fallback={
            <div className="card-sporty h-[500px] flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
        >
          {metric === 'powerRank' ? (
            <RankTrajectoryChart data={trajectoryData} maxRank={10} />
          ) : (
            <TrajectoryLineChart
              data={trajectoryData}
              metric={metric}
              yDomain="auto"
            />
          )}
        </Suspense>

        {selectedTeams.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">팀 요약</h2>
            <TeamSummaryCards data={allData} teams={selectedTeams} />
          </div>
        )}
      </div>
    </div>
  )
}

export default async function TrajectoryPage({
  searchParams,
}: TrajectoryPageProps) {
  const resolvedParams = await searchParams

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrajectoryContent searchParams={resolvedParams} />
    </Suspense>
  )
}
