'use client'

import { useState } from 'react'
import { Eye, Pencil, Trash2, Search, UserPlus, X, Check } from 'lucide-react'
import { useDemoStore } from '../store'
import { DemoTopBar } from './DemoTopBar'

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0]}${lastName[0]}`.toUpperCase()
}

function formatPhone(phone: string) {
  const digits = phone.replace('+90', '0')
  if (digits.length === 11) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9)}`
  }
  return phone
}

const avatarColors = [
  'bg-emerald-600',
  'bg-cyan-600',
  'bg-indigo-600',
  'bg-amber-600',
  'bg-rose-600',
  'bg-purple-600',
  'bg-teal-600',
]

function getAvatarColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return avatarColors[Math.abs(hash) % avatarColors.length]
}

type StatusFilter = 'all' | 'active' | 'passive' | 'pending'

export default function UyelerDemo() {
  const members = useDemoStore((s) => s.members)
  const enrollments = useDemoStore((s) => s.enrollments)
  const addMember = useDemoStore((s) => s.addMember)
  const removeMember = useDemoStore((s) => s.removeMember)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  // Add member dialog
  const [showAddMember, setShowAddMember] = useState(false)
  const [newName, setNewName] = useState('')
  const [newSurname, setNewSurname] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [addSuccess, setAddSuccess] = useState(false)

  // Detail modal
  const [detailMemberId, setDetailMemberId] = useState<string | null>(null)

  // Delete confirmation
  const [deleteMemberId, setDeleteMemberId] = useState<string | null>(null)

  function getSessionForMember(userId: string, childId?: string) {
    const enrollment = enrollments.find(
      (e) =>
        e.userId === userId &&
        (childId ? e.childId === childId : true) &&
        e.status !== 'cancelled'
    )
    return enrollment?.session?.title ?? '—'
  }

  function getPaymentStatus(userId: string, childId?: string) {
    const enrollment = enrollments.find(
      (e) =>
        e.userId === userId &&
        (childId ? e.childId === childId : true) &&
        e.status !== 'cancelled'
    )
    return enrollment?.paymentStatus ?? 'unpaid'
  }

  const totalMembers = members.length
  const activeMembers = members.filter((m) => m.status === 'active').length
  const pendingMembers = members.filter((m) => m.status === 'pending').length

  const filtered = members.filter((m) => {
    const displayName = m.child
      ? `${m.child.firstName} ${m.child.lastName}`
      : `${m.user.firstName} ${m.user.lastName}`
    const matchesSearch = displayName.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = statusFilter === 'all' || m.status === statusFilter
    return matchesSearch && matchesFilter
  })

  const handleAddMember = () => {
    if (!newName.trim() || !newSurname.trim()) return
    addMember(newName.trim(), newSurname.trim(), newPhone.trim())
    setNewName('')
    setNewSurname('')
    setNewPhone('')
    setShowAddMember(false)
    setAddSuccess(true)
    setTimeout(() => setAddSuccess(false), 2500)
  }

  const handleDelete = () => {
    if (!deleteMemberId) return
    removeMember(deleteMemberId)
    setDeleteMemberId(null)
  }

  const detailMember = detailMemberId ? members.find((m) => m.id === detailMemberId) : null

  const filterChips: { key: StatusFilter; label: string }[] = [
    { key: 'all', label: 'Hepsi' },
    { key: 'active', label: 'Aktif' },
    { key: 'passive', label: 'Pasif' },
    { key: 'pending', label: 'Bekliyor' },
  ]

  return (
    <div className="flex flex-col h-full">
      <DemoTopBar
        title="Üyeler"
        actions={
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Üye ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-56 rounded-lg bg-white/[0.06] border border-white/[0.06] pl-9 pr-3 text-sm text-white placeholder-gray-500 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-colors"
              />
            </div>
            <button
              onClick={() => setShowAddMember(true)}
              className="flex items-center gap-2 h-9 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              Yeni Üye
            </button>
          </div>
        }
      />

      {/* Success toast */}
      {addSuccess && (
        <div className="fixed top-6 right-6 z-[60] flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg animate-pulse">
          <Check className="h-4 w-4" />
          Üye başarıyla eklendi
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#111827] border border-white/[0.06] rounded-xl px-5 py-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Toplam Üye</p>
            <p className="text-2xl font-bold text-white mt-1">{totalMembers}</p>
          </div>
          <div className="bg-[#111827] border border-white/[0.06] rounded-xl px-5 py-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Aktif</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{activeMembers}</p>
          </div>
          <div className="bg-[#111827] border border-white/[0.06] rounded-xl px-5 py-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Bekleyen</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">{pendingMembers}</p>
          </div>
        </div>

        {/* Status filter chips */}
        <div className="flex items-center gap-2">
          {filterChips.map((chip) => (
            <button
              key={chip.key}
              onClick={() => setStatusFilter(chip.key)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${
                statusFilter === chip.key
                  ? 'bg-[#0D9488] text-white'
                  : 'border border-[#1E293B] text-[#94A3B8] hover:text-white'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#111827] border border-white/[0.06] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Üye
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Telefon
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Seans
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Durum
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Ödeme
                </th>
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  İşlem
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((member, idx) => {
                const displayName = member.child
                  ? `${member.child.firstName} ${member.child.lastName}`
                  : `${member.user.firstName} ${member.user.lastName}`
                const initials = member.child
                  ? getInitials(member.child.firstName, member.child.lastName)
                  : getInitials(member.user.firstName, member.user.lastName)
                const session = getSessionForMember(member.userId, member.childId)
                const paymentStatus = getPaymentStatus(member.userId, member.childId)

                const statusMap = {
                  active: { label: 'Aktif', cls: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20' },
                  pending: { label: 'Bekliyor', cls: 'bg-amber-500/10 text-amber-400 ring-amber-500/20' },
                  passive: { label: 'Pasif', cls: 'bg-gray-500/10 text-gray-400 ring-gray-500/20' },
                  rejected: { label: 'Reddedildi', cls: 'bg-red-500/10 text-red-400 ring-red-500/20' },
                }

                const paymentMap = {
                  paid: { label: 'Ödendi', cls: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20' },
                  partial: { label: 'Kısmi', cls: 'bg-amber-500/10 text-amber-400 ring-amber-500/20' },
                  unpaid: { label: 'Ödenmedi', cls: 'bg-red-500/10 text-red-400 ring-red-500/20' },
                }

                const st = statusMap[member.status] ?? statusMap.passive
                const pm = paymentMap[paymentStatus]

                return (
                  <tr
                    key={member.id}
                    onClick={() => setDetailMemberId(member.id)}
                    className={`border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer transition-colors ${
                      idx % 2 === 1 ? 'bg-white/[0.015]' : ''
                    }`}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${getAvatarColor(displayName)}`}
                        >
                          {initials}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-white">
                            {displayName}
                          </span>
                          {member.child && (
                            <p className="text-xs text-gray-500">
                              Veli: {member.user.firstName} {member.user.lastName}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-sm">
                      {formatPhone(member.user.phone)}
                    </td>
                    <td className="px-5 py-3 text-gray-300 text-sm">{session}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${st.cls}`}
                      >
                        {st.label}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${pm.cls}`}
                      >
                        {pm.label}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); setDetailMemberId(member.id) }}
                          className="p-1.5 rounded-md text-gray-400 hover:text-cyan-400 hover:bg-white/[0.06] transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation() }}
                          className="p-1.5 rounded-md text-gray-400 hover:text-indigo-400 hover:bg-white/[0.06] transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setDeleteMemberId(member.id) }}
                          className="p-1.5 rounded-md text-gray-400 hover:text-red-400 hover:bg-white/[0.06] transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Dialog */}
      {showAddMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowAddMember(false)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-white text-lg font-semibold mb-4">Yeni Üye Ekle</h3>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">AD</label>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="Üye adı..."
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">SOYAD</label>
              <input
                type="text"
                value={newSurname}
                onChange={e => setNewSurname(e.target.value)}
                placeholder="Üye soyadı..."
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">TELEFON</label>
              <input
                type="text"
                value={newPhone}
                onChange={e => setNewPhone(e.target.value)}
                placeholder="5XX XXX XX XX"
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddMember(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-[#1E293B] text-[#94A3B8] hover:text-white transition">İptal</button>
              <button onClick={handleAddMember} className="flex-1 px-4 py-2.5 rounded-lg bg-[#0D9488] text-white font-medium hover:bg-[#0F766E] transition">Kaydet</button>
            </div>
          </div>
        </div>
      )}

      {/* Member Detail Modal */}
      {detailMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setDetailMemberId(null)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">Üye Detayı</h3>
              <button onClick={() => setDetailMemberId(null)} className="text-[#94A3B8] hover:text-white transition">
                <X className="h-5 w-5" />
              </button>
            </div>
            {(() => {
              const displayName = detailMember.child
                ? `${detailMember.child.firstName} ${detailMember.child.lastName}`
                : `${detailMember.user.firstName} ${detailMember.user.lastName}`
              const session = getSessionForMember(detailMember.userId, detailMember.childId)
              const paymentStatus = getPaymentStatus(detailMember.userId, detailMember.childId)
              const statusLabels: Record<string, string> = { active: 'Aktif', pending: 'Bekliyor', passive: 'Pasif', rejected: 'Reddedildi' }
              const paymentLabels: Record<string, string> = { paid: 'Ödendi', partial: 'Kısmi', unpaid: 'Ödenmedi' }

              return (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-full text-base font-bold text-white ${getAvatarColor(displayName)}`}>
                      {detailMember.child
                        ? getInitials(detailMember.child.firstName, detailMember.child.lastName)
                        : getInitials(detailMember.user.firstName, detailMember.user.lastName)}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">{displayName}</p>
                      {detailMember.child && (
                        <p className="text-xs text-[#94A3B8]">Veli: {detailMember.user.firstName} {detailMember.user.lastName}</p>
                      )}
                    </div>
                  </div>
                  <div className="border-t border-[#1E293B] pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs text-[#94A3B8] uppercase">Telefon</span>
                      <span className="text-sm text-white">{formatPhone(detailMember.user.phone)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-[#94A3B8] uppercase">Durum</span>
                      <span className="text-sm text-white">{statusLabels[detailMember.status] ?? detailMember.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-[#94A3B8] uppercase">Seans</span>
                      <span className="text-sm text-white">{session}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-[#94A3B8] uppercase">Ödeme</span>
                      <span className="text-sm text-white">{paymentLabels[paymentStatus] ?? paymentStatus}</span>
                    </div>
                    {detailMember.joinedAt && (
                      <div className="flex justify-between">
                        <span className="text-xs text-[#94A3B8] uppercase">Katılım</span>
                        <span className="text-sm text-white">{detailMember.joinedAt.slice(0, 10)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })()}
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDetailMemberId(null)} className="flex-1 px-4 py-2.5 rounded-lg border border-[#1E293B] text-[#94A3B8] hover:text-white transition">Kapat</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteMemberId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setDeleteMemberId(null)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-white text-lg font-semibold mb-4">Üye Silme</h3>
            <p className="text-[#94A3B8] text-sm">Bu üyeyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDeleteMemberId(null)} className="flex-1 px-4 py-2.5 rounded-lg border border-[#1E293B] text-[#94A3B8] hover:text-white transition">İptal</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition">Sil</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
