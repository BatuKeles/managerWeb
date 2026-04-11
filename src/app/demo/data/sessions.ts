// ============================================================
// AcquaManager Demo — Sessions Data
// ============================================================
import type { Session, SessionOccurrence, ClubCoach } from '../types'
import { coachAhmet, coachAyse, coachMehmet } from './users'

// ── helpers ──────────────────────────────────────────────────
const CLUB_ID = 'club-1'

// ── ClubCoach references (needed by sessions) ────────────────

const clubCoachAhmet: ClubCoach = {
  id: 'cc-1',
  clubId: CLUB_ID,
  coachId: coachAhmet.id,
  coach: coachAhmet,
  status: 'active',
  canSendMessages: true,
  color: '#06b6d4',
}

const clubCoachAyse: ClubCoach = {
  id: 'cc-2',
  clubId: CLUB_ID,
  coachId: coachAyse.id,
  coach: coachAyse,
  status: 'active',
  canSendMessages: true,
  color: '#8b5cf6',
}

const clubCoachMehmet: ClubCoach = {
  id: 'cc-3',
  clubId: CLUB_ID,
  coachId: coachMehmet.id,
  coach: coachMehmet,
  status: 'active',
  canSendMessages: false,
  color: '#f59e0b',
}

// Export coach objects for use by coaches data
export { clubCoachAhmet, clubCoachAyse, clubCoachMehmet }

// ── Sessions ─────────────────────────────────────────────────

const sessionSabah: Session = {
  id: 'sess-1',
  clubId: CLUB_ID,
  title: 'Sabah Y\u00fczme Grubu',
  sportBranch: 'Y\u00fczme',
  category: 'Yeti\u015fkin',
  level: 'Orta',
  startDate: '2026-03-01',
  startTime: '08:00',
  endTime: '09:30',
  durationMinutes: 90,
  capacity: 12,
  weekDays: [1, 3, 5],
  isRecurring: true,
  status: 'active',
  coaches: [clubCoachAhmet],
  enrollmentCount: 6,
}

const sessionCocuk: Session = {
  id: 'sess-2',
  clubId: CLUB_ID,
  title: '\u00c7ocuk Y\u00fczme',
  sportBranch: 'Y\u00fczme',
  category: '\u00c7ocuk',
  level: 'Ba\u015flang\u0131\u00e7',
  startDate: '2026-03-01',
  startTime: '10:00',
  endTime: '11:00',
  durationMinutes: 60,
  capacity: 10,
  weekDays: [2, 4],
  isRecurring: true,
  status: 'active',
  coaches: [clubCoachAyse],
  enrollmentCount: 5,
}

const sessionAksam: Session = {
  id: 'sess-3',
  clubId: CLUB_ID,
  title: 'Ak\u015fam Antrenman',
  sportBranch: 'Y\u00fczme',
  category: 'Yeti\u015fkin',
  level: '\u0130leri',
  startDate: '2026-03-01',
  startTime: '18:00',
  endTime: '19:30',
  durationMinutes: 90,
  capacity: 8,
  weekDays: [1, 3, 5],
  isRecurring: true,
  status: 'active',
  coaches: [clubCoachMehmet],
  enrollmentCount: 4,
}

const sessionHaftaSonu: Session = {
  id: 'sess-4',
  clubId: CLUB_ID,
  title: 'Hafta Sonu Grubu',
  sportBranch: 'Y\u00fczme',
  category: 'Karma',
  level: 'Orta',
  startDate: '2026-03-01',
  startTime: '10:00',
  endTime: '11:30',
  durationMinutes: 90,
  capacity: 15,
  weekDays: [6, 0],
  isRecurring: true,
  status: 'active',
  coaches: [clubCoachAhmet, clubCoachAyse],
  enrollmentCount: 8,
}

const sessionBirebir: Session = {
  id: 'sess-5',
  clubId: CLUB_ID,
  title: 'Birebir \u00d6zel Ders',
  sportBranch: 'Y\u00fczme',
  category: '\u00d6zel',
  level: 'T\u00fcm Seviyeler',
  startDate: '2026-04-01',
  startTime: '14:00',
  endTime: '15:00',
  durationMinutes: 60,
  capacity: 1,
  weekDays: [3],
  isRecurring: true,
  status: 'active',
  coaches: [clubCoachAyse],
  enrollmentCount: 1,
}

const sessionYaziOkulu: Session = {
  id: 'sess-6',
  clubId: CLUB_ID,
  title: 'Yaz Okulu Haz\u0131rl\u0131k',
  sportBranch: 'Y\u00fczme',
  category: '\u00c7ocuk',
  level: 'Ba\u015flang\u0131\u00e7',
  startDate: '2026-06-01',
  startTime: '09:00',
  endTime: '10:00',
  durationMinutes: 60,
  capacity: 20,
  weekDays: [1, 2, 3, 4, 5],
  isRecurring: true,
  status: 'active',
  coaches: [clubCoachAhmet, clubCoachMehmet],
  enrollmentCount: 0,
}

export const mockSessions: Session[] = [
  sessionSabah,
  sessionCocuk,
  sessionAksam,
  sessionHaftaSonu,
  sessionBirebir,
  sessionYaziOkulu,
]

// ── Session Occurrences (week of April 6-12, 2026) ──────────

function occ(
  id: string,
  session: Session,
  date: string,
  status: 'scheduled' | 'cancelled' | 'completed' = 'scheduled'
): SessionOccurrence {
  return { id, sessionId: session.id, session, date, startTime: session.startTime, status }
}

export const mockOccurrences: SessionOccurrence[] = [
  // Mon Apr 6
  occ('occ-1', sessionSabah, '2026-04-06'),
  occ('occ-2', sessionAksam, '2026-04-06'),
  // Tue Apr 7
  occ('occ-3', sessionCocuk, '2026-04-07'),
  // Wed Apr 8
  occ('occ-4', sessionSabah, '2026-04-08'),
  occ('occ-5', sessionAksam, '2026-04-08'),
  occ('occ-6', sessionBirebir, '2026-04-08'),
  // Thu Apr 9 (today)
  occ('occ-7', sessionCocuk, '2026-04-09'),
  // Fri Apr 10
  occ('occ-8', sessionSabah, '2026-04-10'),
  occ('occ-9', sessionAksam, '2026-04-10'),
  // Sat Apr 11
  occ('occ-10', sessionHaftaSonu, '2026-04-11'),
  // Sun Apr 12
  occ('occ-11', sessionHaftaSonu, '2026-04-12'),
  // completed ones from last week
  occ('occ-12', sessionSabah, '2026-04-01', 'completed'),
  occ('occ-13', sessionCocuk, '2026-04-02', 'completed'),
  occ('occ-14', sessionAksam, '2026-04-01', 'completed'),
  occ('occ-15', sessionSabah, '2026-04-03', 'completed'),
  occ('occ-16', sessionHaftaSonu, '2026-04-04', 'completed'),
  occ('occ-17', sessionHaftaSonu, '2026-04-05', 'completed'),
  // next week previews
  occ('occ-18', sessionSabah, '2026-04-13'),
  occ('occ-19', sessionCocuk, '2026-04-14'),
  occ('occ-20', sessionAksam, '2026-04-13'),
  occ('occ-21', sessionSabah, '2026-04-15'),
  occ('occ-22', sessionBirebir, '2026-04-15'),
  occ('occ-23', sessionAksam, '2026-04-15'),
  occ('occ-24', sessionCocuk, '2026-04-16'),
  occ('occ-25', sessionSabah, '2026-04-17'),
]
