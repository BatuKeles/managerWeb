'use client'

import { motion } from 'framer-motion'
import MascotVideo from '@/components/Mascot/MascotVideo'
import type { Package } from '@/types'

interface PricingSectionProps {
  packages?: Package[]
}

type CellValue = true | false | string

const comparisonRows: { label: string; sub?: string; sporcu: CellValue; antrenor: CellValue; kulup: CellValue }[] = [
  { label: 'Mobil Uygulama', sub: 'iOS & Android', sporcu: true, antrenor: true, kulup: true },
  { label: 'Canlı Seans & Devam Takibi', sub: 'Yoklama, geç kalma, iptal', sporcu: true, antrenor: true, kulup: true },
  { label: 'Performans Grafikleri', sub: 'Gelişim istatistikleri', sporcu: true, antrenor: true, kulup: true },
  { label: 'Gerçek Zamanlı Bildirimler', sub: 'Anlık push notification', sporcu: true, antrenor: true, kulup: true },
  { label: 'Online Ödeme & Tahsilat', sub: 'Havale, nakit, platform', sporcu: false, antrenor: true, kulup: true },
  { label: 'Gelir & Tahsilat Paneli', sub: 'Aylık rapor, bekleyen ödemeler', sporcu: false, antrenor: true, kulup: true },
  { label: 'Toplu Mesaj Gönderimi', sub: 'WhatsApp entegrasyonu', sporcu: false, antrenor: true, kulup: true },
  { label: 'Çoklu Antrenör Ataması', sub: 'Seans & branş bazlı', sporcu: false, antrenor: false, kulup: true },
  { label: 'Çoklu Tesis Yönetimi', sub: 'Salon, saha, havuz', sporcu: false, antrenor: false, kulup: true },
  { label: 'Kapasite', sporcu: 'Ücretsiz', antrenor: 'İlk 10 ücretsiz', kulup: 'Öğrenci sayısına göre' },
]

