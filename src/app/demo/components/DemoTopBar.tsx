'use client'

import { Bell, Search } from 'lucide-react'
import type { ReactNode } from 'react'

interface DemoTopBarProps {
  title: string
  actions?: ReactNode
}

export function DemoTopBar({ title, actions }: DemoTopBarProps) {
  return (
    <header className="flex items-center justify-between border-b border-white/5 bg-[#0d1117]/80 backdrop-blur-sm px-6 py-4">
      <h1 className="text-lg font-semibold text-white">{title}</h1>

      <div className="flex items-center gap-3">
        {actions}

        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-white/[0.06] hover:text-white transition-colors">
          <Search className="h-[18px] w-[18px]" />
        </button>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-white/[0.06] hover:text-white transition-colors">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="hidden sm:flex items-center gap-2 ml-2 pl-3 border-l border-white/10">
          <span className="text-[13px] text-gray-400">Demo Yüzme Kulübü</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-700 text-[11px] font-semibold text-white">
            BÖ
          </div>
        </div>
      </div>
    </header>
  )
}
