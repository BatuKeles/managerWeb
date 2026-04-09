'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const features = [
  {
    num: '01',
    title: 'Akıllı Planlama',
    desc: 'Saha, antrenör ve sporcu müsaitliklerini otomatik analiz eden motor, en verimli programı saniyeler içinde oluşturur.',
    tag: 'Zaman Kazandırır',
  },
  {
    num: '02',
    title: 'Gerçek Zamanlı Bildirimler',
    desc: 'Antrenman değişikliği, devamsızlık veya önemli duyurular anında velilere ve sporculara iletilir.',
    tag: 'Sıfır Gecikme',
  },
  {
    num: '03',
    title: 'Performans Analitiği',
    desc: 'Her sporcu için haftalık ve aylık gelişim grafikleri. Antrenörler ve veliler aynı verileri anlık görür.',
    tag: 'Veri Odaklı',
  },
  {
    num: '04',
    title: 'Çoklu Rol Yönetimi',
    desc: 'Kulüp yöneticisi, antrenör, veli ve sporcu; her rol kendi yetkisinde sistemi kullanır.',
    tag: 'Güvenli Erişim',
  },
]

export default function FeaturesSection() {
  return (
    <section className="bg-t-black">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-7xl mx-auto px-6 md:px-8 pt-32 pb-20"
      >
        <span className="text-t-accent font-body font-bold uppercase tracking-[0.3em] text-xs block mb-6">
          Platform Özellikleri
        </span>
        <h2
          className="font-headline font-black text-t-white uppercase tracking-tighter"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 1.0 }}
        >
          GÜÇ ARAÇLAR.<br />
          <span className="text-t-gray-dim">TÜM PAYDAŞLAR.</span>
        </h2>
      </motion.div>

      {/* Feature rows */}
      <div className="border-t border-white/5">
        {features.map((f, i) => (
          <motion.div
            key={f.num}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

              {/* Number */}
              <div className="md:col-span-2">
                <span className="font-headline font-black text-t-gray-dim/30 text-6xl md:text-7xl leading-none select-none">
                  {f.num}
                </span>
              </div>

              {/* Title */}
              <motion.div
                className="md:col-span-3"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.05 }}
              >
                <h3 className="font-headline font-black text-t-white text-2xl md:text-3xl uppercase tracking-tight">
                  {f.title}
                </h3>
              </motion.div>

              {/* Description */}
              <motion.div
                className="md:col-span-5"
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.05 }}
              >
                <p className="text-t-gray text-base md:text-lg leading-relaxed">{f.desc}</p>
              </motion.div>

              {/* Tag */}
              <div className="md:col-span-2 flex md:justify-end">
                <span className="inline-block bg-t-accent/10 text-t-accent text-xs font-bold font-body uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {f.tag}
                </span>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-6 md:px-8 py-20 text-center"
      >
        <Link
          href="/ozellikler"
          className="inline-flex items-center gap-3 border border-white/10 text-t-white px-8 py-4 rounded-full font-body font-semibold text-sm hover:bg-white/5 hover:border-white/20 transition-all"
        >
          Rol bazlı detaylı özellikleri gör
          <span className="text-t-accent">→</span>
        </Link>
      </motion.div>
    </section>
  )
}
