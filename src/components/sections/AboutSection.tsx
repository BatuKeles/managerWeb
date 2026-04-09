'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Globe, Clock } from 'lucide-react'

interface AboutSectionProps {
  title?: string
  description?: string
}

export default function AboutSection({
  title = 'Hakkımızda',
  description = 'Spor kulüplerini dijital dönüşüme taşıyan yenilikçi platformumuz, sporcuların, ailelerin ve antrenörlerin iletişimini güçlendiriyor.',
}: AboutSectionProps) {
  return (
    <section id="about" className="py-32 bg-t-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="text-t-accent font-body font-bold uppercase tracking-[0.3em] text-xs block mb-6">
              Biz Kimiz
            </span>
            <h2
              className="font-headline font-bold text-t-white mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              {title}
            </h2>
            <div
              className="text-t-gray text-lg leading-relaxed mb-12"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </motion.div>

          {/* Right — contact card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-t-surface rounded-2xl p-10 border border-white/5"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 bg-t-accent rounded-xl flex items-center justify-center">
                <span className="text-white font-headline font-black text-2xl">S</span>
              </div>
              <div>
                <div className="font-headline font-black text-t-white text-xl uppercase">SporKulübü</div>
                <span className="text-t-accent text-xs font-bold uppercase tracking-widest">Platform</span>
              </div>
            </div>

            <div className="space-y-5 mb-10">
              {[
                { Icon: MapPin, value: 'İstanbul, Türkiye' },
                { Icon: Phone, value: '+90 555 000 0000' },
                { Icon: Globe, value: 'sporkulubu.com' },
                { Icon: Clock, value: '7/24 hizmet' },
              ].map(({ Icon, value }) => (
                <div key={value} className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-t-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-t-accent" />
                  </div>
                  <span className="text-t-white font-semibold">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              {[{ v: '2020', l: 'Kuruluş' }, { v: '500+', l: 'Kulüp' }, { v: '15+', l: 'Şehir' }].map((s) => (
                <div key={s.l} className="flex-1 text-center bg-t-dark rounded-xl py-4 border border-white/5">
                  <div className="font-headline font-black text-t-white text-lg">{s.v}</div>
                  <div className="text-t-gray-dim text-[10px] font-bold uppercase tracking-widest mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
