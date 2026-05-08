'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Globe, Clock } from 'lucide-react'
import MascotVideo from '@/components/Mascot/MascotVideo'

interface AboutSectionProps {
  title?: string
  description?: string
  address?: string
  phone?: string
  website?: string
  hours?: string
  yearFounded?: string
  clubsCount?: string
  citiesCount?: string
}

export default function AboutSection({
  title = 'Hakkımızda',
  description = 'Spor kulüplerini dijital dönüşüme taşıyan yenilikçi platformumuz, sporcuların, ailelerin ve antrenörlerin iletişimini güçlendiriyor.',
  address = 'İstanbul, Türkiye',
  phone = '+90 555 000 0000',
  website = 'kulupbul.com',
  hours = '7/24 hizmet',
  yearFounded = '2024',
  clubsCount = '500+',
  citiesCount = '15+',
}: AboutSectionProps) {
  return (
    <section id="about" className="py-32 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #fff7ed 100%)',
    }}>
      {/* Decorative orbs */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 60%)', filter: 'blur(70px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '15%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 60%)', filter: 'blur(70px)', pointerEvents: 'none' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative" style={{ zIndex: 1 }}>
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
            <div style={{ animation: 'mascot-float 3s ease-in-out infinite' }}>
              <MascotVideo
                src="/videos/mascot/taking_note.webm"
                width={258}
                height={258}
              />
            </div>
            <style>{`
              @keyframes mascot-float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
              }
            `}</style>
          </motion.div>

          {/* Right — contact card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white rounded-2xl p-10 border border-slate-200 shadow-[0_8px_32px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                boxShadow: '0 8px 24px rgba(99,102,241,0.35)',
              }}>
                <span className="text-white font-headline font-black text-2xl">K</span>
              </div>
              <div>
                <div className="font-headline font-black text-t-white text-xl uppercase">Kulüp Bul</div>
                <span className="text-t-accent text-xs font-bold uppercase tracking-widest">Platform</span>
              </div>
            </div>

            <div className="space-y-5 mb-10">
              {[
                { Icon: MapPin, value: address },
                { Icon: Phone, value: phone },
                { Icon: Globe, value: website },
                { Icon: Clock, value: hours },
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
              {[
                { v: yearFounded, l: 'Kuruluş' },
                { v: clubsCount, l: 'Kulüp' },
                { v: citiesCount, l: 'Şehir' },
              ].map((s) => (
                <div key={s.l} className="flex-1 text-center bg-slate-50 rounded-xl py-4 border border-slate-200">
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
