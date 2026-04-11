'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import IpadModel from './IpadModel'
import { IMAGES } from './screens'

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
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.9} />
          <directionalLight position={[3, 4, 5]} intensity={1.2} />
          <directionalLight position={[-4, -2, -3]} intensity={0.6} />
          <IpadModel progressRef={progressRef} />
        </Canvas>

        {/* Text panel overlay */}
        <div className="ipadflip-overlay">
          <div className="ipadflip-panel-wrap">
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
          </div>
        </div>
      </div>

      <span className="sr-only">iPad showcase — scroll to reveal features</span>

      <style>{`
        .ipadflip-section {
          position: relative;
          height: 700vh;
          background: #000;
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
        .ipadflip-eyebrow {
          color: #818cf8;
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
          color: #f0f0ff;
          margin-bottom: 20px;
        }
        .ipadflip-desc {
          color: #9ca3af;
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
          background: rgba(99,102,241,0.12);
          color: #818cf8;
          font-size: 10px;
          letter-spacing: 0.18em;
          padding: 6px 14px;
          border-radius: 999px;
          font-weight: 600;
          text-transform: uppercase;
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
            background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 80%, transparent 100%);
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
