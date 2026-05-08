'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard,
  Calendar,
  CheckCircle,
  Users,
  CreditCard,
  Dumbbell,
  TrendingUp,
  MessageSquare,
  Package,
  Settings,
  Bell,
  Box,
  HelpCircle,
  BookOpen,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Waves,
} from 'lucide-react'

interface DemoSidebarProps {
  currentPath: string
}

const navItems = [
  { label: 'Dashboard', href: '/demo/dashboard', icon: LayoutDashboard },
  { label: 'Seanslar', href: '/demo/seanslar', icon: Calendar },
  { label: 'Onaylar', href: '/demo/onaylar', icon: CheckCircle },
  { label: 'Üyeler', href: '/demo/uyeler', icon: Users },
  { label: 'Tahsilat', href: '/demo/tahsilat', icon: CreditCard },
  { label: 'Antrenörler', href: '/demo/antrenorler', icon: Dumbbell },
  { label: 'Finans', href: '/demo/finans', icon: TrendingUp },
  { label: 'Mesajlar', href: '/demo/mesajlar', icon: MessageSquare },
  { label: 'Paketler', href: '/demo/paketler', icon: Package },
  { label: 'Ayarlar', href: '/demo/ayarlar', icon: Settings },
  { label: 'Bildirimler', href: '/demo/bildirimler', icon: Bell },
  { label: 'Stok', href: '/demo/stok', icon: Box },
]

export function DemoSidebar({ currentPath }: DemoSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  return (
    <aside
      className={`
        relative flex flex-col border-r border-white/5
        bg-[#0d1117] transition-all duration-300
        ${collapsed ? 'w-[68px]' : 'w-[240px]'}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-600">
          <Waves className="h-4 w-4 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">Kulüp Bul</p>
            <p className="text-[11px] text-gray-400 truncate">Demo Yüzme Kulübü</p>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-7 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#0d1117] text-gray-400 hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            currentPath === item.href ||
            (item.href !== '/demo/dashboard' && currentPath.startsWith(item.href))
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium
                transition-colors relative
                ${
                  isActive
                    ? 'bg-white/[0.06] text-cyan-400'
                    : 'text-gray-400 hover:bg-white/[0.04] hover:text-gray-200'
                }
              `}
            >
              {/* Active indicator */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-cyan-400" />
              )}
              <Icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? 'text-cyan-400' : 'text-gray-500'}`} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-white/5 px-2 py-3 space-y-1">
        {/* Support & Guide */}
        {!collapsed && (
          <>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-[13px] text-gray-400 hover:bg-white/[0.04] hover:text-gray-200 transition-colors"
            >
              <HelpCircle className="h-[18px] w-[18px] text-gray-500" />
              <span>Destek</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-[13px] text-gray-400 hover:bg-white/[0.04] hover:text-gray-200 transition-colors"
            >
              <BookOpen className="h-[18px] w-[18px] text-gray-500" />
              <span>Kullanma Kılavuzu</span>
            </Link>
          </>
        )}

        {/* Theme toggle */}
        {!collapsed && (
          <div className="flex items-center gap-1 rounded-md bg-white/[0.04] p-1 mx-1 mt-2">
            <button
              onClick={() => setTheme('light')}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded px-2 py-1 text-[11px] transition-colors ${
                theme === 'light' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Sun className="h-3 w-3" />
              Açık
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded px-2 py-1 text-[11px] transition-colors ${
                theme === 'dark' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Moon className="h-3 w-3" />
              Koyu
            </button>
          </div>
        )}

        {/* User info */}
        <div className="flex items-center gap-3 rounded-md px-3 py-2 mt-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-700 text-[11px] font-semibold text-white">
            BÖ
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-[13px] font-medium text-white truncate">Burak Özkan</p>
              <p className="text-[11px] text-gray-500 truncate">Kulüp Sahibi</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
