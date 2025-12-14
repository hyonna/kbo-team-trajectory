// 팀별 색상 매핑 (공식 팀 컬러 사용)
export const TEAM_COLORS: Record<string, string> = {
  LG: '#c30452', // LG 트윈스 Primary
  두산: '#132650', // 두산 베어스 Primary
  삼성: '#1251d6', // 삼성 라이온즈 Primary
  KIA: '#c8102e', // KIA 타이거즈 Primary
  NC: '#003263', // NC 다이노스 Primary
  롯데: '#d7333b', // 롯데 자이언츠 Primary
  SSG: '#c5102d', // SSG 랜더스 Primary
  키움: '#810034', // 키움 히어로즈 Primary
  KT: '#212121', // KT 위즈 Primary
  한화: '#fb4f14', // 한화 이글스 Primary
  // 구단명 (과거)
  OB: '#132650', // 두산 베어스 (구 OB)
  MBC: '#1251d6', // 삼성 라이온즈 (구 MBC)
  해태: '#c8102e', // KIA 타이거즈 (구 해태)
  쌍방울: '#003263', // NC 다이노스 (구 쌍방울)
  현대: '#c5102d', // SSG 랜더스 (구 현대)
  SK: '#c5102d', // SSG 랜더스 (구 SK)
}

// 팀별 Secondary 색상
export const TEAM_COLORS_SECONDARY: Record<string, string> = {
  LG: '#a5aca8',
  두산: '#b3bfc8',
  삼성: '#a9bedc',
  KIA: '#f6bf00',
  NC: '#b0926a',
  롯데: '#005bbf',
  SSG: '#ffd700',
  키움: '#d7a94b',
  KT: '#e60012',
  한화: '#000000',
  // 구단명 (과거)
  OB: '#b3bfc8',
  MBC: '#a9bedc',
  해태: '#f6bf00',
  쌍방울: '#b0926a',
  현대: '#ffd700',
  SK: '#ffd700',
}

// 기본 색상 팔레트 (팀 색상이 없을 때 사용)
export const DEFAULT_COLORS = [
  '#1D4ED8',
  '#E11D48',
  '#C2410C',
  '#059669',
  '#7C3AED',
  '#0EA5E9',
  '#F59E0B',
  '#EC4899',
  '#6366F1',
  '#F97316',
]

/**
 * 팀 이름으로 Primary 색상 가져오기
 */
export function getTeamColor(team: string, index: number): string {
  return TEAM_COLORS[team] || DEFAULT_COLORS[index % DEFAULT_COLORS.length]
}

/**
 * 팀 이름으로 Secondary 색상 가져오기
 */
export function getTeamSecondaryColor(team: string): string {
  return TEAM_COLORS_SECONDARY[team] || getTeamColor(team, 0)
}

/**
 * 팀 이름으로 그라데이션 색상 가져오기 (Primary -> Secondary)
 */
export function getTeamGradient(team: string): string {
  const primary = getTeamColor(team, 0)
  const secondary = getTeamSecondaryColor(team)
  return `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`
}
