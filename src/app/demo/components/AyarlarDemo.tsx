'use client'

import { useState } from 'react'
import { DemoTopBar } from './DemoTopBar'
import { useDemoStore } from '../store'
import { AlertTriangle } from 'lucide-react'
import type { NotificationSettings } from '../data/settings'

const notifSettingLabels: { key: keyof NotificationSettings; label: string }[] = [
  { key: 'newEnrollment', label: 'Yeni kayit bildirimi' },
  { key: 'paymentReceived', label: 'Odeme hatirlatmasi' },
  { key: 'makeupRequest', label: 'Telafi talebi' },
  { key: 'cancellationRequest', label: 'Iptal talebi' },
  { key: 'lowStock', label: 'Dusuk stok uyarisi' },
  { key: 'coachInvitation', label: 'Antrenor guncellemesi' },
  { key: 'weeklyReport', label: 'Haftalik rapor' },
]

export default function AyarlarDemo() {
  const club = useDemoStore((s) => s.club)
  const notificationSettings = useDemoStore((s) => s.notificationSettings)
  const toggleNotificationSetting = useDemoStore((s) => s.toggleNotificationSetting)
  const updateClubInfo = useDemoStore((s) => s.updateClubInfo)
  const resetDemo = useDemoStore((s) => s.resetDemo)

  const [isEditing, setIsEditing] = useState(false)
  const [editValues, setEditValues] = useState({
    name: club.name,
    city: club.city,
    district: club.district,
    phone: club.phone,
    ownerName: club.ownerName,
  })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const smsUsed = club.messagesSentThisMonth ?? 47
  const smsLimit = club.monthlyMessageLimit ?? 500
  const smsRemaining = smsLimit - smsUsed
  const smsPercent = (smsUsed / smsLimit) * 100

  const clubFields: { label: string; key: keyof typeof editValues }[] = [
    { label: 'Kulup Adi', key: 'name' },
    { label: 'Sehir', key: 'city' },
    { label: 'Ilce', key: 'district' },
    { label: 'Telefon', key: 'phone' },
    { label: 'Sahip', key: 'ownerName' },
  ]

  const handleSave = () => {
    updateClubInfo(editValues)
    setIsEditing(false)
  }

  const handleStartEdit = () => {
    setEditValues({
      name: club.name,
      city: club.city,
      district: club.district,
      phone: club.phone,
      ownerName: club.ownerName,
    })
    setIsEditing(true)
  }

  const handleDeleteClub = () => {
    resetDemo()
    setShowDeleteConfirm(false)
  }

  return (
    <div className="flex flex-col h-full">
      <DemoTopBar title="Ayarlar" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Kulup Bilgileri */}
        <div className="rounded-xl border border-white/[0.06] bg-[#111827] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#f0f0ff]">Kulup Bilgileri</h2>
            {!isEditing ? (
              <button
                onClick={handleStartEdit}
                className="px-3 py-1.5 rounded-lg border border-white/10 text-gray-300 text-xs font-medium hover:border-[#0D9488]/50 hover:text-white transition-colors"
              >
                Duzenle
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-gray-300 text-xs font-medium hover:border-white/20 transition-colors"
                >
                  Iptal
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1.5 rounded-lg bg-[#0D9488] hover:bg-[#0D9488]/80 text-white text-xs font-medium transition-colors"
                >
                  Kaydet
                </button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {clubFields.map((f) => (
              <div key={f.key}>
                <label className="block text-xs text-[#9ca3af] mb-1">{f.label}</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editValues[f.key]}
                    onChange={(e) => setEditValues({ ...editValues, [f.key]: e.target.value })}
                    className="w-full rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-[#f0f0ff] focus:outline-none focus:border-[#0D9488]/50"
                  />
                ) : (
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-[#f0f0ff]">
                    {club[f.key as keyof typeof club]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bildirim Ayarlari */}
        <div className="rounded-xl border border-white/[0.06] bg-[#111827] p-6">
          <h2 className="text-base font-semibold text-[#f0f0ff] mb-4">Bildirim Ayarlari</h2>
          <div className="space-y-4">
            {notifSettingLabels.map((ns) => (
              <div key={ns.key} className="flex items-center justify-between">
                <span className="text-sm text-[#f0f0ff]">{ns.label}</span>
                <button
                  onClick={() => toggleNotificationSetting(ns.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings[ns.key] ? 'bg-cyan-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                      notificationSettings[ns.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Mesaj Limitleri */}
        <div className="rounded-xl border border-white/[0.06] bg-[#111827] p-6">
          <h2 className="text-base font-semibold text-[#f0f0ff] mb-4">Mesaj Limitleri</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-xs text-[#9ca3af]">Aylik SMS limiti</p>
              <p className="text-lg font-bold text-[#f0f0ff]">{smsLimit}</p>
            </div>
            <div>
              <p className="text-xs text-[#9ca3af]">Kullanilan</p>
              <p className="text-lg font-bold text-cyan-400">{smsUsed}</p>
            </div>
            <div>
              <p className="text-xs text-[#9ca3af]">Kalan</p>
              <p className="text-lg font-bold text-green-400">{smsRemaining}</p>
            </div>
          </div>
          <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full bg-cyan-500 transition-all"
              style={{ width: `${smsPercent}%` }}
            />
          </div>
          <p className="text-xs text-[#9ca3af] mt-2">{smsUsed} / {smsLimit} kullanildi</p>
        </div>

        {/* Tehlikeli Bolge */}
        <div className="rounded-xl border border-red-500/30 bg-[#111827] p-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <h2 className="text-base font-semibold text-red-400">Tehlikeli Bolge</h2>
          </div>
          <p className="text-sm text-[#9ca3af] mb-4">
            Bu islem geri alinamaz. Kulubunuzu sildiginizde tum verileriniz kalici olarak silinecektir.
          </p>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="rounded-lg border border-red-500/40 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            Kulubu Sil
          </button>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pb-4">
          <button className="rounded-lg bg-cyan-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-cyan-500 transition-colors">
            Degisiklikleri Kaydet
          </button>
        </div>
      </div>

      {/* Delete Club Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <h3 className="text-lg font-semibold text-red-400">Kulubu Sil</h3>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Bu islem geri alinamaz. Demo verileriniz sifirlanacaktir.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 text-sm font-medium hover:border-white/20 transition-colors"
              >
                Iptal
              </button>
              <button
                onClick={handleDeleteClub}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
