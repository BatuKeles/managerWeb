'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

function CountUp({ target, suffix = '' }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count.toLocaleString('tr-TR')}{suffix}</span>
}

const stats = [
  { value: 500, suffix: '+', label: 'Aktif Kulüp' },
  { value: 50000, suffix: '+', label: 'Kayıtlı Sporcu' },
  { value: 25000, suffix: '+', label: 'Veli Kullanıcı' },
  { value: 850, suffix: '+', label: 'Antrenör' },
]

export default function AppScreenshots() {
  return (
    <section className="py-20 bg-t-dark border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center"
            >
              <div className="font-headline font-black text-4xl md:text-5xl text-t-white mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-body text-xs uppercase tracking-widest text-t-gray-dim font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
