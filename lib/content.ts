import fs from 'fs'
import path from 'path'

export { THEMEN } from './themen'

export interface NewsItem {
  id: number
  titel: string
  quelle: string
  quelleUrl: string
  zusammenfassung: string
  kategorie: string
  bild?: string
  wichtigkeit: string
}

export interface TopNews {
  datum: string
  items: NewsItem[]
}

export interface Tool {
  datum: string
  name: string
  tagline: string
  beschreibung: string
  useCase: string
  url: string
  kategorie: string
  bild?: string
  kostenlos: boolean
  tags: string[]
}

export interface Release {
  id: number
  name: string
  version?: string
  anbieter: string
  detail: string
  url: string
  bild?: string
}

export interface Releases {
  datum: string
  items: Release[]
}

export interface DevItem {
  id: number
  titel: string
  typ: string
  detail: string
  url: string
  codebeispiel?: string
}

export interface DevCorner {
  datum: string
  items: DevItem[]
}

export interface FundingItem {
  id: number
  firma: string
  betrag: string
  runde: string
  investoren: string
  beschreibung: string
  bild?: string
}

export interface Funding {
  datum: string
  items: FundingItem[]
}

export interface RegulierungItem {
  id: number
  titel: string
  region: string
  detail: string
  url: string
  auswirkung: string
}

export interface Regulierung {
  datum: string
  items: RegulierungItem[]
}

export interface ContourItem {
  id: number
  titel: string
  kontext: string
  umsetzung: string
  aufwand: string
  prioritaet: string
}

export interface Contoura {
  datum: string
  items: ContourItem[]
}

export interface BriefingDate {
  datum: string
  formatted: string
}

const contentDir = path.join(process.cwd(), 'content')

function readJson<T>(file: string): T | null {
  try {
    const filePath = path.join(contentDir, file)
    if (!fs.existsSync(filePath)) return null
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function getAllDates(): string[] {
  if (!fs.existsSync(contentDir)) return []
  const files = fs.readdirSync(contentDir)
  const dates = new Set<string>()
  const dateRegex = /(\d{4}-\d{2}-\d{2})\.json$/
  files.forEach(f => {
    const match = f.match(dateRegex)
    if (match) dates.add(match[1])
  })
  return Array.from(dates).sort((a, b) => b.localeCompare(a))
}

export function getLatestDate(): string | null {
  const dates = getAllDates()
  return dates.length > 0 ? dates[0] : null
}

export function getTopNews(datum: string): TopNews | null {
  return readJson<TopNews>(`top-news-${datum}.json`)
}

export function getTool(datum: string): Tool | null {
  return readJson<Tool>(`tool-${datum}.json`)
}

export function getReleases(datum: string): Releases | null {
  return readJson<Releases>(`releases-${datum}.json`)
}

export function getDevCorner(datum: string): DevCorner | null {
  return readJson<DevCorner>(`dev-corner-${datum}.json`)
}

export function getFunding(datum: string): Funding | null {
  return readJson<Funding>(`funding-${datum}.json`)
}

export function getReguliering(datum: string): Regulierung | null {
  return readJson<Regulierung>(`regulierung-${datum}.json`)
}

export function getContoura(datum: string): Contoura | null {
  return readJson<Contoura>(`contoura-${datum}.json`)
}
