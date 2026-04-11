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
                background: 'rgba(10, 10, 10, 0.8)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              }
            : { background: 'transparent' }
        }
      >
        <div className="flex items-center justify-between h-16 px-6 md:px-8 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-headline text-lg font-semibold text-white tracking-tight">
            <Droplets className="w-5 h-5" style={{ color: '#6366f1' }} />
            AcquaManager
          </Link>

          {/* Desktop nav — centered */}
          <div className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-sm font-medium transition-colors duration-150"
                style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 1)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA — shimmer effect */}
          <Link
            href="/demo"
            className="hidden md:inline-flex whitespace-nowrap relative overflow-hidden text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 group"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #6366f1 100%)',
              color: '#fff',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
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

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            style={{ color: 'rgba(255, 255, 255, 0.8)' }}
            onClick={() => setMobileOpen(!mobileOpen)}
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
              background: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            {/* Close button */}
            <div className="flex items-center justify-end h-16 px-6">
              <button
                className="p-2"
                style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                onClick={() => setMobileOpen(false)}
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
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)')}
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
                  boxShadow: '0 0 20px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
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
