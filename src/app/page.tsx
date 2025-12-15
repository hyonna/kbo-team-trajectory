import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import teamSeasonData from '@/data/derived/team-season.json'
import { buildTrajectoryData } from '@/lib/chart/transform'
import type { TeamSeason } from '@/lib/chart/types'
import { getTeamsByYear } from '@/lib/dataset/getTeamsByYear'
import { getYears } from '@/lib/dataset/loadTeamSeason'
import YearSelector from '@/components/home/YearSelector'
import { PageSkeleton } from '@/components/ui/Skeleton'

// 차트 컴포넌트 동적 임포트 (코드 스플리팅)
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

const SnapshotBarChart = dynamic(
  () => import('@/components/charts/SnapshotBarChart'),
  {
    loading: () => (
      <div className="card-sporty h-[500px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ),
    ssr: true,
  }
)

function ChartSection({
  rankData,
  totalWarData,
  rows,
  selectedYear,
  teamsForYear,
}: {
  rankData: ReturnType<typeof buildTrajectoryData>
  totalWarData: ReturnType<typeof buildTrajectoryData>
  rows: TeamSeason[]
  selectedYear: number
  teamsForYear: string[]
}) {
  return (
    <>
      <Suspense
        fallback={
          <div className="card-sporty h-[500px] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <RankTrajectoryChart data={rankData} maxRank={10} />
      </Suspense>

      <Suspense
        fallback={
          <div className="card-sporty h-[500px] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <TrajectoryLineChart
          data={totalWarData}
          metric="totalWar"
          yDomain="auto"
        />
      </Suspense>

      <Suspense
        fallback={
          <div className="card-sporty h-[500px] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <SnapshotBarChart
          rows={rows}
          year={selectedYear}
          metric="powerScore"
          teams={teamsForYear}
        />
      </Suspense>
    </>
  )
}

interface HomePageProps {
  searchParams: Promise<{ year?: string }>
}

interface HomeContentProps {
  searchParams: { year?: string }
}

async function HomeContent({ searchParams }: HomeContentProps) {
  const rows = teamSeasonData as TeamSeason[]
  const availableYears = getYears()

  // 선택된 연도 (URL 파라미터 또는 최신 연도)
  const selectedYear = searchParams.year
    ? Number(searchParams.year)
    : availableYears[availableYears.length - 1]

  // 선택된 연도에 존재하는 팀 목록
  const teamsForYear = getTeamsByYear(rows, selectedYear)

  // 연도 범위 (전체)
  const allYears = { from: 1982, to: 2025 }

  // RankTrajectoryChart용 데이터 (선택된 연도에 존재하는 팀만 표시)
  const rankData = buildTrajectoryData(
    rows,
    teamsForYear,
    allYears,
    'powerRank'
  )

  // TrajectoryLineChart용 데이터
  const totalWarData = buildTrajectoryData(
    rows,
    teamsForYear,
    allYears,
    'totalWar'
  )

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4 md:p-8">
      <div className="mx-auto space-y-6">
        {/* 헤더 */}
        <div className="animate-fade-in text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold gradient-text mb-1">
            KBO Team Trajectory
          </h1>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            기준 연도를 선택해, 해당 시즌 기준으로 팀 전력 흐름을 대시보드로
            확인합니다.
          </p>
        </div>

        {/* 대시보드 레이아웃: 좌측 고정 사이드바 + 우측 차트 영역 */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          {/* 사이드바: 기준 연도 선택 (스크롤 시 상단 고정) */}
          <aside className="w-full md:w-72 lg:w-80 shrink-0 md:sticky md:top-24 self-start">
            <YearSelector
              availableYears={availableYears}
              initialYear={selectedYear}
            />
          </aside>

          {/* 메인 차트 영역 */}
          <section className="flex-1 space-y-6">
            <ChartSection
              rankData={rankData}
              totalWarData={totalWarData}
              rows={rows}
              selectedYear={selectedYear}
              teamsForYear={teamsForYear}
            />
          </section>
        </div>
      </div>
    </main>
  )
}

export default async function Home({ searchParams }: HomePageProps) {
  const resolvedParams = await searchParams

  return (
    <Suspense fallback={<PageSkeleton />}>
      <HomeContent searchParams={resolvedParams} />
    </Suspense>
  )
}
