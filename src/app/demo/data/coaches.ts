// ============================================================
// Kulüp Bul Demo — Coaches Data
// ============================================================
import type { ClubCoach, CoachInvitation } from '../types'
import { clubCoachAhmet, clubCoachAyse, clubCoachMehmet } from './sessions'

const CLUB_ID = 'club-1'

export const mockCoaches: ClubCoach[] = [clubCoachAhmet, clubCoachAyse, clubCoachMehmet]

export const mockCoachInvitations: CoachInvitation[] = [
  {
    id: 'cinv-1',
    clubId: CLUB_ID,
    coachId: 'user-coach-pending',
    coach: {
      id: 'user-coach-pending',
      phone: '+905567890123',
      firstName: 'Serkan',
      lastName: 'Balc\u0131',
      gender: 'male',
      userType: 'coach',
      approvalStatus: 'approved',
      isPremium: false,
      createdAt: '2026-03-01T10:00:00Z',
    },
    status: 'pending',
    sentAt: '2026-04-05T10:00:00Z',
    expiresAt: '2026-04-12T10:00:00Z',
  },
]
