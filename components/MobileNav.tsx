'use client'

import { THEMEN } from '@/lib/themen'

export default function MobileNav({ latestDate }: { latestDate: string | null }) {
  return (
    <select
      className="bg-white/5 border border-white/10 text-gray-300 text-xs rounded-md px-2 py-1.5"
      onChange={(e) => { if (e.target.value) window.location.href = e.target.value }}
      defaultValue=""
    >
      <option value="">Menu</option>
      {THEMEN.map(t => (
        <option key={t.slug} value={latestDate ? `/${t.slug}/${latestDate}` : '/'}>
          {t.emoji} {t.label}
        </option>
      ))}
      <option value="/archiv">📚 Archiv</option>
    </select>
  )
}
