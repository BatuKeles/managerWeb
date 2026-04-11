'use client'

import { useEffect, useRef, useState } from 'react'

/* ── Sayı sayma hook ── */
function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return value
}

/* ── Stat kartı ── */
function StatCard({ value, label, color, started }: { value: string; label: string; color: string; started: boolean }) {
  const numericStr = value.replace(/[^0-9]/g, '')
  const suffix = value.replace(/[0-9]/g, '')
  const target = parseInt(numericStr, 10)
  const count = useCountUp(target, 1800, started)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px', borderRight: 'inherit' }}>
      <div style={{ width: 3, height: 44, borderRadius: 2, background: color, flexShrink: 0, boxShadow: `0 0 16px ${color}88` }} />
      <div>
        <div className="font-headline font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', lineHeight: 1, letterSpacing: '-0.02em', color }}>
          {started ? `${count.toLocaleString('tr-TR')}${suffix}` : '0'}
        </div>
        <div style={{ color: '#555', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>
          {label}
        </div>
      </div>
    </div>
  )
}

export default function ScrollStorySection() {
  const [statsStarted, setStatsStarted] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  // Stats sayacı — ekrana girince tetikle
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="home" style={{ backgroundColor: '#050505' }}>

      {/* HERO */}
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', backgroundColor: '#030303' }}>
        {/* Video arka plan */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src="/webKarsilama.mp4" type="video/mp4" />
        </video>
        {/* Karartma katmanı */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to right, rgba(3,3,3,0.85) 0%, rgba(3,3,3,0.6) 55%, rgba(3,3,3,0.3) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(3,3,3,0.4) 0%, transparent 30%, transparent 70%, rgba(3,3,3,0.6) 100%)',
        }} />

        {/* Metin içeriği */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-0" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 540 }}>
            <span style={{
              color: '#818cf8', fontSize: 11, letterSpacing: '0.32em', fontWeight: 700,
              textTransform: 'uppercase', display: 'block', marginBottom: 24,
              animation: 'fadeSlideUp 0.8s ease 0.1s both',
            }}>
              Spor Yönetim Platformu
            </span>

            <div style={{ overflow: 'hidden', marginBottom: 4 }}>
              <h1 className="font-headline font-black" style={{
                fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 0.95,
                letterSpacing: '-0.04em', color: '#f0f0ff',
                animation: 'heroLineUp 1s cubic-bezier(0.16,1,0.3,1) 0.2s both',
              }}>
                Sporu
              </h1>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: 24 }}>
              <h1 className="font-headline font-black" style={{
                fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 0.95,
                letterSpacing: '-0.04em',
                background: 'linear-gradient(90deg, #818cf8 0%, #c084fc 50%, #f97316 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                animation: 'heroLineUp 1s cubic-bezier(0.16,1,0.3,1) 0.35s both',
              }}>
                yeniden tanımla
              </h1>
            </div>

            <p style={{
              color: 'rgba(180,180,220,0.7)', fontSize: '1.05rem', marginBottom: 44,
              maxWidth: 400, lineHeight: 1.8,
              animation: 'fadeSlideUp 0.8s ease 0.6s both',
            }}>
              Kulüpler, antrenörler, veliler ve sporcular için tasarlanmış yeni nesil yönetim platformu.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', animation: 'fadeSlideUp 0.8s ease 0.75s both' }}>
              {/* App Store */}
              <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '10px 20px', textDecoration: 'none', backdropFilter: 'blur(8px)' }}>
                <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, fill: '#fff', flexShrink: 0 }}>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1, marginBottom: 2 }}>App Store</div>
                  <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, lineHeight: 1 }}>iOS için İndir</div>
                </div>
              </a>
              {/* Google Play */}
              <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '10px 20px', textDecoration: 'none', backdropFilter: 'blur(8px)' }}>
                <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, fill: '#fff', flexShrink: 0 }}>
                  <path d="M3.18 23.76a2 2 0 0 1-.88-.63 2.49 2.49 0 0 1-.39-1.56V2.43a2.49 2.49 0 0 1 .39-1.56 2 2 0 0 1 .88-.63l11.37 11.76zm14.85-7.71L15.54 14l-2.26 2.34 5 5.1a2.37 2.37 0 0 0 .63-1.39zm-14.85-9.5L15.54 10l2.49-1.36L5.62 2.01a2.37 2.37 0 0 0-.44-.44zm14.85 2.12-2.49 1.36L12.8 12l2.74 2.83 2.49 1.36a2.14 2.14 0 0 0 0-3.45z" />
                </svg>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1, marginBottom: 2 }}>Google Play</div>
                  <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, lineHeight: 1 }}>Android için İndir</div>
                </div>
              </a>
            </div>

            <style>{`
              @keyframes heroLineUp {
                from { transform: translateY(110%); opacity: 0; }
                to   { transform: translateY(0);    opacity: 1; }
              }
              @keyframes fadeSlideUp {
                from { opacity: 0; transform: translateY(20px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </div>
        </div>
      </div>

      {/* İSTATİSTİKLER — hero'nun altında */}
      <div ref={statsRef} style={{ backgroundColor: '#07070f', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {[
            { value: '12.400+', label: 'Aktif Öğrenci',  color: '#818cf8' },
            { value: '320+',    label: 'Aktif Kulüp',    color: '#a78bfa' },
            { value: '8.900+',  label: 'Aktif Veli',     color: '#34d399' },
            { value: '1.100+',  label: 'Aktif Antrenör', color: '#60a5fa' },
          ].map((stat, i, arr) => (
            <div key={stat.label} style={{ borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <StatCard value={stat.value} label={stat.label} color={stat.color} started={statsStarted} />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
