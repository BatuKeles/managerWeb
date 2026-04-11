'use client'

import { useState } from 'react'
import { TrendingUp, ClipboardList, Star, CheckCircle2, Phone } from 'lucide-react'
import { DemoTopBar } from './DemoTopBar'
import { useDemoStore } from '../store'

function formatPhone(phone: string) {
  const digits = phone.replace('+90', '0')
  if (digits.length === 11) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9)}`
  }
  return phone
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0]}${lastName[0]}`.toUpperCase()
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

export default function AntrenorlerDemo() {
  const coaches = useDemoStore((s) => s.coaches)
  const invitations = useDemoStore((s) => s.invitations)
  const toggleMessagePermission = useDemoStore((s) => s.toggleMessagePermission)
  const removeCoach = useDemoStore((s) => s.removeCoach)
  const addCoachInvitation = useDemoStore((s) => s.addCoachInvitation)
  const sessions = useDemoStore((s) => s.sessions)

  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [showRemoveDialog, setShowRemoveDialog] = useState<string | null>(null)
  const [showAssignDialog, setShowAssignDialog] = useState<string | null>(null)
  const [inviteForm, setInviteForm] = useState({ firstName: '', lastName: '', phone: '' })
  const [successBanner, setSuccessBanner] = useState(false)

  const activeCoaches = coaches.filter((c) => c.status !== 'removed')
  const totalCoaches = activeCoaches.length
  const activeAssignments = activeCoaches.filter((c) => c.status === 'active').length
  const newApplications = invitations.filter((i) => i.status === 'pending').length

  const handleInvite = () => {
    if (!inviteForm.firstName || !inviteForm.lastName || !inviteForm.phone) return
    addCoachInvitation(inviteForm)
    setInviteForm({ firstName: '', lastName: '', phone: '' })
    setShowInviteDialog(false)
    setSuccessBanner(true)
    setTimeout(() => setSuccessBanner(false), 3000)
  }

  const handleRemove = (id: string) => {
    removeCoach(id)
    setShowRemoveDialog(null)
  }

  const removeTarget = showRemoveDialog
    ? coaches.find((c) => c.id === showRemoveDialog)
    : null

  const assignTarget = showAssignDialog
    ? coaches.find((c) => c.id === showAssignDialog)
    : null

  const assignedSessions = assignTarget
    ? sessions.filter((s) =>
        s.coaches.some((sc) => sc.coachId === assignTarget.coachId)
      )
    : []

  return (
    <div className="flex flex-col h-full">
      <DemoTopBar
        title="Antrenorler"
        actions={
          <button
            onClick={() => setShowInviteDialog(true)}
            className="flex items-center gap-2 h-9 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold transition-colors"
          >
            + Yeni Antrenor Ekle
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Success banner */}
        {successBanner && (
          <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg px-4 py-3 text-sm text-emerald-400 font-medium animate-pulse">
            Davet gonderildi
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#111827] border border-white/[0.06] rounded-xl px-5 py-4">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
              Toplam Antrenor
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-3xl font-bold text-white">{totalCoaches}</span>
              <TrendingUp className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
          <div className="bg-[#111827] border border-white/[0.06] rounded-xl px-5 py-4">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
              Aktif Gorevler
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-3xl font-bold text-white">{activeAssignments}</span>
              <ClipboardList className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
          <div className="bg-[#111827] border border-white/[0.06] rounded-xl px-5 py-4">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
              Yeni Basvuru
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-3xl font-bold text-white">{newApplications}</span>
              <Star className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
        </div>

        {/* Coach List Header */}
        <h2 className="text-[15px] font-semibold text-white">Antrenor Listesi</h2>

        {/* Coach Cards */}
        <div className="space-y-4">
          {activeCoaches.map((clubCoach) => {
            const coach = clubCoach.coach
            const name = `${coach.firstName} ${coach.lastName}`
            const isInvited = invitations.some(
              (i) => i.coachId === coach.id && i.status === 'pending'
            )

            return (
              <div
                key={clubCoach.id}
                className="bg-[#111827] border border-white/[0.06] rounded-xl px-6 py-5 hover:border-[#0D9488]/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${getAvatarColor(name)}`}
                    >
                      {getInitials(coach.firstName, coach.lastName)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-semibold text-white">
                          {name}
                        </span>
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        {isInvited && (
                          <span className="inline-flex items-center rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400 ring-1 ring-inset ring-amber-500/20">
                            Davet Gonderildi
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Phone className="h-3 w-3" />
                          {formatPhone(coach.phone)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-400">Mesaj Izni</span>
                        <button
                          onClick={() => toggleMessagePermission(clubCoach.id)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            clubCoach.canSendMessages ? 'bg-cyan-500' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
                              clubCoach.canSendMessages
                                ? 'translate-x-[18px]'
                                : 'translate-x-[3px]'
                            }`}
                          />
                        </button>
                        <span
                          className={`text-xs font-semibold ${
                            clubCoach.canSendMessages
                              ? 'text-cyan-400'
                              : 'text-gray-500'
                          }`}
                        >
                          {clubCoach.canSendMessages ? 'ACIK' : 'KAPALI'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <button
                      onClick={() => setShowAssignDialog(clubCoach.id)}
                      className="px-4 py-1.5 rounded-lg border border-white/10 text-gray-300 hover:border-cyan-500/50 hover:text-white text-xs font-semibold transition-colors"
                    >
                      Gorevlendirme
                    </button>
                    <button
                      onClick={() => setShowRemoveDialog(clubCoach.id)}
                      className="px-4 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-semibold transition-colors"
                    >
                      Cikar
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Info Box */}
        <div className="bg-[#0d1b2a] border border-cyan-500/10 rounded-xl px-6 py-5">
          <h3 className="text-sm font-semibold text-white mb-2">Hizli Ozet</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Antrenor listesi otomatik olarak guncellenmektedir. Mesaj izni verilen
            antrenorler, sporcular ve veliler ile uygulama uzerinden dogrudan
            iletisime gecebilirler. Gorevlendirme butonu ile antrenorlere ozel
            antrenman programlari atayabilirsiniz.
          </p>
        </div>
      </div>

      {/* Invite Dialog */}
      {showInviteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowInviteDialog(false)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-4">Yeni Antrenor Davet Et</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Ad</label>
                <input
                  type="text"
                  value={inviteForm.firstName}
                  onChange={(e) => setInviteForm({ ...inviteForm, firstName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-[#0D9488]/50"
                  placeholder="Ad"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Soyad</label>
                <input
                  type="text"
                  value={inviteForm.lastName}
                  onChange={(e) => setInviteForm({ ...inviteForm, lastName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-[#0D9488]/50"
                  placeholder="Soyad"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Telefon</label>
                <input
                  type="text"
                  value={inviteForm.phone}
                  onChange={(e) => setInviteForm({ ...inviteForm, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-[#0D9488]/50"
                  placeholder="+90 5XX XXX XX XX"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowInviteDialog(false)}
                className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 text-sm font-medium hover:border-white/20 transition-colors"
              >
                Iptal
              </button>
              <button
                onClick={handleInvite}
                className="px-4 py-2 rounded-lg bg-[#0D9488] hover:bg-[#0D9488]/80 text-white text-sm font-medium transition-colors"
              >
                Davet Gonder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Confirmation Dialog */}
      {showRemoveDialog && removeTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowRemoveDialog(null)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-2">Antrenoru Cikar</h3>
            <p className="text-sm text-gray-400 mb-6">
              {removeTarget.coach.firstName} {removeTarget.coach.lastName} kulupten cikarilsin mi?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRemoveDialog(null)}
                className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 text-sm font-medium hover:border-white/20 transition-colors"
              >
                Iptal
              </button>
              <button
                onClick={() => handleRemove(showRemoveDialog)}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
              >
                Cikar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Dialog */}
      {showAssignDialog && assignTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowAssignDialog(null)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-2">Gorevlendirmeler</h3>
            <p className="text-sm text-gray-400 mb-4">
              {assignTarget.coach.firstName} {assignTarget.coach.lastName}
            </p>
            {assignedSessions.length > 0 ? (
              <div className="space-y-2">
                {assignedSessions.map((s) => (
                  <div key={s.id} className="rounded-lg bg-white/[0.03] border border-white/[0.06] px-4 py-3">
                    <p className="text-sm text-white font-medium">{s.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.startTime} - {s.endTime} | {s.category}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 py-4 text-center">Henuz atanmis seans yok.</p>
            )}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowAssignDialog(null)}
                className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 text-sm font-medium hover:border-white/20 transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
