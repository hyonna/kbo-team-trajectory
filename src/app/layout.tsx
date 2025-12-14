import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KBO Team Trajectory',
  description: 'KBO 팀들의 시즌별 성적 흐름을 시각화하는 대시보드',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
