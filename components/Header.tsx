import Link from 'next/link'
import { getLatestDate, THEMEN } from '@/lib/content'
import SearchBar from './SearchBar'
import MobileNav from './MobileNav'

export default function Header() {
  const latestDate = getLatestDate()

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-5 min-w-0">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white text-[13px] font-bold">K</span>
          <span className="text-[15px] font-semibold tracking-tight text-slate-900">KI Briefing</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1.5">
          {THEMEN.map(t => (
            <Link
              key={t.slug}
              href={latestDate ? `/${t.slug}/${latestDate}` : '/'}
              className="pill text-[13px] text-slate-600 hover:text-slate-900 px-3 py-1.5 transition-colors"
            >
              {t.short}
            </Link>
          ))}
          <Link
            href="/archiv"
            className="text-[13px] text-slate-500 hover:text-slate-800 px-2.5 py-1.5 transition-colors"
          >
            Archiv
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:block">
          <SearchBar />
        </div>
        <div className="lg:hidden">
          <MobileNav latestDate={latestDate} />
        </div>
      </div>
    </header>
  )
}
