// ============================================================
// Kulüp Bul Demo — Packages Data
// ============================================================
import type { ClubPackage } from '../types'

const CLUB_ID = 'club-1'

export const mockPackages: ClubPackage[] = [
  {
    id: 'pkg-1',
    clubId: CLUB_ID,
    name: 'Deneme Paketi',
    lessonCount: 4,
    price: 500,
    durationDays: 14,
    isPopular: false,
    sortOrder: 1,
  },
  {
    id: 'pkg-2',
    clubId: CLUB_ID,
    name: '1 Ayl\u0131k Ba\u015flang\u0131\u00e7',
    lessonCount: 8,
    price: 1500,
    durationDays: 30,
    isPopular: false,
    sortOrder: 2,
  },
  {
    id: 'pkg-3',
    clubId: CLUB_ID,
    name: '3 Ayl\u0131k Standart',
    lessonCount: 24,
    price: 4000,
    durationDays: 90,
    isPopular: true,
    sortOrder: 3,
  },
  {
    id: 'pkg-4',
    clubId: CLUB_ID,
    name: '6 Ayl\u0131k Premium',
    lessonCount: 48,
    price: 7200,
    durationDays: 180,
    isPopular: false,
    sortOrder: 4,
  },
  {
    id: 'pkg-5',
    clubId: CLUB_ID,
    name: 'Y\u0131ll\u0131k VIP',
    lessonCount: 96,
    price: 12000,
    durationDays: 365,
    isPopular: false,
    sortOrder: 5,
  },
]
