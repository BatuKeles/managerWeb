'use client'

import { useState } from 'react'
import { useDemoStore } from '../store'
import { DemoTopBar } from './DemoTopBar'
import { CheckCircle } from 'lucide-react'

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0]}${lastName[0]}`.toUpperCase()
}

function formatPhone(phone: string) {
  // +905551234567 -> 0 555 123 45 67
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

export default function OnaylarDemo() {
  const enrollmentRequests = useDemoStore((s) => s.enrollmentRequests)
  const makeupRequests = useDemoStore((s) => s.makeupRequests)
  const cancellationRequests = useDemoStore((s) => s.cancellationRequests)
  const approveEnrollment = useDemoStore((s) => s.approveEnrollment)
  const rejectEnrollment = useDemoStore((s) => s.rejectEnrollment)
  const approveMakeup = useDemoStore((s) => s.approveMakeup)
  const rejectMakeup = useDemoStore((s) => s.rejectMakeup)
  const approveCancellation = useDemoStore((s) => s.approveCancellation)
  const rejectCancellation = useDemoStore((s) => s.rejectCancellation)

  // Confirmation dialogs
  const [confirmApproveId, setConfirmApproveId] = useState<string | null>(null)
  const [rejectDialogId, setRejectDialogId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  // Makeup date dialog
  const [makeupDateId, setMakeupDateId] = useState<string | null>(null)
  const [makeupDate, setMakeupDate] = useState('')

  // Makeup reject dialog
  const [makeupRejectId, setMakeupRejectId] = useState<string | null>(null)
  const [makeupRejectReason, setMakeupRejectReason] = useState('')

  // Cancellation detail dialog
  const [cancelDetailId, setCancelDetailId] = useState<string | null>(null)

  // Cancellation confirm/reject
  const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null)
  const [cancelRejectId, setCancelRejectId] = useState<string | null>(null)
  const [cancelRejectReason, setCancelRejectReason] = useState('')

  // Only show pending requests
  const pendingEnrollments = enrollmentRequests.filter((r) => r.status === 'pending')
  const pendingMakeups = makeupRequests.filter((r) => r.status === 'pending')
  const pendingCancellations = cancellationRequests.filter((r) => r.status === 'pending')

  const allEmpty = pendingEnrollments.length === 0 && pendingMakeups.length === 0 && pendingCancellations.length === 0

  return (
    <div className="flex flex-col h-full">
      <DemoTopBar title="Onaylar" />
      <div className="flex-1 overflow-y-auto p-6 space-y-8">

        {allEmpty && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 mb-4">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
            <p className="text-lg font-semibold text-white">Bekleyen talep yok</p>
            <p className="text-sm text-[#94A3B8] mt-1">Tüm talepler işlendi</p>
          </div>
        )}

        {/* Section 1: Seans Kayıt Talepleri */}
        {pendingEnrollments.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-emerald-500" />
              <h2 className="text-[15px] font-semibold text-white">
                Seans Kayıt Talepleri{' '}
                <span className="text-emerald-400 ml-1">
                  {pendingEnrollments.length}
                </span>
              </h2>
            </div>

            <div className="space-y-3">
              {pendingEnrollments.map((req) => {
                const name = `${req.user.firstName} ${req.user.lastName}`
                return (
                  <div
                    key={req.id}
                    className="flex items-center justify-between bg-[#111827] border border-white/[0.06] rounded-xl px-5 py-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${getAvatarColor(name)}`}
                      >
                        {getInitials(req.user.firstName, req.user.lastName)}
                      </div>
                      <div>
                        <p className="text-[15px] font-semibold text-white">
                          {name}
                        </p>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <span className="text-xs text-gray-400">
                            {formatPhone(req.user.phone)}
                          </span>
                          {req.session && (
                            <span className="inline-flex items-center rounded-md bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-400 ring-1 ring-inset ring-cyan-500/20">
                              {req.session.title}
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            İstek: {req.requestedAt.slice(0, 10)}
                          </span>
                          {req.child && (
                            <span className="text-xs text-gray-500">
                              {req.child.firstName} {req.child.lastName}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-4">
                      <button
                        onClick={() => setConfirmApproveId(req.id)}
                        className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-semibold transition-colors"
                      >
                        Onayla
                      </button>
                      <button
                        onClick={() => { setRejectDialogId(req.id); setRejectReason('') }}
                        className="px-4 py-1.5 rounded-lg bg-red-500/80 hover:bg-red-600 text-white text-xs font-semibold transition-colors"
                      >
                        Reddet
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Section 2: Telafi Ders Talepleri */}
        {pendingMakeups.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-amber-500" />
              <h2 className="text-[15px] font-semibold text-white">
                Telafi Ders Talepleri{' '}
                <span className="text-amber-400 ml-1">
                  {pendingMakeups.length}
                </span>
              </h2>
            </div>

            <div className="space-y-3">
              {pendingMakeups.map((req) => {
                const name = `${req.user.firstName} ${req.user.lastName}`
                return (
                  <div
                    key={req.id}
                    className="flex items-center justify-between bg-[#111827] border border-white/[0.06] rounded-xl px-5 py-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${getAvatarColor(name)}`}
                      >
                        {getInitials(req.user.firstName, req.user.lastName)}
                      </div>
                      <div>
                        <p className="text-[15px] font-semibold text-white">
                          {name}
                        </p>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <span className="text-xs text-gray-400">
                            {req.enrollment?.session?.title ?? 'Seans'}
                          </span>
                          {req.makeupDate && (
                            <span className="text-xs text-gray-500">
                              Katılamaz: {req.makeupDate}
                            </span>
                          )}
                          {req.reason && (
                            <span className="text-xs text-gray-500">
                              ☐ {req.reason}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-4">
                      <button
                        onClick={() => { setMakeupDateId(req.id); setMakeupDate('') }}
                        className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold transition-colors"
                      >
                        Tarih Ata
                      </button>
                      <button
                        onClick={() => { setMakeupRejectId(req.id); setMakeupRejectReason('') }}
                        className="px-4 py-1.5 rounded-lg bg-red-500/80 hover:bg-red-600 text-white text-xs font-semibold transition-colors"
                      >
                        Reddet
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Section 3: İptal Talepleri */}
        {pendingCancellations.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-red-500" />
              <h2 className="text-[15px] font-semibold text-white">
                İptal Talepleri{' '}
                <span className="text-red-400 ml-1">
                  {pendingCancellations.length}
                </span>
              </h2>
            </div>

            <div className="space-y-3">
              {pendingCancellations.map((req) => {
                const name = req.child
                  ? `${req.child.firstName} ${req.child.lastName}`
                  : `${req.user.firstName} ${req.user.lastName}`
                const initials = req.child
                  ? getInitials(req.child.firstName, req.child.lastName)
                  : getInitials(req.user.firstName, req.user.lastName)
                return (
                  <div
                    key={req.id}
                    className="flex items-center justify-between bg-[#111827] border border-white/[0.06] rounded-xl px-5 py-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${getAvatarColor(name)}`}
                      >
                        {initials}
                      </div>
                      <div>
                        <p className="text-[15px] font-semibold text-white">
                          {name}
                        </p>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          {req.enrollment?.session && (
                            <span className="inline-flex items-center rounded-md bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-400 ring-1 ring-inset ring-cyan-500/20">
                              {req.enrollment.session.title}
                            </span>
                          )}
                          {req.reason && (
                            <span className="text-xs text-gray-500">
                              {req.reason}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-4">
                      <button
                        onClick={() => setCancelDetailId(req.id)}
                        className="px-4 py-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-white text-xs font-semibold transition-colors"
                      >
                        İncele
                      </button>
                      <button
                        onClick={() => setCancelConfirmId(req.id)}
                        className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-semibold transition-colors"
                      >
                        Onayla
                      </button>
                      <button
                        onClick={() => { setCancelRejectId(req.id); setCancelRejectReason('') }}
                        className="px-4 py-1.5 rounded-lg bg-red-500/80 hover:bg-red-600 text-white text-xs font-semibold transition-colors"
                      >
                        Reddet
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </div>

      {/* Enrollment Approve Confirmation Dialog */}
      {confirmApproveId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setConfirmApproveId(null)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-white text-lg font-semibold mb-4">Kayıt Onayı</h3>
            <p className="text-[#94A3B8] text-sm">Bu kayıt talebini onaylamak istediğinize emin misiniz?</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setConfirmApproveId(null)} className="flex-1 px-4 py-2.5 rounded-lg border border-[#1E293B] text-[#94A3B8] hover:text-white transition">İptal</button>
              <button
                onClick={() => { approveEnrollment(confirmApproveId); setConfirmApproveId(null) }}
                className="flex-1 px-4 py-2.5 rounded-lg bg-[#0D9488] text-white font-medium hover:bg-[#0F766E] transition"
              >
                Onayla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enrollment Reject Dialog */}
      {rejectDialogId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setRejectDialogId(null)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-white text-lg font-semibold mb-4">Kayıt Reddi</h3>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">REDDETME SEBEBİ (OPSİYONEL)</label>
              <textarea
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder="Sebebi yazın..."
                rows={3}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition resize-none"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setRejectDialogId(null)} className="flex-1 px-4 py-2.5 rounded-lg border border-[#1E293B] text-[#94A3B8] hover:text-white transition">İptal</button>
              <button
                onClick={() => { rejectEnrollment(rejectDialogId); setRejectDialogId(null) }}
                className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
              >
                Reddet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Makeup Date Assignment Dialog */}
      {makeupDateId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setMakeupDateId(null)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-white text-lg font-semibold mb-4">Telafi Tarihi Ata</h3>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">TARİH</label>
              <input
                type="date"
                value={makeupDate}
                onChange={e => setMakeupDate(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white focus:border-[#0D9488] focus:outline-none transition"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setMakeupDateId(null)} className="flex-1 px-4 py-2.5 rounded-lg border border-[#1E293B] text-[#94A3B8] hover:text-white transition">İptal</button>
              <button
                onClick={() => { approveMakeup(makeupDateId); setMakeupDateId(null) }}
                className="flex-1 px-4 py-2.5 rounded-lg bg-[#0D9488] text-white font-medium hover:bg-[#0F766E] transition"
              >
                Onayla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Makeup Reject Dialog */}
      {makeupRejectId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setMakeupRejectId(null)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-white text-lg font-semibold mb-4">Telafi Reddi</h3>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">REDDETME SEBEBİ (OPSİYONEL)</label>
              <textarea
                value={makeupRejectReason}
                onChange={e => setMakeupRejectReason(e.target.value)}
                placeholder="Sebebi yazın..."
                rows={3}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition resize-none"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setMakeupRejectId(null)} className="flex-1 px-4 py-2.5 rounded-lg border border-[#1E293B] text-[#94A3B8] hover:text-white transition">İptal</button>
              <button
                onClick={() => { rejectMakeup(makeupRejectId); setMakeupRejectId(null) }}
                className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
              >
                Reddet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Detail Modal */}
      {cancelDetailId && (() => {
        const req = cancellationRequests.find((r) => r.id === cancelDetailId)
        if (!req) return null
        const name = req.child
          ? `${req.child.firstName} ${req.child.lastName}`
          : `${req.user.firstName} ${req.user.lastName}`
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setCancelDetailId(null)}>
            <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
              <h3 className="text-white text-lg font-semibold mb-4">İptal Talebi Detayı</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs text-[#94A3B8] uppercase">Üye</span>
                  <span className="text-sm text-white">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#94A3B8] uppercase">Telefon</span>
                  <span className="text-sm text-white">{formatPhone(req.user.phone)}</span>
                </div>
                {req.enrollment?.session && (
                  <div className="flex justify-between">
                    <span className="text-xs text-[#94A3B8] uppercase">Seans</span>
                    <span className="text-sm text-white">{req.enrollment.session.title}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-xs text-[#94A3B8] uppercase">Sebep</span>
                  <span className="text-sm text-white">{req.reason || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#94A3B8] uppercase">Tarih</span>
                  <span className="text-sm text-white">{req.createdAt.slice(0, 10)}</span>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setCancelDetailId(null)} className="flex-1 px-4 py-2.5 rounded-lg border border-[#1E293B] text-[#94A3B8] hover:text-white transition">Kapat</button>
                <button
                  onClick={() => { approveCancellation(cancelDetailId); setCancelDetailId(null) }}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-[#0D9488] text-white font-medium hover:bg-[#0F766E] transition"
                >
                  Onayla
                </button>
                <button
                  onClick={() => { rejectCancellation(cancelDetailId); setCancelDetailId(null) }}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
                >
                  Reddet
                </button>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Cancellation Approve Confirmation */}
      {cancelConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setCancelConfirmId(null)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-white text-lg font-semibold mb-4">İptal Onayı</h3>
            <p className="text-[#94A3B8] text-sm">Bu iptal talebini onaylamak istediğinize emin misiniz?</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setCancelConfirmId(null)} className="flex-1 px-4 py-2.5 rounded-lg border border-[#1E293B] text-[#94A3B8] hover:text-white transition">İptal</button>
              <button
                onClick={() => { approveCancellation(cancelConfirmId); setCancelConfirmId(null) }}
                className="flex-1 px-4 py-2.5 rounded-lg bg-[#0D9488] text-white font-medium hover:bg-[#0F766E] transition"
              >
                Onayla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Reject Dialog */}
      {cancelRejectId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setCancelRejectId(null)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-white text-lg font-semibold mb-4">İptal Reddi</h3>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">REDDETME SEBEBİ (OPSİYONEL)</label>
              <textarea
                value={cancelRejectReason}
                onChange={e => setCancelRejectReason(e.target.value)}
                placeholder="Sebebi yazın..."
                rows={3}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition resize-none"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setCancelRejectId(null)} className="flex-1 px-4 py-2.5 rounded-lg border border-[#1E293B] text-[#94A3B8] hover:text-white transition">İptal</button>
              <button
                onClick={() => { rejectCancellation(cancelRejectId); setCancelRejectId(null) }}
                className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
              >
                Reddet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
