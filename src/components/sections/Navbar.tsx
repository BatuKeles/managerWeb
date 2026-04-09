'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/#home', label: 'Ana Sayfa' },
  { href: '/#pricing', label: 'Fiyatlar' },
  { href: '/#about', label: 'Hakkımızda' },
  { href: '/#contact', label: 'İletişim' },
  { href: '/demo', label: 'Demoyu Dene' },
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
    <nav className={cn(
      'fixed top-0 w-full z-50 transition-all duration-500',
      scrolled
        ? 'bg-t-black/90 backdrop-blur-xl border-b border-white/5'
        : 'bg-transparent'
    )}>
      <div className="grid grid-cols-3 items-center px-6 md:px-8 py-5 max-w-7xl mx-auto">

        {/* Logo */}
        <Link href="/" className="font-headline text-lg font-semibold text-t-white tracking-tight">
          SporKulübü
        </Link>

        {/* Desktop nav — centered */}
        <div className="hidden md:flex items-center justify-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-t-gray hover:text-t-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <div className="flex justify-end col-start-3">
          <button className="md:hidden p-2 text-t-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-t-dark border-t border-white/5 px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-3 py-3 font-body text-sm text-t-gray hover:text-t-white transition-all"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
