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
        </div>

        {/* 집계 공식 박스 */}
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
                <div className="bg-white dark:bg-gray-900/60 p-4 rounded-xl space-y-3 text-sm border border-gray-100 dark:border-gray-800 shadow-sm">
                  {/* OBP */}
                  <div className="rounded-lg bg-gray-50/80 dark:bg-gray-900/80 px-3 py-2.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        OBP (출루율)
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">
                        (H + BB + HP) / (AB + BB + HP + SF)
                      </span>
                    </div>
                    <p className="mt-2 pt-2 text-xs text-gray-700 dark:text-gray-300 border-t border-dashed border-gray-200 dark:border-gray-700">
                      타석 대비 얼마나 자주 나가는지 보는 지표입니다. 안타,
                      볼넷, 사구를 모두 포함합니다.
                    </p>
                  </div>

                  {/* SLG */}
                  <div className="rounded-lg bg-gray-50/80 dark:bg-gray-900/80 px-3 py-2.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        SLG (장타율)
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">
                        TB / AB
                      </span>
                    </div>
                    <p className="mt-2 pt-2 text-xs text-gray-700 dark:text-gray-300 border-t border-dashed border-gray-200 dark:border-gray-700">
                      한 타석에서 평균 몇 루타를 쳐냈는지 나타내는 지표로, 장타
                      생산력을 보여줍니다.
                    </p>
                  </div>

                  {/* OPS */}
                  <div className="rounded-lg bg-gray-50/80 dark:bg-gray-900/80 px-3 py-2.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        OPS
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">
                        OBP + SLG
                      </span>
                    </div>
                    <p className="mt-2 pt-2 text-xs text-gray-700 dark:text-gray-300 border-t border-dashed border-gray-200 dark:border-gray-700">
                      출루 능력(OBP)과 장타력(SLG)을 합쳐 타자의 공격력을 한
                      번에 보는 종합 지표입니다.
                    </p>
                  </div>

                  {/* wRC+ */}
                  <div className="rounded-lg bg-gray-50/80 dark:bg-gray-900/80 px-3 py-2.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        wRC+ (가중 득점 생산력)
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">
                        리그 평균 = 100
                      </span>
                    </div>
                    <p className="mt-2 pt-2 text-xs text-gray-700 dark:text-gray-300 border-t border-dashed border-gray-200 dark:border-gray-700">
                      리그 평균을 100으로 두고, 타자가 평균 대비 어느 정도
                      득점을 만들어냈는지 보는 지표입니다. 예를 들어 120이면
                      리그 평균보다 20% 더 잘한 것입니다.
                    </p>
                  </div>

                  {/* Batting WAR */}
                  <div className="rounded-lg bg-gray-50/80 dark:bg-gray-900/80 px-3 py-2.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        Batting WAR (타자 WAR)
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">
                        팀 내 타자 WAR 합계
                      </span>
                    </div>
                    <p className="mt-2 pt-2 text-xs text-gray-700 dark:text-gray-300 border-t border-dashed border-gray-200 dark:border-gray-700">
                      대체 수준 타자와 비교했을 때, 팀 타자들이 승리에 얼마나
                      기여했는지를 승수로 환산한 지표입니다.
                    </p>
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
                <div className="bg-white dark:bg-gray-900/60 p-4 rounded-xl space-y-3 text-sm border border-gray-100 dark:border-gray-800 shadow-sm">
                  {/* ERA */}
                  <div className="rounded-lg bg-gray-50/80 dark:bg-gray-900/80 px-3 py-2.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        ERA (평균자책점)
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">
                        (ER × 9) / IP
                      </span>
                    </div>
                    <p className="mt-2 pt-2 text-xs text-gray-700 dark:text-gray-300 border-t border-dashed border-gray-200 dark:border-gray-700">
                      9이닝 기준으로 몇 점을 내줬는지 나타내는 지표입니다.
                      낮을수록 좋은 성적입니다.
                    </p>
                  </div>

                  {/* FIP */}
                  <div className="rounded-lg bg-gray-50/80 dark:bg-gray-900/80 px-3 py-2.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        FIP (수비 무관 평균자책)
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">
                        탈삼진 / 볼넷 / 피홈런 기반
                      </span>
                    </div>
                    <p className="mt-2 pt-2 text-xs text-gray-700 dark:text-gray-300 border-t border-dashed border-gray-200 dark:border-gray-700">
                      수비의 영향을 배제하고, 탈삼진·볼넷·피홈런만으로 투수의
                      기여를 평가하는 지표입니다.
                    </p>
                  </div>

                  {/* WHIP */}
                  <div className="rounded-lg bg-gray-50/80 dark:bg-gray-900/80 px-3 py-2.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        WHIP
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">
                        (H + BB) / IP
                      </span>
                    </div>
                    <p className="mt-2 pt-2 text-xs text-gray-700 dark:text-gray-300 border-t border-dashed border-gray-200 dark:border-gray-700">
                      이닝당 얼마나 많은 타자를 출루시켰는지 보는 지표입니다.
                      낮을수록 좋습니다.
                    </p>
                  </div>

                  {/* Pitching WAR */}
                  <div className="rounded-lg bg-gray-50/80 dark:bg-gray-900/80 px-3 py-2.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        Pitching WAR (투수 WAR)
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">
                        팀 내 투수 WAR 합계
                      </span>
                    </div>
                    <p className="mt-2 pt-2 text-xs text-gray-700 dark:text-gray-300 border-t border-dashed border-gray-200 dark:border-gray-700">
                      대체 수준 투수와 비교했을 때, 투수가 팀 승리에 얼마나
                      기여했는지 승수로 환산한 지표입니다.
                    </p>
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
                <div className="bg-white dark:bg-gray-900/60 p-4 rounded-xl space-y-3 text-sm border border-gray-100 dark:border-gray-800 shadow-sm">
                  {/* Total WAR */}
                  <div className="rounded-lg bg-gray-50/80 dark:bg-gray-900/80 px-3 py-2.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        Total WAR
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">
                        Batting WAR + Pitching WAR
                      </span>
                    </div>
                    <p className="mt-2 pt-2 text-xs text-gray-700 dark:text-gray-300 border-t border-dashed border-gray-200 dark:border-gray-700">
                      팀 안의 타자 WAR와 투수 WAR를 모두 더해, 팀 전체가 대체
                      수준 대비 얼마나 승리를 더 가져왔는지 보는 지표입니다.
                    </p>
                  </div>

                  {/* Power Score */}
                  <div className="rounded-lg bg-gray-50/80 dark:bg-gray-900/80 px-3 py-2.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        Power Score
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">
                        Batting WAR × 0.55 + Pitching WAR × 0.45
                      </span>
                    </div>
                    <p className="mt-2 pt-2 text-xs text-gray-700 dark:text-gray-300 border-t border-dashed border-gray-200 dark:border-gray-700">
                      타자 기여도 55%, 투수 기여도 45%로 가중치를 둔 팀 전력
                      점수입니다. 값이 높을수록 전력이 강한 팀으로 해석합니다.
                    </p>
                  </div>

                  {/* Power Rank */}
                  <div className="rounded-lg bg-gray-50/80 dark:bg-gray-900/80 px-3 py-2.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        Power Rank
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">
                        연도별 Power Score 순위
                      </span>
                    </div>
                    <p className="mt-2 pt-2 text-xs text-gray-700 dark:text-gray-300 border-t border-dashed border-gray-200 dark:border-gray-700">
                      같은 연도 안에서 Power Score를 내림차순으로 정렬해 매긴
                      순위입니다. 1위가 가장 높은 전력으로 평가된 팀입니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* 데이터 출처 / 로드맵 / 기술 스택 박스 */}
        <div className="card-sporty space-y-6">
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
                본 프로젝트는 Cursor로 개발되었으며, Kaggle KBO
                데이터(1982-2025)를 사용합니다.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
