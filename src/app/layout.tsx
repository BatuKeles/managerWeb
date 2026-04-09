import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import CinematicLayer from '@/components/CinematicLayer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['400', '500', '600', '700'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'SporKulübü — Dijital Platform',
  description: 'Veliler, sporcular, antrenörler ve kulüpler için kapsamlı spor yönetim platformu.',
  keywords: 'spor kulübü, sporcu yönetimi, antrenör, veli, dijital platform',
  openGraph: {
    title: 'SporKulübü — Dijital Platform',
    description: 'Spor kulübünüzü dijital dönüşüme taşıyın',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body bg-t-black text-t-white antialiased`}>
        <CinematicLayer />
        {children}
      </body>
    </html>
  )
}
