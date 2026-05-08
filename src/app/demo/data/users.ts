// ============================================================
// Kulüp Bul Demo — User & Child Data (shared, no deps on other data files)
// ============================================================
import type { User, Child } from '../types'

// ── Coaches ─────────────────────────────────────────────────

export const coachAhmet: User = {
  id: 'user-coach-1',
  phone: '+905552345678',
  firstName: 'Ahmet',
  lastName: 'Yılmaz',
  gender: 'male',
  userType: 'coach',
  approvalStatus: 'approved',
  isPremium: false,
  createdAt: '2025-02-01T10:00:00Z',
}

export const coachAyse: User = {
  id: 'user-coach-2',
  phone: '+905553456789',
  firstName: 'Ayşe',
  lastName: 'Demir',
  gender: 'female',
  userType: 'coach',
  approvalStatus: 'approved',
  isPremium: false,
  createdAt: '2025-02-10T10:00:00Z',
}

export const coachMehmet: User = {
  id: 'user-coach-3',
  phone: '+905554567890',
  firstName: 'Mehmet',
  lastName: 'Kaya',
  gender: 'male',
  userType: 'coach',
  approvalStatus: 'approved',
  isPremium: false,
  createdAt: '2025-03-05T10:00:00Z',
}

// ── Students ────────────────────────────────────────────────

export const userEmre: User = {
  id: 'user-s1',
  phone: '+905555678901',
  firstName: 'Emre',
  lastName: 'Koç',
  gender: 'male',
  birthDate: '2015-06-12',
  userType: 'student',
  approvalStatus: 'approved',
  isPremium: false,
  createdAt: '2025-09-01T10:00:00Z',
}

export const userSelin: User = {
  id: 'user-s2',
  phone: '+905556789012',
  firstName: 'Selin',
  lastName: 'Arslan',
  gender: 'female',
  birthDate: '2014-03-22',
  userType: 'student',
  approvalStatus: 'approved',
  isPremium: false,
  createdAt: '2025-09-05T10:00:00Z',
}

export const userAli: User = {
  id: 'user-s3',
  phone: '+905557890123',
  firstName: 'Ali',
  lastName: 'Yıldız',
  gender: 'male',
  birthDate: '2016-11-30',
  userType: 'student',
  approvalStatus: 'approved',
  isPremium: false,
  createdAt: '2025-09-10T10:00:00Z',
}

export const userZeynep: User = {
  id: 'user-s4',
  phone: '+905558901234',
  firstName: 'Zeynep',
  lastName: 'Güneş',
  gender: 'female',
  birthDate: '2013-08-15',
  userType: 'student',
  approvalStatus: 'approved',
  isPremium: false,
  createdAt: '2025-10-01T10:00:00Z',
}

export const userCan: User = {
  id: 'user-s5',
  phone: '+905559012345',
  firstName: 'Can',
  lastName: 'Türk',
  gender: 'male',
  birthDate: '2015-01-05',
  userType: 'student',
  approvalStatus: 'approved',
  isPremium: false,
  createdAt: '2025-10-15T10:00:00Z',
}

export const userPendingDeniz: User = {
  id: 'user-s6',
  phone: '+905564567890',
  firstName: 'Deniz',
  lastName: 'Acar',
  gender: 'male',
  birthDate: '2014-04-20',
  userType: 'student',
  approvalStatus: 'pending',
  isPremium: false,
  createdAt: '2026-04-07T10:00:00Z',
}

export const userPendingEce: User = {
  id: 'user-s7',
  phone: '+905565678901',
  firstName: 'Ece',
  lastName: 'Yılmaz',
  gender: 'female',
  birthDate: '2015-07-18',
  userType: 'student',
  approvalStatus: 'pending',
  isPremium: false,
  createdAt: '2026-04-08T10:00:00Z',
}

export const userBaris: User = {
  id: 'user-s8',
  phone: '+905566789012',
  firstName: 'Barış',
  lastName: 'Öztürk',
  gender: 'male',
  birthDate: '2016-02-28',
  userType: 'student',
  approvalStatus: 'approved',
  isPremium: false,
  createdAt: '2025-11-01T10:00:00Z',
}

// ── Parents ─────────────────────────────────────────────────

export const parentHasan: User = {
  id: 'user-p1',
  phone: '+905560123456',
  firstName: 'Hasan',
  lastName: 'Demir',
  gender: 'male',
  userType: 'parent',
  approvalStatus: 'approved',
  isPremium: false,
  createdAt: '2025-09-01T10:00:00Z',
}

export const parentFatma: User = {
  id: 'user-p2',
  phone: '+905561234567',
  firstName: 'Fatma',
  lastName: 'Çelik',
  gender: 'female',
  userType: 'parent',
  approvalStatus: 'approved',
  isPremium: false,
  createdAt: '2025-09-05T10:00:00Z',
}

export const parentMurat: User = {
  id: 'user-p3',
  phone: '+905562345678',
  firstName: 'Murat',
  lastName: 'Şahin',
  gender: 'male',
  userType: 'parent',
  approvalStatus: 'approved',
  isPremium: false,
  createdAt: '2025-10-01T10:00:00Z',
}

export const parentElif: User = {
  id: 'user-p4',
  phone: '+905563456789',
  firstName: 'Elif',
  lastName: 'Korkmaz',
  gender: 'female',
  userType: 'parent',
  approvalStatus: 'approved',
  isPremium: false,
  createdAt: '2025-10-10T10:00:00Z',
}

// ── Children ────────────────────────────────────────────────

export const childDerin: Child = {
  id: 'child-1',
  parentId: 'user-p1',
  firstName: 'Derin',
  lastName: 'Demir',
  birthDate: '2017-05-10',
  gender: 'female',
}

export const childYusuf: Child = {
  id: 'child-2',
  parentId: 'user-p2',
  firstName: 'Yusuf',
  lastName: 'Çelik',
  birthDate: '2016-09-25',
  gender: 'male',
}

export const childAda: Child = {
  id: 'child-3',
  parentId: 'user-p3',
  firstName: 'Ada',
  lastName: 'Şahin',
  birthDate: '2018-01-14',
  gender: 'female',
}

export const childEfe: Child = {
  id: 'child-4',
  parentId: 'user-p4',
  firstName: 'Efe',
  lastName: 'Korkmaz',
  birthDate: '2017-11-03',
  gender: 'male',
}
