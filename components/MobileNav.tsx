'use client'

import { THEMEN } from '@/lib/themen'

export default function MobileNav({ latestDate }: { latestDate: string | null }) {
  return (
    <select
      className="pill text-[13px] text-slate-600 px-3 py-2 focus:outline-none"
      onChange={(e) => { if (e.target.value) window.location.href = e.target.value }}
      defaultValue=""
      aria-label="Navigation"
    >
      <option value="">Menü</option>
      {THEMEN.map(t => (
        <option key={t.slug} value={latestDate ? `/${t.slug}/${latestDate}` : '/'}>
          {t.label}
        </option>
      ))}
      <option value="/archiv">Archiv</option>
    </select>
  )
}