export default function PricingSection({ packages = [] }: PricingSectionProps) {
  const activePackages = packages.filter((p) => p.isActive)
  const antrenorPkg = activePackages[0] || null
  const kulupPkg = activePackages[1] || null

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const cards = [
    {
      title: 'Veli / Sporcu',
      sub: 'Temel Plan',
      badge: 'Ücretsiz',
      featured: false,
      priceNode: <span className="text-4xl font-headline font-semibold text-t-white">Ücretsiz</span>,
      note: 'Kredi kartı gerekmez.',
      features: ['Gerçek zamanlı ders takibi', 'Performans istatistikleri', 'Dijital sporcu profili'],
      btn: 'Eğitime Başla',
      href: '/demo',
      onClick: undefined as ((e: React.MouseEvent) => void) | undefined,
      delay: 0,
    },
    {
      title: antrenorPkg?.name || 'Antrenör',
      sub: 'Pro Plan',
      badge: 'Pro',
      featured: true,
      priceNode: antrenorPkg?.price ? (
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-headline font-semibold text-t-accent">₺</span>
          <span className="text-5xl font-headline font-semibold text-t-white">
            {Number(antrenorPkg.price).toLocaleString('tr-TR')}
          </span>
          <span className="text-sm text-t-gray">/ay</span>
        </div>
      ) : (
        <span className="text-3xl font-headline font-semibold text-t-white">İletişime Geçin</span>
      ),
      note: null,
      features: antrenorPkg ? antrenorPkg.features as string[] : ['Otomatik planlama motoru', 'Ödeme ve gelir paneli', 'Sporcu notları', '50 aktif sporcu'],
      btn: 'Kariyere Başla',
      href: '#contact',
      onClick: scrollToContact,
      delay: 0.1,
    },
    {
      title: kulupPkg?.name || 'Spor Kulübü',
      sub: 'Kurumsal Plan',
      badge: 'Kurumsal',
      featured: false,
      priceNode: kulupPkg?.price ? (
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-headline font-semibold text-t-accent">₺</span>
          <span className="text-5xl font-headline font-semibold text-t-white">
            {Number(kulupPkg.price).toLocaleString('tr-TR')}
          </span>
          <span className="text-sm text-t-gray">/ay</span>
        </div>
      ) : (
        <span className="text-3xl font-headline font-semibold text-t-white">Kurumsal Teklif</span>
      ),
      note: null,
      features: kulupPkg ? kulupPkg.features as string[] : ['Sınırsız sporcu kaydı', 'Çok antrenörlü portal', 'Etkinlik & turnuva', 'Özel marka entegrasyonu'],
      btn: 'Kulübü Ölçekle',
      href: '#contact',
      onClick: scrollToContact,
      delay: 0.2,
    },
  ]

  return (
    <section id="pricing" className="relative" style={{
      background: 'linear-gradient(180deg, #fbfaf7 0%, #fefcf9 50%, #fbfaf7 100%)',
      overflow: 'hidden',
    }}>
      {/* Renkli orb'lar */}
      <div style={{ position: 'absolute', top: '15%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-32 relative" style={{ zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-20"
        >
          <span className="text-t-accent font-body font-semibold uppercase tracking-[0.25em] text-[11px] block mb-5">
            Üyelik
          </span>
          <div className="flex flex-col md:flex-row gap-12 items-end">
            <div className="flex-1 flex items-center gap-6">
              <h2
                className="font-headline font-semibold text-t-white tracking-tight"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1 }}
              >
                Platforma Uygun<br />Paketi Seçin
              </h2>
              <div className="hidden md:block flex-shrink-0" style={{ animation: 'mascot-float 3s ease-in-out infinite' }}>
                <MascotVideo
                  src="/videos/mascot/thumbs_up.webm"
                  width={215}
                  height={215}
                />
              </div>
              <style>{`
                @keyframes mascot-float {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-8px); }
                }
              `}</style>
            </div>
            <p className="text-t-gray text-base leading-relaxed max-w-md pb-2">
              Momentumunuza uygun seviyeyi seçin. Amatörden profesyonele, dijital altyapıyı sunuyoruz.
            </p>
          </div>
        </motion.div>

        {/* 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch mb-24">
          {cards.map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: card.delay }}
              className={`flex flex-col rounded-2xl p-8 border transition-all relative ${
                card.featured
                  ? 'bg-white border-t-accent/40 shadow-[0_20px_60px_rgba(99,102,241,0.25)]'
                  : 'bg-white border-slate-200 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.10)]'
              }`}
              style={card.featured ? {
                backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #f97316 100%)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                border: '2px solid transparent',
              } : undefined}
            >
              {/* Üst alan */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-headline font-semibold text-xl text-t-white">{card.title}</h3>
                  <p className="text-t-gray-dim text-xs mt-1 uppercase tracking-wider font-body">{card.sub}</p>
                </div>
                <span className={`text-[10px] font-body font-semibold tracking-[0.12em] px-3 py-1.5 rounded-full uppercase ${
                  card.featured
                    ? 'bg-t-accent/15 text-t-accent'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {card.badge}
                </span>
              </div>

              {/* Fiyat */}
              <div className="mb-7">
                {card.priceNode}
                {card.note && <p className="text-t-gray-dim text-xs mt-2">{card.note}</p>}
              </div>

              {/* Separator */}
              <div className="h-px bg-slate-200 mb-7" />

              {/* Özellikler */}
              <ul className="flex flex-col gap-3.5 mb-8 flex-1">
                {(card.features as string[]).map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-t-gray">
                    <span className="w-4 h-4 rounded-full bg-t-accent/10 text-t-accent inline-flex items-center justify-center flex-shrink-0 text-[10px] font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Buton */}
              <a
                href={card.href}
                onClick={card.onClick}
                className={`w-full py-3.5 rounded-xl font-body font-semibold text-sm transition-all text-center cursor-pointer ${
                  card.featured
                    ? 'bg-t-accent text-white hover:bg-t-accent-dim shadow-[0_4px_16px_rgba(99,102,241,0.3)]'
                    : 'border border-slate-300 text-slate-700 hover:border-t-accent hover:text-t-accent hover:bg-slate-50'
                }`}
              >
                {card.btn}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <h3 className="font-headline font-semibold text-xl text-t-white mb-2">
            Özellik Karşılaştırması
          </h3>
          <div className="h-px w-12 bg-t-accent mb-10" />
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 pr-6 font-body font-medium text-xs uppercase tracking-[0.15em] text-t-gray-dim w-1/2">Özellik</th>
                  <th className="py-4 px-3 font-body font-medium text-xs uppercase tracking-[0.15em] text-t-gray-dim text-center">Sporcu / Veli</th>
                  <th className="py-4 px-3 font-body font-medium text-xs uppercase tracking-[0.15em] text-t-accent text-center">Antrenör</th>
                  <th className="py-4 px-3 font-body font-medium text-xs uppercase tracking-[0.15em] text-t-gray-dim text-center">Kulüp</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr key={row.label} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${idx === comparisonRows.length - 1 ? 'border-none' : ''}`}>
                    <td className="py-4 pr-6">
                      <span className="text-sm font-medium text-t-white block">{row.label}</span>
                      {row.sub && <span className="text-xs text-t-gray-dim mt-0.5 block">{row.sub}</span>}
                    </td>
                    <td className="py-4 px-3 text-center">
                      {row.sporcu === true
                        ? <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-t-accent/10 text-t-accent font-bold text-xs">✓</span>
                        : row.sporcu === false
                        ? <span className="text-t-gray-dim/40 text-lg">—</span>
                        : <span className="text-xs font-medium text-t-gray bg-slate-100 px-2 py-1 rounded-md whitespace-nowrap">{row.sporcu}</span>
                      }
                    </td>
                    <td className="py-4 px-3 text-center bg-t-accent/[0.02]">
                      {row.antrenor === true
                        ? <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-t-accent/10 text-t-accent font-bold text-xs">✓</span>
                        : row.antrenor === false
                        ? <span className="text-t-gray-dim/40 text-lg">—</span>
                        : <span className="text-xs font-medium text-t-accent bg-t-accent/10 px-2 py-1 rounded-md whitespace-nowrap">{row.antrenor}</span>
                      }
                    </td>
                    <td className="py-4 px-3 text-center">
                      {row.kulup === true
                        ? <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-t-accent/10 text-t-accent font-bold text-xs">✓</span>
                        : row.kulup === false
                        ? <span className="text-t-gray-dim/40 text-lg">—</span>
                        : <span className="text-xs font-medium text-t-gray bg-slate-100 px-2 py-1 rounded-md whitespace-nowrap">{row.kulup}</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-t-accent/5 via-white to-purple-50 rounded-2xl p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 border border-slate-200 shadow-[0_4px_24px_rgba(15,23,42,0.04)]"
        >
          <div>
            <h3 className="font-headline font-semibold text-t-white text-2xl md:text-3xl leading-tight mb-3">
              Özel bir paket mi<br />arıyorsunuz?
            </h3>
            <p className="text-t-gray text-base leading-relaxed max-w-lg">
              Ulusal federasyonlar ve çok şubeli kulüpler için özel kurumsal entegrasyonlar.
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="flex-shrink-0 bg-t-accent text-white px-10 py-4 rounded-full font-body font-semibold text-sm hover:bg-t-accent-dim transition-all cursor-pointer"
          >
            Ekiple İletişime Geç
          </a>
        </motion.div>

      </div>
    </section>
  )
}
