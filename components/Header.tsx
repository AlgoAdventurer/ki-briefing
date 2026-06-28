import Link from 'next/link'
import { getLatestDate, THEMEN } from '@/lib/content'
import MobileNav from './MobileNav'

export default function Header() {
  const latestDate = getLatestDate()

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-900 bg-zinc-950/85 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-5">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-baseline gap-2.5">
            <span className="text-base font-semibold gradient-text tracking-tight">KI Briefing</span>
            <span className="hidden sm:inline text-[11px] text-zinc-600 font-mono">täglich · 05:00</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {THEMEN.map(t => (
              <Link
                key={t.slug}
                href={latestDate ? `/${t.slug}/${latestDate}` : '/'}
                className="text-sm text-zinc-400 hover:text-zinc-100 px-2.5 py-1.5 rounded-lg hover:bg-zinc-900 transition-colors"
              >
                {t.label}
              </Link>
            ))}
            <Link
              href="/archiv"
              className="ml-1.5 text-sm text-zinc-500 hover:text-zinc-200 px-2.5 py-1.5 rounded-lg hover:bg-zinc-900 transition-colors"
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
