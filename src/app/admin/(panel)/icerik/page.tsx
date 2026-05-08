'use client'

import { useEffect, useState } from 'react'

interface ContentBlock {
  id: string
  key: string
  value: string
  type: string
  role: string | null
  section: string | null
}

export default function IcerikPage() {
  const [blocks, setBlocks] = useState<ContentBlock[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/content')
      if (res.ok) setBlocks(await res.json())
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const startEdit = (b: ContentBlock) => { setEditingId(b.id); setEditValue(b.value) }
  const cancelEdit = () => { setEditingId(null); setEditValue('') }

  const save = async (id: string) => {
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/content/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: editValue }),
      })
      if (res.ok) {
        setBlocks(blocks.map((b) => (b.id === id ? { ...b, value: editValue } : b)))
        cancelEdit()
      }
    } finally { setSaving(false) }
  }

  const remove = async (id: string) => {
    if (!confirm('Bu içerik bloğunu silmek istiyor musunuz?')) return
    const res = await fetch(`/api/admin/content/${id}`, { method: 'DELETE' })
    if (res.ok) setBlocks(blocks.filter((b) => b.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-headline text-2xl font-semibold text-slate-900 mb-1">İçerik Blokları</h1>
          <p className="text-sm text-slate-500">Anasayfada görünen metin ve içerikleri buradan düzenleyin.</p>
        </div>
      </div>

      {loading ? (
        <p className="text-slate-500">Yükleniyor...</p>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-slate-600 text-xs uppercase tracking-wider">Anahtar</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 text-xs uppercase tracking-wider">Değer</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 text-xs uppercase tracking-wider w-32">Bölüm</th>
                <th className="text-right py-3 px-4 font-medium text-slate-600 text-xs uppercase tracking-wider w-40">Aksiyon</th>
              </tr>
            </thead>
            <tbody>
              {blocks.length === 0 ? (
                <tr><td colSpan={4} className="py-12 text-center text-slate-400">Henüz içerik bloğu yok.</td></tr>
              ) : blocks.map((b) => (
                <tr key={b.id} className="border-b border-slate-100 last:border-none">
                  <td className="py-3 px-4 font-mono text-xs text-slate-600 align-top">{b.key}</td>
                  <td className="py-3 px-4 align-top">
                    {editingId === b.id ? (
                      <textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-indigo-500"
                      />
                    ) : (
                      <div className="text-slate-900 whitespace-pre-wrap break-words max-w-md">{b.value}</div>
                    )}
                  </td>
                  <td className="py-3 px-4 align-top text-slate-500 text-xs">{b.section || '—'}</td>
                  <td className="py-3 px-4 align-top text-right">
                    {editingId === b.id ? (
                      <div className="flex gap-2 justify-end">
                        <button onClick={cancelEdit} disabled={saving} className="text-xs text-slate-500 hover:text-slate-700">İptal</button>
                        <button onClick={() => save(b.id)} disabled={saving} className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md">
                          {saving ? 'Kayıt...' : 'Kaydet'}
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => startEdit(b)} className="text-xs text-indigo-600 hover:text-indigo-700">Düzenle</button>
                        <button onClick={() => remove(b.id)} className="text-xs text-red-500 hover:text-red-700">Sil</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
