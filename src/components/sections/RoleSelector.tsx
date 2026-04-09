'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const roles = [
  {
    id: 'kulup',
    emoji: '🏟️',
    title: 'Kulüpler İçin',
    badge: 'Ücretli',
    desc: 'Çoklu tesis yönetimi, antrenör atamaları ve gerçek zamanlı gelir analizi.',
    features: ['Çoklu Tesis', 'Gelir Analizi', 'Marka Özelleştirme'],
    span: 'md:col-span-8 md:row-span-2',
    dark: true,
  },
  {
    id: 'veli',
    emoji: '👨‍👩‍👧',
    title: 'Veliler İçin',
    badge: 'Ücretsiz',
    desc: 'Program takibi, ödeme yönetimi ve çocuğunuzun gelişimini anlık izleme.',
    features: [],
    span: 'md:col-span-4 md:row-span-2',
    dark: false,
  },
  {
    id: 'antrenor',
    emoji: '🎯',
    title: 'Antrenörler İçin',
    badge: 'Ücretli',
    desc: 'Otomatik planlama, sporcu listeleri ve performans değerlendirme araçları.',
    features: ['Oto-Plan', 'Büyüme'],
    span: 'md:col-span-6',
    dark: false,
    landscape: true,
  },
  {
    id: 'ogrenci',
    emoji: '⚽',
    title: 'Sporcular İçin',
    badge: 'Ücretsiz',
    desc: 'Kişisel antrenman programı, performans istatistikleri ve hedef takibi.',
    features: ['Hedefler'],
    span: 'md:col-span-6',
    dark: false,
    landscape: true,
  },
]

export default function RoleSelector() {
  return (
    <section id="roles" className="py-32 px-6 md:px-8 bg-t-dark">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-20"
        >
          <span className="text-t-accent font-body font-bold uppercase tracking-[0.3em] text-xs block mb-6">
            Ekosistem
          </span>
          <h2
            className="font-headline font-black text-t-white uppercase tracking-tighter"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 1.0 }}
          >
            HER PAYDAŞ İÇİN<br />
            <span className="text-t-gray-dim">ÖZEL DENEYİM.</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[280px]">
          {roles.map((role, i) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={role.span}
            >
              <Link
                href={`/ozellikler#${role.id}`}
                className={`
                  h-full rounded-2xl p-8 md:p-10 flex flex-col justify-between overflow-hidden relative
                  hover:scale-[1.02] transition-transform duration-300 group block
                  ${role.dark
                    ? 'bg-gradient-to-br from-t-black to-[#0a0a0a] border border-white/10'
                    : 'bg-t-surface border border-white/5'
                  }
                `}
              >
                {/* Background number watermark */}
                <div className="absolute -right-4 -bottom-6 font-headline font-black text-[8rem] leading-none text-white/[0.025] select-none pointer-events-none uppercase">
                  {role.id.toUpperCase().slice(0, 3)}
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl">{role.emoji}</span>
                    <span className={`text-[10px] font-body font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                      role.badge === 'Ücretsiz'
                        ? 'bg-t-accent/15 text-t-accent'
                        : 'bg-white/10 text-t-white'
                    }`}>
                      {role.badge}
                    </span>
                  </div>
                  <h3 className="font-headline font-black uppercase text-t-white mb-3" style={{ fontSize: role.landscape ? '1.5rem' : '2rem' }}>
                    {role.title}
                  </h3>
                  <p className="text-t-gray text-sm leading-relaxed max-w-sm">{role.desc}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-2 flex-wrap">
                    {role.features.map((f) => (
                      <span key={f} className="bg-white/8 text-t-gray text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        {f}
                      </span>
                    ))}
                  </div>
                  <span className="text-t-accent font-bold text-sm group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
