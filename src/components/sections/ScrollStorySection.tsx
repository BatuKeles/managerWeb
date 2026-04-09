'use client'

import { useEffect, useRef, useState } from 'react'

/* ── Sayı sayma hook ── */
function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return value
}

/* ── Stat kartı ── */
function StatCard({ value, label, color, started }: { value: string; label: string; color: string; started: boolean }) {
  const numericStr = value.replace(/[^0-9]/g, '')
  const suffix = value.replace(/[0-9]/g, '')
  const target = parseInt(numericStr, 10)
  const count = useCountUp(target, 1800, started)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px', borderRight: 'inherit' }}>
      <div style={{ width: 3, height: 44, borderRadius: 2, background: color, flexShrink: 0, boxShadow: `0 0 16px ${color}88` }} />
      <div>
        <div className="font-headline font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', lineHeight: 1, letterSpacing: '-0.02em', color }}>
          {started ? `${count.toLocaleString('tr-TR')}${suffix}` : '0'}
        </div>
        <div style={{ color: '#555', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>
          {label}
        </div>
      </div>
    </div>
  )
}

const roles = [
  {
    id: 'kulup',
    tag: 'Kulüpler İçin',
    screen: '/KlupDashboard.png',
    slides: [
      {
        title: ['TÜM KLÜBİNİZİ', 'TEK EKRANDAN', 'YÖNETİN'],
        accent: 1,
        desc: 'Çoklu tesis yönetimi, antrenör atamaları ve gerçek zamanlı gelir analizi tek platformda.',
        features: ['Çoklu Tesis', 'Gelir Analizi', 'Üye Yönetimi'],
      },
      {
        title: ['GELİRİNİZİ', 'ANLIK', 'TAKİP EDİN'],
        accent: 2,
        desc: 'Günlük, haftalık ve aylık gelir raporlarınıza tek tıkla ulaşın.',
        features: ['Finansal Raporlar', 'Tahsilat Takibi'],
      },
      {
        title: ['ANTRENÖRLERİNİZİ', 'KOLAYCA', 'YÖNETİN'],
        accent: 1,
        desc: 'Antrenör atamalarını, çalışma saatlerini ve seans performanslarını tek ekrandan görün.',
        features: ['Antrenör Ataması', 'Seans Yönetimi'],
      },
    ],
  },
  {
    id: 'antrenor',
    tag: 'Antrenörler İçin',
    screen: '/Seanslar.png',
    slides: [
      {
        title: ['ANTRENÖRLÜK', 'ARTIK ÇOK', 'DAHA KOLAY'],
        accent: 2,
        desc: 'Otomatik program planlama, sporcu listeleri ve performans değerlendirme araçları.',
        features: ['Oto-Planlama', 'Performans Takibi'],
      },
      {
        title: ['SPORCULARINı', 'YAKINDAN', 'TAKİP ET'],
        accent: 1,
        desc: 'Her sporcunun gelişimini detaylı grafikler ve raporlarla anlık olarak izle.',
        features: ['Gelişim Grafikleri', 'Detaylı Raporlar'],
      },
      {
        title: ['PROGRAMINI', 'OTOMATİK', 'OLUŞTUR'],
        accent: 2,
        desc: 'Haftalık ve aylık antrenman programlarını yapay zeka destekli araçlarla otomatik hazırla.',
        features: ['Akıllı Program', 'Takvim Yönetimi'],
      },
    ],
  },
  {
    id: 'veli',
    tag: 'Veliler İçin',
    screen: '/DersProgrami.png',
    slides: [
      {
        title: ['ÇOCUĞUNUZU', 'HER AN', 'TAKİP EDİN'],
        accent: 1,
        desc: 'Antrenman programı, devam durumu ve gelişim grafiklerine istediğiniz zaman ulaşın.',
        features: ['Program Takibi', 'Devam Durumu'],
      },
      {
        title: ['ÖDEMELERİNİZİ', 'KOLAYCA', 'YÖNETİN'],
        accent: 2,
        desc: 'Online ödeme, fatura takibi ve otomatik hatırlatmalarla hiçbir ödemeyi kaçırmayın.',
        features: ['Online Ödeme', 'Fatura Takibi'],
      },
      {
        title: ['GELİŞİMİ', 'ANLIK', 'İZLEYİN'],
        accent: 1,
        desc: 'Çocuğunuzun performans grafiklerine ve antrenör notlarına her an kolayca ulaşın.',
        features: ['Performans Grafikleri', 'Anlık Bildirim'],
      },
    ],
  },
  {
    id: 'ogrenci',
    tag: 'Sporcular İçin',
    screen: '/Mesajlar.png',
    slides: [
      {
        title: ['HEDEFİNE', 'ODAKLAN'],
        accent: 1,
        desc: 'Kişisel antrenman programın, performans istatistiklerin ve hedef takibin tek ekranda.',
        features: ['Kişisel Program', 'Hedef Takibi'],
      },
      {
        title: ['PERFORMANSINI', 'GELİŞTİR'],
        accent: 0,
        desc: 'Haftalık istatistiklerini takip et, güçlü ve geliştirilmesi gereken yönlerini gör.',
        features: ['Haftalık İstatistik', 'Güçlü Yönler'],
      },
      {
        title: ['ANTRENÖRÜNLEİLETİŞİMDE', 'KAL'],
        accent: 1,
        desc: 'Antrenörünle direkt mesajlaş, program güncellemelerini ve notları anında al.',
        features: ['Mesajlaşma', 'Program Güncellemeleri'],
      },
    ],
  },
]

function TabletMockup({ screen }: { screen: string }) {
  const [current, setCurrent] = useState(screen)
  const [next, setNext] = useState<string | null>(null)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (screen === current) return
    setNext(screen)
    setFading(true)
    const t = setTimeout(() => {
      setCurrent(screen)
      setNext(null)
      setFading(false)
    }, 500)
    return () => clearTimeout(t)
  }, [screen])

  return (
    <div style={{
      position: 'relative',
      width: 320,
      height: 480,
      borderRadius: 28,
      border: '10px solid #1c1c2e',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 32px 64px rgba(0,0,0,0.7)',
      overflow: 'hidden',
      background: '#000',
    }}>
      {/* Yeni görsel — altta bekler */}
      {next && (
        <img
          src={next}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
        />
      )}
      {/* Mevcut görsel — üstte, solar */}
      <img
        src={current}
        alt=""
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block',
          opacity: fading ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      />
    </div>
  )
}

