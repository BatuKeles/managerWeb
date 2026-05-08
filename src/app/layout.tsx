import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import CinematicLayer from '@/components/CinematicLayer'
import CookieConsent from '@/components/CookieConsent'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['400', '500', '600', '700'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', weight: ['400', '500', '600', '700'] })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kulupbul.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Kulüp Bul — Spor Kulübü Yönetim Platformu',
    template: '%s | Kulüp Bul',
  },
  description: 'Spor kulüpleri, antrenörler, veliler ve sporcular için tasarlanmış yeni nesil yönetim platformu. Devam takibi, ödeme, performans ve daha fazlası.',
  keywords: ['spor kulübü', 'kulüp yönetimi', 'sporcu yönetimi', 'antrenör platformu', 'veli takip', 'yüzme kulübü', 'spor yazılımı'],
  authors: [{ name: 'Kulüp Bul' }],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: SITE_URL,
    siteName: 'Kulüp Bul',
    title: 'Kulüp Bul — Spor Kulübü Yönetim Platformu',
    description: 'Spor kulübünüzü dijital dönüşüme taşıyın. Devam, ödeme, iletişim — tek platformda.',
    images: [{ url: '/anasayfa_arka_plan.png', width: 1200, height: 630, alt: 'Kulüp Bul' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kulüp Bul — Spor Kulübü Yönetim Platformu',
    description: 'Spor kulübünüzü dijital dönüşüme taşıyın.',
    images: ['/anasayfa_arka_plan.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body bg-t-black text-t-white antialiased`}>
        <CinematicLayer />
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
