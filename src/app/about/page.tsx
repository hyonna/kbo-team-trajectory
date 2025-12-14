export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-extrabold gradient-text mb-4">
            프로젝트 소개
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            KBO 팀 성적 추이 분석 및 Power Ranking 시스템
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            본 프로젝트는 Cursor로 개발되었습니다.
          </p>
        </div>

        <div className="card-sporty space-y-6">
          <section>
            <h2 className="text-2xl font-bold gradient-text mb-4">
              Power Ranking이란?
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                본 프로젝트의{' '}
                <strong>rank/score는 공식 승패 순위가 아닙니다</strong>. 시즌별
                선수 성과 지표를 팀 단위로 집계한 <strong>Power Ranking</strong>
                입니다.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                실제 경기 결과와는 다를 수 있으며, 선수 개인의 성과 지표(WAR,
                OPS, ERA 등)를 기반으로 팀의 전반적인 전력을 평가하는
                지표입니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold gradient-text mb-4">집계 공식</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  타자 지표
                </h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm font-mono">
                  <div>
                    <span className="text-gray-600">OBP (출루율)</span> ={' '}
                    <span className="text-gray-900">
                      (H + BB + HP) / (AB + BB + HP + SF)
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">SLG (장타율)</span> ={' '}
                    <span className="text-gray-900">TB / AB</span>
                  </div>
                  <div>
                    <span className="text-gray-600">OPS (출루율 + 장타율)</span>{' '}
                    = <span className="text-gray-900">OBP + SLG</span>
                  </div>
                  <div>
                    <span className="text-gray-600">wRC+</span> ={' '}
                    <span className="text-gray-900">PA 가중 평균</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Batting WAR</span> ={' '}
                    <span className="text-gray-900">
                      팀 내 모든 타자의 WAR 합계
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  투수 지표
                </h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm font-mono">
                  <div>
                    <span className="text-gray-600">ERA (평균자책점)</span> ={' '}
                    <span className="text-gray-900">(ER × 9) / IP</span>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      FIP (수비 무관 자책점)
                    </span>{' '}
                    = <span className="text-gray-900">IP 가중 평균</span>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      WHIP (이닝당 출루 허용)
                    </span>{' '}
                    = <span className="text-gray-900">(H + BB) / IP</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Pitching WAR</span> ={' '}
                    <span className="text-gray-900">
                      팀 내 모든 투수의 WAR 합계
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  파생 지표
                </h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm font-mono">
                  <div>
                    <span className="text-gray-600">Total WAR</span> ={' '}
                    <span className="text-gray-900">
                      Batting WAR + Pitching WAR
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Power Score</span> ={' '}
                    <span className="text-gray-900">
                      Batting WAR × 0.55 + Pitching WAR × 0.45
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Power Rank</span> ={' '}
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
