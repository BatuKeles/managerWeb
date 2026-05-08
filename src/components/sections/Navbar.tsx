'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Droplets } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const navLinks = [
  { href: '/#home', label: 'Ana Sayfa' },
  { href: '/#pricing', label: 'Fiyatlar' },
  { href: '/#about', label: 'Hakkımızda' },
  { href: '/#contact', label: 'İletişim' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <nav
        className="fixed top-0 w-full z-50 transition-all duration-500"
        style={
          scrolled
            ? {
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
                boxShadow: '0 1px 16px rgba(15, 23, 42, 0.04)',
              }
            : { background: 'transparent' }
        }
      >
        <div className="flex items-center justify-between h-16 px-6 md:px-8 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-headline text-lg font-semibold tracking-tight" style={{ color: scrolled ? '#0f172a' : '#0f172a' }}>
            <Droplets className="w-5 h-5" style={{ color: '#6366f1' }} />
            Kulüp Bul
          </Link>

          {/* Desktop nav — centered */}
          <div className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-sm font-medium transition-colors duration-150"
                style={{ color: 'rgba(15, 23, 42, 0.65)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(15, 23, 42, 0.65)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA — shimmer effect + mascot pointing */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/demo"
              className="inline-flex whitespace-nowrap relative overflow-hidden text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 group"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #6366f1 100%)',
                color: '#fff',
                boxShadow: '0 4px 16px rgba(99, 102, 241, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              <span className="relative z-10">Demoyu Dene</span>
              {/* Shimmer light pass */}
              <span
                className="absolute inset-0 z-0"
                style={{
                  background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.3) 50%, transparent 80%)',
                  animation: 'shimmer 3s infinite',
                }}
              />
              <style>{`
                @keyframes shimmer {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(100%); }
                }
              `}</style>
            </Link>
            <video
              src="/videos/mascot/points_left.webm"
              width={44}
              height={44}
              autoPlay
              loop
              muted
              playsInline
              style={{ objectFit: 'contain', flexShrink: 0 }}
            />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            style={{ color: 'rgba(15, 23, 42, 0.85)' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menüyü aç/kapat"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            {/* Close button */}
            <div className="flex items-center justify-end h-16 px-6">
              <button
                className="p-2"
                style={{ color: 'rgba(15, 23, 42, 0.85)' }}
                onClick={() => setMobileOpen(false)}
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile nav links */}
            <div className="flex flex-col items-center justify-center flex-1 gap-2 px-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap text-lg font-medium py-4 transition-colors duration-150"
                  style={{ color: 'rgba(15, 23, 42, 0.75)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(15, 23, 42, 0.75)')}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile CTA */}
              <Link
                href="/demo"
                className="mt-6 w-full max-w-xs text-center whitespace-nowrap relative overflow-hidden text-sm font-semibold py-3 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #6366f1 100%)',
                  color: '#fff',
                  boxShadow: '0 4px 16px rgba(99, 102, 241, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
                }}
                onClick={() => setMobileOpen(false)}
              >
                <span className="relative z-10">Demoyu Dene</span>
                <span
                  className="absolute inset-0 z-0"
                  style={{
                    background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.3) 50%, transparent 80%)',
                    animation: 'shimmer 3s infinite',
                  }}
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
