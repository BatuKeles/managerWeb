'use client'

import { useState } from 'react'
import { DemoTopBar } from './DemoTopBar'
import { useDemoStore } from '../store'
import { Search, AlertTriangle, Pencil, Trash2 } from 'lucide-react'

const categoryColors: Record<string, { bg: string; text: string }> = {
  Ekipman: { bg: 'bg-blue-500/15', text: 'text-blue-400' },
  Giyim: { bg: 'bg-purple-500/15', text: 'text-purple-400' },
  Aksesuar: { bg: 'bg-teal-500/15', text: 'text-teal-400' },
  Beslenme: { bg: 'bg-emerald-500/15', text: 'text-emerald-400' },
}

const categoryColorsExtended: Record<string, { bg: string; text: string }> = {
  ...categoryColors,
  'Kiyafet': { bg: 'bg-purple-500/15', text: 'text-purple-400' },
}

const allCategories = ['Tumu', 'Ekipman', 'Kiyafet', 'Aksesuar', 'Beslenme']
const addFormCategories = ['Ekipman', 'Kiyafet', 'Aksesuar', 'Beslenme']

const MAX_STOCK = 50

function mapToDisplay(stockItems: Array<{ id: string; name: string; category: string; stock: number; price: number; unit: string; lowStockThreshold: number; purchasePrice: number }>) {
  const overrides = [
    { name: 'Yuzme Gozlugu', category: 'Ekipman', stock: 25, price: 190, purchasePrice: 120, unit: 'Adet' },
    { name: 'Silikon Bone', category: 'Aksesuar', stock: 40, price: 60, purchasePrice: 30, unit: 'Adet' },
    { name: 'Yaris Mayosu', category: 'Kiyafet', stock: 3, price: 450, purchasePrice: 280, unit: 'Adet', lowStockThreshold: 5 },
    { name: 'Kisa Palet', category: 'Ekipman', stock: 18, price: 140, purchasePrice: 80, unit: 'Cift' },
    { name: 'Protein Bar', category: 'Beslenme', stock: 50, price: 30, purchasePrice: 18, unit: 'Adet' },
    { name: 'Havlu (70x140)', category: 'Aksesuar', stock: 0, price: 90, purchasePrice: 50, unit: 'Adet', lowStockThreshold: 5 },
  ]
  return stockItems.map((item, i) => {
    const override = overrides[i]
    if (!override) return item
    return {
      ...item,
      name: override.name,
      category: override.category,
      stock: item.stock !== stockItems[i]?.stock ? item.stock : override.stock,
      price: override.price,
      purchasePrice: override.purchasePrice,
      unit: override.unit,
      lowStockThreshold: override.lowStockThreshold ?? item.lowStockThreshold,
    }
  })
}

