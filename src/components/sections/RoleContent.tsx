'use client'

import type { Role, ContentBlock } from '@/types'

interface RoleContentProps {
  role: Role
  content: ContentBlock[]
}

const roleConfig = {
  veli: {
    label: 'Veli Yönetimi',
    features: [
      { icon: '📅', title: 'Akıllı Takvim', desc: 'Veliler programı görüntüler, antrenmanları anında takip eder.' },
      { icon: '👤', title: 'Otomatik Bildirimler', desc: 'Çocuğunuzun her antrenmanı için anlık bildirim alın.' },
      { icon: '🔔', title: 'Gelişim Raporları', desc: 'Haftalık performans raporları doğrudan cebinize gelir.' },
    ],
  },
  kulup: {
    label: 'Kulüp Operasyonları',
    features: [
      { icon: '📅', title: 'Akıllı Müsaitlik', desc: 'Kulüpler saha ve antrenörleri otomatik tahsis eder.' },
      { icon: '👤', title: 'Otomatik Atama', desc: 'Seviye ve müsaitliğe göre otomatik sporcu-antrenör eşleşmesi.' },
      { icon: '🔔', title: 'Elit Hatırlatmalar', desc: 'Anlık bildirimler sayesinde gelmeyen sporcu oranı %40 azalır.' },
    ],
  },
  ogrenci: {
    label: 'Sporcu Paneli',
    features: [
      { icon: '📅', title: 'Antrenman Programı', desc: 'Kişisel antrenman planın her zaman erişilebilir.' },
      { icon: '👤', title: 'Performans Takibi', desc: 'Haftalık ve aylık gelişim grafiklerini incele.' },
      { icon: '🔔', title: 'Hedef Sistemi', desc: 'Hedef belirle, rozet kazan, başarılarını paylaş.' },
    ],
  },
  antrenor: {
    label: 'Antrenör Araçları',
    features: [
      { icon: '📅', title: 'Program Planlama', desc: 'Haftalık antrenman programlarını dakikalar içinde oluştur.' },
      { icon: '👤', title: 'Sporcu Paneli', desc: 'Tüm sporcularının performansını tek ekranda gör.' },
      { icon: '🔔', title: 'Veli İletişimi', desc: 'Velilere not ve bildirim gönder, ilerlemeyi paylaş.' },
    ],
  },
}

export default function RoleContent({ role, content }: RoleContentProps) {
  const config = roleConfig[role]
  const titleBlock = content.find((c) => c.key === `${role}_title`)
  const sectionTitle = titleBlock?.value || config.label

  return (
    <>
      {/* Tactical feature section — dark navy bg */}
      <section id="features" className="py-32 kinetic-gradient text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-center">

            {/* Left */}
            <div className="lg:w-1/2">
              <h2 className="font-headline text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
                TAKTİKSEL<br />YÖNETİM
              </h2>
              <div className="space-y-12">
                {config.features.map((f) => (
                  <div key={f.title} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-kc-secondary flex items-center justify-center rounded-lg">
                      <span className="text-xl">{f.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-headline text-xl font-bold mb-2">{f.title}</h4>
                      <p className="text-kc-on-primary-container">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — visual */}
            <div className="lg:w-1/2 relative">
              <div className="relative z-10 bg-kc-surface-lowest p-4 rounded-3xl shadow-2xl overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="rounded-2xl bg-kc-surface-low aspect-[4/3] flex flex-col items-center justify-center p-8">
                  <div className="text-8xl mb-4 select-none">{role === 'kulup' ? '🏟️' : role === 'veli' ? '👨‍👩‍👧' : role === 'ogrenci' ? '⚽' : '🎯'}</div>
                  <div className="text-kc-on-surface-variant text-sm font-bold uppercase tracking-widest text-center">
                    {sectionTitle} görseli buraya gelecek
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -left-10 w-full h-full border-2 border-kc-secondary rounded-3xl -rotate-2" />
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
