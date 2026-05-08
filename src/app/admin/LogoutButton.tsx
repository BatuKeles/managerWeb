'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  const onClick = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-red-600 transition-colors"
    >
      <LogOut className="w-3.5 h-3.5" />
      Çıkış yap
    </button>
  )
}
