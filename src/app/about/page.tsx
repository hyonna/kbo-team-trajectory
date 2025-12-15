import { InfoIcon } from '@/components/ui/InfoIcon'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center mb-6 animate-fade-in space-y-3">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/70 dark:bg-gray-800/60 shadow-sm border border-gray-200 dark:border-gray-700">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Power Ranking 기반 KBO 팀/선수 인사이트
            </span>
          </div>
          <h1 className="text-5xl font-extrabold gradient-text">
            프로젝트 소개
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            시즌별 성과 지표로 팀 전력을 재해석하는 데이터 리포트
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            본 프로젝트는 Cursor로 개발되었으며, Kaggle KBO 데이터(1982-2025)를
            사용합니다.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="card-sporty space-y-4">
            <h2 className="text-2xl font-bold gradient-text">
              Power Ranking이란?
            </h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                본 프로젝트의{' '}
                <strong>rank/score는 공식 승패 순위가 아닙니다</strong>. 시즌별
                선수 성과 지표를 팀 단위로 집계한 <strong>Power Ranking</strong>
                입니다.
              </p>
              <p>
                선수 개인의 성과 지표(WAR, OPS, ERA 등)를 기반으로 팀의 전반적인
                전력을 평가한 지표이며, 실제 경기 결과와는 다를 수 있습니다.
              </p>
            </div>
          </section>

          <section className="card-sporty space-y-4">
            <h2 className="text-2xl font-bold gradient-text">데이터 출처</h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Kaggle KBO 시즌별 선수 기록(1982-2025)을 가공해 팀 단위 통계로
                집계했습니다.
              </p>
              <p>
                데이터:{' '}
                <a
                  className="text-blue-600 dark:text-blue-400 underline"
                  href="https://www.kaggle.com/datasets/netsong/kbo-player-dataset-by-regular-season-1982-2025"
                  target="_blank"
                  rel="noreferrer"
                >
                  Kaggle KBO Player Dataset
                </a>
              </p>
            </div>
          </section>
        </div>

        <div className="card-sporty space-y-6">
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold gradient-text">집계 공식</h2>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
                핵심 지표
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-full">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                  타자 지표
                  <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                    공격
                  </span>
                </h3>
                <div className="bg-white dark:bg-gray-900/60 p-4 rounded-xl space-y-3 text-sm font-mono border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600">
                      OBP (출루율){' '}
                      <InfoIcon
                        label="OBP"
                        description="출루율: 안타, 볼넷, 사구를 더해 타석 대비 출루 비율"
                      />
                    </span>{' '}
                    ={' '}
                    <span className="text-gray-900">
                      (H + BB + HP) / (AB + BB + HP + SF)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600">
                      SLG (장타율){' '}
                      <InfoIcon
                        label="SLG"
                        description="장타율: 총루타 / 타수, 장타 생산력을 나타냄"
                      />
                    </span>{' '}
                    = <span className="text-gray-900">TB / AB</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600">
                      OPS{' '}
                      <InfoIcon
                        label="OPS"
                        description="출루율 + 장타율, 공격력을 종합적으로 보는 지표"
                      />
                    </span>{' '}
                    = <span className="text-gray-900">OBP + SLG</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600">
                      wRC+{' '}
                      <InfoIcon
                        label="wRC+"
                        description="가중 득점 생산력: 리그 평균 대비 100을 기준으로 상대적 생산성"
                      />
                    </span>{' '}
                    = <span className="text-gray-900">PA 가중 평균</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600">
                      Batting WAR{' '}
                      <InfoIcon
                        label="Batting WAR"
                        description="타자의 대체 수준 대비 승리 기여도 합계"
                      />
                    </span>{' '}
                    ={' '}
                    <span className="text-gray-900">
                      팀 내 모든 타자의 WAR 합계
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-full">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                  투수 지표
                  <span className="text-[11px] px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                    투수
                  </span>
                </h3>
                <div className="bg-white dark:bg-gray-900/60 p-4 rounded-xl space-y-3 text-sm font-mono border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600">
                      ERA{' '}
                      <InfoIcon
                        label="ERA"
                        description="평균자책점: 9이닝당 실점(자책점) 평균, 낮을수록 좋음"
                      />
                    </span>{' '}
                    = <span className="text-gray-900">(ER × 9) / IP</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600">
                      FIP{' '}
                      <InfoIcon
                        label="FIP"
                        description="수비 무관 평균자책: 탈삼진/볼넷/피홈런만으로 투수 기여 측정"
                      />
                    </span>{' '}
                    = <span className="text-gray-900">IP 가중 평균</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600">
                      WHIP{' '}
                      <InfoIcon
                        label="WHIP"
                        description="이닝당 출루 허용: (피안타+볼넷)/이닝, 낮을수록 좋음"
                      />
                    </span>{' '}
                    = <span className="text-gray-900">(H + BB) / IP</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600">
                      Pitching WAR{' '}
                      <InfoIcon
                        label="Pitching WAR"
                        description="투수의 대체 수준 대비 승리 기여도 합계"
                      />
                    </span>{' '}
                    ={' '}
                    <span className="text-gray-900">
                      팀 내 모든 투수의 WAR 합계
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                  파생 지표
                  <span className="text-[11px] px-2 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200">
                    팀 전력
                  </span>
                </h3>
                <div className="bg-white dark:bg-gray-900/60 p-4 rounded-xl space-y-3 text-sm font-mono border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600">
                      Total WAR{' '}
                      <InfoIcon
                        label="Total WAR"
                        description="타자 WAR + 투수 WAR 합계로 본 팀 전체 기여도"
                      />
                    </span>{' '}
                    ={' '}
                    <span className="text-gray-900">
                      Batting WAR + Pitching WAR
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600">
                      Power Score{' '}
                      <InfoIcon
                        label="Power Score"
                        description="팀 전력 점수: 타자 WAR 55% + 투수 WAR 45% 가중합"
                      />
                    </span>{' '}
                    ={' '}
                    <span className="text-gray-900">
                      Batting WAR × 0.55 + Pitching WAR × 0.45
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600">
                      Power Rank{' '}
                      <InfoIcon
                        label="Power Rank"
                        description="Power Score를 연도별로 내림차순 정렬하여 부여한 순위"
                      />
                    </span>{' '}
                    ={' '}
                    <span className="text-gray-900">
                      연도별 Power Score 기준 내림차순 정렬 후 순위 부여
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold gradient-text mb-4">
              데이터 출처
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                본 프로젝트는 1982년부터 2025년까지의 KBO 선수 시즌별 기록을
                기반으로 팀 단위 통계를 집계합니다.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                원본 데이터는{' '}
                <a
                  href="https://www.kaggle.com/datasets/netsong/kbo-player-dataset-by-regular-season-1982-2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-semibold"
                >
                  Kaggle의 KBO Player Dataset by Regular Season (1982-2025)
                </a>
                에서 제공됩니다.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                <li>
                  타자 스탯: PA, AB, H, BB, HP, SF, TB, HR, OPS, wRC+, WAR
                </li>
                <li>투수 스탯: IP, ER, H, BB, ERA, FIP, WHIP, WAR</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold gradient-text mb-4">
              향후 로드맵
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  <strong>공식 경기결과 데이터 통합</strong>
                  <ul className="list-circle list-inside ml-6 mt-1 space-y-1 text-gray-600">
                    <li>실제 승패 기록과 Power Ranking 비교 분석</li>
                    <li>경기 결과 예측 모델 개발</li>
                    <li>시즌별 성적 변동 요인 분석</li>
                  </ul>
                </li>
                <li>선수 개인 성적 상세 분석 페이지</li>
                <li>팀 간 상대 전적 분석</li>
                <li>시즌별 주요 이벤트(트레이드, 부상 등) 반영</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold gradient-text mb-4">기술 스택</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Frontend
                </h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Next.js 15 (App Router)</li>
                  <li>React 19</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Recharts</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Data Processing
                </h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Node.js</li>
                  <li>TypeScript</li>
                  <li>JSON 데이터 집계</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>개발 도구:</strong> 본 프로젝트는{' '}
                <a
                  href="https://cursor.sh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-semibold"
                >
                  Cursor
                </a>
                로 개발되었습니다.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
