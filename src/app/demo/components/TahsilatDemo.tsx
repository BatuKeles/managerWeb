'use client'

import { useState } from 'react'
import { DemoTopBar } from './DemoTopBar'
import { useDemoStore } from '../store'
import { Plus, Banknote, Clock, AlertTriangle, TrendingUp, Search } from 'lucide-react'

const paymentMethods = ['Nakit', 'Kredi Karti', 'Havale', 'Cek']

export default function TahsilatDemo() {
  const payments = useDemoStore((s) => s.payments)
  const dashboardStats = useDemoStore((s) => s.dashboardStats)
  const addPayment = useDemoStore((s) => s.addPayment)
  const members = useDemoStore((s) => s.members)

  const [filterTab, setFilterTab] = useState<'unpaid' | 'paid'>('unpaid')
  const [search, setSearch] = useState('')

  // Collection dialog
  const [showCollectDialog, setShowCollectDialog] = useState(false)
  const [collectUser, setCollectUser] = useState<{ name: string; user: typeof dashboardStats.overduePayments[0]['user']; child?: typeof dashboardStats.overduePayments[0]['child']; amount: number } | null>(null)
  const [collectAmount, setCollectAmount] = useState('')
  const [collectMethod, setCollectMethod] = useState('Nakit')
  const [collectDesc, setCollectDesc] = useState('')

  const stats = [
    { label: 'Bu Ay Toplam', value: `₺${payments.reduce((s, p) => s + p.amount, 0).toLocaleString('tr-TR')}`, color: 'text-green-400', bg: 'bg-green-500/10', icon: Banknote },
    { label: 'Bekleyen', value: `₺${dashboardStats.overduePayments.reduce((s, o) => s + o.amount, 0).toLocaleString('tr-TR')}`, color: 'text-orange-400', bg: 'bg-orange-500/10', icon: Clock },
    { label: 'Geciken', value: `${dashboardStats.overduePayments.length} kisi`, color: 'text-red-400', bg: 'bg-red-500/10', icon: AlertTriangle },
    { label: 'Tahsilat Orani', value: `%${dashboardStats.collectionRate}`, color: 'text-cyan-400', bg: 'bg-cyan-500/10', icon: TrendingUp },
  ]

  const overdueFiltered = dashboardStats.overduePayments.filter((op) => {
    const name = op.child
      ? `${op.child.firstName} ${op.child.lastName}`
      : `${op.user.firstName} ${op.user.lastName}`
    return name.toLowerCase().includes(search.toLowerCase())
  })

  const paidFiltered = payments.filter((p) => {
    const name = p.child
      ? `${p.child.firstName} ${p.child.lastName}`
      : `${p.user.firstName} ${p.user.lastName}`
    return name.toLowerCase().includes(search.toLowerCase())
  })

  const openCollectDialog = (op: typeof dashboardStats.overduePayments[0]) => {
    const name = op.child
      ? `${op.child.firstName} ${op.child.lastName}`
      : `${op.user.firstName} ${op.user.lastName}`
    setCollectUser({ name, user: op.user, child: op.child, amount: op.amount })
    setCollectAmount(String(op.amount))
    setCollectMethod('Nakit')
    setCollectDesc('')
    setShowCollectDialog(true)
  }

  const handleCollect = () => {
    if (!collectUser) return
    const amt = parseFloat(collectAmount)
    if (!amt) return
    addPayment({
      id: `pay-${Date.now()}`,
      clubId: 'club-1',
      userId: collectUser.user.id,
      user: collectUser.user,
      childId: collectUser.child?.id,
      child: collectUser.child,
      amount: amt,
      paymentDate: new Date().toISOString().slice(0, 10),
      description: collectDesc || `Tahsilat - ${collectUser.name}`,
      paymentMethod: collectMethod,
    })
    setShowCollectDialog(false)
    setCollectUser(null)
  }

  return (
    <div className="flex flex-col h-full">
      <DemoTopBar
        title="Tahsilat"
        actions={
          <button
            onClick={() => setFilterTab('unpaid')}
            className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Tahsilat Yap
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-[#1E293B] bg-[#111827] p-5">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.bg}`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-sm text-[#9ca3af]">{s.label}</p>
                  <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter tabs + Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setFilterTab('unpaid')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterTab === 'unpaid'
                  ? 'bg-teal-500/20 text-teal-400 border border-teal-500/40'
                  : 'text-gray-400 border border-[#1E293B] hover:border-white/10'
              }`}
            >
              Odenmemis ({dashboardStats.overduePayments.length})
            </button>
            <button
              onClick={() => setFilterTab('paid')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterTab === 'paid'
                  ? 'bg-teal-500/20 text-teal-400 border border-teal-500/40'
                  : 'text-gray-400 border border-[#1E293B] hover:border-white/10'
              }`}
            >
              Tahsil Edilenler ({payments.length})
            </button>
          </div>

          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition text-sm"
              placeholder="Uye ara..."
            />
          </div>
        </div>

        {/* Unpaid tab */}
        {filterTab === 'unpaid' && (
          <div className="rounded-xl border border-[#1E293B] bg-[#111827] p-6">
            <h2 className="text-base font-semibold text-[#f0f0ff] mb-4">Borclu Uyeler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {overdueFiltered.map((op, i) => {
                const name = op.child
                  ? `${op.child.firstName} ${op.child.lastName}`
                  : `${op.user.firstName} ${op.user.lastName}`
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#f0f0ff]">{name}</p>
                      <p className="text-xs text-[#9ca3af]">Son odeme: {op.dueDate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-red-400">
                        ₺{op.amount.toLocaleString('tr-TR')}
                      </span>
                      <button
                        onClick={() => openCollectDialog(op)}
                        className="px-3 py-1.5 rounded-lg bg-[#0D9488] text-white text-xs font-semibold hover:bg-teal-600 transition-colors"
                      >
                        Tahsilat Yap
                      </button>
                    </div>
                  </div>
                )
              })}
              {overdueFiltered.length === 0 && (
                <p className="text-sm text-[#9ca3af] col-span-2 text-center py-4">Sonuc bulunamadi.</p>
              )}
            </div>
          </div>
        )}

        {/* Paid tab */}
        {filterTab === 'paid' && (
          <div className="rounded-xl border border-[#1E293B] bg-[#111827] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#1E293B]">
              <h2 className="text-base font-semibold text-[#f0f0ff]">Tahsil Edilen Odemeler</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1E293B] text-left text-[#9ca3af]">
                    <th className="px-6 py-3 font-medium">Uye</th>
                    <th className="px-6 py-3 font-medium">Tutar</th>
                    <th className="px-6 py-3 font-medium">Odeme Tarihi</th>
                    <th className="px-6 py-3 font-medium">Aciklama</th>
                    <th className="px-6 py-3 font-medium">Yontem</th>
                  </tr>
                </thead>
                <tbody>
                  {paidFiltered.map((p) => {
                    const displayName = p.child
                      ? `${p.child.firstName} ${p.child.lastName}`
                      : `${p.user.firstName} ${p.user.lastName}`
                    const initials = displayName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                    return (
                      <tr key={p.id} className="border-b border-[#1E293B] last:border-0 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600/30 text-xs font-semibold text-indigo-300">
                              {initials}
                            </div>
                            <span className="text-[#f0f0ff]">{displayName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3 font-semibold text-green-400">₺{p.amount.toLocaleString('tr-TR')}</td>
                        <td className="px-6 py-3 text-[#9ca3af]">{p.paymentDate}</td>
                        <td className="px-6 py-3 text-[#9ca3af]">{p.description}</td>
                        <td className="px-6 py-3">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            p.paymentMethod === 'Nakit' ? 'bg-emerald-500/10 text-emerald-400'
                              : p.paymentMethod === 'Havale' ? 'bg-blue-500/10 text-blue-400'
                              : 'bg-purple-500/10 text-purple-400'
                          }`}>
                            {p.paymentMethod}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {paidFiltered.length === 0 && (
              <p className="text-sm text-[#9ca3af] text-center py-6">Sonuc bulunamadi.</p>
            )}
          </div>
        )}
      </div>

      {/* ========== COLLECTION DIALOG ========== */}
      {showCollectDialog && collectUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowCollectDialog(false)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-4">Tahsilat Yap</h3>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">UYE</label>
              <input
                type="text"
                value={collectUser.name}
                readOnly
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white/60 focus:outline-none cursor-not-allowed"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">TUTAR (₺)</label>
              <input
                type="number"
                value={collectAmount}
                onChange={(e) => setCollectAmount(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">ODEME YONTEMI</label>
              <select
                value={collectMethod}
                onChange={(e) => setCollectMethod(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white focus:border-[#0D9488] focus:outline-none transition"
              >
                {paymentMethods.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">ACIKLAMA</label>
              <textarea
                value={collectDesc}
                onChange={(e) => setCollectDesc(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition resize-none"
                placeholder="Istege bagli..."
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowCollectDialog(false)} className="px-4 py-2 rounded-xl border border-[#1E293B] text-[#9ca3af] hover:text-white transition-colors">Iptal</button>
              <button onClick={handleCollect} className="px-6 py-2 rounded-xl bg-[#0D9488] text-white font-semibold hover:bg-teal-600 transition-colors">Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
