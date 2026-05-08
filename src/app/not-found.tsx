import Link from 'next/link'
import { Droplets } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="text-center max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 font-headline text-xl font-semibold text-slate-900 mb-12">
          <Droplets className="w-6 h-6" style={{ color: '#6366f1' }} />
          Kulüp Bul
        </Link>
        <div className="text-7xl font-headline font-bold mb-4" style={{
          background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #f97316)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.04em',
        }}>404</div>
        <h1 className="text-2xl font-headline font-semibold text-slate-900 mb-3">Sayfa bulunamadı</h1>
        <p className="text-slate-600 mb-10 leading-relaxed">
          Aradığınız sayfa taşınmış veya silinmiş olabilir.
          Aşağıdaki bağlantıyı kullanarak ana sayfaya dönebilirsiniz.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  )
}
