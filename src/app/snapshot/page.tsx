import SnapshotBarChartWithDelta from '@/components/charts/SnapshotBarChartWithDelta'
import MetricSelector from '@/components/snapshot/MetricSelector'
import YearSelector from '@/components/snapshot/YearSelector'
import { PageSkeleton } from '@/components/ui/Skeleton'
import type { MetricKey } from '@/lib/chart/types'
import { getYears, loadTeamSeasons } from '@/lib/dataset/loadTeamSeason'
import { Suspense } from 'react'

interface SnapshotPageProps {
  searchParams: Promise<{
    year?: string
    metric?: string
  }>
}

interface SnapshotContentProps {
  searchParams: {
    year?: string
    metric?: string
  }
}

async function SnapshotContent({ searchParams }: SnapshotContentProps) {
  const params = searchParams

  // 데이터 로드
  const allData = loadTeamSeasons()
  const availableYears = getYears()

  // URL params 파싱
  const selectedYear = params.year
    ? Number(params.year)
    : availableYears[availableYears.length - 1]

  const metric: 'powerScore' | 'totalWar' =
    (params.metric as 'powerScore' | 'totalWar') || 'powerScore'

  // 전년도 계산
  const currentYearIndex = availableYears.indexOf(selectedYear)
  const previousYear =
    currentYearIndex > 0 ? availableYears[currentYearIndex - 1] : undefined

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4 md:p-8">
      <div className="mx-auto space-y-6">
        {/* 헤더 */}
        <div className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-extrabold gradient-text mb-1">
            연도별 팀 성적 비교
          </h1>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            기준 연도와 지표를 선택해 팀별 전력과 전년 대비 변화를 비교합니다.
          </p>
        </div>

        {/* 대시보드 레이아웃: 좌측 사이드바 + 우측 차트 */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          {/* 사이드바: 연도 / 지표 선택 */}
          <aside className="w-full md:w-72 lg:w-80 shrink-0 md:sticky md:top-24 self-start space-y-4">
            <YearSelector
              availableYears={availableYears}
              initialYear={selectedYear}
            />
            <MetricSelector initialMetric={metric} />
          </aside>

          {/* 메인 차트 영역 */}
          <section className="flex-1">
            <SnapshotBarChartWithDelta
              rows={allData}
              year={selectedYear}
              metric={metric as MetricKey}
              previousYear={previousYear}
            />
          </section>
        </div>
      </div>
    </main>
  )
}

export default async function SnapshotPage({
  searchParams,
}: SnapshotPageProps) {
  const resolvedParams = await searchParams

  return (
    <Suspense fallback={<PageSkeleton />}>
      <SnapshotContent searchParams={resolvedParams} />
    </Suspense>
  )
}
