import type { TeamSeason, MetricKey } from './types'
import { getMetric } from './selectors'

export interface SeriesPoint {
  x: number // year
  y: number // metric value
  raw: TeamSeason | null // 원본 데이터 (결측치면 null)
}

export interface TeamSeries {
  team: string
  points: SeriesPoint[]
}

export interface TrajectoryData {
  years: number[]
  series: TeamSeries[]
}

/**
 * TeamSeason 데이터를 차트용 궤적 데이터로 변환
 * @param rows 원본 데이터 배열
 * @param teams 표시할 팀 목록
 * @param yearRange 연도 범위 { from, to }
 * @param metric 추출할 메트릭 키
 * @returns 변환된 궤적 데이터
 */
export function buildTrajectoryData(
  rows: TeamSeason[],
  teams: string[],
  yearRange: { from: number; to: number },
  metric: MetricKey
): TrajectoryData {
  // 연도 배열 생성 및 필터링
  const years = Array.from(new Set(rows.map(r => r.year)))
    .filter(y => y >= yearRange.from && y <= yearRange.to)
    .sort((a, b) => a - b)

  // 팀-연도별 데이터 맵 생성
  const byTeamYear = new Map<string, TeamSeason>()
  for (const r of rows) {
    byTeamYear.set(`${r.team}_${r.year}`, r)
  }

  // 팀별 시리즈 생성
  const series: TeamSeries[] = teams.map(team => ({
    team,
    points: years.map(year => {
      const raw = byTeamYear.get(`${team}_${year}`)
      return raw
        ? { x: year, y: getMetric(raw, metric), raw }
        : { x: year, y: NaN, raw: null } // 결측 처리 (차트에서 끊기게)
    }),
  }))

  return { years, series }
}
