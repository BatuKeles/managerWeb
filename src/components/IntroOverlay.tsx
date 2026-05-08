'use client'

import { useEffect, useRef } from 'react'

// Cubic ease-in: slow start, rushes toward viewer at the end
function easeIn(t: number) {
  return t * t * t
}

export default function IntroOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const blackLayerRef = useRef<HTMLDivElement>(null)
  const completedRef = useRef(false)

  useEffect(() => {
    const scrollTrap = document.getElementById('intro-scroll-trap')
    if (!scrollTrap) return

    let rafId = 0
    let scheduled = false

    const compute = () => {
      if (completedRef.current) return

      const rect = scrollTrap.getBoundingClientRect()
      const vh = window.innerHeight
      const scrollable = scrollTrap.offsetHeight - vh
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable)
      const progress = scrollable > 0 ? scrolled / scrollable : 0

      // Eased zoom — feels like the world rushing toward you
      if (imageRef.current) {
        const scale = 1 + easeIn(progress) * 2.4
        imageRef.current.style.transform = `scale(${scale})`
      }

      // Scroll indicator fades out quickly
      if (indicatorRef.current) {
        indicatorRef.current.style.opacity = String(Math.max(0, 1 - progress * 5))
      }

      // Fade to black near end of scroll
      if (blackLayerRef.current) {
        const fadeStart = 0.60
        const fadeP = Math.max(0, Math.min(1, (progress - fadeStart) / (1 - fadeStart)))
        blackLayerRef.current.style.opacity = String(fadeP)

        if (fadeP >= 1 && !completedRef.current) {
          completedRef.current = true

          setTimeout(() => {
            // While screen is fully black: collapse the scroll trap to 0 height so the
            // empty 200vh area disappears from the page. Then reset scroll to 0 — user
            // is now at the true top of the page (iPad section). No empty space above.
            scrollTrap.style.height = '0'
            window.scrollTo({ top: 0, behavior: 'instant' })

            // Now fade out the black overlay to reveal the iPad section
            if (!overlayRef.current) return
            overlayRef.current.style.transition = 'opacity 0.95s cubic-bezier(0.4, 0, 0.2, 1)'
            overlayRef.current.style.opacity = '0'
            setTimeout(() => {
              if (overlayRef.current) overlayRef.current.style.display = 'none'
            }, 1000)
          }, 100)
        }
      }
    }

    const onScroll = () => {
      if (completedRef.current) return
      if (scheduled) return
      scheduled = true
      rafId = requestAnimationFrame(() => {
        scheduled = false
        compute()
      })
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        overflow: 'hidden',
        background: '#1a0d3a',
        pointerEvents: 'none',
      }}
    >
      {/* Background image — object-fit: cover guarantees full-screen fill */}
      <img
        ref={imageRef}
        src="/anasayfa_arka_plan.png"
        alt=""
        draggable={false}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          transformOrigin: 'center center',
          willChange: 'transform',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />

      {/* Vignette — darkens edges for depth */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Bottom gradient — legible scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Fade-to-light layer — matches iPad section bg for seamless transition */}
      <div
        ref={blackLayerRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #f5f1ff 0%, #ede4ff 50%, #e0d4f5 100%)',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Scroll indicator */}
      <div
        ref={indicatorRef}
        style={{
          position: 'absolute',
          bottom: 48,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          color: 'rgba(255,255,255,0.95)',
          fontSize: 15,
          fontWeight: 500,
          letterSpacing: '0.06em',
          textShadow: '0 2px 16px rgba(0,0,0,0.7)',
          fontFamily: 'var(--font-space-grotesk, sans-serif)',
        }}>
          <span style={{ fontSize: 20, lineHeight: 1 }}>🖱️</span>
          <span>Keşfetmek için kaydırın</span>
        </div>
        <div className="intro-chevron">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      <style>{`
        .intro-chevron { animation: intro-bounce 1.5s ease-in-out infinite; }
        @keyframes intro-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
      `}</style>
    </div>
  )
}
