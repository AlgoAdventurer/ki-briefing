import { getLatestDate, getAllDates, getTopNews, getTool, getReleases, getDevCorner, getFunding, getReguliering, getContoura, THEMEN } from '@/lib/content'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { de } from 'date-fns/locale'

export default function Home() {
  const latestDate = getLatestDate()
  const allDates = getAllDates()

  if (!latestDate) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="text-5xl">📡</div>
        <h1 className="text-xl font-semibold text-gray-300">Erstes Briefing noch unterwegs</h1>
        <p className="text-sm text-gray-600">Die Routine läuft täglich um 05:00 Uhr.</p>
      </div>
    )
  }

  const topNews = getTopNews(latestDate)
  const tool = getTool(latestDate)
  const releases = getReleases(latestDate)
  const devCorner = getDevCorner(latestDate)
  const funding = getFunding(latestDate)
  const regulierung = getReguliering(latestDate)
  const contoura = getContoura(latestDate)

  const dateFormatted = format(parseISO(latestDate), "EEEE, d. MMMM yyyy", { locale: de })

  return (
    <div>
      {/* Hero */}
      <div className="py-8 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-800/30 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
            Live — {dateFormatted}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          KI &amp; Tech Briefing
        </h1>
        <p className="text-gray-500 text-sm">
          Täglich kuratiert · ~10 Minuten lesen · Schweizer Perspektive
        </p>
      </div>

      {/* Themen-Schnellnavigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-10">
        {THEMEN.map(t => (
          <Link
            key={t.slug}
            href={`/${t.slug}/${latestDate}`}
            className="glass glass-hover rounded-xl p-3 flex items-center gap-2 group"
          >
            <span className="text-lg">{t.emoji}</span>
            <span className="text-xs text-gray-400 group-hover:text-white transition-colors">{t.label}</span>
          </Link>
        ))}
      </div>

      {/* Top News — gross */}
      {topNews && topNews.items.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">🔥 Top News</h2>
            <Link href={`/top-news/${latestDate}`} className="text-xs text-indigo-400 hover:text-indigo-300">
              Alle →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {topNews.items.slice(0, 3).map((item, i) => (
              <Link key={item.id} href={`/top-news/${latestDate}`} className={`glass glass-hover rounded-xl overflow-hidden group ${i === 0 ? 'md:col-span-2 md:row-span-1' : ''}`}>
                {item.bild && (
                  <div className="relative h-36 overflow-hidden">
                    <img src={item.bild} alt={item.titel} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="absolute bottom-2 left-3 text-xs text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded">{item.kategorie}</span>
                  </div>
                )}
                <div className="p-4">
                  {!item.bild && <span className="inline-block text-xs text-indigo-300 bg-indigo-950/40 px-2 py-0.5 rounded mb-2">{item.kategorie}</span>}
                  <h3 className="text-sm font-semibold text-gray-100 group-hover:text-white mb-1 line-clamp-2">{item.titel}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{item.zusammenfassung}</p>
                  <p className="text-xs text-gray-600 mt-2">{item.quelle}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Tool des Tages */}
      {tool && (
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">🛠 Tool des Tages</h2>
          <Link href={`/tool/${latestDate}`} className="glass glass-hover rounded-xl p-5 flex gap-4 items-start group block">
            {tool.bild && (
              <img src={tool.bild} alt={tool.name} className="w-12 h-12 rounded-lg object-contain bg-white/5 p-1 flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-white group-hover:gradient-text">{tool.name}</span>
                {tool.kostenlos && <span className="text-xs bg-green-950/50 text-green-400 border border-green-800/30 px-2 py-0.5 rounded-full">Kostenlos</span>}
                <span className="text-xs text-gray-600 bg-white/5 px-2 py-0.5 rounded">{tool.kategorie}</span>
              </div>
              <p className="text-sm text-gray-400">{tool.tagline}</p>
            </div>
            <span className="text-gray-600 group-hover:text-indigo-400 transition-colors text-lg flex-shrink-0">↗</span>
          </Link>
        </section>
      )}

      {/* 2-Spalten: Releases + Dev Corner */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {releases && releases.items.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">📦 Releases</h2>
              <Link href={`/releases/${latestDate}`} className="text-xs text-indigo-400 hover:text-indigo-300">Alle →</Link>
            </div>
            <div className="space-y-2">
              {releases.items.slice(0, 3).map(r => (
                <Link key={r.id} href={`/releases/${latestDate}`} className="glass glass-hover rounded-lg p-3 flex items-start gap-3 group block">
                  {r.bild ? <img src={r.bild} alt={r.name} className="w-8 h-8 rounded object-contain flex-shrink-0" /> : <span className="w-8 h-8 rounded bg-white/5 flex-shrink-0" />}
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-200 group-hover:text-white">{r.name} {r.version && <span className="text-xs text-indigo-400 font-mono">v{r.version}</span>}</div>
                    <div className="text-xs text-gray-500 line-clamp-2">{r.detail}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {devCorner && devCorner.items.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">💻 Dev Corner</h2>
              <Link href={`/dev-corner/${latestDate}`} className="text-xs text-indigo-400 hover:text-indigo-300">Alle →</Link>
            </div>
            <div className="space-y-2">
              {devCorner.items.slice(0, 3).map(d => (
                <Link key={d.id} href={`/dev-corner/${latestDate}`} className="glass glass-hover rounded-lg p-3 group block">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded font-mono">{d.typ}</span>
                    <span className="text-sm font-medium text-gray-200 group-hover:text-white">{d.titel}</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">{d.detail}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* 2-Spalten: Funding + Regulierung */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {funding && funding.items.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">💰 Funding</h2>
              <Link href={`/funding/${latestDate}`} className="text-xs text-indigo-400 hover:text-indigo-300">Alle →</Link>
            </div>
            <div className="space-y-2">
              {funding.items.map(f => (
                <Link key={f.id} href={`/funding/${latestDate}`} className="glass glass-hover rounded-lg p-3 group block">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-200 group-hover:text-white">{f.firma}</span>
                    <span className="text-sm font-bold text-green-400 font-mono">{f.betrag}</span>
                  </div>
                  <div className="text-xs text-gray-500">{f.runde} · {f.investoren}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {regulierung && regulierung.items.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">⚖️ Regulierung</h2>
              <Link href={`/regulierung/${latestDate}`} className="text-xs text-indigo-400 hover:text-indigo-300">Alle →</Link>
            </div>
            <div className="space-y-2">
              {regulierung.items.map(r => (
                <Link key={r.id} href={`/regulierung/${latestDate}`} className="glass glass-hover rounded-lg p-3 group block">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded font-mono ${r.auswirkung === 'hoch' ? 'bg-red-950/40 text-red-400' : r.auswirkung === 'mittel' ? 'bg-yellow-950/40 text-yellow-400' : 'bg-gray-900 text-gray-500'}`}>{r.auswirkung}</span>
                    <span className="text-xs text-gray-500">{r.region}</span>
                  </div>
                  <p className="text-sm text-gray-300 group-hover:text-white line-clamp-2">{r.titel}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Contoura Chancen */}
      {contoura && contoura.items.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">🎯 Contoura Chancen</h2>
            <Link href={`/contoura/${latestDate}`} className="text-xs text-indigo-400 hover:text-indigo-300">Alle →</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {contoura.items.map(c => (
              <Link key={c.id} href={`/contoura/${latestDate}`} className="glass glass-hover rounded-xl p-4 group block border-l-2 border-indigo-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded font-mono ${c.prioritaet === 'hoch' ? 'bg-indigo-950/60 text-indigo-300' : 'bg-gray-900 text-gray-500'}`}>{c.prioritaet}</span>
                  <span className="text-xs text-gray-600">{c.aufwand} Aufwand</span>
                </div>
                <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white mb-1">{c.titel}</h3>
                <p className="text-xs text-gray-500">{c.kontext}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Ältere Ausgaben (kompakt) */}
      {allDates.length > 1 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">📚 Frühere Ausgaben</h2>
            <Link href="/archiv" className="text-xs text-indigo-400 hover:text-indigo-300">Alle →</Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {allDates.slice(1, 8).map(d => (
              <Link
                key={d}
                href={`/top-news/${d}`}
                className="text-xs font-mono text-gray-500 hover:text-gray-300 bg-white/5 hover:bg-white/8 border border-white/5 px-3 py-1.5 rounded-lg transition-colors"
              >
                {d}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
