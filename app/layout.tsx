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
        <main className="max-w-5xl mx-auto px-4 pb-16">
          {children}
        </main>
        <footer className="border-t border-white/5 mt-16 py-8 text-center text-xs text-gray-600">
          KI Briefing — generiert täglich von Claude Code
        </footer>
      </body>
    </html>
  )
}
