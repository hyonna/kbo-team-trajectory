import { readFileSync } from 'fs'
import { join } from 'path'
import type { TeamSeason } from '../chart/types'

// In-memory cache
let cachedData: TeamSeason[] | null = null
let cacheTimestamp: number | null = null

// 캐시 유효 시간 (5분)
const CACHE_TTL = 5 * 60 * 1000

/**
 * TeamSeason 데이터를 로드합니다 (캐시 적용)
 */
export function loadTeamSeasons(): TeamSeason[] {
  const now = Date.now()

  // 캐시가 유효하면 반환
  if (
    cachedData !== null &&
    cacheTimestamp !== null &&
    now - cacheTimestamp < CACHE_TTL
  ) {
    return cachedData
  }

  // 파일 읽기
  const projectRoot = process.cwd()
  const filePath = join(projectRoot, 'src/data/derived/team-season.json')

  try {
    const content = readFileSync(filePath, 'utf-8')
    const data = JSON.parse(content) as TeamSeason[]

    // 캐시 업데이트
    cachedData = data
    cacheTimestamp = now

    return data
  } catch (error) {
    console.error('Failed to load team-season.json:', error)
    throw new Error('Failed to load team season data')
  }
}

/**
 * 캐시를 무효화합니다
 */
export function invalidateCache(): void {
  cachedData = null
  cacheTimestamp = null
}

/**
 * 모든 팀 목록을 반환합니다
 */
export function getTeams(): string[] {
  const data = loadTeamSeasons()
  const teams = new Set<string>()
  data.forEach(row => teams.add(row.team))
  return Array.from(teams).sort()
}

/**
 * 모든 연도 목록을 반환합니다
 */
export function getYears(): number[] {
  const data = loadTeamSeasons()
  const years = new Set<number>()
  data.forEach(row => years.add(row.year))
  return Array.from(years).sort((a, b) => a - b)
}

/**
 * 특정 팀의 모든 시즌 데이터를 반환합니다
 */
export function getTeamSeasons(team: string): TeamSeason[] {
  const data = loadTeamSeasons()
  return data.filter(row => row.team === team).sort((a, b) => a.year - b.year)
}

/**
 * 특정 연도의 모든 팀 데이터를 반환합니다
 */
export function getYearSeasons(year: number): TeamSeason[] {
  const data = loadTeamSeasons()
  return data
    .filter(row => row.year === year)
    .sort((a, b) => a.powerRank - b.powerRank)
}

/**
 * 특정 팀과 연도의 데이터를 반환합니다
 */
export function getTeamSeason(
  team: string,
  year: number
): TeamSeason | undefined {
  const data = loadTeamSeasons()
  return data.find(row => row.team === team && row.year === year)
}
