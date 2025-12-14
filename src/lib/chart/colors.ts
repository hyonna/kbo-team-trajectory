// 팀별 색상 매핑
export const TEAM_COLORS: Record<string, string> = {
  삼성: '#1D4ED8', // 파란색
  KIA: '#E11D48', // 빨간색
  LG: '#C2410C', // 주황색
  두산: '#059669', // 초록색
  롯데: '#7C3AED', // 보라색
  NC: '#0EA5E9', // 하늘색
  키움: '#F59E0B', // 노란색
  SSG: '#EC4899', // 핑크색
  KT: '#6366F1', // 인디고
  한화: '#F97316', // 오렌지
  OB: '#10B981', // 에메랄드
  MBC: '#8B5CF6', // 바이올렛
  해태: '#EF4444', // 빨강
  쌍방울: '#14B8A6', // 틸
  현대: '#3B82F6', // 블루
  SK: '#EC4899', // 핑크
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
 * 팀 이름으로 색상 가져오기
 */
export function getTeamColor(team: string, index: number): string {
  return TEAM_COLORS[team] || DEFAULT_COLORS[index % DEFAULT_COLORS.length]
}
