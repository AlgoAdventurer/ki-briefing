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
      <body className="bg-[#0a0a0f] text-gray-100 min-h-screen font-sans antialiased">
        <Header />
        <div className="bg-amber-950/30 border-b border-amber-800/30 text-amber-200/90">
          <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-2 text-xs">
            <span aria-hidden="true">🤖</span>
            <p>
              <span className="font-semibold">Hinweis:</span> Alle Inhalte dieser Seite werden
              vollautomatisch von einer KI (Claude) recherchiert und verfasst. Sie können Fehler
              enthalten — bitte wichtige Angaben an der verlinkten Originalquelle prüfen.
            </p>
          </div>
        </div>
        <main className="max-w-5xl mx-auto px-4 pb-16">
          {children}
        </main>
        <footer className="border-t border-white/5 mt-16 py-8 text-center text-xs text-gray-600">
          KI Briefing — alle Inhalte täglich automatisch von KI (Claude) generiert · ohne Gewähr
        </footer>
      </body>
    </html>
  )
}
