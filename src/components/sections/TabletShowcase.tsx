'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function TabletShowcase() {
  return (
    <section className="py-24 bg-t-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-t-accent font-body font-bold uppercase tracking-[0.3em] text-xs mb-4">
            Mobil Deneyim
          </span>
          <h2
            className="font-headline font-black text-t-white uppercase tracking-tighter"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.05 }}
          >
            Her Şey Avucunuzda
          </h2>
          <p className="mt-4 text-t-gray text-lg max-w-xl mx-auto leading-relaxed">
            Kulüp yönetimini, finansı ve üye takibini istediğiniz cihazdan kolayca yönetin.
          </p>
        </motion.div>

        {/* Tablet mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex justify-center"
        >
          {/* Glow arkası */}
          <div className="absolute w-[500px] h-[500px] bg-t-accent/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Tablet çerçevesi + ekran katmanı */}
          <div
            className="relative"
            style={{ width: 'min(480px, 90vw)' }}
          >
            {/* Uygulama ekranı — tablet ekranının tam üzerine konumlandırılmış */}
            <div
              className="absolute overflow-hidden rounded-[8px]"
              style={{
                left: '27.2%',
                top: '14.2%',
                width: '45.6%',
                height: '73.8%',
              }}
            >
              <Image
                src="/app-screenshot.jpeg"
                alt="Uygulama ekranı"
                fill
                className="object-cover object-top"
                sizes="220px"
              />
            </div>

            {/* Tablet çerçeve görseli */}
            <Image
              src="/tablet-mockup.jpeg"
              alt="Tablet"
              width={480}
              height={480}
              className="relative z-10 w-full h-auto"
              priority
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
