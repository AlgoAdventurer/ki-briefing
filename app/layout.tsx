import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'KI Briefing — Täglich. Kompakt. Relevant.',
  description: 'Tägliche KI & Tech News, kuratiert und zusammengefasst.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-zinc-950 text-zinc-300 min-h-screen font-sans antialiased">
        <Header />
        <div className="border-b border-amber-500/15 bg-amber-500/[0.04]">
          <div className="max-w-4xl mx-auto px-5 py-2.5 flex items-start gap-2.5 text-[13px] text-amber-200/80">
            <span aria-hidden="true" className="mt-px">🤖</span>
            <p>
              <span className="font-medium text-amber-200">Hinweis:</span> Alle Inhalte werden
              vollautomatisch von einer KI (Claude) recherchiert und verfasst und können Fehler
              enthalten. Wichtige Angaben bitte an der verlinkten Originalquelle prüfen.
            </p>
          </div>
        </div>
        <main className="max-w-4xl mx-auto px-5 pb-24 pt-4">
          {children}
        </main>
        <footer className="border-t border-zinc-900 py-10 text-center text-xs text-zinc-600">
          KI Briefing — alle Inhalte täglich automatisch von KI (Claude) generiert · ohne Gewähr
        </footer>
      </body>
    </html>
  )
}
