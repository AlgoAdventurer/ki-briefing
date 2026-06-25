import { notFound } from 'next/navigation'
import { getTopNews, getTool, getReleases, getDevCorner, getFunding, getReguliering, getContoura, getAllDates, THEMEN } from '@/lib/content'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { de } from 'date-fns/locale'

export async function generateStaticParams() {
  const dates = getAllDates()
  const params = []
  for (const datum of dates) {
    for (const thema of THEMEN) {
      params.push({ thema: thema.slug, datum })
    }
  }
  return params
}

interface Props {
  params: Promise<{ thema: string; datum: string }>
}

export default async function ThemaPage({ params }: Props) {
  const { thema, datum } = await params
  const themaInfo = THEMEN.find(t => t.slug === thema)
  if (!themaInfo) return notFound()

  const dateFormatted = format(parseISO(datum), "EEEE, d. MMMM yyyy", { locale: de })

  const renderContent = () => {
    if (thema === 'top-news') {
      const data = getTopNews(datum)
      if (!data) return notFound()
      return (
        <div className="space-y-4">
          {data.items.map(item => (
            <article key={item.id} className="glass rounded-xl overflow-hidden">
              {item.bild && (
                <div className="relative h-48">
                  <img src={item.bild} alt={item.titel} className="w-full h-full object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-indigo-300 bg-indigo-950/40 border border-indigo-800/30 px-2.5 py-1 rounded-full">{item.kategorie}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${item.wichtigkeit === 'hoch' ? 'bg-red-950/40 text-red-400' : 'bg-gray-900 text-gray-500'}`}>{item.wichtigkeit}</span>
                </div>
                <h2 className="text-lg font-semibold text-white mb-2">{item.titel}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">{item.zusammenfassung}</p>
                <a href={item.quelleUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300">
                  {item.quelle} ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      )
    }

    if (thema === 'tool') {
      const data = getTool(datum)
      if (!data) return notFound()
      return (
        <div className="glass rounded-xl p-6 max-w-2xl">
          <div className="flex items-start gap-4 mb-4">
            {data.bild && <img src={data.bild} alt={data.name} className="w-16 h-16 rounded-xl object-contain bg-white/5 p-2" />}
            <div>
              <h2 className="text-2xl font-bold text-white">{data.name}</h2>
              <p className="text-gray-400">{data.tagline}</p>
              <div className="flex gap-2 mt-2">
                {data.kostenlos && <span className="text-xs bg-green-950/50 text-green-400 border border-green-800/30 px-2 py-0.5 rounded-full">Kostenlos</span>}
                <span className="text-xs bg-white/5 text-gray-400 px-2 py-0.5 rounded">{data.kategorie}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed mb-4">{data.beschreibung}</p>
          <div className="glass rounded-lg p-4 mb-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Anwendungsfall</div>
            <p className="text-sm text-gray-300">{data.useCase}</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {data.tags.map(tag => (
              <span key={tag} className="text-xs font-mono text-purple-400 bg-purple-950/30 border border-purple-800/20 px-2 py-0.5 rounded">{tag}</span>
            ))}
          </div>
          <a href={data.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            Tool öffnen ↗
          </a>
        </div>
      )
    }

    if (thema === 'releases') {
      const data = getReleases(datum)
      if (!data) return notFound()
      return (
        <div className="space-y-4">
          {data.items.map(r => (
            <article key={r.id} className="glass glass-hover rounded-xl p-5 flex gap-4">
              {r.bild ? <img src={r.bild} alt={r.name} className="w-12 h-12 rounded-lg object-contain flex-shrink-0 bg-white/5 p-1" /> : <div className="w-12 h-12 rounded-lg bg-white/5 flex-shrink-0" />}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-semibold text-white">{r.name}</h2>
                  {r.version && <span className="text-xs font-mono text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded">v{r.version}</span>}
                  <span className="text-xs text-gray-600">{r.anbieter}</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-2">{r.detail}</p>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300">Mehr erfahren ↗</a>
              </div>
            </article>
          ))}
        </div>
      )
    }

    if (thema === 'dev-corner') {
      const data = getDevCorner(datum)
      if (!data) return notFound()
      return (
        <div className="space-y-4">
          {data.items.map(d => (
            <article key={d.id} className="glass rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/20 px-2.5 py-1 rounded">{d.typ}</span>
                <h2 className="font-semibold text-white">{d.titel}</h2>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-3">{d.detail}</p>
              {d.codebeispiel && (
                <pre className="bg-black/40 border border-white/5 rounded-lg p-3 text-xs font-mono text-green-400 overflow-x-auto mb-3">
                  {d.codebeispiel}
                </pre>
              )}
              <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300">Mehr erfahren ↗</a>
            </article>
          ))}
        </div>
      )
    }

    if (thema === 'funding') {
      const data = getFunding(datum)
      if (!data) return notFound()
      return (
        <div className="space-y-4">
          {data.items.map(f => (
            <article key={f.id} className="glass rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {f.bild && <img src={f.bild} alt={f.firma} className="w-10 h-10 rounded-lg object-contain bg-white/5 p-1" />}
                  <div>
                    <h2 className="font-semibold text-white">{f.firma}</h2>
                    <div className="text-xs text-gray-500">{f.runde}</div>
                  </div>
                </div>
                <span className="text-xl font-bold text-green-400 font-mono">{f.betrag}</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-2">{f.beschreibung}</p>
              <p className="text-xs text-gray-600">Investoren: {f.investoren}</p>
            </article>
          ))}
        </div>
      )
    }

    if (thema === 'regulierung') {
      const data = getReguliering(datum)
      if (!data) return notFound()
      return (
        <div className="space-y-4">
          {data.items.map(r => (
            <article key={r.id} className="glass rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-mono px-2.5 py-1 rounded ${r.auswirkung === 'hoch' ? 'bg-red-950/40 text-red-400' : r.auswirkung === 'mittel' ? 'bg-yellow-950/40 text-yellow-400' : 'bg-gray-900 text-gray-500'}`}>{r.auswirkung}</span>
                <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded">{r.region}</span>
              </div>
              <h2 className="font-semibold text-white mb-2">{r.titel}</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-3">{r.detail}</p>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300">Quelle ↗</a>
            </article>
          ))}
        </div>
      )
    }

    if (thema === 'contoura') {
      const data = getContoura(datum)
      if (!data) return notFound()
      return (
        <div className="space-y-4">
          {data.items.map(c => (
            <article key={c.id} className="glass rounded-xl p-5 border-l-2 border-indigo-700/50">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-mono px-2.5 py-1 rounded-full ${c.prioritaet === 'hoch' ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-700/30' : 'bg-gray-900 text-gray-500'}`}>Priorität: {c.prioritaet}</span>
                <span className="text-xs text-gray-600">Aufwand: {c.aufwand}</span>
              </div>
              <h2 className="font-semibold text-white mb-2">{c.titel}</h2>
              <div className="mb-3">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Kontext</div>
                <p className="text-sm text-gray-400">{c.kontext}</p>
              </div>
              <div className="glass rounded-lg p-3">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Umsetzung</div>
                <p className="text-sm text-gray-300">{c.umsetzung}</p>
              </div>
            </article>
          ))}
        </div>
      )
    }

    return notFound()
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-600 mb-6">
        <Link href="/" className="hover:text-gray-400">Home</Link>
        <span>/</span>
        <span className="text-gray-400">{themaInfo.emoji} {themaInfo.label}</span>
        <span>/</span>
        <span className="font-mono">{datum}</span>
      </nav>

      {/* Thema-Header */}
      <div className="mb-8">
        <div className="text-3xl mb-2">{themaInfo.emoji}</div>
        <h1 className="text-2xl font-bold text-white mb-1">{themaInfo.label}</h1>
        <p className="text-sm text-gray-500">{dateFormatted}</p>
      </div>

      {/* Navigation zwischen Themen für dieses Datum */}
      <div className="flex flex-wrap gap-2 mb-8">
        {THEMEN.map(t => (
          <Link
            key={t.slug}
            href={`/${t.slug}/${datum}`}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${t.slug === thema ? 'bg-indigo-600/20 border-indigo-600/40 text-indigo-300' : 'border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/10 bg-white/5'}`}
          >
            {t.emoji} {t.label}
          </Link>
        ))}
      </div>

      {renderContent()}
    </div>
  )
}
