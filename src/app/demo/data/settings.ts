// ============================================================
// AcquaManager Demo — Settings Data
// ============================================================
import type { User, Club } from '../types'

export const mockCurrentUser: User = {
  id: 'user-owner',
  phone: '+905551234567',
  firstName: 'Burak',
  lastName: '\u00d6zkan',
  gender: 'male',
  userType: 'club_owner',
  approvalStatus: 'approved',
  isPremium: true,
  createdAt: '2025-01-15T10:00:00Z',
}

export const mockClub: Club = {
  id: 'club-1',
  name: 'Demo Y\u00fczme Kul\u00fcb\u00fc',
  ownerName: 'Burak \u00d6zkan',
  phone: '+905551234567',
  city: '\u0130stanbul',
  district: 'Kad\u0131k\u00f6y',
  status: 'active',
  isPremium: true,
  messagesSentThisMonth: 42,
  monthlyMessageLimit: 200,
}

export interface NotificationSettings {
  newEnrollment: boolean
  paymentReceived: boolean
  makeupRequest: boolean
  cancellationRequest: boolean
  lowStock: boolean
  coachInvitation: boolean
  weeklyReport: boolean
}

export const defaultNotificationSettings: NotificationSettings = {
  newEnrollment: true,
  paymentReceived: true,
  makeupRequest: true,
  cancellationRequest: true,
  lowStock: true,
  coachInvitation: true,
  weeklyReport: true,
}
