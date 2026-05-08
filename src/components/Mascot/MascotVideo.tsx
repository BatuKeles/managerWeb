'use client'

import { useEffect, useRef } from 'react'

interface MascotVideoProps {
  src: string
  className?: string
  width?: number
  height?: number
  style?: React.CSSProperties
}

export default function MascotVideo({ src, className = '', width = 200, height = 200, style }: MascotVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      width={width}
      height={height}
      className={className}
      style={{ objectFit: 'contain', ...style }}
      autoPlay
      loop
      muted
      playsInline
    />
  )
}
