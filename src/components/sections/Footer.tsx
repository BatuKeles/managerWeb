import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-t-black text-t-white border-t border-white/5 py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

        {/* Brand */}
        <div>
          <div className="font-headline font-semibold text-t-white text-xl mb-6">
            SporKulübü
          </div>
          <p className="font-body text-xs uppercase tracking-widest text-t-gray-dim mb-8 leading-relaxed">
            © {new Date().getFullYear()} SporKulübü.<br />Hassas Performans Yönetimi.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h5 className="font-body text-xs uppercase tracking-widest font-bold text-t-white mb-6">Ürün</h5>
            <ul className="space-y-4">
              {[
                { href: '/ozellikler', label: 'Özellikler' },
                { href: '#pricing', label: 'Fiyatlar' },
                { href: '#contact', label: 'Destek' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="font-body text-xs uppercase tracking-widest text-t-gray-dim hover:text-t-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-body text-xs uppercase tracking-widest font-bold text-t-white mb-6">Yasal</h5>
            <ul className="space-y-4">
              {['Gizlilik', 'Kullanım Şartları'].map((label) => (
                <li key={label}>
                  <a href="#" className="font-body text-xs uppercase tracking-widest text-t-gray-dim hover:text-t-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/admin" className="font-body text-xs uppercase tracking-widest text-t-gray-dim hover:text-t-accent transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Download */}
        <div className="flex flex-col md:items-end">
          <h5 className="font-body text-xs uppercase tracking-widest font-bold text-t-white mb-6">İndir</h5>
          <div className="flex flex-col gap-3">
            <a href="#" className="font-body text-xs uppercase tracking-widest text-t-gray-dim hover:text-t-white transition-colors flex items-center gap-2">
              ↓ App Store
            </a>
            <a href="#" className="font-body text-xs uppercase tracking-widest text-t-gray-dim hover:text-t-white transition-colors flex items-center gap-2">
              ↓ Play Store
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
