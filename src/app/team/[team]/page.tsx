import { Suspense } from 'react'
import YearSelector from '@/components/team/YearSelector'
import PlayerList from '@/components/team/PlayerList'
import TrajectoryLineChart from '@/components/charts/TrajectoryLineChart'
import { loadTeamSeasons, getTeamSeasons } from '@/lib/dataset/loadTeamSeason'
import { getTopBatters, getTopPitchers } from '@/lib/dataset/loadRawStats'
import { buildTrajectoryData } from '@/lib/chart/transform'

interface TeamPageProps {
  params: Promise<{ team: string }>
  searchParams: Promise<{ year?: string }>
}

interface TeamContentProps {
  team: string
  searchParams: { year?: string }
}

async function TeamContent({ team, searchParams }: TeamContentProps) {
  const params = searchParams

  // 팀 데이터 로드
  const allData = loadTeamSeasons()
  const teamSeasons = getTeamSeasons(team)

  if (teamSeasons.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              팀을 찾을 수 없습니다
            </h1>
            <p className="text-gray-600">
              &quot;{team}&quot; 팀의 데이터가 없습니다.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // 팀의 연도 목록
  const teamYears = teamSeasons.map(s => s.year).sort((a, b) => a - b)

  // 선택된 연도 (또는 최신 연도)
  const selectedYear = params.year
    ? Number(params.year)
    : teamYears[teamYears.length - 1]

  // 해당 연도의 TOP 선수들
  const topBatters = getTopBatters(team, selectedYear, 10)
  const topPitchers = getTopPitchers(team, selectedYear, 10)

  // 타자 데이터 변환
  const battersForDisplay = topBatters.map(b => ({
    Name: b.Name,
    WAR: b.WAR || 0,
    OPS: b.OPS || 0,
    PA: b.PA || 0,
    AB: b.AB || 0,
    H: b.H || 0,
    HR: b.HR || 0,
  }))

  // 투수 데이터 변환
  const pitchersForDisplay = topPitchers.map(p => ({
    Name: p.Name,
    WAR: p.WAR || 0,
    ERA: p.ERA || 0,
    FIP: p.FIP || 0,
    IP: p.IP || 0,
  }))

  // 차트용 데이터 생성 (팀의 연도별 트렌드)
  const trajectoryData = buildTrajectoryData(
    allData,
    [team],
    { from: teamYears[0], to: teamYears[teamYears.length - 1] },
    'powerScore'
  )

  const totalWarData = buildTrajectoryData(
    allData,
    [team],
    { from: teamYears[0], to: teamYears[teamYears.length - 1] },
    'totalWar'
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-extrabold gradient-text mb-4">{team}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            팀별 성적 추이 및 선수 통계
          </p>
        </div>

        {/* 연도별 트렌드 차트 */}
        <div className="space-y-6">
          <TrajectoryLineChart
            data={trajectoryData}
            metric="powerScore"
            yDomain="auto"
            title={`${team} Power Score 추이`}
            description={`${teamYears[0]}년부터 ${teamYears[teamYears.length - 1]}년까지의 Power Score 변화입니다.`}
          />

          <TrajectoryLineChart
            data={totalWarData}
            metric="totalWar"
            yDomain="auto"
            title={`${team} Total WAR 추이`}
            description={`${teamYears[0]}년부터 ${teamYears[teamYears.length - 1]}년까지의 Total WAR 변화입니다.`}
          />
        </div>

        {/* 연도 선택 및 선수 리스트 */}
        <div className="space-y-6">
          <YearSelector availableYears={teamYears} initialYear={selectedYear} />

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {selectedYear}년 TOP 선수
            </h2>
            <PlayerList
              batters={battersForDisplay}
              pitchers={pitchersForDisplay}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function TeamPage({
  params,
  searchParams,
}: TeamPageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  // URL 디코딩
  const team = decodeURIComponent(resolvedParams.team)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TeamContent team={team} searchParams={resolvedSearchParams} />
    </Suspense>
  )
}
