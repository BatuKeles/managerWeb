'use client'

import { useEffect, useState } from 'react'

interface Package {
  id: string
  name: string
  type: string
  price: string | number
  features: unknown
  isActive: boolean
  sortOrder: number
}

export default function PaketlerPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Partial<Package> & { featuresText?: string }>({})
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/packages')
      if (res.ok) setPackages(await res.json())
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const featuresAsText = (f: unknown): string => Array.isArray(f) ? f.join('\n') : ''
  const textToFeatures = (s: string): string[] => s.split('\n').map(x => x.trim()).filter(Boolean)

  const startEdit = (p: Package) => {
    setEditingId(p.id)
    setDraft({ ...p, featuresText: featuresAsText(p.features) })
  }
  const cancelEdit = () => { setEditingId(null); setDraft({}) }

  const save = async (id: string) => {
    setSaving(true)
    try {
      const body = {
        name: draft.name,
        type: draft.type,
        price: draft.price,
        features: textToFeatures(draft.featuresText || ''),
        isActive: draft.isActive,
        sortOrder: draft.sortOrder,
      }
      const res = await fetch(`/api/admin/packages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) { await load(); cancelEdit() }
    } finally { setSaving(false) }
  }

  const toggleActive = async (p: Package) => {
    const res = await fetch(`/api/admin/packages/${p.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !p.isActive }),
    })
    if (res.ok) setPackages(packages.map((x) => (x.id === p.id ? { ...x, isActive: !p.isActive } : x)))
  }

  const remove = async (id: string) => {
    if (!confirm('Bu paketi silmek istiyor musunuz?')) return
    const res = await fetch(`/api/admin/packages/${id}`, { method: 'DELETE' })
    if (res.ok) setPackages(packages.filter((p) => p.id !== id))
  }

  return (
    <div>
      <h1 className="font-headline text-2xl font-semibold text-slate-900 mb-1">Paketler</h1>
      <p className="text-sm text-slate-500 mb-8">Anasayfada gösterilen fiyatlandırma paketleri.</p>

      {loading ? (
        <p className="text-slate-500">Yükleniyor...</p>
      ) : (
        <div className="space-y-4">
          {packages.length === 0 && (
            <div className="text-center py-16 text-slate-400 bg-white border border-slate-200 rounded-xl">Henüz paket yok.</div>
          )}
          {packages.map((p) => (
            <div key={p.id} className="bg-white border border-slate-200 rounded-xl p-6">
              {editingId === p.id ? (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Ad">
                      <input
                        type="text"
                        value={draft.name as string || ''}
                        onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-indigo-500"
                      />
                    </Field>
                    <Field label="Tip (aylik / senlik)">
                      <input
                        type="text"
                        value={draft.type as string || ''}
                        onChange={(e) => setDraft({ ...draft, type: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-indigo-500"
                      />
                    </Field>
                    <Field label="Fiyat (₺)">
                      <input
                        type="number"
                        step="0.01"
                        value={String(draft.price ?? '')}
                        onChange={(e) => setDraft({ ...draft, price: e.target.value as unknown as string })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-indigo-500"
                      />
                    </Field>
                    <Field label="Sıralama">
                      <input
                        type="number"
                        value={String(draft.sortOrder ?? 0)}
                        onChange={(e) => setDraft({ ...draft, sortOrder: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-indigo-500"
                      />
                    </Field>
                  </div>
                  <Field label="Özellikler (her satır bir özellik)">
                    <textarea
                      rows={6}
                      value={draft.featuresText || ''}
                      onChange={(e) => setDraft({ ...draft, featuresText: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-indigo-500 font-mono text-sm"
                    />
                  </Field>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={!!draft.isActive}
                      onChange={(e) => setDraft({ ...draft, isActive: e.target.checked })}
                    />
                    Aktif
                  </label>
                  <div className="flex gap-2 justify-end pt-2">
                    <button onClick={cancelEdit} className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900">İptal</button>
                    <button onClick={() => save(p.id)} disabled={saving} className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                      {saving ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900 text-lg">{p.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${p.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {p.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                      <span className="text-xs text-slate-500">{p.type}</span>
                    </div>
                    <div className="text-2xl font-headline font-semibold text-slate-900 mb-3">
                      ₺{Number(p.price).toLocaleString('tr-TR')}
                      <span className="text-sm font-normal text-slate-500">/{p.type === 'aylik' ? 'ay' : 'şenlik'}</span>
                    </div>
                    {Array.isArray(p.features) && (
                      <ul className="text-sm text-slate-600 space-y-1">
                        {(p.features as string[]).map((f, i) => <li key={i}>• {f}</li>)}
                      </ul>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => startEdit(p)} className="text-xs text-indigo-600 hover:text-indigo-700">Düzenle</button>
                    <button onClick={() => toggleActive(p)} className="text-xs text-slate-600 hover:text-slate-900">{p.isActive ? 'Pasifleştir' : 'Aktifleştir'}</button>
                    <button onClick={() => remove(p.id)} className="text-xs text-red-500 hover:text-red-700">Sil</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1.5 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}
