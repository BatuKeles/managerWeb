'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import Link from 'next/link'

const roles = [
  {
    id: 'kulup',
    emoji: '🏟️',
    num: '01',
    title: 'Kulüpler İçin',
    subtitle: 'Operasyonları Merkezileştirin',
    badge: 'Ücretli',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    desc: 'Birden fazla tesisi, yüzlerce sporcuyu ve onlarca antrenörü tek bir platform üzerinden yönetin. Gelir akışlarını anlık takip edin, takvim çakışmalarını otomatik önleyin.',
    features: [
      { icon: '🏢', title: 'Çoklu Tesis Kontrolü', desc: 'Tüm sahalarınızı, salonlarınızı ve ekipmanlarınızı tek panelden yönetin.' },
      { icon: '📊', title: 'Gelir & Analitik', desc: 'Aylık/yıllık gelir raporları, üye dönüşüm oranları ve büyüme grafikleri.' },
      { icon: '👥', title: 'Ekip Yönetimi', desc: 'Antrenör atamaları, performans değerlendirme ve yetki seviyeleri.' },
      { icon: '🎨', title: 'Marka Özelleştirme', desc: 'Kulübünüzün logosu, renkleri ve iletişim diliyle kişiselleştirilmiş deneyim.' },
    ],
    bg: 'bg-t-black',
    accent: '#f97316',
  },
  {
    id: 'antrenor',
    emoji: '🎯',
    num: '02',
    title: 'Antrenörler İçin',
    subtitle: 'Profesyonel Araçlar, Maksimum Etki',
    badge: 'Ücretli',
    badgeColor: 'bg-t-accent/15 text-t-accent',
    desc: 'Haftalık programları dakikalar içinde oluşturun, sporcu ilerlemelerini anlık izleyin ve velilerle sorunsuz iletişim kurun. Daha az yönetim, daha fazla antrenman.',
    features: [
      { icon: '📅', title: 'Akıllı Program Planlama', desc: 'Sporcu müsaitliğine ve seviyesine göre otomatik program oluşturma.' },
      { icon: '📈', title: 'Performans Paneli', desc: 'Her sporcunun gelişim eğrisini haftalık ve aylık grafiklerle takip edin.' },
      { icon: '💬', title: 'Veli İletişimi', desc: 'Anlık bildirim gönder, ilerleme raporu paylaş, sorulara cevap ver.' },
      { icon: '🏆', title: 'Hedef Sistemi', desc: 'Sporcular için kısa/uzun vadeli hedefler belirleyin, başarıları kutlayın.' },
    ],
    bg: 'bg-t-dark',
    accent: '#f97316',
  },
  {
    id: 'veli',
    emoji: '👨‍👩‍👧',
    num: '03',
    title: 'Veliler İçin',
    subtitle: 'Her Şeyi Anlık Görün',
    badge: 'Ücretsiz',
    badgeColor: 'bg-green-500/15 text-green-400',
    desc: 'Çocuğunuzun antrenman programını görüntüleyin, maç ve etkinliklerden haberdar olun. Gelişim raporlarını anlık takip edin — hiçbir şeyi kaçırmayın.',
    features: [
      { icon: '📱', title: 'Program Takibi', desc: 'Hangi gün, saat ve sahada antrenman olduğunu her zaman görün.' },
      { icon: '🔔', title: 'Anlık Bildirimler', desc: 'İptal, değişiklik veya duyurular telefonunuza anında gelir.' },
      { icon: '📊', title: 'Gelişim Raporları', desc: 'Antrenörün hazırladığı haftalık performans raporlarını okuyun.' },
      { icon: '💳', title: 'Kolay Ödeme', desc: 'Aidat ve ek ders ödemelerini uygulama içinden yapın.' },
    ],
    bg: 'bg-t-black',
    accent: '#f97316',
  },
  {
    id: 'ogrenci',
    emoji: '⚽',
    num: '04',
    title: 'Sporcular İçin',
    subtitle: 'Hedeflerine Odaklan',
    badge: 'Ücretsiz',
    badgeColor: 'bg-green-500/15 text-green-400',
    desc: 'Kişisel antrenman programın her zaman yanında. İlerlemeni takip et, hedef belirle, başarılarını paylaş. Sporun bir yaşam biçimine dönüşsün.',
    features: [
      { icon: '🗓️', title: 'Kişisel Program', desc: 'Sana özel antrenman programın her zaman erişilebilir, offline bile.' },
      { icon: '📉', title: 'İstatistikler', desc: 'Hız, güç, dayanıklılık gibi metriklerini grafiklerle izle.' },
      { icon: '🎯', title: 'Hedef Belirle', desc: 'Kısa ve uzun vadeli hedefler koy, rozet kazan, ilerleni kutla.' },
      { icon: '🤝', title: 'Takım Bağlantısı', desc: 'Takım arkadaşlarınla iletişimde kal, etkinlikleri birlikte planlayın.' },
    ],
    bg: 'bg-t-dark',
    accent: '#f97316',
  },
]

