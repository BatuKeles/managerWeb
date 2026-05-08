import Link from 'next/link'
import { FileText, Package, MessageSquare, Users } from 'lucide-react'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  let stats = { content: 0, packages: 0, sessions: 0, openSessions: 0 }
  try {
    const [content, packages, sessions, openSessions] = await Promise.all([
      prisma.contentBlock.count(),
      prisma.package.count(),
      prisma.chatSession.count(),
      prisma.chatSession.count({ where: { status: { in: ['waiting', 'active'] } } }),
    ])
    stats = { content, packages, sessions, openSessions }
  } catch {}

  const cards = [
    { label: 'İçerik blokları', value: stats.content, href: '/admin/icerik', icon: FileText, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Paketler', value: stats.packages, href: '/admin/paketler', icon: Package, color: 'text-purple-600 bg-purple-50' },
    { label: 'Toplam sohbet', value: stats.sessions, href: '/admin/sohbetler', icon: MessageSquare, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Açık sohbet', value: stats.openSessions, href: '/admin/sohbetler', icon: Users, color: 'text-orange-600 bg-orange-50' },
  ]

  return (
    <div>
      <h1 className="font-headline text-2xl font-semibold text-slate-900 mb-1">Yönetim Paneli</h1>
      <p className="text-sm text-slate-500 mb-8">Genel bakış ve hızlı erişim.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => {
          const Icon = c.icon
          return (
            <Link
              key={c.label}
              href={c.href}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${c.color} mb-4`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-headline font-semibold text-slate-900">{c.value}</div>
              <div className="text-sm text-slate-500 mt-0.5">{c.label}</div>
            </Link>
          )
        })}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 mt-8">
        <h2 className="font-semibold text-slate-900 mb-3">Hızlı bağlantılar</h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <Link href="/admin/icerik" className="text-indigo-600 hover:text-indigo-700">→ İçerik bloklarını düzenle</Link>
          <Link href="/admin/paketler" className="text-indigo-600 hover:text-indigo-700">→ Paket fiyatlarını güncelle</Link>
          <Link href="/admin/sohbetler" className="text-indigo-600 hover:text-indigo-700">→ Açık sohbetleri yanıtla</Link>
          <Link href="/" className="text-indigo-600 hover:text-indigo-700">→ Ana sayfaya dön</Link>
        </div>
      </div>
    </div>
  )
}
