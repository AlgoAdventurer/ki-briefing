import { getAllDates, THEMEN } from '@/lib/content'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { de } from 'date-fns/locale'

export default function Archiv() {
  const dates = getAllDates()

  return (
    <div className="py-2">
      <div className="mb-9">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Archiv</h1>
        <p className="text-sm text-slate-500 mt-1.5">{dates.length} {dates.length === 1 ? 'Ausgabe' : 'Ausgaben'} verfügbar</p>
      </div>

      {dates.length === 0 ? (
        <p className="text-slate-500">Noch keine Ausgaben vorhanden.</p>
      ) : (
        <div className="space-y-4">
          {dates.map((datum, i) => {
            const dateFormatted = format(parseISO(datum), 'EEEE, d. MMMM yyyy', { locale: de })
            return (
              <div key={datum} className={`card p-5 ${i === 0 ? 'border-indigo-200' : ''}`}>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {i === 0 && <span className="text-[11px] text-indigo-700 font-medium bg-indigo-50 px-2 py-0.5 rounded-full">Aktuell</span>}
                    <span className="font-semibold text-slate-900">{dateFormatted}</span>
                    <span className="text-xs text-slate-400 font-mono">{datum}</span>
                  </div>
                  <Link href={`/top-news/${datum}`} className="text-sm text-indigo-600 hover:text-indigo-700 transition-colors shrink-0">
                    Öffnen →
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {THEMEN.map(t => (
                    <Link
                      key={t.slug}
                      href={`/${t.slug}/${datum}`}
                      className="text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full transition-colors"
                    >
                      {t.short}
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
