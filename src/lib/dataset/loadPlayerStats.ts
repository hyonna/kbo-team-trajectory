import { loadBattingStats, loadPitchingStats } from './loadRawStats'

export interface BattingRecord {
  Year: number
  Team: string
  Name: string
  WAR: number
  OPS: number
  PA: number
  AB: number
  H: number
  HR: number
  [key: string]: unknown
}

export interface PitchingRecord {
  Year: number
  Team: string
  Name: string
  WAR: number
  ERA: number
  FIP: number
  IP: number
  [key: string]: unknown
}

/**
 * 선수 이름으로 타자 데이터를 검색합니다
 */
export function searchBattersByName(name: string): BattingRecord[] {
  const data = loadBattingStats()
  return data.filter(
    row => row.Name && typeof row.Name === 'string' && row.Name.includes(name)
  ) as BattingRecord[]
}

/**
 * 선수 이름으로 투수 데이터를 검색합니다
 */
export function searchPitchersByName(name: string): PitchingRecord[] {
  const data = loadPitchingStats()
  return data.filter(
    row => row.Name && typeof row.Name === 'string' && row.Name.includes(name)
  ) as PitchingRecord[]
}

/**
 * 특정 선수의 타자 시즌별 데이터를 반환합니다 (연도순 정렬)
 */
export function getBatterSeasons(name: string): BattingRecord[] {
  const data = loadBattingStats()
  return data
    .filter(row => row.Name === name)
    .sort((a, b) => a.Year - b.Year) as BattingRecord[]
}

/**
 * 특정 선수의 투수 시즌별 데이터를 반환합니다 (연도순 정렬)
 */
export function getPitcherSeasons(name: string): PitchingRecord[] {
  const data = loadPitchingStats()
  return data
    .filter(row => row.Name === name)
    .sort((a, b) => a.Year - b.Year) as PitchingRecord[]
}

/**
 * 모든 타자 이름 목록을 반환합니다 (중복 제거)
 */
export function getAllBatterNames(): string[] {
  const data = loadBattingStats()
  const names = new Set<string>()
  data.forEach(row => {
    if (row.Name && typeof row.Name === 'string') {
      names.add(row.Name)
    }
  })
  return Array.from(names).sort()
}

/**
 * 모든 투수 이름 목록을 반환합니다 (중복 제거)
 */
export function getAllPitcherNames(): string[] {
  const data = loadPitchingStats()
  const names = new Set<string>()
  data.forEach(row => {
    if (row.Name && typeof row.Name === 'string') {
      names.add(row.Name)
    }
  })
  return Array.from(names).sort()
}

/**
 * 특정 연도에 존재하는 팀 목록을 반환합니다 (타자 데이터 기준)
 */
export function getTeamsByYear(year: number): string[] {
  const data = loadBattingStats()
  const teams = new Set<string>()
  data
    .filter(row => row.Year === year && row.Team)
    .forEach(row => {
      if (typeof row.Team === 'string') {
        teams.add(row.Team)
      }
    })
  return Array.from(teams).sort()
}

/**
 * 특정 연도와 팀의 타자 선수 목록을 반환합니다
 */
export function getBattersByYearAndTeam(year: number, team: string): string[] {
  const data = loadBattingStats()
  const names = new Set<string>()
  data
    .filter(
      row =>
        row.Year === year &&
        row.Team === team &&
        row.Name &&
        typeof row.Name === 'string'
    )
    .forEach(row => names.add(row.Name as string))
  return Array.from(names).sort()
}

/**
 * 특정 연도와 팀의 투수 선수 목록을 반환합니다
 */
export function getPitchersByYearAndTeam(year: number, team: string): string[] {
  const data = loadPitchingStats()
  const names = new Set<string>()
  data
    .filter(
      row =>
        row.Year === year &&
        row.Team === team &&
        row.Name &&
        typeof row.Name === 'string'
    )
    .forEach(row => names.add(row.Name as string))
  return Array.from(names).sort()
}
