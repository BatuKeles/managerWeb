'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { DemoSidebar } from './components/DemoSidebar'

const DEMO_ROUTES = [
  '/demo/dashboard',
  '/demo/seanslar',
  '/demo/onaylar',
  '/demo/uyeler',
  '/demo/tahsilat',
  '/demo/antrenorler',
  '/demo/finans',
  '/demo/mesajlar',
  '/demo/paketler',
  '/demo/ayarlar',
  '/demo/bildirimler',
  '/demo/stok',
]

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  // Prefetch all demo routes on layout mount (helps deep-link entries)
  useEffect(() => {
    DEMO_ROUTES.forEach((route) => router.prefetch(route))
  }, [router])

  // Loading page (/demo) renders without sidebar
  if (pathname === '/demo') {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-[#0a0a14] text-white overflow-hidden">
      <DemoSidebar currentPath={pathname} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
