'use client'

import { useState } from 'react'
import { DemoTopBar } from './DemoTopBar'
import { useDemoStore } from '../store'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Download,
  Share2,
  Pencil,
  Trash2,
  Plus,
  Check,
  X,
} from 'lucide-react'

const categoryLabels: Record<string, { label: string; color: string }> = {
  coach: { label: 'Antrenor', color: 'bg-purple-500/10 text-purple-400' },
  pool: { label: 'Havuz', color: 'bg-blue-500/10 text-blue-400' },
  document: { label: 'Evrak', color: 'bg-yellow-500/10 text-yellow-400' },
  other: { label: 'Diger', color: 'bg-gray-500/10 text-gray-400' },
}

const filterCategories = [
  { key: 'all', label: 'Hepsi' },
  { key: 'coach', label: 'Antrenor' },
  { key: 'pool', label: 'Havuz' },
  { key: 'document', label: 'Evrak' },
  { key: 'other', label: 'Diger' },
]

const paymentMethods = ['Nakit', 'Kredi Karti', 'Havale', 'Cek']
const expenseCategories = ['coach', 'document', 'pool', 'other'] as const
const expenseCategoryLabels: Record<string, string> = {
  coach: 'Antrenor',
  document: 'Evrak',
  pool: 'Havuz Giderleri',
  other: 'Diger',
}

type FinansTab = 'ozet' | 'giderler' | 'gelirler'

