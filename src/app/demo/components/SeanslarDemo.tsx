'use client'

import { Fragment, useState } from 'react'
import { useDemoStore } from '../store'
import { DemoTopBar } from './DemoTopBar'
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plus,
  Check,
} from 'lucide-react'

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8) // 08:00..20:00

const BASE_WEEK = [
  { label: 'Pzt', date: 6 },
  { label: 'Sal', date: 7 },
  { label: 'Çar', date: 8 },
  { label: 'Per', date: 9 },
  { label: 'Cum', date: 10 },
  { label: 'Cmt', date: 11 },
  { label: 'Paz', date: 12 },
]

const DAY_CHIPS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']
const DAY_MAP: Record<string, number> = { Pzt: 1, Sal: 2, Çar: 3, Per: 4, Cum: 5, Cmt: 6, Paz: 0 }

function parseTime(t: string): number {
  const [h, m] = t.split(':').map(Number)
  return h + m / 60
}

export default function SeanslarDemo() {
  const occurrences = useDemoStore((s) => s.occurrences)
  const addSession = useDemoStore((s) => s.addSession)

  const [weekOffset, setWeekOffset] = useState(0)

  // Add session dialog
  const [showAddSession, setShowAddSession] = useState(false)
  const [sessionTitle, setSessionTitle] = useState('')
  const [sessionBranch, setSessionBranch] = useState('Yüzme')
  const [sessionLevel, setSessionLevel] = useState('Başlangıç')
  const [sessionDays, setSessionDays] = useState<string[]>([])
  const [sessionStart, setSessionStart] = useState('09:00')
  const [sessionEnd, setSessionEnd] = useState('10:00')
  const [sessionCapacity, setSessionCapacity] = useState('20')
  const [sessionSuccess, setSessionSuccess] = useState(false)

  const WEEK_DAYS = BASE_WEEK.map((d) => ({
    ...d,
    date: d.date + weekOffset * 7,
  }))
  const TODAY_DATE = weekOffset === 0 ? 9 : -1

  const weekStartDate = WEEK_DAYS[0].date
  const weekEndDate = WEEK_DAYS[6].date

  // Filter occurrences for displayed week
  const weekOccurrences = occurrences.filter((o) => {
    if (o.status !== 'scheduled') return false
    const day = parseInt(o.date.split('-')[2], 10)
    return day >= weekStartDate && day <= weekEndDate
  })

  const weekLabel = weekOffset === 0
    ? '6 - 12 Nisan 2026'
    : weekOffset === 1
      ? '13 - 19 Nisan 2026'
      : weekOffset === -1
        ? '30 Mar - 5 Nisan 2026'
        : `Hafta ${weekOffset > 0 ? '+' : ''}${weekOffset}`

  const toggleDay = (day: string) => {
    setSessionDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const handleAddSession = () => {
    if (!sessionTitle.trim()) return
    addSession({
      id: `session-${Date.now()}`,
      clubId: 'demo-club',
      title: sessionTitle.trim(),
      sportBranch: sessionBranch,
      category: sessionBranch,
      level: sessionLevel,
      startDate: '2026-04-09',
      startTime: sessionStart,
      endTime: sessionEnd,
      durationMinutes: Math.max(30, (parseTime(sessionEnd) - parseTime(sessionStart)) * 60),
      capacity: parseInt(sessionCapacity) || 20,
      weekDays: sessionDays.map((d) => DAY_MAP[d] ?? 0),
      isRecurring: true,
      status: 'active',
      coaches: [],
      enrollmentCount: 0,
    })
    setSessionTitle('')
    setSessionDays([])
    setSessionStart('09:00')
    setSessionEnd('10:00')
    setSessionCapacity('20')
    setShowAddSession(false)
    setSessionSuccess(true)
    setTimeout(() => setSessionSuccess(false), 2500)
  }

  return (
    <div className="flex flex-col h-full">
      <DemoTopBar
        title="Seanslar"
        actions={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setWeekOffset((p) => p - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-white/[0.06] hover:text-white transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="text-center min-w-[160px]">
                <p className="text-sm font-semibold text-white">
                  {weekLabel}
                </p>
                <p className="text-[10px] tracking-wider text-gray-500 uppercase">
                  Haftalık Program
                </p>
              </div>
              <button
                onClick={() => setWeekOffset((p) => p + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-white/[0.06] hover:text-white transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        }
      />

      {/* Success toast */}
      {sessionSuccess && (
        <div className="fixed top-6 right-6 z-[60] flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg animate-pulse">
          <Check className="h-4 w-4" />
          Seans başarıyla oluşturuldu
        </div>
      )}

      {/* Filter bar */}
      <div className="flex items-center gap-3 px-6 py-3 border-b border-white/[0.06]">
        <div className="flex rounded-lg bg-[#111827] border border-white/[0.06] overflow-hidden">
          {['Günlük', 'Haftalık', 'Aylık'].map((label) => (
            <button
              key={label}
              className={`px-4 py-1.5 text-xs font-medium transition-colors ${
                label === 'Haftalık'
                  ? 'bg-cyan-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-1.5 rounded-lg bg-[#111827] border border-white/[0.06] px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors">
          Seans
          <ChevronDown className="h-3 w-3" />
        </button>

        <button className="flex items-center gap-1.5 rounded-lg bg-[#111827] border border-white/[0.06] px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors">
          Antrenör
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="flex-1 overflow-auto px-6 py-4 relative">
        <div
          className="grid min-w-[700px]"
          style={{
            gridTemplateColumns: '60px repeat(7, 1fr)',
          }}
        >
          {/* Header row */}
          <div className="sticky top-0 z-10 bg-[#0a0a14]" />
          {WEEK_DAYS.map((day) => {
            const isToday = day.date === TODAY_DATE
            return (
              <div
                key={day.label}
                className={`sticky top-0 z-10 flex flex-col items-center py-2 ${
                  isToday ? 'bg-[#0a0a14]' : 'bg-[#0a0a14]'
                }`}
              >
                <span className="text-[11px] font-medium text-gray-500">
                  {day.label}
                </span>
                <span
                  className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                    isToday
                      ? 'bg-cyan-500 text-white'
                      : 'text-gray-300'
                  }`}
                >
                  {day.date}
                </span>
              </div>
            )
          })}

          {/* Time rows + session blocks */}
          {HOURS.map((hour) => (
            <Fragment key={`row-${hour}`}>
              {/* Time label */}
              <div
                className="relative h-[70px] border-t border-white/[0.04] pr-3 flex items-start justify-end"
              >
                <span className="text-[10px] text-gray-600 -mt-1.5">
                  {String(hour).padStart(2, '0')}:00
                </span>
              </div>

              {/* Day cells */}
              {WEEK_DAYS.map((day) => {
                const isToday = day.date === TODAY_DATE
                const dateStr = `2026-04-${String(day.date).padStart(2, '0')}`

                // Find occurrences that START in this hour for this day
                const cellOccs = weekOccurrences.filter((o) => {
                  if (o.date !== dateStr) return false
                  const startH = parseInt(o.startTime.split(':')[0], 10)
                  return startH === hour
                })

                return (
                  <div
                    key={`cell-${day.date}-${hour}`}
                    className={`relative h-[70px] border-t border-l border-white/[0.04] ${
                      isToday ? 'bg-cyan-500/[0.03]' : ''
                    }`}
                  >
                    {cellOccs.map((occ) => {
                      const session = occ.session
                      const startFrac = parseTime(session.startTime)
                      const endFrac = session.endTime
                        ? parseTime(session.endTime)
                        : startFrac + session.durationMinutes / 60
                      const durationHours = endFrac - startFrac
                      const heightPx = durationHours * 70
                      const coach = session.coaches[0]

                      return (
                        <div
                          key={occ.id}
                          className="absolute left-0.5 right-0.5 z-[5] rounded-md bg-cyan-600/90 border border-cyan-400/30 px-2 py-1.5 overflow-hidden cursor-pointer hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                          style={{
                            top: 0,
                            height: `${heightPx}px`,
                          }}
                        >
                          <span className="inline-block rounded bg-cyan-400/30 px-1.5 py-0.5 text-[9px] font-bold text-white tracking-wider uppercase">
                            YÜZME
                          </span>
                          {coach && (
                            <div className="flex items-center gap-1 mt-1">
                              <span
                                className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                                style={{
                                  backgroundColor:
                                    coach.color || '#06b6d4',
                                }}
                              />
                              <span className="text-[10px] text-white/80 truncate">
                                {coach.coach.firstName}{' '}
                                {coach.coach.lastName[0]}.
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-[9px] text-white/60">
                              {session.enrollmentCount}/{session.capacity}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </Fragment>
          ))}
        </div>

        {/* Floating action button */}
        <div className="sticky bottom-4 flex justify-end pr-2 mt-4">
          <button
            onClick={() => setShowAddSession(true)}
            className="flex items-center gap-2 rounded-full bg-[#0D9488] hover:bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Seans Ekle
          </button>
        </div>
      </div>

      {/* Add Session Dialog */}
      {showAddSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowAddSession(false)}>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-white text-lg font-semibold mb-4">Yeni Seans Oluştur</h3>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">BAŞLIK</label>
              <input
                type="text"
                value={sessionTitle}
                onChange={e => setSessionTitle(e.target.value)}
                placeholder="Seans adı..."
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">BRANŞ</label>
              <select
                value={sessionBranch}
                onChange={e => setSessionBranch(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white focus:border-[#0D9488] focus:outline-none transition"
              >
                <option value="Yüzme" className="bg-[#0B0F19]">Yüzme</option>
                <option value="Basketbol" className="bg-[#0B0F19]">Basketbol</option>
                <option value="Fitness" className="bg-[#0B0F19]">Fitness</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">SEVİYE</label>
              <select
                value={sessionLevel}
                onChange={e => setSessionLevel(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white focus:border-[#0D9488] focus:outline-none transition"
              >
                <option value="Başlangıç" className="bg-[#0B0F19]">Başlangıç</option>
                <option value="Orta" className="bg-[#0B0F19]">Orta</option>
                <option value="İleri" className="bg-[#0B0F19]">İleri</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">GÜN SEÇİMİ</label>
              <div className="flex flex-wrap gap-2">
                {DAY_CHIPS.map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      sessionDays.includes(day)
                        ? 'bg-[#0D9488] text-white'
                        : 'border border-[#1E293B] text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">BAŞLANGIÇ</label>
                <input
                  type="time"
                  value={sessionStart}
                  onChange={e => setSessionStart(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white focus:border-[#0D9488] focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">BİTİŞ</label>
                <input
                  type="time"
                  value={sessionEnd}
                  onChange={e => setSessionEnd(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white focus:border-[#0D9488] focus:outline-none transition"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">KAPASİTE</label>
              <input
                type="number"
                value={sessionCapacity}
                onChange={e => setSessionCapacity(e.target.value)}
                placeholder="20"
                className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1E293B] rounded-xl text-white placeholder-[#64748B] focus:border-[#0D9488] focus:outline-none transition"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddSession(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-[#1E293B] text-[#94A3B8] hover:text-white transition">İptal</button>
              <button onClick={handleAddSession} className="flex-1 px-4 py-2.5 rounded-lg bg-[#0D9488] text-white font-medium hover:bg-[#0F766E] transition">Oluştur</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
