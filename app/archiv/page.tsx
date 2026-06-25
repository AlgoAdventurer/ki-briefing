import { getAllDates, THEMEN } from '@/lib/content'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { de } from 'date-fns/locale'

export default function Archiv() {
  const dates = getAllDates()

  return (
    <div>
      <div className="py-8 mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">📚 Archiv</h1>
        <p className="text-sm text-gray-500">{dates.length} Ausgaben verfügbar</p>
      </div>

      {dates.length === 0 ? (
        <p className="text-gray-600">Noch keine Ausgaben vorhanden.</p>
      ) : (
        <div className="space-y-3">
          {dates.map((datum, i) => {
            const dateFormatted = format(parseISO(datum), "EEEE, d. MMMM yyyy", { locale: de })
            return (
              <div key={datum} className={`glass glass-hover rounded-xl p-4 ${i === 0 ? 'border-indigo-800/30 glow-purple' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    {i === 0 && <span className="text-xs text-indigo-400 font-mono bg-indigo-950/40 px-2 py-0.5 rounded-full mr-2">Aktuell</span>}
                    <span className="font-semibold text-gray-200">{dateFormatted}</span>
                    <span className="text-xs text-gray-600 font-mono ml-2">{datum}</span>
                  </div>
                  <Link href={`/top-news/${datum}`} className="text-xs text-indigo-400 hover:text-indigo-300">
                    Öffnen →
                  </Link>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {THEMEN.map(t => (
                    <Link
                      key={t.slug}
                      href={`/${t.slug}/${datum}`}
                      className="text-xs text-gray-500 hover:text-gray-300 bg-white/5 hover:bg-white/8 border border-white/5 px-2.5 py-1 rounded-lg transition-colors"
                    >
                      {t.emoji} {t.label}
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
