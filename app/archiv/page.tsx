import { getAllDates, THEMEN } from '@/lib/content'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { de } from 'date-fns/locale'

export default function Archiv() {
  const dates = getAllDates()

  return (
    <div className="py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight">Archiv</h1>
        <p className="text-sm text-zinc-500 mt-1.5">{dates.length} {dates.length === 1 ? 'Ausgabe' : 'Ausgaben'} verfügbar</p>
      </div>

      {dates.length === 0 ? (
        <p className="text-zinc-500">Noch keine Ausgaben vorhanden.</p>
      ) : (
        <div className="space-y-4">
          {dates.map((datum, i) => {
            const dateFormatted = format(parseISO(datum), 'EEEE, d. MMMM yyyy', { locale: de })
            return (
              <div key={datum} className={`card p-5 ${i === 0 ? 'border-indigo-500/30' : ''}`}>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {i === 0 && <span className="text-[11px] text-indigo-300 font-mono bg-indigo-500/15 px-2 py-0.5 rounded-full">Aktuell</span>}
                    <span className="font-medium text-zinc-100">{dateFormatted}</span>
                    <span className="text-xs text-zinc-600 font-mono">{datum}</span>
                  </div>
                  <Link href={`/top-news/${datum}`} className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors shrink-0">
                    Öffnen →
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {THEMEN.map(t => (
                    <Link
                      key={t.slug}
                      href={`/${t.slug}/${datum}`}
                      className="text-xs text-zinc-400 hover:text-zinc-100 bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-2.5 py-1 rounded-lg transition-colors"
                    >
                      {t.label}
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
