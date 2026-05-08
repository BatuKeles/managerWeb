'use client'

import Link from 'next/link'
import { Droplets, RefreshCw } from 'lucide-react'

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-slate-50 via-white to-red-50">
      <div className="text-center max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 font-headline text-xl font-semibold text-slate-900 mb-12">
          <Droplets className="w-6 h-6" style={{ color: '#6366f1' }} />
          Kulüp Bul
        </Link>
        <div className="text-7xl font-headline font-bold mb-4 text-rose-500" style={{ letterSpacing: '-0.04em' }}>500</div>
        <h1 className="text-2xl font-headline font-semibold text-slate-900 mb-3">Bir şeyler ters gitti</h1>
        <p className="text-slate-600 mb-10 leading-relaxed">
          Beklenmeyen bir hata oluştu. Lütfen sayfayı yeniden yüklemeyi deneyin.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Tekrar Dene
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
          >
            Ana Sayfa
          </Link>
        </div>
      </div>
    </div>
  )
}
