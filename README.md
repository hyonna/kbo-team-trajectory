# KBO Team Trajectory

KBO 팀들의 시즌별 성적 흐름을 연도·월·지표 기준으로 시각화하는 인터랙티브 데이터 대시보드 프로젝트입니다.

## 📊 Power Ranking이란?

**본 프로젝트의 rank/score는 공식 승패 순위가 아닙니다.** 시즌별 선수 성과 지표를 팀 단위로 집계한 **Power Ranking**입니다.

실제 경기 결과와는 다를 수 있으며, 선수 개인의 성과 지표(WAR, OPS, ERA 등)를 기반으로 팀의 전반적인 전력을 평가하는 지표입니다.

## 📈 집계 공식

### 타자 지표

- **OBP (출루율)** = `(H + BB + HP) / (AB + BB + HP + SF)`
- **SLG (장타율)** = `TB / AB`
- **OPS (출루율 + 장타율)** = `OBP + SLG`
- **wRC+** = `PA 가중 평균`
- **Batting WAR** = 팀 내 모든 타자의 WAR 합계

### 투수 지표

- **ERA (평균자책점)** = `(ER × 9) / IP`
- **FIP (수비 무관 자책점)** = `IP 가중 평균`
- **WHIP (이닝당 출루 허용)** = `(H + BB) / IP`
- **Pitching WAR** = 팀 내 모든 투수의 WAR 합계

### 파생 지표

- **Total WAR** = `Batting WAR + Pitching WAR`
- **Power Score** = `Batting WAR × 0.55 + Pitching WAR × 0.45`
- **Power Rank** = 연도별 Power Score 기준 내림차순 정렬 후 순위 부여

## 🚀 시작하기

### 필수 요구사항

- Node.js 18 이상
- pnpm

### 설치

```bash
# 의존성 설치
pnpm install

# 데이터 빌드 (derived 데이터 생성)
pnpm build:data

# 개발 서버 실행
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

## 📁 프로젝트 구조

```
kbo-team-trajectory/
├── src/
│   ├── app/                    # Next.js App Router 페이지
│   │   ├── about/              # 프로젝트 소개 페이지
│   │   ├── snapshot/           # 연도별 스냅샷 비교
│   │   ├── team/[team]/        # 팀별 상세 페이지
│   │   └── trajectory/         # 팀 추이 분석 페이지
│   ├── components/
│   │   ├── charts/              # 차트 컴포넌트
│   │   ├── snapshot/           # 스냅샷 관련 컴포넌트
│   │   ├── team/               # 팀 페이지 컴포넌트
│   │   ├── trajectory/         # 추이 분석 컴포넌트
│   │   └── ui/                 # 공통 UI 컴포넌트
│   ├── data/
│   │   ├── derived/            # 집계된 팀 시즌 데이터
│   │   └── raw/                # 원본 선수 시즌별 데이터
│   ├── lib/
│   │   ├── chart/              # 차트 관련 유틸리티
│   │   └── dataset/            # 데이터 로더
│   └── scripts/                # 데이터 처리 스크립트
└── package.json
```

## 🎯 주요 기능

### 1. 팀 추이 분석 (`/trajectory`)

- 최대 4개 팀 선택하여 비교
- 연도 범위 선택
- 다양한 지표 선택 (Power Rank, Power Score, Total WAR, OPS, ERA 등)
- 연도별 추이 라인 차트 또는 랭킹 차트 표시
- 선택 팀의 최신 시즌 요약 카드

### 2. 연도별 스냅샷 (`/snapshot`)

- 특정 연도의 팀별 성적 비교
- 전년 대비 변화량 표시
- 다양한 지표로 바 차트 비교

### 3. 팀 상세 페이지 (`/team/[team]`)

- 팀의 연도별 Power Score 및 Total WAR 추이
- 특정 연도 선택 시 TOP 10 타자/투수 리스트
- 선수별 WAR 및 주요 지표 표시

## 📊 데이터 출처

본 프로젝트는 1982년부터 2025년까지의 KBO 선수 시즌별 기록을 기반으로 팀 단위 통계를 집계합니다.

- **타자 스탯**: PA, AB, H, BB, HP, SF, TB, HR, OPS, wRC+, WAR
- **투수 스탯**: IP, ER, H, BB, ERA, FIP, WHIP, WAR

## 🛠 기술 스택

- **Frontend**
  - Next.js 15 (App Router)
  - React 19
  - TypeScript
  - Tailwind CSS
  - Recharts

- **Data Processing**
  - Node.js
  - TypeScript
  - JSON 데이터 집계

## 🗺 향후 로드맵

### 공식 경기결과 데이터 통합

- 실제 승패 기록과 Power Ranking 비교 분석
- 경기 결과 예측 모델 개발
- 시즌별 성적 변동 요인 분석

### 추가 기능

- 선수 개인 성적 상세 분석 페이지
- 팀 간 상대 전적 분석
- 시즌별 주요 이벤트(트레이드, 부상 등) 반영
- 데이터 내보내기 기능 (CSV, JSON)

## 📝 라이선스

이 프로젝트는 개인 프로젝트입니다.

## 🤝 기여

이슈 및 제안사항은 GitHub Issues를 통해 제출해주세요.
