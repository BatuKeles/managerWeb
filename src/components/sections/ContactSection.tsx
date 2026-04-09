'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

interface ContactSectionProps {
  email?: string
  phone?: string
  address?: string
}

export default function ContactSection({
  email = 'info@sporkulubu.com',
  phone = '+90 555 000 0000',
  address = 'İstanbul, Türkiye',
}: ContactSectionProps) {
  const items = [
    { icon: Mail, label: 'E-posta', value: email, href: `mailto:${email}`, sub: 'En hızlı iletişim yöntemi' },
    { icon: Phone, label: 'Telefon', value: phone, href: `tel:${phone.replace(/\s/g, '')}`, sub: 'Hafta içi 09:00–18:00' },
    { icon: MapPin, label: 'Adres', value: address, href: null, sub: 'Merkez ofis' },
  ]

  return (
    <section id="contact" className="py-32 bg-t-black">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="text-t-accent font-body font-bold uppercase tracking-[0.3em] text-xs block mb-6">
              Bize Ulaşın
            </span>
            <h2
              className="font-headline font-bold text-t-white mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              Bize ulaşın
            </h2>
            <p className="text-t-gray text-lg mb-12 max-w-md leading-relaxed">
              Sorularınız için bize ulaşın. En kısa sürede dönüş yapacağız.
            </p>

            <div className="space-y-3">
              {items.map(({ icon: Icon, label, value, href, sub }, i) => {
                const Inner = (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex items-center gap-5 bg-t-dark rounded-xl px-6 py-5 hover:bg-t-surface transition-all group border border-white/5"
                  >
                    <div className="w-11 h-11 bg-t-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-t-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-body font-bold text-t-white text-base truncate">{value}</div>
                      <div className="text-t-gray-dim text-xs mt-0.5 font-semibold uppercase tracking-wide">{sub}</div>
                    </div>
                    <span className="text-t-gray-dim group-hover:text-t-accent transition-colors">→</span>
                  </motion.div>
                )
                return href ? <a key={label} href={href} className="block">{Inner}</a> : <div key={label}>{Inner}</div>
              })}
            </div>
          </motion.div>

          {/* Right — chat CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="pt-4"
          >
            <div className="bg-t-dark rounded-2xl p-10 relative overflow-hidden border border-white/[0.06]">
              <div className="absolute inset-0 bg-gradient-to-br from-t-accent/8 via-transparent to-transparent pointer-events-none" />
              <motion.span
                className="text-t-accent font-body font-semibold uppercase tracking-[0.25em] text-[11px] block mb-5 relative z-10"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Canlı Destek
              </motion.span>
              <motion.h3
                className="font-headline font-semibold text-t-white text-2xl leading-tight mb-4 relative z-10"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Anında yanıt alın.
              </motion.h3>
              <motion.p
                className="text-t-gray mb-8 text-base leading-relaxed relative z-10"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Şu an müsait. Sorularınızı anında yanıtlayalım.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative z-10"
              >
                <button
                  onClick={() => (window as any).__openChat?.()}
                  className="inline-flex items-center gap-2 bg-t-accent text-white font-body font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-t-accent-dim transition-all active:scale-95"
                >
                  Sohbet Başlat →
                </button>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
