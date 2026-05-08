'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import MascotVideo from '@/components/Mascot/MascotVideo'

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

const messages = [
  'Dashboard hazırlanıyor...',
  'Seans takvimi yükleniyor...',
  'Onay sistemi kuruluyor...',
  'Üye verileri oluşturuluyor...',
  'Tahsilat modülü hazırlanıyor...',
  'Antrenör verileri yükleniyor...',
  'Finansal raporlar ayarlanıyor...',
  'Mesaj şablonları yükleniyor...',
  'Paket yapılandırması...',
  'Ayarlar kontrol ediliyor...',
  'Bildirimler hazırlanıyor...',
  'Stok verileri yükleniyor...',
]

export default function DemoPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState(messages[0])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false

    const preload = async () => {
      const total = DEMO_ROUTES.length

      for (let i = 0; i < total; i++) {
        if (cancelled) return
        await fetch(DEMO_ROUTES[i], { priority: 'low' as RequestPriority }).catch(() => {})
        const loaded = i + 1
        setProgress(loaded / total)
        setMessage(messages[i] ?? messages[messages.length - 1])
      }

      if (cancelled) return
      setMessage('Demo hazır! \uD83C\uDF89')
      setDone(true)
      await new Promise((r) => setTimeout(r, 500))
      if (!cancelled) {
        router.push('/demo/dashboard')
      }
    }

    preload()

    return () => {
      cancelled = true
    }
  }, [router])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0F19]"
    >
      {/* Background dots */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-teal-500/20 animate-pulse"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDelay: `${(i * 0.15) % 3}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* Mascot */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <MascotVideo
          src="/videos/mascot/bench.webm"
          width={215}
          height={215}
        />
      </motion.div>

      {/* Title */}
      <h1 className="mt-6 font-headline text-xl text-white">Demo Yükleniyor...</h1>

      {/* Progress bar */}
      <div className="mt-8 h-1.5 w-80 overflow-hidden rounded-full bg-[#1E293B]">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, #0D9488, #0EA5E9)',
          }}
        />
      </div>

      {/* Message */}
      <div className="mt-4 h-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className={`text-sm ${done ? 'text-teal-400' : 'text-slate-400'}`}
          >
            {message}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
