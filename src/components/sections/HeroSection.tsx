'use client'

import { motion } from 'framer-motion'

interface HeroSectionProps {
  title?: string
  subtitle?: string
  ctaText?: string
}

const lineVariant = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, delay: 0.1 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.6 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function HeroSection({
  title = 'SPORU YENİDEN TANIMLA',
  subtitle = 'Kulüpler, antrenörler, veliler ve sporcular için tasarlanmış yeni nesil yönetim platformu. Her şey tek ekranda.',
  ctaText = 'Platforma Katıl',
}: HeroSectionProps) {
  const lines = title.split(' ').reduce<string[]>((acc, word, i, arr) => {
    if (i === 0) acc.push(word)
    else if (i === Math.floor(arr.length / 2)) acc.push(word)
    else acc[acc.length - 1] += ' ' + word
    return acc
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-t-black"
    >
      {/* CSS ile responsive arka plan */}
      <style>{`
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image: url('/hero-bg.png');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
        }
      `}</style>
      <div className="hero-bg" />

      {/* Sol gradient — masaüstünde yazı alanını netleştirir */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to right, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.4) 50%, transparent 100%)',
        }}
      />
      {/* Üst/alt karartma */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, transparent 40%, transparent 60%, rgba(10,10,10,0.55) 100%)',
        }}
      />

      {/* İçerik */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 py-40 w-full">
        <div className="max-w-xl">

          {/* Etiket */}
          <motion.span
            custom={0}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="inline-block font-body font-bold uppercase tracking-[0.3em] text-xs mb-8"
            style={{ color: '#a78bfa' }}
          >
            Spor Yönetim Platformu
          </motion.span>

          {/* Başlık */}
          <div className="mb-8">
            {lines.map((line, i) => (
              <div key={i} className="overflow-hidden leading-none">
                <motion.h1
                  custom={i}
                  variants={lineVariant}
                  initial="hidden"
                  animate="visible"
                  className="font-headline font-black uppercase tracking-tighter block"
                  style={{
                    fontSize: 'clamp(1.6rem, 7vw, 6rem)',
                    lineHeight: 1.0,
                    color: i === 1 ? '#818cf8' : '#f5f5f7',
                  }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* CTA Butonları */}
          <motion.div
            custom={1}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#app-store"
              className="inline-flex items-center justify-center bg-t-accent text-white px-8 py-4 rounded-full font-body font-semibold text-sm hover:bg-t-accent-dim transition-all active:scale-95"
            >
              {ctaText}
            </a>
            <a
              href="/ozellikler"
              className="inline-flex items-center justify-center border border-white/20 text-white px-8 py-4 rounded-full font-body font-semibold text-sm hover:bg-white/5 transition-all"
            >
              Özellikleri Keşfet →
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-white/30 text-xs uppercase tracking-widest font-body">Kaydır</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  )
}
