'use client'

import { useState, useRef, useEffect } from 'react'
import { DemoTopBar } from './DemoTopBar'
import { useDemoStore } from '../store'
import { Search, Package, TrendingUp, DollarSign, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react'

const iconColors = ['#6366f1', '#f59e0b', '#22d3ee', '#ef4444', '#10b981']

export default function PaketlerDemo() {
  const packages = useDemoStore((s) => s.packages)
  const togglePopular = useDemoStore((s) => s.togglePopular)
  const addPackage = useDemoStore((s) => s.addPackage)
  const removePackage = useDemoStore((s) => s.removePackage)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editPkgId, setEditPkgId] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({
    name: '',
    durationDays: 30,
    lessonCount: 8,
    price: 0,
    isPopular: false,
  })

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const sorted = [...packages].sort((a, b) => a.sortOrder - b.sortOrder)
  const filtered = sorted.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatPrice = (n: number) =>
    '\u20BA' + n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const handleSave = () => {
    if (!form.name) return
    addPackage({
      id: `pkg-${Date.now()}`,
      clubId: 'club-1',
      name: form.name,
      durationDays: form.durationDays,
      lessonCount: form.lessonCount,
      price: form.price,
      isPopular: form.isPopular,
      sortOrder: packages.length + 1,
    })
    setForm({ name: '', durationDays: 30, lessonCount: 8, price: 0, isPopular: false })
    setShowAddDialog(false)
  }

  const handleEdit = (pkgId: string) => {
    const pkg = packages.find((p) => p.id === pkgId)
    if (pkg) {
      setForm({
        name: pkg.name,
        durationDays: pkg.durationDays,
        lessonCount: pkg.lessonCount,
        price: pkg.price,
        isPopular: pkg.isPopular ?? false,
      })
      setEditPkgId(pkgId)
      setShowAddDialog(true)
    }
    setOpenMenu(null)
  }

  const handleDelete = (id: string) => {
    removePackage(id)
    setShowDeleteConfirm(null)
  }

  return (
    <div className="flex flex-col h-full">
      <DemoTopBar
        title="Paketler"
        actions={
          <button
            onClick={() => {
              setForm({ name: '', durationDays: 30, lessonCount: 8, price: 0, isPopular: false })
              setEditPkgId(null)
              setShowAddDialog(true)
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-500 text-white text-sm font-medium hover:bg-teal-600 transition-colors"
          >
            + Yeni Paket
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-6 py-5">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Paketlerde ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111827] border border-white/[0.06] text-white text-sm placeholder-gray-500 focus:outline-none focus:border-teal-500/40"
          />
        </div>

        {/* Sub info */}
        <p className="text-xs text-gray-500 mb-4">
          {sorted.length} paket &middot; {formatPrice(500)} - {formatPrice(12000)}
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl bg-[#111827] border border-white/[0.06] p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10">
                <Package className="h-4 w-4 text-indigo-400" />
              </div>
            </div>
            <p className="text-[11px] text-gray-500 uppercase tracking-wider">Paket Sayisi</p>
            <p className="text-2xl font-bold text-white mt-0.5">{sorted.length}</p>
          </div>

          <div className="rounded-xl bg-[#111827] border border-white/[0.06] p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10">
                <TrendingUp className="h-4 w-4 text-teal-400" />
              </div>
            </div>
            <p className="text-[11px] text-gray-500 uppercase tracking-wider">Aktif Satis</p>
            <p className="text-2xl font-bold text-white mt-0.5">&mdash;</p>
          </div>

          <div className="rounded-xl bg-[#111827] border border-white/[0.06] p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                <DollarSign className="h-4 w-4 text-emerald-400" />
              </div>
            </div>
            <p className="text-[11px] text-gray-500 uppercase tracking-wider">Aylik Toplam Satis</p>
            <p className="text-2xl font-bold text-white mt-0.5">{formatPrice(25200)}</p>
          </div>
        </div>

        {/* Section header */}
        <div className="mb-4">
          <h2 className="text-white font-semibold text-base">Aktif Uyelik Paketleri</h2>
          <p className="text-sm text-gray-500">Kulubunuzdeki mevcut tum paket yapilandirmalari</p>
        </div>

        {/* Package list */}
        <div className="space-y-3">
          {filtered.map((pkg, i) => (
            <div
              key={pkg.id}
              className="flex items-center gap-4 rounded-xl bg-[#111827] border border-white/[0.06] p-4 hover:border-white/10 transition-colors"
            >
              {/* Icon */}
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: iconColors[i % iconColors.length] + '20', color: iconColors[i % iconColors.length] }}
              >
                <Package className="h-5 w-5" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-sm">{pkg.name}</span>
                  {pkg.isPopular && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-teal-500/20 text-teal-400 border border-teal-500/30">
                      Populer
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span>&#9675; {pkg.durationDays} Gun</span>
                  <span>&#9675; {pkg.lessonCount} Ders</span>
                </div>
              </div>

              {/* Price */}
              <div className="text-right shrink-0">
                <p className="text-teal-400 font-semibold text-sm">{formatPrice(pkg.price)}</p>
                <p className="text-[10px] text-gray-500 uppercase">KDV Dahil</p>
              </div>

              {/* Kebab menu */}
              <div className="relative" ref={openMenu === pkg.id ? menuRef : undefined}>
                <button
                  onClick={() => setOpenMenu(openMenu === pkg.id ? null : pkg.id)}
                  className="p-1 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
                {openMenu === pkg.id && (
                  <div className="absolute right-0 top-8 z-40 w-36 rounded-lg bg-[#1E293B] border border-white/10 shadow-xl py-1">
                    <button
                      onClick={() => handleEdit(pkg.id)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors"
                    >
                      Duzenle
                    </button>
                    <button
                      onClick={() => { setShowDeleteConfirm(pkg.id); setOpenMenu(null) }}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors"
                    >
                      Sil
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pb-4">
          <p className="text-sm text-gray-500">Toplam {filtered.length} paket</p>
          <div className="flex items-center gap-2">
            <button className="p-1 text-gray-500 hover:text-gray-300 transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-400">1/1</span>
            <button className="p-1 text-gray-500 hover:text-gray-300 transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Package Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => { setShowAddDialog(false); setEditPkgId(null) }}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-4">{editPkgId ? 'Paketi Duzenle' : 'Yeni Paket Olustur'}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Paket Adi</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-[#0D9488]/50" placeholder="Paket adi" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Sure (gun)</label>
                  <input type="number" value={form.durationDays} onChange={(e) => setForm({ ...form, durationDays: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-[#0D9488]/50" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Ders Sayisi</label>
                  <input type="number" value={form.lessonCount} onChange={(e) => setForm({ ...form, lessonCount: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-[#0D9488]/50" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Fiyat (TL)</label>
                <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-[#0D9488]/50" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Populer</span>
                <button
                  onClick={() => setForm({ ...form, isPopular: !form.isPopular })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.isPopular ? 'bg-[#0D9488]' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${form.isPopular ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => { setShowAddDialog(false); setEditPkgId(null) }}
                className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 text-sm font-medium hover:border-white/20 transition-colors">
                Iptal
              </button>
              <button onClick={() => { if (!editPkgId) handleSave(); else { setShowAddDialog(false); setEditPkgId(null) } }}
                className="px-4 py-2 rounded-lg bg-[#0D9488] hover:bg-[#0D9488]/80 text-white text-sm font-medium transition-colors">
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(null)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-2">Paketi Sil</h3>
            <p className="text-sm text-gray-400 mb-6">
              Bu paketi silmek istediginizden emin misiniz? Bu islem geri alinamaz.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 text-sm font-medium hover:border-white/20 transition-colors">
                Iptal
              </button>
              <button onClick={() => handleDelete(showDeleteConfirm)}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors">
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
