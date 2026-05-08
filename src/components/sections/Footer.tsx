import Link from 'next/link'
import { Droplets } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 font-headline text-xl font-semibold text-slate-900 mb-6">
            <Droplets className="w-5 h-5" style={{ color: '#6366f1' }} />
            Kulüp Bul
          </div>
          <p className="font-body text-sm text-slate-600 leading-relaxed mb-6 max-w-xs">
            Spor kulüplerini dijital dönüşüme taşıyan modern yönetim platformu.
          </p>
          <p className="font-body text-xs text-slate-400">
            © {new Date().getFullYear()} Kulüp Bul. Tüm hakları saklıdır.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h5 className="font-body text-xs uppercase tracking-widest font-bold text-slate-900 mb-6">Ürün</h5>
            <ul className="space-y-3">
              {[
                { href: '/ozellikler', label: 'Özellikler' },
                { href: '/#pricing', label: 'Fiyatlar' },
                { href: '/demo', label: 'Demo' },
                { href: '/#contact', label: 'Destek' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-slate-600 hover:text-t-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-body text-xs uppercase tracking-widest font-bold text-slate-900 mb-6">Yasal</h5>
            <ul className="space-y-3">
              <li>
                <Link href="/gizlilik" className="font-body text-sm text-slate-600 hover:text-t-accent transition-colors">
                  Gizlilik
                </Link>
              </li>
              <li>
                <Link href="/kullanim-sartlari" className="font-body text-sm text-slate-600 hover:text-t-accent transition-colors">
                  Kullanım Şartları
                </Link>
              </li>
              <li>
                <Link href="/kvkk" className="font-body text-sm text-slate-600 hover:text-t-accent transition-colors">
                  KVKK
                </Link>
              </li>
              <li>
                <Link href="/admin" className="font-body text-sm text-slate-600 hover:text-t-accent transition-colors">
                  Admin Girişi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile apps */}
        <div className="flex flex-col md:items-end">
          <h5 className="font-body text-xs uppercase tracking-widest font-bold text-slate-900 mb-6">Mobil Uygulama</h5>
          <p className="text-sm text-slate-500 mb-3 md:text-right">Yakında yayında.</p>
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-2 text-xs text-slate-400 font-medium tracking-wide opacity-60 cursor-not-allowed">
              <span>↓</span> App Store (Yakında)
            </span>
            <span className="inline-flex items-center gap-2 text-xs text-slate-400 font-medium tracking-wide opacity-60 cursor-not-allowed">
              <span>↓</span> Play Store (Yakında)
            </span>
          </div>
        </div>

      </div>
    </footer>
  )
}
