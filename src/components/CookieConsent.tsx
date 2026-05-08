'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'kb_cookie_consent_v1'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      // Slight delay so it doesn't fight the intro overlay
      const t = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Çerez tercihleri"
      style={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        right: 16,
        maxWidth: 520,
        margin: '0 auto',
        zIndex: 60,
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 16,
        padding: '16px 20px',
        boxShadow: '0 12px 40px rgba(15, 23, 42, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        animation: 'cookie-slide-up 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div>
        <div style={{ fontWeight: 600, fontSize: 14, color: '#0f172a', marginBottom: 4 }}>
          🍪 Çerez Tercihleri
        </div>
        <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
          Sitemizi geliştirmek için zorunlu çerezler kullanıyoruz. Detaylar için{' '}
          <Link href="/kvkk" style={{ color: '#6366f1', fontWeight: 500 }}>KVKK aydınlatma metnimize</Link>{' '}
          göz atın.
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button
          onClick={decline}
          style={{
            padding: '8px 14px',
            fontSize: 13,
            fontWeight: 500,
            color: '#64748b',
            background: 'transparent',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          Reddet
        </button>
        <button
          onClick={accept}
          style={{
            padding: '8px 16px',
            fontSize: 13,
            fontWeight: 600,
            color: '#fff',
            background: '#6366f1',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#4f46e5')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#6366f1')}
        >
          Kabul Et
        </button>
      </div>
      <style>{`
        @keyframes cookie-slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
