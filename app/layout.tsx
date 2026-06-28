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
      <body className="font-sans antialiased">
        <div className="max-w-6xl mx-auto px-3 sm:px-5 py-5 md:py-8">
          <div className="app-shell px-4 sm:px-6 md:px-8 py-5 md:py-6">
            <Header />
            <div className="mt-4 mb-6 flex items-start gap-2 rounded-xl border border-amber-200/70 bg-amber-50/80 px-3.5 py-2 text-[12.5px] text-amber-800">
              <span aria-hidden="true" className="mt-px">🤖</span>
              <p>
                <span className="font-medium">Hinweis:</span> Alle Inhalte werden vollautomatisch
                von einer KI (Claude) recherchiert und verfasst und können Fehler enthalten.
                Wichtige Angaben bitte an der verlinkten Originalquelle prüfen.
              </p>
            </div>
            <main>{children}</main>
          </div>
          <footer className="py-8 text-center text-xs text-slate-400">
            KI Briefing — alle Inhalte täglich automatisch von KI (Claude) generiert · ohne Gewähr
          </footer>
        </div>
      </body>
    </html>
  )
}
