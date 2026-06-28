'use client'

import { useState } from 'react'

export default function SearchBar() {
  const [q, setQ] = useState('')

  const handle = (value: string) => {
    setQ(value)
    const needle = value.toLowerCase().trim()
    const nodes = document.querySelectorAll<HTMLElement>('[data-search]')
    nodes.forEach(el => {
      const hay = el.getAttribute('data-search') ?? ''
      el.style.display = !needle || hay.includes(needle) ? '' : 'none'
    })
    const empty = document.getElementById('search-empty')
    if (empty) {
      const anyVisible = Array.from(nodes).some(el => el.style.display !== 'none')
      empty.style.display = needle && !anyVisible ? '' : 'none'
    }
  }

  return (
    <div className="relative w-44 sm:w-64">
      <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        value={q}
        onChange={e => handle(e.target.value)}
        placeholder="Artikel, Tag, Kategorie…"
        aria-label="Briefing durchsuchen"
        className="w-full rounded-full bg-slate-100/80 border border-slate-200/70 pl-9 pr-3 py-2 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-colors"
      />
    </div>
  )
}
