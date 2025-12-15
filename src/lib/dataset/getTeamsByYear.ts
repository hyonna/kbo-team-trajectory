import type { TeamSeason } from '@/lib/chart/types'

/**
 * 특정 연도에 존재하는 팀 목록을 반환합니다.
 * 데이터에서 실제로 존재하는 팀만 반환하므로 정확합니다.
 */
export function getTeamsByYear(data: TeamSeason[], year: number): string[] {
  const teams = data
    .filter(row => row.year === year)
    .map(row => row.team)
    .sort()

  return teams
}

/**
 * 연도 범위에 존재하는 모든 팀 목록을 반환합니다.
 */
export function getTeamsByYearRange(
  data: TeamSeason[],
  fromYear: number,
  toYear: number
): string[] {
  const teams = new Set<string>()
  data
    .filter(row => row.year >= fromYear && row.year <= toYear)
    .forEach(row => teams.add(row.team))

  return Array.from(teams).sort()
}

/**
 * 특정 연도 기준으로 해당 연도에 존재하는 팀만 필터링합니다.
 * 연도별 구단 수에 맞춰 표시하기 위해 사용됩니다.
 */
export function filterTeamsByYear(
  data: TeamSeason[],
  teams: string[],
  year: number
): string[] {
  const availableTeams = getTeamsByYear(data, year)
  return teams.filter(team => availableTeams.includes(team))
}
