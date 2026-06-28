import { getLatestDate, getTopNews, getTool, getReleases, getDevCorner, getFunding, getContoura } from '@/lib/content'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { de } from 'date-fns/locale'

const GRADIENTS = [
  'linear-gradient(135deg,#c7d2fe,#a5b4fc)',
  'linear-gradient(135deg,#fbcfe8,#f0abfc)',
  'linear-gradient(135deg,#bae6fd,#93c5fd)',
  'linear-gradient(135deg,#ddd6fe,#c4b5fd)',
  'linear-gradient(135deg,#bbf7d0,#86efac)',
  'linear-gradient(135deg,#fde68a,#fdba74)',
]
const grad = (i: number) => GRADIENTS[i % GRADIENTS.length]

interface Rec {
  href: string
  label: string
  title: string
  img?: string
}

export default function Home() {
  const latestDate = getLatestDate()

  if (!latestDate) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
        <div className="text-5xl">📡</div>
        <h1 className="text-xl font-semibold text-slate-800">Erstes Briefing noch unterwegs</h1>
        <p className="text-sm text-slate-500">Die Routine läuft täglich um 05:00 Uhr.</p>
      </div>
    )
  }

  const topNews = getTopNews(latestDate)
  const tool = getTool(latestDate)
  const releases = getReleases(latestDate)
  const devCorner = getDevCorner(latestDate)
  const funding = getFunding(latestDate)
  const contoura = getContoura(latestDate)

  const dateLong = format(parseISO(latestDate), 'd. MMMM yyyy', { locale: de })

  const feature = topNews?.items?.[0]
  const mainRest = topNews?.items?.slice(1, 4) ?? []

  // Curated "Empfohlen" sidebar mix.
  const recs: Rec[] = []
  if (releases?.items?.[0]) recs.push({ href: `/releases/${latestDate}`, label: 'Releases', title: `${releases.items[0].name}${releases.items[0].version ? ' v' + releases.items[0].version : ''}`, img: releases.items[0].bild })
  if (devCorner?.items?.[0]) recs.push({ href: `/dev-corner/${latestDate}`, label: 'Developer', title: devCorner.items[0].titel })
  if (funding?.items?.[0]) recs.push({ href: `/funding/${latestDate}`, label: 'Funding', title: `${funding.items[0].firma} · ${funding.items[0].betrag}`, img: funding.items[0].bild })
  if (contoura?.items?.[0]) recs.push({ href: `/contoura/${latestDate}`, label: 'Contoura', title: contoura.items[0].titel })
  if (releases?.items?.[1]) recs.push({ href: `/releases/${latestDate}`, label: 'Releases', title: `${releases.items[1].name}${releases.items[1].version ? ' v' + releases.items[1].version : ''}`, img: releases.items[1].bild })

  return (
    <div className="grid lg:grid-cols-[1.7fr_1fr] gap-8 lg:gap-12">
      {/* MAIN */}
      <section className="min-w-0">
        {feature && (
          <div className="relative pt-2">
            <div className="orb pointer-events-none absolute -top-8 right-0 h-56 w-56 rounded-full opacity-60 hidden md:block" aria-hidden="true" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-indigo-600">
                <span className="h-3.5 w-1 rounded-full bg-indigo-500" />
                Top-Story heute
              </div>
              <div className="mt-5 text-[13px] text-slate-500">
                <span className="text-indigo-600 font-medium">{feature.kategorie}</span>
                <span className="mx-2 text-slate-300">·</span>
                {dateLong}
              </div>
              <h1 className="mt-3 text-3xl md:text-[2.6rem] font-bold leading-[1.08] text-slate-900 measure">
                {feature.titel}
              </h1>
              <p className="mt-4 text-slate-500 measure leading-relaxed">{feature.zusammenfassung}</p>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-[12px] text-slate-400">
                <span>#{feature.kategorie.replace(/\s+/g, '')}</span>
                <span>·</span>
                <span>{feature.quelle}</span>
              </div>
              <Link
                href={`/top-news/${latestDate}`}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium pl-5 pr-4 py-2.5 transition-colors"
              >
                Artikel lesen
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/15">→</span>
              </Link>
            </div>
          </div>
        )}

        {mainRest.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200/70 grid sm:grid-cols-3 gap-5">
            {mainRest.map((item, i) => (
              <Link
                key={item.id}
                href={`/top-news/${latestDate}`}
                data-search={`${item.titel} ${item.kategorie}`.toLowerCase()}
                className="group block"
              >
                <div className="h-24 rounded-xl mb-3 overflow-hidden" style={item.bild ? undefined : { background: grad(i) }}>
                  {item.bild && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.bild} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="text-[11px] text-slate-400">
                  <span className="text-indigo-600 font-medium">{item.kategorie}</span>
                  <span className="mx-1.5">·</span>{dateLong}
                </div>
                <h3 className="mt-1 text-[14px] font-semibold leading-snug text-slate-800 group-hover:text-slate-950 transition-colors line-clamp-3">
                  {item.titel}
                </h3>
              </Link>
            ))}
          </div>
        )}

        <p id="search-empty" style={{ display: 'none' }} className="mt-8 text-sm text-slate-400">
          Keine Treffer für deine Suche.
        </p>
      </section>

      {/* SIDEBAR */}
      <aside className="min-w-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-slate-900">Empfohlen</h2>
          <Link href="/archiv" className="text-[13px] text-slate-400 hover:text-slate-700 transition-colors">
            Alle anzeigen ›
          </Link>
        </div>

        {/* Featured: Tool des Tages */}
        {tool && (
          <Link
            href={`/tool/${latestDate}`}
            data-search={`${tool.name} ${tool.kategorie} tool`.toLowerCase()}
            className="group relative block h-44 rounded-2xl overflow-hidden mb-3"
            style={tool.bild ? undefined : { background: grad(3) }}
          >
            {tool.bild && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={tool.bild} alt="" className="absolute inset-0 h-full w-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-0 p-4">
              <div className="text-[11px] font-medium text-indigo-200">Tool des Tages</div>
              <div className="mt-1 text-[15px] font-semibold text-white leading-snug">{tool.name}</div>
              <div className="text-[12px] text-white/70 line-clamp-1">{tool.tagline}</div>
            </div>
          </Link>
        )}

        {/* List */}
        <div className="divide-y divide-slate-200/70">
          {recs.map((r, i) => (
            <Link
              key={`${r.href}-${i}`}
              href={r.href}
              data-search={`${r.title} ${r.label}`.toLowerCase()}
              className="group flex items-center gap-3 py-3"
            >
              <div className="h-14 w-14 shrink-0 rounded-xl overflow-hidden" style={r.img ? undefined : { background: grad(i + 1) }}>
                {r.img && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.img} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-slate-400">
                  <span className="text-indigo-600 font-medium">{r.label}</span>
                  <span className="mx-1.5">·</span>{dateLong}
                </div>
                <h4 className="mt-0.5 text-[13.5px] font-semibold leading-snug text-slate-800 group-hover:text-slate-950 transition-colors line-clamp-2">
                  {r.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  )
}
