'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import MascotVideo from '@/components/Mascot/MascotVideo'

interface Stat { value: string; label: string; color: string }

interface ScrollStorySectionProps {
  stats?: Stat[]
}

const DEFAULT_STATS: Stat[] = [
  { value: '12.400+', label: 'Aktif Öğrenci',  color: '#6366f1' },
  { value: '320+',    label: 'Aktif Kulüp',    color: '#8b5cf6' },
  { value: '8.900+',  label: 'Aktif Veli',     color: '#10b981' },
  { value: '1.100+',  label: 'Aktif Antrenör', color: '#f97316' },
]

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

/* ── Stat kartı (light bg, vibrant numbers) ── */
function StatCardLight({ value, label, color, started }: { value: string; label: string; color: string; started: boolean }) {
  const numericStr = value.replace(/[^0-9]/g, '')
  const suffix = value.replace(/[0-9]/g, '')
  const target = parseInt(numericStr, 10) || 0
  const count = useCountUp(target, 1800, started)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px', borderRight: 'inherit' }}>
      <div style={{ width: 3, height: 44, borderRadius: 2, background: color, flexShrink: 0, boxShadow: `0 0 16px ${color}55` }} />
      <div>
        <div className="font-headline font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', lineHeight: 1, letterSpacing: '-0.02em', color }}>
          {started ? `${count.toLocaleString('tr-TR')}${suffix}` : '0'}
        </div>
        <div style={{ color: '#64748b', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6 }}>
          {label}
        </div>
      </div>
    </div>
  )
}

export default function ScrollStorySection({ stats = DEFAULT_STATS }: ScrollStorySectionProps) {
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
    <section id="home" style={{ backgroundColor: '#fbfaf7' }}>

      {/* HERO */}
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #fefcf9 0%, #fbfaf7 100%)' }}>
        {/* Stadyum ışığı orb'lar */}
        <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(99,102,241,0.08) 40%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0.05) 40%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40%', left: '30%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 60%)', filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none' }} />

        {/* İnce çizgi grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, opacity: 0.4,
          backgroundImage: 'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }} />

        {/* Metin içeriği + Mascot */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-0" style={{ position: 'relative', zIndex: 2 }}>
          <div className="flex items-center justify-between">
            <div style={{ maxWidth: 540 }}>
              <span style={{
                color: '#6366f1', fontSize: 11, letterSpacing: '0.32em', fontWeight: 700,
                textTransform: 'uppercase', display: 'block', marginBottom: 24,
                animation: 'fadeSlideUp 0.8s ease 0.1s both',
              }}>
                Spor Yönetim Platformu
              </span>

              <div style={{ overflow: 'hidden', marginBottom: 4 }}>
                <h1 className="font-headline font-black" style={{
                  fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 0.95,
                  letterSpacing: '-0.04em', color: '#0f172a',
                  animation: 'heroLineUp 1s cubic-bezier(0.16,1,0.3,1) 0.2s both',
                }}>
                  Sporu
                </h1>
              </div>
              <div style={{ overflow: 'hidden', marginBottom: 24 }}>
                <h1 className="font-headline font-black" style={{
                  fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 0.95,
                  letterSpacing: '-0.04em',
                  background: 'linear-gradient(120deg, #6366f1 0%, #8b5cf6 35%, #ec4899 65%, #f97316 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'heroLineUp 1s cubic-bezier(0.16,1,0.3,1) 0.35s both, gradientShift 8s ease-in-out infinite',
                  backgroundSize: '200% 100%',
                }}>
                  yeniden tanımla
                </h1>
              </div>

              <p style={{
                color: '#475569', fontSize: '1.05rem', marginBottom: 44,
                maxWidth: 400, lineHeight: 1.8,
                animation: 'fadeSlideUp 0.8s ease 0.6s both',
              }}>
                Kulüpler, antrenörler, veliler ve sporcular için tasarlanmış yeni nesil yönetim platformu.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', animation: 'fadeSlideUp 0.8s ease 0.75s both' }}>
                {/* Demo CTA */}
                <Link href="/demo" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: '#fff', borderRadius: 14, padding: '14px 24px',
                  textDecoration: 'none', fontSize: 14, fontWeight: 700,
                  boxShadow: '0 8px 24px rgba(99,102,241,0.35)',
                  letterSpacing: '0.02em',
                }}>
                  Demoyu Dene
                  <span style={{ transform: 'translateY(-1px)' }}>→</span>
                </Link>
                {/* Pricing scroll */}
                <a href="#pricing" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: '#ffffff', border: '1px solid #e2e8f0',
                  color: '#0f172a', borderRadius: 14, padding: '14px 24px',
                  textDecoration: 'none', fontSize: 14, fontWeight: 600,
                }}>
                  Paketleri Gör
                </a>
              </div>
            </div>

            {/* Mascot — hero sağ taraf */}
            <div className="hidden md:flex items-center justify-center" style={{ animation: 'mascot-float 3s ease-in-out infinite' }}>
              <MascotVideo
                src="/videos/mascot/arm_opening_welcome.webm"
                width={400}
                height={400}
              />
            </div>
          </div>

          <style>{`
            @keyframes heroLineUp {
              from { transform: translateY(110%); opacity: 0; }
              to   { transform: translateY(0);    opacity: 1; }
            }
            @keyframes gradientShift {
              0%, 100% { background-position: 0% 50%; }
              50%      { background-position: 100% 50%; }
            }
            @keyframes fadeSlideUp {
              from { opacity: 0; transform: translateY(20px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes mascot-float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-8px); }
            }
            @keyframes mascot-bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-6px); }
            }
          `}</style>
        </div>
      </div>

      {/* İSTATİSTİKLER — light gradient şerit */}
      <div ref={statsRef} style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f3ff 50%, #fff7ed 100%)',
        borderTop: '1px solid rgba(99,102,241,0.12)',
        borderBottom: '1px solid rgba(99,102,241,0.12)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Soft accent orb'lar */}
        <div style={{ position: 'absolute', top: '-50%', left: '20%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 60%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-50%', right: '20%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.12), transparent 60%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 relative" style={{ zIndex: 1 }}>
          {stats.map((stat, i, arr) => (
            <div key={stat.label} style={{ borderRight: i < arr.length - 1 ? '1px solid rgba(99,102,241,0.10)' : 'none' }}>
              <StatCardLight value={stat.value} label={stat.label} color={stat.color} started={statsStarted} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint mascot */}
      <div style={{ backgroundColor: '#fbfaf7', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 48, paddingBottom: 48 }}>
        <div style={{ animation: 'mascot-bounce 2s ease-in-out infinite' }}>
          <MascotVideo
            src="/videos/mascot/points_down.webm"
            width={172}
            height={172}
          />
        </div>
        <p style={{ color: '#64748b', fontSize: 13, marginTop: 8, letterSpacing: '0.05em', fontWeight: 500 }}>
          Keşfetmek için kaydırın ↓
        </p>
      </div>

    </section>
  )
}
