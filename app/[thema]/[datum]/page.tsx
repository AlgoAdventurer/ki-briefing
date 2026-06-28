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

  const dateFormatted = format(parseISO(datum), 'EEEE, d. MMMM yyyy', { locale: de })

  const renderContent = () => {
    if (thema === 'top-news') {
      const data = getTopNews(datum)
      if (!data) return notFound()
      return (
        <div className="space-y-8">
          {data.items.map(item => (
            <article key={item.id} className="border-b border-slate-200/70 pb-8 last:border-0">
              {item.bild && (
                <div className="mb-5 overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.bild} alt={item.titel} className="w-full h-60 object-cover" />
                </div>
              )}
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">{item.kategorie}</span>
                {item.wichtigkeit === 'hoch' && (
                  <span className="text-[11px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">wichtig</span>
                )}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">{item.titel}</h2>
              <p className="text-slate-500 leading-relaxed mt-3 measure">{item.zusammenfassung}</p>
              <a href={item.quelleUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 mt-4 transition-colors">
                {item.quelle} ↗
              </a>
            </article>
          ))}
        </div>
      )
    }

    if (thema === 'tool') {
      const data = getTool(datum)
      if (!data) return notFound()
      return (
        <div className="card p-7 max-w-2xl">
          <div className="flex items-start gap-5 mb-5">
            {data.bild && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.bild} alt={data.name} className="w-16 h-16 rounded-2xl object-contain bg-slate-50 border border-slate-100 p-2 shrink-0" />
            )}
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{data.name}</h2>
              <p className="text-slate-500 mt-1">{data.tagline}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {data.kostenlos && <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">Kostenlos</span>}
                <span className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">{data.kategorie}</span>
              </div>
            </div>
          </div>
          <p className="text-slate-700 leading-relaxed mb-5">{data.beschreibung}</p>
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 mb-5">
            <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1.5">Anwendungsfall</div>
            <p className="text-sm text-slate-700">{data.useCase}</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {data.tags.map(tag => (
              <span key={tag} className="text-xs font-mono text-violet-700 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded">{tag}</span>
            ))}
          </div>
          <a href={data.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-full transition-colors">
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
            <article key={r.id} className="card card-hover p-6 flex gap-5">
              {r.bild ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.bild} alt={r.name} className="w-12 h-12 rounded-xl object-contain shrink-0 bg-slate-50 border border-slate-100 p-1.5" />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-slate-100 shrink-0" />
              )}
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                  <h2 className="text-lg font-semibold text-slate-900">{r.name}</h2>
                  {r.version && <span className="text-xs font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">v{r.version}</span>}
                  <span className="text-xs text-slate-500">{r.anbieter}</span>
                </div>
                <p className="text-slate-600 leading-relaxed mb-2.5">{r.detail}</p>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:text-indigo-700 transition-colors">Mehr erfahren ↗</a>
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
            <article key={d.id} className="card p-6">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-[11px] font-mono text-violet-700 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded">{d.typ}</span>
                <h2 className="text-lg font-semibold text-slate-900">{d.titel}</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-3">{d.detail}</p>
              {d.codebeispiel && (
                <pre className="bg-slate-900 rounded-xl p-4 text-xs font-mono text-emerald-300 overflow-x-auto mb-3">
                  {d.codebeispiel}
                </pre>
              )}
              <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:text-indigo-700 transition-colors">Mehr erfahren ↗</a>
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
            <article key={f.id} className="card p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  {f.bild && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={f.bild} alt={f.firma} className="w-10 h-10 rounded-xl object-contain bg-slate-50 border border-slate-100 p-1.5" />
                  )}
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{f.firma}</h2>
                    <div className="text-xs text-slate-500">{f.runde}</div>
                  </div>
                </div>
                <span className="text-xl font-bold text-emerald-600 font-mono shrink-0">{f.betrag}</span>
              </div>
              <p className="text-slate-600 leading-relaxed mb-2">{f.beschreibung}</p>
              <p className="text-xs text-slate-500">Investoren: {f.investoren}</p>
            </article>
          ))}
        </div>
      )
    }

    if (thema === 'regulierung') {
      const data = getReguliering(datum)
      if (!data) return notFound()
      if (data.items.length === 0) {
        return <p className="text-slate-500">Heute keine relevanten Regulierungs-News.</p>
      }
      return (
        <div className="space-y-4">
          {data.items.map(r => (
            <article key={r.id} className="card p-6">
              <div className="flex items-center gap-2.5 mb-3">
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${r.auswirkung === 'hoch' ? 'bg-rose-50 text-rose-700' : r.auswirkung === 'mittel' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>{r.auswirkung}</span>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{r.region}</span>
              </div>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">{r.titel}</h2>
              <p className="text-slate-600 leading-relaxed mb-3">{r.detail}</p>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:text-indigo-700 transition-colors">Quelle ↗</a>
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
            <article key={c.id} className="card p-6 border-l-2 border-l-indigo-400">
              <div className="flex items-center gap-2.5 mb-3">
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${c.prioritaet === 'hoch' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-slate-100 text-slate-600'}`}>Priorität: {c.prioritaet}</span>
                <span className="text-xs text-slate-500">Aufwand: {c.aufwand}</span>
              </div>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">{c.titel}</h2>
              <div className="mb-3">
                <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Kontext</div>
                <p className="text-sm text-slate-600 leading-relaxed">{c.kontext}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Umsetzung</div>
                <p className="text-sm text-slate-700 leading-relaxed">{c.umsetzung}</p>
              </div>
            </article>
          ))}
        </div>
      )
    }

    return notFound()
  }

  return (
    <div className="py-2">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-7">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-slate-600">{themaInfo.label}</span>
        <span>/</span>
        <span className="font-mono">{datum}</span>
      </nav>

      {/* Thema-Header */}
      <div className="mb-7">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{themaInfo.label}</h1>
        <p className="text-sm text-slate-500 mt-1.5">{dateFormatted}</p>
      </div>

      {/* Themen-Navigation für dieses Datum */}
      <div className="flex flex-wrap gap-2 mb-9">
        {THEMEN.map(t => (
          <Link
            key={t.slug}
            href={`/${t.slug}/${datum}`}
            className={`text-[13px] px-3 py-1.5 rounded-full border transition-colors ${t.slug === thema ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'}`}
          >
            {t.short}
          </Link>
        ))}
      </div>

      {renderContent()}
    </div>
  )
}
