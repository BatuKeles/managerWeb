'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import IpadModel from './IpadModel'
import { IMAGES } from './screens'
import MascotVideo from '@/components/Mascot/MascotVideo'

export default function IpadFlipSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const progressRef = useRef<number>(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const compute = useCallback(() => {
    const section = sectionRef.current
    if (!section) return
    const rect = section.getBoundingClientRect()
    const vh = window.innerHeight
    const scrollable = rect.height - vh
    const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(scrollable, 0))
    const progress = scrollable > 0 ? scrolled / scrollable : 0
    progressRef.current = progress
    const newIndex = Math.min(
      IMAGES.length - 1,
      Math.max(0, Math.round(progress * (IMAGES.length - 1))),
    )
    setActiveIndex(newIndex)
  }, [])

  useEffect(() => {
    let rafId = 0
    let scheduled = false
    const onScroll = () => {
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
  }, [compute])

  const current = IMAGES[activeIndex]

  return (
    <section
      ref={sectionRef}
      className="ipadflip-section"
    >
      <div className="ipadflip-sticky">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 35 }}
          dpr={[1, 2]}
          gl={{ antialias: true }}
          onCreated={({ gl }) => {
            gl.outputColorSpace = THREE.SRGBColorSpace
            gl.domElement.addEventListener('contextmenu', (e) => e.preventDefault())
          }}
          className="ipadflip-canvas"
        >
          <color attach="background" args={['#e0d4f5']} />
          <ambientLight intensity={0.9} />
          <directionalLight position={[3, 4, 5]} intensity={1.2} />
          <directionalLight position={[-4, -2, -3]} intensity={0.6} />
          <IpadModel progressRef={progressRef} />
        </Canvas>

        {/* Text panel overlay */}
        <div className="ipadflip-overlay">
          <div className="ipadflip-panel-wrap">
            <div className="ipadflip-panel-inner">
              <div key={activeIndex} className="ipadflip-panel">
                <span className="ipadflip-eyebrow">
                  {current.eyebrow}
                </span>
                <h2 className="ipadflip-title font-headline">
                  {current.title}
                </h2>
                <p className="ipadflip-desc">
                  {current.description}
                </p>
                <div className="ipadflip-chips">
                  {current.features.map((f) => (
                    <span key={f} className="ipadflip-chip">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              {/* Mascot pointing at text — desktop only */}
              <div className="hidden md:block ipadflip-mascot" style={{ animation: 'mascot-float 3s ease-in-out infinite', flexShrink: 0, marginLeft: -20 }}>
                <MascotVideo
                  src="/videos/mascot/bench.webm"
                  width={172}
                  height={172}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll direction arrows — positioned near the iPad, hidden on mobile */}
      <div className="ipadflip-arrows hidden md:block" style={{
        position: 'sticky',
        top: 0,
        height: 0,
        width: '100%',
        pointerEvents: 'none',
        zIndex: 10,
      }}>
        {/* Left arrow */}
        <div
          onClick={() => window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })}
          style={{
            position: 'absolute',
            right: '48%',
            top: '50vh',
            transform: 'translateY(-50%)',
            opacity: activeIndex > 0 ? 0.6 : 0.15,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'auto',
            cursor: 'pointer',
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </div>
        {/* Right arrow */}
        <div
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
          style={{
            position: 'absolute',
            right: '18%',
            top: '50vh',
            transform: 'translateY(-50%)',
            opacity: activeIndex < IMAGES.length - 1 ? 0.6 : 0.15,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'auto',
            cursor: 'pointer',
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
      <span className="sr-only">iPad showcase — scroll to reveal features</span>

      <style>{`
        .ipadflip-section {
          position: relative;
          height: 700vh;
          background:
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,92,246,0.30) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(249,115,22,0.20) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 0% 100%, rgba(16,185,129,0.18) 0%, transparent 55%),
            linear-gradient(180deg, #f5f1ff 0%, #ede4ff 50%, #e0d4f5 100%);
        }
        .ipadflip-sticky {
          position: -webkit-sticky;
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
        }
        .ipadflip-canvas {
          position: absolute !important;
          top: 0;
          left: 0;
          width: 100% !important;
          height: 100% !important;
        }
        .ipadflip-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          display: flex;
          pointer-events: none;
        }
        .ipadflip-panel-wrap {
          width: 50%;
          height: 100%;
          display: flex;
          align-items: center;
          padding: clamp(40px, 6vw, 80px);
          box-sizing: border-box;
        }
        .ipadflip-panel-inner {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        @keyframes mascot-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .ipadflip-eyebrow {
          color: #6366f1;
          font-size: 11px;
          letter-spacing: 0.24em;
          font-weight: 700;
          text-transform: uppercase;
          display: block;
          margin-bottom: 16px;
        }
        .ipadflip-title {
          font-size: clamp(2rem, 3.5vw, 3.8rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: #1e1b4b;
          margin-bottom: 20px;
        }
        .ipadflip-desc {
          color: #475569;
          font-size: 16px;
          line-height: 1.7;
          max-width: 440px;
          margin-bottom: 24px;
        }
        .ipadflip-chips {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .ipadflip-chip {
          display: inline-flex;
          background: rgba(99,102,241,0.10);
          color: #4f46e5;
          font-size: 10px;
          letter-spacing: 0.18em;
          padding: 6px 14px;
          border-radius: 999px;
          font-weight: 600;
          text-transform: uppercase;
          border: 1px solid rgba(99,102,241,0.2);
        }
        .ipadflip-panel {
          animation: ipadflip-in 520ms cubic-bezier(0.22, 0.61, 0.36, 1) both;
        }
        @keyframes ipadflip-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 1024px) {
          .ipadflip-panel-wrap {
            width: 55%;
            padding: clamp(32px, 4vw, 60px);
          }
          .ipadflip-title {
            font-size: clamp(1.6rem, 3vw, 2.8rem);
          }
        }
        @media (max-width: 767px) {
          .ipadflip-section {
            height: 500vh !important;
          }
          .ipadflip-overlay {
            flex-direction: column;
            justify-content: flex-end;
          }
          .ipadflip-panel-wrap {
            width: 100% !important;
            height: auto !important;
            padding: 20px 24px 32px !important;
            background: linear-gradient(to top, rgba(245,241,255,0.98) 0%, rgba(245,241,255,0.85) 70%, transparent 100%);
            align-items: flex-start !important;
          }
          .ipadflip-title {
            font-size: clamp(1.3rem, 5vw, 1.8rem) !important;
            margin-bottom: 8px !important;
          }
          .ipadflip-desc {
            font-size: 13px !important;
            margin-bottom: 12px !important;
            max-width: 100% !important;
          }
          .ipadflip-eyebrow {
            font-size: 9px !important;
            margin-bottom: 8px !important;
          }
          .ipadflip-chip {
            font-size: 8px !important;
            padding: 3px 8px !important;
          }
        }
        @media (max-width: 480px) {
          .ipadflip-section {
            height: 400vh !important;
          }
          .ipadflip-panel-wrap {
            padding: 16px 16px 24px !important;
          }
          .ipadflip-title {
            font-size: clamp(1.1rem, 5vw, 1.5rem) !important;
          }
          .ipadflip-desc {
            font-size: 12px !important;
          }
          .ipadflip-eyebrow {
            font-size: 8px !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ipadflip-panel { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
