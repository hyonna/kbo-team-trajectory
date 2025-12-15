'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ThemeToggle = dynamic(() => import('./ThemeToggle'), { ssr: false })

const navigation = [
  { name: '홈', href: '/' },
  { name: '프로젝트 소개', href: '/about' },
  { name: '연도별 팀 비교', href: '/snapshot' },
  { name: '팀 추이', href: '/trajectory' },
  { name: '선수 추이', href: '/player' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
      <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3 md:gap-0 justify-between items-center py-3 md:h-16">
          <div className="flex items-center min-w-0">
            <Link href="/" className="flex items-center group">
              <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg mr-3 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent truncate">
                KBO Trajectory
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <nav className="hidden md:flex flex-wrap gap-1">
              {navigation.map(item => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname?.startsWith(item.href))
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
