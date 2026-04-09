'use client'

import { motion } from 'framer-motion'

export default function AppStoreSection() {
  return (
    <section id="app-store" className="py-24 bg-t-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-t-dark rounded-2xl p-12 md:p-16 relative flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden border border-white/[0.06]"
        >
          {/* Subtle gradient accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-t-accent/5 via-transparent to-transparent pointer-events-none" />

          {/* Left */}
          <motion.div
            className="lg:w-1/2 z-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span
              className="text-t-accent font-body font-semibold uppercase tracking-[0.25em] text-[11px] block mb-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Mobil Uygulama
            </motion.span>
            <motion.h2
              className="font-headline font-semibold text-t-white mb-5"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', lineHeight: 1.15, letterSpacing: '-0.025em' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
            >
              Performansınızı<br />her an yanınızda taşıyın.
            </motion.h2>
            <motion.p
              className="text-t-gray text-base mb-10 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.28 }}
            >
              iOS ve Android için optimize edilmiş uygulamamızı ücretsiz indirin. Sporcu, antrenör ve kulüp yöneticileri için tek platform.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.38 }}
            >
              {/* App Store */}
              <a
                href="#"
                className="inline-flex items-center gap-3.5 bg-t-surface border border-white/[0.08] px-5 py-3.5 rounded-xl hover:border-t-accent/40 hover:bg-t-surface/80 transition-all duration-200 group"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current flex-shrink-0 text-t-white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div>
                  <div className="text-[10px] text-t-gray-dim font-body font-medium tracking-wider uppercase leading-none mb-0.5">App Store</div>
                  <div className="text-t-white font-body font-semibold text-sm leading-none">iOS için İndir</div>
                </div>
              </a>

              {/* Play Store */}
              <a
                href="#"
                className="inline-flex items-center gap-3.5 bg-t-surface border border-white/[0.08] px-5 py-3.5 rounded-xl hover:border-t-accent/40 hover:bg-t-surface/80 transition-all duration-200 group"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current flex-shrink-0 text-t-white">
                  <path d="M3.18 23.76a2 2 0 0 1-.88-.63 2.49 2.49 0 0 1-.39-1.56V2.43a2.49 2.49 0 0 1 .39-1.56 2 2 0 0 1 .88-.63l11.37 11.76zm14.85-7.71L15.54 14l-2.26 2.34 5 5.1a2.37 2.37 0 0 0 .63-1.39zm-14.85-9.5L15.54 10l2.49-1.36L5.62 2.01a2.37 2.37 0 0 0-.44-.44zm14.85 2.12-2.49 1.36L12.8 12l2.74 2.83 2.49 1.36a2.14 2.14 0 0 0 0-3.45z" />
                </svg>
                <div>
                  <div className="text-[10px] text-t-gray-dim font-body font-medium tracking-wider uppercase leading-none mb-0.5">Google Play</div>
                  <div className="text-t-white font-body font-semibold text-sm leading-none">Android için İndir</div>
                </div>
              </a>
            </motion.div>

            {/* Trust note */}
            <motion.p
              className="text-t-gray-dim text-xs mt-6 font-body"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Ücretsiz · Reklam yok · Güvenli
            </motion.p>
          </motion.div>

          {/* Right — placeholder */}
          <motion.div
            className="lg:w-5/12 relative flex justify-center lg:justify-end z-10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="w-64 h-[22rem] bg-t-surface rounded-[2rem] flex flex-col items-center justify-center border border-white/[0.06] relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-t-accent/30 to-transparent" />
              <div className="w-10 h-1 bg-white/10 rounded-full mb-8" />
              <div className="space-y-3 w-full px-6">
                <div className="h-2.5 bg-white/[0.06] rounded-full w-3/4 mx-auto" />
                <div className="h-2 bg-white/[0.04] rounded-full w-1/2 mx-auto" />
              </div>
              <div className="mt-8 w-16 h-16 rounded-2xl bg-t-accent/10 border border-t-accent/20 flex items-center justify-center">
                <div className="w-7 h-7 rounded-lg bg-t-accent/30" />
              </div>
              <div className="mt-6 space-y-2 w-full px-6">
                <div className="h-2 bg-white/[0.05] rounded-full" />
                <div className="h-2 bg-white/[0.03] rounded-full w-4/5" />
              </div>
              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
