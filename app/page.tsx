import { getLatestDate, getAllDates, getTopNews, getTool, getReleases, getDevCorner, getFunding, getReguliering, getContoura } from '@/lib/content'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { de } from 'date-fns/locale'

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>
      {href && (
        <Link href={href} className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
          Alle anzeigen →
        </Link>
      )}
    </div>
  )
}

export default function Home() {
  const latestDate = getLatestDate()
  const allDates = getAllDates()

  if (!latestDate) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <div className="text-5xl">📡</div>
        <h1 className="text-xl font-semibold text-zinc-200">Erstes Briefing noch unterwegs</h1>
        <p className="text-sm text-zinc-500">Die Routine läuft täglich um 05:00 Uhr.</p>
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

  const dateFormatted = format(parseISO(latestDate), 'EEEE, d. MMMM yyyy', { locale: de })

  const feature = topNews?.items?.[0]
  const restNews = topNews?.items?.slice(1) ?? []

  return (
    <div>
      {/* Hero */}
      <section className="py-12 md:py-16 border-b border-zinc-900">
        <div className="flex items-center gap-2 mb-5 text-xs font-mono text-zinc-500">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-indigo-300/90">Live</span>
          <span className="text-zinc-700">·</span>
          <span>{dateFormatted}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.05]">
          KI &amp; Tech Briefing
        </h1>
        <p className="text-zinc-400 mt-4 text-base measure">
          Die wichtigsten Entwicklungen aus KI und Technologie — täglich kuratiert,
          kompakt zusammengefasst, in rund zehn Minuten gelesen.
        </p>
      </section>

      {/* Top News */}
      {feature && (
        <section className="py-14 border-b border-zinc-900">
          <SectionHeader title="Top News" href={`/top-news/${latestDate}`} />

          <Link href={`/top-news/${latestDate}`} className="group block">
            {feature.bild && (
              <div className="mb-6 overflow-hidden rounded-2xl border border-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={feature.bild} alt={feature.titel} className="w-full h-56 md:h-72 object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
            <div className="text-xs font-mono text-indigo-400/90 mb-3">{feature.kategorie}</div>
            <h3 className="text-2xl md:text-3xl font-semibold text-zinc-50 leading-snug group-hover:text-white transition-colors">
              {feature.titel}
            </h3>
            <p className="text-zinc-400 leading-relaxed mt-4 measure">{feature.zusammenfassung}</p>
            <div className="text-sm text-zinc-500 mt-4">{feature.quelle}</div>
          </Link>

          {restNews.length > 0 && (
            <div className="mt-10 border-t border-zinc-900">
              {restNews.map(item => (
                <Link
                  key={item.id}
                  href={`/top-news/${latestDate}`}
                  className="group flex items-start gap-5 py-5 border-b border-zinc-900"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-medium text-zinc-200 group-hover:text-white transition-colors">
                      {item.titel}
                    </h4>
                    <p className="text-sm text-zinc-500 mt-1 line-clamp-1">{item.zusammenfassung}</p>
                  </div>
                  <span className="shrink-0 text-[11px] font-mono text-zinc-600 pt-1">{item.kategorie}</span>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Tool des Tages */}
      {tool && (
        <section className="py-14 border-b border-zinc-900">
          <SectionHeader title="Tool des Tages" href={`/tool/${latestDate}`} />
          <Link href={`/tool/${latestDate}`} className="card card-hover group flex items-start gap-5 p-6">
            {tool.bild && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={tool.bild} alt={tool.name} className="w-12 h-12 rounded-xl object-contain bg-zinc-800/60 p-1.5 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <span className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors">{tool.name}</span>
                {tool.kostenlos && (
                  <span className="text-[11px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">Kostenlos</span>
                )}
                <span className="text-[11px] text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded-full">{tool.kategorie}</span>
              </div>
              <p className="text-zinc-400">{tool.tagline}</p>
            </div>
            <span className="shrink-0 text-zinc-600 group-hover:text-indigo-400 transition-colors text-lg">↗</span>
          </Link>
        </section>
      )}

      {/* Releases + Dev Corner */}
      {((releases && releases.items.length > 0) || (devCorner && devCorner.items.length > 0)) && (
        <section className="py-14 border-b border-zinc-900 grid md:grid-cols-2 gap-12">
          {releases && releases.items.length > 0 && (
            <div>
              <SectionHeader title="Releases" href={`/releases/${latestDate}`} />
              <div className="-mt-1">
                {releases.items.slice(0, 4).map(r => (
                  <Link key={r.id} href={`/releases/${latestDate}`} className="group flex items-baseline gap-3 py-3 border-b border-zinc-900">
                    <div className="min-w-0">
                      <span className="text-[15px] font-medium text-zinc-200 group-hover:text-white transition-colors">{r.name}</span>
                      {r.version && <span className="ml-2 text-xs font-mono text-indigo-400">v{r.version}</span>}
                      <p className="text-sm text-zinc-500 line-clamp-1 mt-0.5">{r.detail}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {devCorner && devCorner.items.length > 0 && (
            <div>
              <SectionHeader title="Developer Corner" href={`/dev-corner/${latestDate}`} />
              <div className="-mt-1">
                {devCorner.items.slice(0, 4).map(d => (
                  <Link key={d.id} href={`/dev-corner/${latestDate}`} className="group block py-3 border-b border-zinc-900">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] font-mono text-violet-300 bg-violet-500/10 px-1.5 py-0.5 rounded">{d.typ}</span>
                      <span className="text-[15px] font-medium text-zinc-200 group-hover:text-white transition-colors">{d.titel}</span>
                    </div>
                    <p className="text-sm text-zinc-500 line-clamp-1 mt-1">{d.detail}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Funding + Regulierung */}
      {((funding && funding.items.length > 0) || (regulierung && regulierung.items.length > 0)) && (
        <section className="py-14 border-b border-zinc-900 grid md:grid-cols-2 gap-12">
          {funding && funding.items.length > 0 && (
            <div>
              <SectionHeader title="Startups & Funding" href={`/funding/${latestDate}`} />
              <div className="-mt-1">
                {funding.items.map(f => (
                  <Link key={f.id} href={`/funding/${latestDate}`} className="group flex items-baseline justify-between gap-3 py-3 border-b border-zinc-900">
                    <div className="min-w-0">
                      <span className="text-[15px] font-medium text-zinc-200 group-hover:text-white transition-colors">{f.firma}</span>
                      <p className="text-sm text-zinc-500 line-clamp-1 mt-0.5">{f.runde} · {f.investoren}</p>
                    </div>
                    <span className="shrink-0 text-[15px] font-semibold text-emerald-400 font-mono">{f.betrag}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {regulierung && regulierung.items.length > 0 && (
            <div>
              <SectionHeader title="Regulierung" href={`/regulierung/${latestDate}`} />
              <div className="-mt-1">
                {regulierung.items.map(r => (
                  <Link key={r.id} href={`/regulierung/${latestDate}`} className="group block py-3 border-b border-zinc-900">
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${r.auswirkung === 'hoch' ? 'bg-red-500/10 text-red-300' : r.auswirkung === 'mittel' ? 'bg-amber-500/10 text-amber-300' : 'bg-zinc-800 text-zinc-400'}`}>{r.auswirkung}</span>
                      <span className="text-xs text-zinc-500">{r.region}</span>
                    </div>
                    <p className="text-[15px] text-zinc-300 group-hover:text-white transition-colors line-clamp-2">{r.titel}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Contoura */}
      {contoura && contoura.items.length > 0 && (
        <section className="py-14 border-b border-zinc-900">
          <SectionHeader title="Chancen für Contoura" href={`/contoura/${latestDate}`} />
          <div className="grid md:grid-cols-2 gap-4">
            {contoura.items.map(c => (
              <Link key={c.id} href={`/contoura/${latestDate}`} className="card card-hover group p-5">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${c.prioritaet === 'hoch' ? 'bg-indigo-500/15 text-indigo-300' : 'bg-zinc-800 text-zinc-400'}`}>Priorität: {c.prioritaet}</span>
                  <span className="text-[11px] text-zinc-500">Aufwand: {c.aufwand}</span>
                </div>
                <h3 className="text-[15px] font-medium text-zinc-100 group-hover:text-white transition-colors">{c.titel}</h3>
                <p className="text-sm text-zinc-500 mt-1.5 line-clamp-2">{c.kontext}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Frühere Ausgaben */}
      {allDates.length > 1 && (
        <section className="py-14">
          <SectionHeader title="Frühere Ausgaben" href="/archiv" />
          <div className="flex flex-wrap gap-2">
            {allDates.slice(1, 10).map(d => (
              <Link
                key={d}
                href={`/top-news/${d}`}
                className="text-sm font-mono text-zinc-500 hover:text-zinc-200 bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded-lg transition-colors"
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
