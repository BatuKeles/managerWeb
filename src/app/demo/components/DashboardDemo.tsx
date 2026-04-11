'use client'

import { useState } from 'react'
import { useDemoStore } from '../store'
import { DemoTopBar } from './DemoTopBar'
import {
  Users,
  Calendar,
  CheckCircle,
  MessageSquare,
  Plus,
  ArrowRight,
  Check,
} from 'lucide-react'

const DAY_NAMES: Record<number, string> = {
  0: 'Paz',
  1: 'Pzt',
  2: 'Sal',
  3: 'Çar',
  4: 'Per',
  5: 'Cum',
  6: 'Cmt',
}

function weekDaysLabel(days: number[]): string {
  return days.map((d) => DAY_NAMES[d] ?? '').join(' - ')
}

export default function DashboardDemo() {
  const stats = useDemoStore((s) => s.dashboardStats)
  const occurrences = useDemoStore((s) => s.occurrences)
  const addMember = useDemoStore((s) => s.addMember)
  const addPayment = useDemoStore((s) => s.addPayment)

  // New member dialog
  const [showNewMember, setShowNewMember] = useState(false)
  const [memberName, setMemberName] = useState('')
  const [memberSurname, setMemberSurname] = useState('')
  const [memberPhone, setMemberPhone] = useState('')
  const [memberSuccess, setMemberSuccess] = useState(false)

  // Payment dialog
  const [showPayment, setShowPayment] = useState(false)
  const [payMemberIdx, setPayMemberIdx] = useState(0)
  const [payAmount, setPayAmount] = useState('')
  const [payMethod, setPayMethod] = useState('Nakit')
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  // upcoming sessions for this week (scheduled only, first 4)
  const upcoming = occurrences
    .filter((o) => o.status === 'scheduled' && o.date >= '2026-04-09')
    .slice(0, 4)

  const handleAddMember = () => {
    if (!memberName.trim() || !memberSurname.trim()) return
    addMember(memberName.trim(), memberSurname.trim(), memberPhone.trim())
    setMemberName('')
    setMemberSurname('')
    setMemberPhone('')
    setShowNewMember(false)
    setMemberSuccess(true)
    setTimeout(() => setMemberSuccess(false), 2500)
  }

  const handleAddPayment = () => {
    const amount = parseFloat(payAmount)
    if (!amount || amount <= 0) return
    const overdueItem = stats.overduePayments[payMemberIdx]
    if (!overdueItem) return
    addPayment({
      id: `pay-${Date.now()}`,
      clubId: 'demo-club',
      userId: overdueItem.user.id,
      user: overdueItem.user,
      child: overdueItem.child,
      amount,
      paymentDate: new Date().toISOString().slice(0, 10),
      description: 'Tahsilat',
      paymentMethod: payMethod,
    })
    setPayAmount('')
    setPayMethod('Nakit')
    setPayMemberIdx(0)
    setShowPayment(false)
    setPaymentSuccess(true)
    setTimeout(() => setPaymentSuccess(false), 2500)
  }

  const kpis = [
    {
      label: 'TOPLAM ÜYE',
      value: stats.totalMembers,
      icon: Users,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/20',
      sub: (
        <div className="flex items-center gap-2 mt-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
            {Math.round(stats.totalMembers * (stats.activeRate / 100))} Aktif
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-400">
            {Math.round(stats.totalMembers * (stats.passiveRate / 100))} Pasif
          </span>
        </div>
      ),
    },
    {
      label: 'AKTİF SEANSLAR',
      value: stats.activeSessionCount,
      icon: Calendar,
      color: 'text-amber-400',
      bg: 'bg-amber-500/20',
      sub: (
        <p className="text-[11px] text-gray-500 mt-1 truncate">
          Devam eden sea...
        </p>
      ),
    },
    {
      label: 'ONAY BEKLEYEN',
      value: stats.pendingApprovals,
      icon: CheckCircle,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
      sub: (
        <p className="text-[11px] text-gray-500 mt-1 truncate">
          Onay bekleyen k...
        </p>
      ),
    },
    {
      label: 'MESAJLAR',
      value: stats.unreadMessages,
      icon: MessageSquare,
      color: 'text-purple-400',
      bg: 'bg-purple-500/20',
      sub: (
        <p className="text-[11px] text-gray-500 mt-1 truncate">
          Üye mesajlaşma
        </p>
      ),
    },
  ]

  return (
    <div className="flex flex-col h-full">
      <DemoTopBar
        title="Dashboard"
        actions={
          <button
            onClick={() => setShowNewMember(true)}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] hover:to-[#D97706] px-4 py-2 text-sm font-medium text-white transition-all"
          >
            <Plus className="h-4 w-4" />
            Yeni Kayıt
          </button>
        }
      />

      {/* Success toasts */}
      {memberSuccess && (
        <div className="fixed top-6 right-6 z-[60] flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg animate-pulse">
          <Check className="h-4 w-4" />
          Üye başarıyla eklendi
        </div>
      )}
      {paymentSuccess && (
        <div className="fixed top-6 right-6 z-[60] flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg animate-pulse">
          <Check className="h-4 w-4" />
          Tahsilat başarıyla kaydedildi
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Welcome banner */}
        <div className="rounded-xl bg-gradient-to-r from-[#111827] to-[#0d1117] border border-white/[0.06] px-6 py-5">
          <h2 className="text-xl font-semibold text-white">
            Hoş geldin, Demo Yüzme Kulübü 👋
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            9 Nisan 2026, Perşembe
          </p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-xl bg-[#111827] border border-white/[0.06] p-5 cursor-pointer hover:border-[#0D9488]/30 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
                    {kpi.label}
                  </p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {kpi.value}
                  </p>
                  {kpi.sub}
                </div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${kpi.bg}`}
                >
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Yaklaşan Seanslar */}
        <div className="rounded-xl bg-[#111827] border border-white/[0.06] p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-base font-semibold text-white">
                Yaklaşan Seanslar
              </h3>
              <span className="rounded-full bg-cyan-500/20 px-3 py-0.5 text-[11px] font-medium text-cyan-400">
                Bugün
              </span>
            </div>
            <button className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 cursor-pointer hover:underline transition-colors">
              Tüm Programı Gör
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {upcoming.map((occ) => {
              const session = occ.session
              const coach = session.coaches[0]
              return (
                <div
                  key={occ.id}
                  className="flex items-start gap-3 rounded-lg bg-[#0d1117] border border-white/[0.06] p-4 border-l-[3px] border-l-cyan-500"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {session.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {session.startTime} - {session.endTime} ·{' '}
                      {session.durationMinutes} dk
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {weekDaysLabel(session.weekDays)}
                    </p>
                    {coach && (
                      <div className="flex items-center gap-1.5 mt-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor: coach.color || '#06b6d4',
                          }}
                        />
                        <span className="text-[11px] text-gray-400">
                          {coach.coach.firstName} {coach.coach.lastName[0]}.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom two cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Ödeme Bekleyen Üyeler */}
          <div className="rounded-xl bg-[#111827] border border-white/[0.06] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-white">
                Ödeme Bekleyen Üyeler
              </h3>
              <span className="text-sm text-cyan-400 cursor-pointer hover:underline">Tümünü Gör</span>
            </div>

            <table className="w-full">
              <thead>
                <tr className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
                  <th className="text-left pb-3">ÜYE</th>
                  <th className="text-left pb-3">BORÇ</th>
                  <th className="text-left pb-3">SON TARİH</th>
                </tr>
              </thead>
              <tbody>
                {stats.overduePayments.map((p, i) => {
                  const displayName = p.child
                    ? `${p.child.firstName} ${p.child.lastName}`
                    : `${p.user.firstName} ${p.user.lastName}`
                  const initials = displayName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                  const colors = [
                    'bg-indigo-600',
                    'bg-amber-600',
                    'bg-emerald-600',
                  ]
                  return (
                    <tr
                      key={i}
                      className="border-t border-white/[0.04]"
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold text-white ${colors[i % colors.length]}`}
                          >
                            {initials}
                          </div>
                          <span className="text-sm text-white">
                            {displayName}
                          </span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="text-sm font-medium text-red-400">
                          ₺{p.amount.toLocaleString('tr-TR')}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="text-sm text-gray-400">
                          {p.dueDate.split('-').reverse().join('.')}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <button
              onClick={() => setShowPayment(true)}
              className="mt-4 w-full flex items-center justify-center gap-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 px-4 py-2.5 text-sm font-medium text-white transition-colors"
            >
              Tahsilat Yap +
            </button>
          </div>

          {/* Performans Analizi */}
          <div className="rounded-xl bg-[#111827] border border-white/[0.06] p-5">
            <h3 className="text-base font-semibold text-white mb-4">
              Performans Analizi
            </h3>

            <div className="space-y-4">
              {[
                {
                  label: 'Aktif Üye oranı',
                  value: `%${stats.activeRate}`,
                  color: 'text-cyan-400',
                },
                {
                  label: 'Ödeme bekleyen',
                  value: `${stats.overduePayments.length} Üye`,
                  color: 'text-amber-400',
                },
                {
                  label: 'Bu ay net gelir',
                  value: `₺${(3200).toLocaleString('tr-TR')}`,
                  color: 'text-emerald-400',
                },
                {
                  label: 'Tahsilat oranı',
                  value: `%${stats.collectionRate}`,
                  color: 'text-purple-400',
                },
                {
                  label: 'Pasif üye oranı',
                  value: `%${stats.passiveRate}`,
                  color: 'text-gray-400',
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-gray-400">{stat.label}</span>
                  <span className={`text-sm font-semibold ${stat.color}`}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            <button className="mt-6 w-full flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white cursor-pointer hover:underline transition-colors">
              Finans Raporunu Gör
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* New Member Dialog */}
      {showNewMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowNewMember(false)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-white text-lg font-semibold mb-4">Yeni Üye Ekle</h3>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">AD</label>
              <input
                type="text"
                value={memberName}
                onChange={e => setMemberName(e.target.value)}
                placeholder="Üye adı..."
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">SOYAD</label>
              <input
                type="text"
                value={memberSurname}
                onChange={e => setMemberSurname(e.target.value)}
                placeholder="Üye soyadı..."
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">TELEFON</label>
              <input
                type="text"
                value={memberPhone}
                onChange={e => setMemberPhone(e.target.value)}
                placeholder="5XX XXX XX XX"
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowNewMember(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-[#1E293B] text-[#94A3B8] hover:text-white transition">İptal</button>
              <button onClick={handleAddMember} className="flex-1 px-4 py-2.5 rounded-lg bg-[#0D9488] text-white font-medium hover:bg-[#0F766E] transition">Kaydet</button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Dialog */}
      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowPayment(false)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-white text-lg font-semibold mb-4">Tahsilat Yap</h3>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">ÜYE</label>
              <select
                value={payMemberIdx}
                onChange={e => setPayMemberIdx(Number(e.target.value))}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white focus:border-[#0D9488] focus:outline-none transition"
              >
                {stats.overduePayments.map((p, i) => {
                  const displayName = p.child
                    ? `${p.child.firstName} ${p.child.lastName}`
                    : `${p.user.firstName} ${p.user.lastName}`
                  return <option key={i} value={i} className="bg-[#0B0F19]">{displayName} - ₺{p.amount.toLocaleString('tr-TR')}</option>
                })}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">TUTAR</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] font-medium">₺</span>
                <input
                  type="number"
                  value={payAmount}
                  onChange={e => setPayAmount(e.target.value)}
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">ÖDEME YÖNTEMİ</label>
              <select
                value={payMethod}
                onChange={e => setPayMethod(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white focus:border-[#0D9488] focus:outline-none transition"
              >
                <option value="Nakit" className="bg-[#0B0F19]">Nakit</option>
                <option value="Kredi Kartı" className="bg-[#0B0F19]">Kredi Kartı</option>
                <option value="Havale" className="bg-[#0B0F19]">Havale</option>
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowPayment(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-[#1E293B] text-[#94A3B8] hover:text-white transition">İptal</button>
              <button onClick={handleAddPayment} className="flex-1 px-4 py-2.5 rounded-lg bg-[#0D9488] text-white font-medium hover:bg-[#0F766E] transition">Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
