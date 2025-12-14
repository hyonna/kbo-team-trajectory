import { readFileSync } from 'fs'
import { join } from 'path'

// 타입 정의
interface BattingRecord {
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

interface PitchingRecord {
  Year: number
  Team: string
  Name: string
  WAR: number
  ERA: number
  FIP: number
  IP: number
  [key: string]: unknown
}

// In-memory cache
let cachedBattingData: BattingRecord[] | null = null
let cachedPitchingData: PitchingRecord[] | null = null
let cacheTimestamp: number | null = null

// 캐시 유효 시간 (5분)
const CACHE_TTL = 5 * 60 * 1000

function loadJsonFile<T>(filePath: string): T {
  const content = readFileSync(filePath, 'utf-8')
  return JSON.parse(content) as T
}

/**
 * 타자 raw 데이터를 로드합니다 (캐시 적용)
 */
export function loadBattingStats(): BattingRecord[] {
  const now = Date.now()

  if (
    cachedBattingData !== null &&
    cacheTimestamp !== null &&
    now - cacheTimestamp < CACHE_TTL
  ) {
    return cachedBattingData
  }

  const projectRoot = process.cwd()
  const filePath = join(
    projectRoot,
    'src/data/raw/kbo_batting_stats_by_season_1982-2025.json'
  )

  try {
    const data = loadJsonFile<BattingRecord[]>(filePath)
    cachedBattingData = data
    cacheTimestamp = now
    return data
  } catch (error) {
    console.error('Failed to load batting stats:', error)
    throw new Error('Failed to load batting stats')
  }
}

/**
 * 투수 raw 데이터를 로드합니다 (캐시 적용)
 */
export function loadPitchingStats(): PitchingRecord[] {
  const now = Date.now()

  if (
    cachedPitchingData !== null &&
    cacheTimestamp !== null &&
    now - cacheTimestamp < CACHE_TTL
  ) {
    return cachedPitchingData
  }

  const projectRoot = process.cwd()
  const filePath = join(
    projectRoot,
    'src/data/raw/kbo_pitching_stats_by_season_1982-2025.json'
  )

  try {
    const data = loadJsonFile<PitchingRecord[]>(filePath)
    cachedPitchingData = data
    cacheTimestamp = now
    return data
  } catch (error) {
    console.error('Failed to load pitching stats:', error)
    throw new Error('Failed to load pitching stats')
  }
}

/**
 * 특정 팀과 연도의 타자 TOP N 선수를 반환합니다
 */
export function getTopBatters(
  team: string,
  year: number,
  limit: number = 10
): BattingRecord[] {
  const data = loadBattingStats()
  return data
    .filter(row => row.Team === team && row.Year === year)
    .filter(row => row.WAR && row.WAR > 0)
    .sort((a, b) => (b.WAR || 0) - (a.WAR || 0))
    .slice(0, limit)
}

/**
 * 특정 팀과 연도의 투수 TOP N 선수를 반환합니다
 */
export function getTopPitchers(
  team: string,
  year: number,
  limit: number = 10
): PitchingRecord[] {
  const data = loadPitchingStats()
  return data
    .filter(row => row.Team === team && row.Year === year)
    .filter(row => row.WAR && row.WAR > 0)
    .sort((a, b) => (b.WAR || 0) - (a.WAR || 0))
    .slice(0, limit)
}
