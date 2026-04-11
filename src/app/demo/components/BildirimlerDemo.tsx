'use client'

import { DemoTopBar } from './DemoTopBar'
import { useDemoStore } from '../store'
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import type { Notification } from '../types'

const typeConfig: Record<
  Notification['type'],
  { icon: typeof Info; bg: string; iconColor: string }
> = {
  info: { icon: Info, bg: 'bg-blue-500/15', iconColor: 'text-blue-400' },
  warning: { icon: AlertTriangle, bg: 'bg-amber-500/15', iconColor: 'text-amber-400' },
  success: { icon: CheckCircle, bg: 'bg-green-500/15', iconColor: 'text-green-400' },
  error: { icon: XCircle, bg: 'bg-red-500/15', iconColor: 'text-red-400' },
}

export default function BildirimlerDemo() {
  const notifications = useDemoStore((s) => s.notifications)
  const markAsRead = useDemoStore((s) => s.markAsRead)
  const markAllAsRead = useDemoStore((s) => s.markAllAsRead)

  const sorted = [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const allRead = sorted.every((n) => n.isRead)

  return (
    <div className="flex flex-col h-full">
      <DemoTopBar
        title="Bildirimler"
        actions={
          <button
            onClick={markAllAsRead}
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Tumunu Okundu Isaretle
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {allRead && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <CheckCircle className="h-12 w-12 text-green-400/60 mb-4" />
            <p className="text-gray-400 text-sm">Tum bildirimler okundu</p>
          </div>
        )}

        {sorted.map((n) => {
          const config = typeConfig[n.type]
          const Icon = config.icon
          const date = new Date(n.createdAt)
          const formattedDate = `${date.toLocaleDateString('tr-TR')} ${date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`

          return (
            <div
              key={n.id}
              onClick={() => !n.isRead && markAsRead(n.id)}
              className={`rounded-xl border bg-[#111827] p-4 cursor-pointer transition-all duration-300 ${
                n.isRead
                  ? 'border-white/[0.06] opacity-50'
                  : 'border-l-cyan-400 border-l-2 border-t border-r border-b border-t-white/[0.06] border-r-white/[0.06] border-b-white/[0.06] bg-[#131d2e] opacity-100'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.bg}`}
                >
                  <Icon className={`h-5 w-5 ${config.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-[#f0f0ff]">{n.title}</h3>
                    <span className="shrink-0 text-xs text-[#9ca3af]">{formattedDate}</span>
                  </div>
                  <p className="mt-1 text-sm text-[#9ca3af]">{n.message}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