export default function ScrollStorySection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideIndex, setSlideIndex] = useState(0)
  const [barProgress, setBarProgress] = useState(0)
  const [statsStarted, setStatsStarted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const tabletRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeIndexRef = useRef(0)
  const slideIndexRef = useRef(0)

  // IntersectionObserver: hangi section ortada → activeIndex
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            activeIndexRef.current = i
            setActiveIndex(i)
            slideIndexRef.current = 0
            setSlideIndex(0)
            setBarProgress(0)
          }
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Stats sayacı — ekrana girince tetikle
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Timer: aktif bölümün slide'larını 5 saniyede bir döndür
  useEffect(() => {
    const DURATION = 5000
    let start = Date.now()
    let raf: number

    const tick = () => {
      const elapsed = Date.now() - start
      const progress = elapsed / DURATION

      if (progress >= 1) {
        const currentRole = roles[activeIndexRef.current]
        const next = (slideIndexRef.current + 1) % currentRole.slides.length
        slideIndexRef.current = next
        setSlideIndex(next)
        setBarProgress(0)
        start = Date.now()
      } else {
        setBarProgress(progress)
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Tablet: scroll ile hareket (sadece desktop)
  useEffect(() => {
    const TABLET_H = 504

    const onScroll = () => {
      if (!tabletRef.current || !containerRef.current) return

      const { top, height } = containerRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      const scrollable = height - vh
      const rawProgress = scrollable > 0 ? -top / scrollable : 0

      if (rawProgress < 0 || rawProgress > 1) {
        tabletRef.current.style.opacity = '0'
        tabletRef.current.style.pointerEvents = 'none'
        return
      }

      tabletRef.current.style.opacity = '1'
      tabletRef.current.style.pointerEvents = 'auto'

      const baseTop = vh / 2 - TABLET_H / 2
      const rawTop = baseTop + rawProgress * 80
      const newTop = Math.max(16, Math.min(rawTop, vh - TABLET_H - 16))
      tabletRef.current.style.top = `${newTop}px`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const currentRole = roles[activeIndex]
  const currentSlide = currentRole.slides[slideIndex]

  return (
    <section id="home" style={{ backgroundColor: '#050505' }}>

      {/* HERO */}
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', backgroundColor: '#030303' }}>
        {/* Video arka plan */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src="/webKarsilama.mp4" type="video/mp4" />
        </video>
        {/* Karartma katmanı */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to right, rgba(3,3,3,0.85) 0%, rgba(3,3,3,0.6) 55%, rgba(3,3,3,0.3) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(3,3,3,0.4) 0%, transparent 30%, transparent 70%, rgba(3,3,3,0.6) 100%)',
        }} />

        {/* Metin içeriği */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-0" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 540 }}>
            <span style={{
              color: '#818cf8', fontSize: 11, letterSpacing: '0.32em', fontWeight: 700,
              textTransform: 'uppercase', display: 'block', marginBottom: 24,
              animation: 'fadeSlideUp 0.8s ease 0.1s both',
            }}>
              Spor Yönetim Platformu
            </span>

            <div style={{ overflow: 'hidden', marginBottom: 4 }}>
              <h1 className="font-headline font-black" style={{
                fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 0.95,
                letterSpacing: '-0.04em', color: '#f0f0ff',
                animation: 'heroLineUp 1s cubic-bezier(0.16,1,0.3,1) 0.2s both',
              }}>
                Sporu
              </h1>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: 24 }}>
              <h1 className="font-headline font-black" style={{
                fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 0.95,
                letterSpacing: '-0.04em',
                background: 'linear-gradient(90deg, #818cf8 0%, #c084fc 50%, #f97316 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                animation: 'heroLineUp 1s cubic-bezier(0.16,1,0.3,1) 0.35s both',
              }}>
                yeniden tanımla
              </h1>
            </div>

            <p style={{
              color: 'rgba(180,180,220,0.7)', fontSize: '1.05rem', marginBottom: 44,
              maxWidth: 400, lineHeight: 1.8,
              animation: 'fadeSlideUp 0.8s ease 0.6s both',
            }}>
              Kulüpler, antrenörler, veliler ve sporcular için tasarlanmış yeni nesil yönetim platformu.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', animation: 'fadeSlideUp 0.8s ease 0.75s both' }}>
              {/* App Store */}
              <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '10px 20px', textDecoration: 'none', backdropFilter: 'blur(8px)' }}>
                <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, fill: '#fff', flexShrink: 0 }}>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1, marginBottom: 2 }}>App Store</div>
                  <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, lineHeight: 1 }}>iOS için İndir</div>
                </div>
              </a>
              {/* Google Play */}
              <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '10px 20px', textDecoration: 'none', backdropFilter: 'blur(8px)' }}>
                <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, fill: '#fff', flexShrink: 0 }}>
                  <path d="M3.18 23.76a2 2 0 0 1-.88-.63 2.49 2.49 0 0 1-.39-1.56V2.43a2.49 2.49 0 0 1 .39-1.56 2 2 0 0 1 .88-.63l11.37 11.76zm14.85-7.71L15.54 14l-2.26 2.34 5 5.1a2.37 2.37 0 0 0 .63-1.39zm-14.85-9.5L15.54 10l2.49-1.36L5.62 2.01a2.37 2.37 0 0 0-.44-.44zm14.85 2.12-2.49 1.36L12.8 12l2.74 2.83 2.49 1.36a2.14 2.14 0 0 0 0-3.45z" />
                </svg>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1, marginBottom: 2 }}>Google Play</div>
                  <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, lineHeight: 1 }}>Android için İndir</div>
                </div>
              </a>
            </div>

            <style>{`
              @keyframes heroLineUp {
                from { transform: translateY(110%); opacity: 0; }
                to   { transform: translateY(0);    opacity: 1; }
              }
              @keyframes fadeSlideUp {
                from { opacity: 0; transform: translateY(20px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </div>
        </div>
      </div>

      {/* İSTATİSTİKLER — hero'nun altında */}
      <div ref={statsRef} style={{ backgroundColor: '#07070f', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {[
            { value: '12.400+', label: 'Aktif Öğrenci',  color: '#818cf8' },
            { value: '320+',    label: 'Aktif Kulüp',    color: '#a78bfa' },
            { value: '8.900+',  label: 'Aktif Veli',     color: '#34d399' },
            { value: '1.100+',  label: 'Aktif Antrenör', color: '#60a5fa' },
          ].map((stat, i, arr) => (
            <div key={stat.label} style={{ borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <StatCard value={stat.value} label={stat.label} color={stat.color} started={statsStarted} />
            </div>
          ))}
        </div>
      </div>

      {/* ROL BÖLÜMLERİ */}
      <div ref={containerRef} className="relative md:flex">

        {/* Sol: bölümler — desktop %50 genişlik, mobilde tam genişlik */}
        <div className="w-full md:w-1/2">
          {roles.map((role, i) => {
            const slide = i === activeIndex ? currentSlide : role.slides[0]
            const isActive = i === activeIndex

            return (
              <div
                key={role.id}
                ref={(el) => { sectionRefs.current[i] = el }}
                className="flex flex-col justify-center"
                style={{ minHeight: '100vh', padding: 'clamp(40px, 8vw, 80px) clamp(24px, 6vw, 48px)' }}
              >
                {/* Mobil tablet mockup — ölçeklendirilmiş */}
                {/* <div className="md:hidden" style={{
                  width: 208,
                  height: 312,
                  margin: '0 auto 32px',
                  flexShrink: 0,
                }}>
                  <div style={{ transform: 'scale(0.65)', transformOrigin: 'top left' }}>
                    <TabletMockup screen={role.screen} />
                  </div>
                </div> */}

                {/* Tag */}
                <span style={{
                  color: '#6366f1', fontSize: 11, letterSpacing: '0.24em', fontWeight: 700,
                  textTransform: 'uppercase', display: 'block', marginBottom: 16,
                  opacity: isActive ? 1 : 0.3,
                  transform: isActive ? 'translateY(0)' : 'translateY(6px)',
                  transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}>
                  {role.tag}
                </span>

                {/* Başlık — her satır ayrı reveal */}
                <div style={{ marginBottom: 16 }}>
                  {slide.title.map((line, li) => (
                    <div key={`${role.id}-${slideIndex}-${li}`} style={{ overflow: 'hidden', lineHeight: 1.1 }}>
                      <h2
                        className="font-headline font-bold block"
                        style={{
                          fontSize: 'clamp(2rem, 3.5vw, 3.8rem)',
                          lineHeight: 1.1,
                          letterSpacing: '-0.03em',
                          color: li === slide.accent ? 'transparent' : '#f0f0ff',
                          ...(li === slide.accent ? {
                            background: 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          } : {}),
                          transform: isActive ? 'translateY(0)' : 'translateY(110%)',
                          opacity: isActive ? 1 : 0,
                          transition: `transform 0.75s cubic-bezier(0.16,1,0.3,1) ${li * 0.1}s, opacity 0.5s ease ${li * 0.1}s`,
                        }}
                      >
                        {line}
                      </h2>
                    </div>
                  ))}
                </div>

                {/* Açıklama */}
                <p style={{
                  color: '#7070a0', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 22,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s',
                }}>
                  {slide.desc}
                </p>

                {/* Feature badges */}
                <div style={{
                  display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s',
                }}>
                  {slide.features.map(f => (
                    <span key={f} style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8', fontSize: 10, letterSpacing: '0.18em', padding: '6px 14px', borderRadius: 999, fontWeight: 600, textTransform: 'uppercase' }}>
                      {f}
                    </span>
                  ))}
                </div>

                {/* Progress bar + noktalar */}
                {isActive && (
                  <div>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                      {role.slides.map((_, si) => (
                        <div key={si} style={{
                          width: si === slideIndex ? 20 : 6,
                          height: 5,
                          borderRadius: 3,
                          background: si === slideIndex ? '#6366f1' : 'rgba(255,255,255,0.12)',
                          transition: 'width 0.3s, background 0.3s',
                        }} />
                      ))}
                    </div>
                    <div style={{ height: 2, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden', maxWidth: 200 }}>
                      <div style={{ height: '100%', width: `${barProgress * 100}%`, background: '#6366f1', borderRadius: 2 }} />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Sağ boş alan — sadece desktop */}
        {/* <div className="hidden md:block" style={{ width: '50%' }} /> */}

        {/* Tablet mockup — sadece desktop, scroll ile hareket */}
        {/* <div
          ref={tabletRef}
          className="hidden md:block"
          style={{
            position: 'fixed',
            right: '8%',
            top: '50%',
            opacity: 0,
            transition: 'top 0.05s linear, opacity 0.3s',
            zIndex: 10,
          }}
        >
          <TabletMockup screen={roles[activeIndex].screen} />
        </div> */}

      </div>

    </section>
  )
}
