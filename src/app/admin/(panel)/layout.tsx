import { ReactNode } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Droplets, LayoutDashboard, FileText, Package, MessageSquare } from 'lucide-react'
import { verifyAdminToken, COOKIE_NAME } from '@/lib/auth'
import LogoutButton from '../LogoutButton'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const token = cookies().get(COOKIE_NAME)?.value
  const payload = token ? await verifyAdminToken(token) : null

  // Login sayfası bu layout'tan geçmez (kendi başına route)
  // Ama yine de güvenlik için: payload yoksa ve login sayfasında değilsek redirect yapacaktık;
  // login sayfası ayrı route'ta olduğu için burası sadece protected sayfalar için çağrılır.
  if (!payload) redirect('/admin/login')

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col">
        <div className="px-5 py-5 border-b border-slate-200">
          <Link href="/admin" className="flex items-center gap-2 font-headline text-base font-semibold text-slate-900">
            <Droplets className="w-5 h-5" style={{ color: '#6366f1' }} />
            Kulüp Bul Admin
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
          <NavItem href="/admin" icon={<LayoutDashboard className="w-4 h-4" />}>Panel</NavItem>
          <NavItem href="/admin/icerik" icon={<FileText className="w-4 h-4" />}>İçerik</NavItem>
          <NavItem href="/admin/paketler" icon={<Package className="w-4 h-4" />}>Paketler</NavItem>
          <NavItem href="/admin/sohbetler" icon={<MessageSquare className="w-4 h-4" />}>Sohbetler</NavItem>
        </nav>

        <div className="px-5 py-4 border-t border-slate-200">
          <div className="text-xs text-slate-400 mb-2">Giriş yapan</div>
          <div className="text-sm font-medium text-slate-900 mb-3">{payload.username}</div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}

function NavItem({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 transition-colors"
    >
      <span className="text-slate-500">{icon}</span>
      {children}
    </Link>
  )
}
