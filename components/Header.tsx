import Link from 'next/link'
import { getLatestDate, THEMEN } from '@/lib/content'
import MobileNav from './MobileNav'

export default function Header() {
  const latestDate = getLatestDate()

  return (
    <header className="border-b border-white/5 mb-8 sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold gradient-text">KI Briefing</span>
            <span className="text-xs text-gray-600 font-mono">täglich</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {THEMEN.map(t => (
              <Link
                key={t.slug}
                href={latestDate ? `/${t.slug}/${latestDate}` : '/'}
                className="text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors"
              >
                {t.emoji} {t.label}
              </Link>
            ))}
            <Link
              href="/archiv"
              className="text-xs text-gray-500 hover:text-gray-300 px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors ml-2 border border-white/10"
            >
              Archiv
            </Link>
          </nav>

          <div className="md:hidden">
            <MobileNav latestDate={latestDate} />
          </div>
        </div>
      </div>
    </header>
  )
}