export default function StokDemo() {
  const stockItems = useDemoStore((s) => s.stockItems)
  const updateStock = useDemoStore((s) => s.updateStock)
  const addStockItem = useDemoStore((s) => s.addStockItem)
  const removeStockItem = useDemoStore((s) => s.removeStockItem)

  const [activeTab, setActiveTab] = useState<'Urunler' | 'Kategoriler'>('Urunler')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Tumu')
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [editQty, setEditQty] = useState(0)

  const [addForm, setAddForm] = useState({
    name: '', category: 'Ekipman', stock: 0, lowStockThreshold: 5, purchasePrice: 0, price: 0, unit: 'Adet',
  })

  const displayItems = mapToDisplay(stockItems as Array<{ id: string; name: string; category: string; stock: number; price: number; unit: string; lowStockThreshold: number; purchasePrice: number }>)

  const criticalCount = displayItems.filter(
    (item) => item.stock <= item.lowStockThreshold
  ).length

  const totalValue = displayItems.reduce((sum, item) => sum + item.price * item.stock, 0)

  const filtered = displayItems.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory = activeCategory === 'Tumu' || item.category === activeCategory
    return matchSearch && matchCategory
  })

  const formatPrice = (n: number) =>
    '\u20BA' + n.toLocaleString('tr-TR', { minimumFractionDigits: 0 })

  const handleAddItem = () => {
    if (!addForm.name) return
    addStockItem({
      id: `stock-${Date.now()}`,
      clubId: 'club-1',
      name: addForm.name,
      category: addForm.category,
      stock: addForm.stock,
      lowStockThreshold: addForm.lowStockThreshold,
      purchasePrice: addForm.purchasePrice,
      price: addForm.price,
      unit: addForm.unit,
    })
    setAddForm({ name: '', category: 'Ekipman', stock: 0, lowStockThreshold: 5, purchasePrice: 0, price: 0, unit: 'Adet' })
    setShowAddDialog(false)
  }

  const openEditDialog = (itemId: string) => {
    const item = displayItems.find((i) => i.id === itemId)
    if (item) {
      setEditQty(item.stock)
      setShowEditDialog(itemId)
    }
  }

  const handleUpdateStock = () => {
    if (showEditDialog) {
      updateStock(showEditDialog, editQty)
      setShowEditDialog(null)
    }
  }

  const handleDelete = (id: string) => {
    removeStockItem(id)
    setShowDeleteConfirm(null)
  }

  // Category summary for Kategoriler tab
  const categorySummary = allCategories.filter(c => c !== 'Tumu').map((cat) => {
    const items = displayItems.filter((i) => i.category === cat)
    const count = items.length
    const totalVal = items.reduce((sum, i) => sum + i.price * i.stock, 0)
    const colors = categoryColorsExtended[cat] || { bg: 'bg-gray-500/15', text: 'text-gray-400' }
    return { cat, count, totalVal, colors }
  })

  const editItem = showEditDialog ? displayItems.find((i) => i.id === showEditDialog) : null

  return (
    <div className="flex flex-col h-full">
      <DemoTopBar title="Stok" />

      <div className="flex-1 overflow-y-auto px-6 py-5">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-white/[0.06] mb-4">
          {(['Urunler', 'Kategoriler'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2.5 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? 'text-teal-400 border-teal-400'
                  : 'text-gray-500 border-transparent hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Urunler' ? (
          <>
            {/* Warning banner */}
            {criticalCount > 0 && (
              <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-2.5 mb-4">
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                <p className="text-sm text-amber-300">
                  {criticalCount} urun kritik stok seviyesinin altinda!
                </p>
              </div>
            )}

            {/* Search + Add */}
            <div className="flex gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Urun ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111827] border border-white/[0.06] text-white text-sm placeholder-gray-500 focus:outline-none focus:border-teal-500/40"
                />
              </div>
              <button
                onClick={() => setShowAddDialog(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 text-white text-sm font-medium hover:bg-teal-600 transition-colors shrink-0"
              >
                + Ekle
              </button>
            </div>

            {/* Stats badges */}
            <div className="flex items-center gap-3 mb-4 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-[#111827] border border-white/[0.06] text-gray-400">
                {displayItems.length} urun
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#111827] border border-white/[0.06] text-amber-400">
                {criticalCount} kritik
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#111827] border border-white/[0.06] text-gray-400">
                {formatPrice(totalValue)}
              </span>
            </div>

            {/* Filter pills */}
            <div className="flex gap-2 mb-5 flex-wrap">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-teal-500/20 text-teal-400 border border-teal-500/40'
                      : 'text-gray-400 border border-white/[0.06] hover:border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Stock stats summary cards */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="rounded-xl bg-[#111827] border border-white/[0.06] p-3 text-center">
                <p className="text-2xl font-bold text-white">{displayItems.length}</p>
                <p className="text-[10px] text-gray-500 uppercase">Toplam Urun</p>
              </div>
              <div className="rounded-xl bg-[#111827] border border-white/[0.06] p-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                  <p className="text-2xl font-bold text-amber-400">{criticalCount}</p>
                </div>
                <p className="text-[10px] text-gray-500 uppercase">Kritik Stok</p>
              </div>
              <div className="rounded-xl bg-[#111827] border border-white/[0.06] p-3 text-center">
                <p className="text-2xl font-bold text-white">{formatPrice(totalValue)}</p>
                <p className="text-[10px] text-gray-500 uppercase">Toplam Deger</p>
              </div>
            </div>

            {/* Stock item list */}
            <div className="space-y-3">
              {filtered.map((item) => {
                const isCritical = item.stock <= item.lowStockThreshold
                const isEmpty = item.stock === 0
                const barWidth = Math.min((item.stock / MAX_STOCK) * 100, 100)
                const colors = categoryColorsExtended[item.category] || { bg: 'bg-gray-500/15', text: 'text-gray-400' }

                return (
                  <div
                    key={item.id}
                    className="rounded-xl bg-[#111827] border border-white/[0.06] p-4 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {/* Name + category */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-white font-semibold text-sm">{item.name}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${colors.bg} ${colors.text}`}>
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {formatPrice(item.price)} &middot; {item.unit}
                        </p>
                      </div>

                      {/* Stock indicator */}
                      <div className="flex items-center gap-3 shrink-0">
                        {isEmpty ? (
                          <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-semibold">
                            Tukendi!
                          </span>
                        ) : (
                          <div
                            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                              isCritical
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-teal-500/20 text-teal-400'
                            }`}
                          >
                            {item.stock}
                          </div>
                        )}

                        {/* Actions */}
                        <button
                          onClick={() => openEditDialog(item.id)}
                          className="p-1 text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(item.id)}
                          className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-2.5 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isEmpty
                            ? 'bg-red-500'
                            : isCritical
                            ? 'bg-gradient-to-r from-amber-500 to-red-500'
                            : 'bg-gradient-to-r from-teal-500 to-emerald-400'
                        }`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          /* Kategoriler tab */
          <div className="space-y-4">
            {categorySummary.map(({ cat, count, totalVal, colors }) => (
              <div key={cat} className="rounded-xl bg-[#111827] border border-white/[0.06] p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>{cat}</span>
                    <span className="text-white font-semibold">{count} urun</span>
                  </div>
                  <span className="text-teal-400 font-semibold text-sm">{formatPrice(totalVal)}</span>
                </div>
              </div>
            ))}
            <div className="rounded-xl bg-[#111827] border border-[#0D9488]/30 p-5">
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">Toplam</span>
                <span className="text-[#D97706] font-bold text-lg">{formatPrice(totalValue)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Stock Item Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowAddDialog(false)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-4">Yeni Urun Ekle</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Urun Adi</label>
                <input type="text" value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-[#0D9488]/50" placeholder="Urun adi" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Kategori</label>
                <select value={addForm.category} onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-[#0D9488]/50">
                  {addFormCategories.map((c) => <option key={c} value={c} className="bg-[#111827]">{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Stok Adedi</label>
                  <input type="number" value={addForm.stock} onChange={(e) => setAddForm({ ...addForm, stock: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-[#0D9488]/50" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Kritik Seviye</label>
                  <input type="number" value={addForm.lowStockThreshold} onChange={(e) => setAddForm({ ...addForm, lowStockThreshold: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-[#0D9488]/50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Alis Fiyati (TL)</label>
                  <input type="number" value={addForm.purchasePrice} onChange={(e) => setAddForm({ ...addForm, purchasePrice: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-[#0D9488]/50" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Satis Fiyati (TL)</label>
                  <input type="number" value={addForm.price} onChange={(e) => setAddForm({ ...addForm, price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-[#0D9488]/50" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Birim</label>
                <input type="text" value={addForm.unit} onChange={(e) => setAddForm({ ...addForm, unit: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-[#0D9488]/50" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddDialog(false)}
                className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 text-sm font-medium hover:border-white/20 transition-colors">
                Iptal
              </button>
              <button onClick={handleAddItem}
                className="px-4 py-2 rounded-lg bg-[#0D9488] hover:bg-[#0D9488]/80 text-white text-sm font-medium transition-colors">
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Stock Quantity Dialog */}
      {showEditDialog && editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowEditDialog(null)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-sm mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-2">Stok Guncelle</h3>
            <p className="text-sm text-gray-400 mb-4">{editItem.name}</p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <button onClick={() => setEditQty(Math.max(0, editQty - 1))}
                className="h-10 w-10 rounded-full bg-white/[0.06] border border-white/[0.06] text-white text-lg font-bold hover:bg-white/10 transition-colors">
                -
              </button>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{editQty}</p>
                <p className="text-xs text-gray-500">{editItem.unit}</p>
              </div>
              <button onClick={() => setEditQty(editQty + 1)}
                className="h-10 w-10 rounded-full bg-white/[0.06] border border-white/[0.06] text-white text-lg font-bold hover:bg-white/10 transition-colors">
                +
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mb-4">
              Mevcut: {editItem.stock} &rarr; Yeni: {editQty}
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowEditDialog(null)}
                className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 text-sm font-medium hover:border-white/20 transition-colors">
                Iptal
              </button>
              <button onClick={handleUpdateStock}
                className="px-4 py-2 rounded-lg bg-[#0D9488] hover:bg-[#0D9488]/80 text-white text-sm font-medium transition-colors">
                Guncelle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(null)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-2">Urunu Sil</h3>
            <p className="text-sm text-gray-400 mb-6">
              Bu urunu silmek istediginizden emin misiniz?
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