function RoleSection({ role }: { role: typeof roles[0] }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section ref={ref} id={role.id} className={`${role.bg} py-32 md:py-40 overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Left: text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="font-headline font-black text-white/10 text-6xl leading-none select-none">{role.num}</span>
              <span className={`text-[10px] font-body font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${role.badgeColor}`}>
                {role.badge}
              </span>
            </div>

            <div className="text-5xl mb-6">{role.emoji}</div>

            <h2
              className="font-headline font-black text-t-white uppercase tracking-tighter mb-4"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.0 }}
            >
              {role.title}
            </h2>
            <p className="text-t-accent font-body font-semibold uppercase tracking-widest text-sm mb-6">
              {role.subtitle}
            </p>
            <p className="text-t-gray text-lg leading-relaxed mb-10">
              {role.desc}
            </p>

            <a
              href="#app-store"
              onClick={(e) => { e.preventDefault(); window.location.href = '/#app-store' }}
              className="inline-flex items-center gap-2 bg-t-accent text-white px-8 py-4 rounded-full font-body font-bold text-sm hover:bg-t-accent-dim transition-all active:scale-95"
            >
              Hemen Başla →
            </a>
          </motion.div>

          {/* Right: feature cards with parallax */}
          <motion.div style={{ y }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {role.features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:bg-slate-50 transition-colors"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h4 className="font-headline font-bold text-t-white text-base mb-2">{f.title}</h4>
                <p className="text-t-gray text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default function OzelliklerClient() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] bg-t-black flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 dot-grid pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-t-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 py-24 z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link href="/" className="inline-flex items-center gap-2 text-t-gray text-sm font-body mb-8 hover:text-t-white transition-colors">
              ← Ana sayfaya dön
            </Link>
            <span className="text-t-accent font-body font-bold uppercase tracking-[0.3em] text-xs block mb-6">
              Detaylı Özellikler
            </span>
            <h1
              className="font-headline font-black text-t-white uppercase tracking-tighter"
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', lineHeight: 1.0 }}
            >
              HER ROL<br />
              <span className="text-t-accent">ÖZEL</span><br />
              ARAÇLAR.
            </h1>
            <p className="text-t-gray text-xl mt-8 max-w-xl leading-relaxed">
              4 farklı kullanıcı tipi için tasarlanmış özellikler. Her biri kendi ihtiyaçlarına özel, birbirine entegre.
            </p>
          </motion.div>

          {/* Role jump links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-3 mt-12"
          >
            {roles.map((r) => (
              <a
                key={r.id}
                href={`#${r.id}`}
                className="flex items-center gap-2 bg-t-dark border border-slate-200 text-t-gray text-sm font-body px-5 py-2.5 rounded-full hover:border-t-accent/30 hover:text-t-white transition-all"
              >
                <span>{r.emoji}</span>
                <span>{r.title}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Role sections */}
      {roles.map((role) => (
        <RoleSection key={role.id} role={role} />
      ))}

      <Footer />
    </>
  )
}