export default function FinansDemo() {
  const payments = useDemoStore((s) => s.payments)
  const expenses = useDemoStore((s) => s.expenses)
  const members = useDemoStore((s) => s.members)
  const addPayment = useDemoStore((s) => s.addPayment)
  const removePayment = useDemoStore((s) => s.removePayment)
  const addExpense = useDemoStore((s) => s.addExpense)
  const removeExpense = useDemoStore((s) => s.removeExpense)

  const [activeTab, setActiveTab] = useState<FinansTab>('ozet')
  const [monthlyTarget, setMonthlyTarget] = useState(30000)
  const [editingTarget, setEditingTarget] = useState(false)
  const [targetDraft, setTargetDraft] = useState('30000')
  const [catFilter, setCatFilter] = useState('all')

  // Expense dialog
  const [showExpenseDialog, setShowExpenseDialog] = useState(false)
  const [expCat, setExpCat] = useState<string>('coach')
  const [expCustomCat, setExpCustomCat] = useState('')
  const [expAmount, setExpAmount] = useState('')
  const [expDate, setExpDate] = useState('')
  const [expDesc, setExpDesc] = useState('')

  // Payment dialog
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [payMemberId, setPayMemberId] = useState('')
  const [payAmount, setPayAmount] = useState('')
  const [payDate, setPayDate] = useState('')
  const [payMethod, setPayMethod] = useState('Nakit')
  const [payPeriod, setPayPeriod] = useState('')
  const [payDesc, setPayDesc] = useState('')

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'expense' | 'payment'; id: string } | null>(null)

  const totalIncome = payments.reduce((s, p) => s + p.amount, 0)
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0)
  const netProfit = totalIncome - totalExpense

  const summaryCards = [
    { label: 'Toplam Gelir', value: `₺${totalIncome.toLocaleString('tr-TR')}`, color: 'text-green-400', bg: 'bg-green-500/10', icon: TrendingUp },
    { label: 'Toplam Gider', value: `₺${totalExpense.toLocaleString('tr-TR')}`, color: 'text-red-400', bg: 'bg-red-500/10', icon: TrendingDown },
    { label: 'Net Kar', value: `₺${netProfit.toLocaleString('tr-TR')}`, color: 'text-cyan-400', bg: 'bg-cyan-500/10', icon: DollarSign },
  ]

  const filteredExpenses = catFilter === 'all' ? expenses : expenses.filter((e) => e.category === catFilter)

  const handleShareSummary = () => {
    const text = `Toplam Gelir: ₺${totalIncome.toLocaleString('tr-TR')}\nToplam Gider: ₺${totalExpense.toLocaleString('tr-TR')}\nNet Kar: ₺${netProfit.toLocaleString('tr-TR')}`
    navigator.clipboard.writeText(text)
  }

  const handleSaveExpense = () => {
    const amt = parseFloat(expAmount)
    if (!amt || !expDate) return
    addExpense({
      id: `exp-${Date.now()}`,
      clubId: 'club-1',
      category: expCat as 'coach' | 'document' | 'pool' | 'other',
      categoryCustom: expCat === 'other' ? expCustomCat : undefined,
      amount: amt,
      date: expDate,
      description: expDesc || undefined,
    })
    setShowExpenseDialog(false)
    setExpCat('coach')
    setExpCustomCat('')
    setExpAmount('')
    setExpDate('')
    setExpDesc('')
  }

  const handleSavePayment = () => {
    const amt = parseFloat(payAmount)
    if (!amt || !payDate || !payMemberId) return
    const member = members.find((m) => m.id === payMemberId)
    if (!member) return
    addPayment({
      id: `pay-${Date.now()}`,
      clubId: 'club-1',
      userId: member.userId,
      user: member.user,
      childId: member.childId,
      child: member.child,
      amount: amt,
      paymentDate: payDate,
      description: [payPeriod, payDesc].filter(Boolean).join(' - ') || undefined,
      paymentMethod: payMethod,
    })
    setShowPaymentDialog(false)
    setPayMemberId('')
    setPayAmount('')
    setPayDate('')
    setPayMethod('Nakit')
    setPayPeriod('')
    setPayDesc('')
  }

  const handleConfirmDelete = () => {
    if (!deleteTarget) return
    if (deleteTarget.type === 'expense') removeExpense(deleteTarget.id)
    else removePayment(deleteTarget.id)
    setDeleteTarget(null)
  }

  const tabs: { key: FinansTab; label: string }[] = [
    { key: 'ozet', label: 'Ozet' },
    { key: 'giderler', label: 'Giderler' },
    { key: 'gelirler', label: 'Gelirler' },
  ]

  return (
    <div className="flex flex-col h-full">
      <DemoTopBar title="Finans" />

      {/* Tab bar */}
      <div className="flex gap-2 px-6 pt-5 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-teal-500/20 text-teal-400 border border-teal-500/40'
                : 'text-gray-400 hover:text-gray-300 border border-white/[0.06] hover:border-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* ========== OZET TAB ========== */}
        {activeTab === 'ozet' && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {summaryCards.map((s) => (
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

            {/* Share + Monthly Target */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleShareSummary}
                className="flex items-center gap-2 rounded-lg border border-[#1E293B] px-4 py-2 text-sm font-medium text-[#9ca3af] hover:bg-white/[0.06] hover:text-white transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Ozeti Paylas
              </button>
            </div>

            {/* Monthly Target */}
            <div className="rounded-xl border border-[#1E293B] bg-[#111827] p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold">Aylik Hedef</h3>
                {!editingTarget ? (
                  <button
                    onClick={() => { setEditingTarget(true); setTargetDraft(String(monthlyTarget)) }}
                    className="flex items-center gap-1 text-sm text-[#0D9488] hover:text-teal-300 transition-colors"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Duzenle
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => { setMonthlyTarget(parseFloat(targetDraft) || monthlyTarget); setEditingTarget(false) }} className="text-green-400 hover:text-green-300"><Check className="h-4 w-4" /></button>
                    <button onClick={() => setEditingTarget(false)} className="text-red-400 hover:text-red-300"><X className="h-4 w-4" /></button>
                  </div>
                )}
              </div>
              {!editingTarget ? (
                <p className="text-2xl font-bold text-[#D97706]">₺{monthlyTarget.toLocaleString('tr-TR')}</p>
              ) : (
                <input
                  type="number"
                  value={targetDraft}
                  onChange={(e) => setTargetDraft(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition"
                />
              )}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-[#9ca3af] mb-1">
                  <span>Gerceklesen: ₺{totalIncome.toLocaleString('tr-TR')}</span>
                  <span>{Math.min(100, Math.round((totalIncome / monthlyTarget) * 100))}%</span>
                </div>
                <div className="h-2 bg-[#0B0F19] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0D9488] rounded-full transition-all"
                    style={{ width: `${Math.min(100, (totalIncome / monthlyTarget) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="flex justify-end">
              <button className="flex items-center gap-2 rounded-lg border border-[#1E293B] px-4 py-2 text-sm font-medium text-[#9ca3af] hover:bg-white/[0.06] hover:text-white transition-colors">
                <Download className="h-4 w-4" />
                Finans Raporu Indir
              </button>
            </div>
          </>
        )}

        {/* ========== GIDERLER TAB ========== */}
        {activeTab === 'giderler' && (
          <>
            {/* Category filter pills */}
            <div className="flex flex-wrap gap-2">
              {filterCategories.map((fc) => (
                <button
                  key={fc.key}
                  onClick={() => setCatFilter(fc.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    catFilter === fc.key
                      ? 'bg-teal-500/20 text-teal-400 border border-teal-500/40'
                      : 'text-gray-400 border border-[#1E293B] hover:border-white/10'
                  }`}
                >
                  {fc.label}
                </button>
              ))}
            </div>

            {/* Expense list */}
            <div className="rounded-xl border border-[#1E293B] bg-[#111827] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1E293B] text-left text-[#9ca3af]">
                      <th className="px-6 py-3 font-medium">Kategori</th>
                      <th className="px-6 py-3 font-medium">Tutar</th>
                      <th className="px-6 py-3 font-medium">Tarih</th>
                      <th className="px-6 py-3 font-medium">Aciklama</th>
                      <th className="px-6 py-3 font-medium">Islem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenses.map((e) => {
                      const cat = categoryLabels[e.category] ?? categoryLabels.other
                      return (
                        <tr key={e.id} className="border-b border-[#1E293B] last:border-0 hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-3">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cat.color}`}>
                              {cat.label}
                            </span>
                          </td>
                          <td className="px-6 py-3 font-semibold text-red-400">₺{e.amount.toLocaleString('tr-TR')}</td>
                          <td className="px-6 py-3 text-[#9ca3af]">{e.date}</td>
                          <td className="px-6 py-3 text-[#9ca3af]">{e.description}</td>
                          <td className="px-6 py-3">
                            <button onClick={() => setDeleteTarget({ type: 'expense', id: e.id })} className="text-red-400 hover:text-red-300 transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Floating add button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowExpenseDialog(true)}
                className="flex items-center gap-2 rounded-xl bg-[#0D9488] px-5 py-3 text-sm font-semibold text-white hover:bg-teal-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Gider Ekle
              </button>
            </div>
          </>
        )}

        {/* ========== GELIRLER TAB ========== */}
        {activeTab === 'gelirler' && (
          <>
            <div className="rounded-xl border border-[#1E293B] bg-[#111827] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1E293B] text-left text-[#9ca3af]">
                      <th className="px-6 py-3 font-medium">Uye</th>
                      <th className="px-6 py-3 font-medium">Tutar</th>
                      <th className="px-6 py-3 font-medium">Tarih</th>
                      <th className="px-6 py-3 font-medium">Yontem</th>
                      <th className="px-6 py-3 font-medium">Islem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => {
                      const name = p.child
                        ? `${p.child.firstName} ${p.child.lastName}`
                        : `${p.user.firstName} ${p.user.lastName}`
                      return (
                        <tr key={p.id} className="border-b border-[#1E293B] last:border-0 hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-3 text-[#f0f0ff]">{name}</td>
                          <td className="px-6 py-3 font-semibold text-green-400">₺{p.amount.toLocaleString('tr-TR')}</td>
                          <td className="px-6 py-3 text-[#9ca3af]">{p.paymentDate}</td>
                          <td className="px-6 py-3">
                            {p.paymentMethod && (
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                p.paymentMethod === 'Nakit' ? 'bg-emerald-500/10 text-emerald-400'
                                  : p.paymentMethod === 'Havale' ? 'bg-blue-500/10 text-blue-400'
                                  : 'bg-purple-500/10 text-purple-400'
                              }`}>
                                {p.paymentMethod}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-3">
                            <button onClick={() => setDeleteTarget({ type: 'payment', id: p.id })} className="text-red-400 hover:text-red-300 transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowPaymentDialog(true)}
                className="flex items-center gap-2 rounded-xl bg-[#0D9488] px-5 py-3 text-sm font-semibold text-white hover:bg-teal-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Gelir Ekle
              </button>
            </div>
          </>
        )}
      </div>

      {/* ========== EXPENSE DIALOG ========== */}
      {showExpenseDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowExpenseDialog(false)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-4">Yeni Gider</h3>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">KATEGORI</label>
              <select
                value={expCat}
                onChange={(e) => setExpCat(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white focus:border-[#0D9488] focus:outline-none transition"
              >
                {expenseCategories.map((c) => (
                  <option key={c} value={c}>{expenseCategoryLabels[c]}</option>
                ))}
              </select>
            </div>

            {expCat === 'other' && (
              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">OZEL KATEGORI</label>
                <input
                  type="text"
                  value={expCustomCat}
                  onChange={(e) => setExpCustomCat(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition"
                  placeholder="Kategori adi..."
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">TUTAR (₺)</label>
              <input
                type="number"
                value={expAmount}
                onChange={(e) => setExpAmount(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition"
                placeholder="0"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">TARIH</label>
              <input
                type="date"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white focus:border-[#0D9488] focus:outline-none transition"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">ACIKLAMA</label>
              <textarea
                value={expDesc}
                onChange={(e) => setExpDesc(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition resize-none"
                placeholder="Isteге bagli..."
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowExpenseDialog(false)} className="px-4 py-2 rounded-xl border border-[#1E293B] text-[#9ca3af] hover:text-white transition-colors">Iptal</button>
              <button onClick={handleSaveExpense} className="px-6 py-2 rounded-xl bg-[#0D9488] text-white font-semibold hover:bg-teal-600 transition-colors">Kaydet</button>
            </div>
          </div>
        </div>
      )}

      {/* ========== PAYMENT DIALOG ========== */}
      {showPaymentDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowPaymentDialog(false)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-4">Yeni Gelir</h3>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">UYE</label>
              <select
                value={payMemberId}
                onChange={(e) => setPayMemberId(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white focus:border-[#0D9488] focus:outline-none transition"
              >
                <option value="">Uye secin...</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.child ? `${m.child.firstName} ${m.child.lastName}` : `${m.user.firstName} ${m.user.lastName}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">TUTAR (₺)</label>
              <input
                type="number"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition"
                placeholder="0"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">ODEME TARIHI</label>
              <input
                type="date"
                value={payDate}
                onChange={(e) => setPayDate(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white focus:border-[#0D9488] focus:outline-none transition"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">ODEME YONTEMI</label>
              <select
                value={payMethod}
                onChange={(e) => setPayMethod(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white focus:border-[#0D9488] focus:outline-none transition"
              >
                {paymentMethods.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">DONEM ACIKLAMASI</label>
              <input
                type="text"
                value={payPeriod}
                onChange={(e) => setPayPeriod(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition"
                placeholder="orn. Mart 2026"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">ACIKLAMA</label>
              <textarea
                value={payDesc}
                onChange={(e) => setPayDesc(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition resize-none"
                placeholder="Istege bagli..."
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowPaymentDialog(false)} className="px-4 py-2 rounded-xl border border-[#1E293B] text-[#9ca3af] hover:text-white transition-colors">Iptal</button>
              <button onClick={handleSavePayment} className="px-6 py-2 rounded-xl bg-[#0D9488] text-white font-semibold hover:bg-teal-600 transition-colors">Kaydet</button>
            </div>
          </div>
        </div>
      )}

      {/* ========== DELETE CONFIRMATION DIALOG ========== */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setDeleteTarget(null)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-2">Silme Onаyi</h3>
            <p className="text-sm text-[#9ca3af] mb-5">Bu kaydi silmek istediginizden emin misiniz?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 rounded-xl border border-[#1E293B] text-[#9ca3af] hover:text-white transition-colors">Iptal</button>
              <button onClick={handleConfirmDelete} className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-500 transition-colors">Sil</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
