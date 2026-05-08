// ============================================================
// Kulüp Bul Demo — Notifications Data
// ============================================================
import type { Notification } from '../types'

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'Yeni Kay\u0131t Talebi',
    message: 'Deniz Acar, Sabah Y\u00fczme Grubu seans\u0131na kay\u0131t talebi g\u00f6nderdi.',
    type: 'info',
    isRead: false,
    createdAt: '2026-04-07T14:30:00Z',
  },
  {
    id: 'notif-2',
    title: 'Yeni Kay\u0131t Talebi',
    message: 'Ece Y\u0131lmaz, \u00c7ocuk Y\u00fczme seans\u0131na kay\u0131t talebi g\u00f6nderdi.',
    type: 'info',
    isRead: false,
    createdAt: '2026-04-08T09:15:00Z',
  },
  {
    id: 'notif-3',
    title: '\u00d6deme Al\u0131nd\u0131',
    message: 'Bar\u0131\u015f \u00d6zt\u00fcrk 500\u20ba kaparo \u00f6demesi yapt\u0131.',
    type: 'success',
    isRead: true,
    createdAt: '2026-04-03T11:00:00Z',
  },
  {
    id: 'notif-4',
    title: 'Telafi Talebi',
    message: 'Emre Ko\u00e7 telafi talebi g\u00f6nderdi: Sa\u011fl\u0131k raporu nedeniyle.',
    type: 'warning',
    isRead: false,
    createdAt: '2026-04-07T11:00:00Z',
  },
  {
    id: 'notif-5',
    title: '\u0130ptal Talebi',
    message: 'Fatma \u00c7elik, Yusuf \u00c7elik i\u00e7in iptal talebi g\u00f6nderdi.',
    type: 'error',
    isRead: false,
    createdAt: '2026-04-06T15:30:00Z',
  },
  {
    id: 'notif-6',
    title: 'D\u00fc\u015f\u00fck Stok Uyar\u0131s\u0131',
    message: 'Protein Bar stoku kritik seviyeye d\u00fc\u015ft\u00fc (3 adet).',
    type: 'warning',
    isRead: true,
    createdAt: '2026-04-05T09:00:00Z',
  },
  {
    id: 'notif-7',
    title: 'Antren\u00f6r Daveti G\u00f6nderildi',
    message: 'Serkan Balc\u0131 antren\u00f6r davetiyesi g\u00f6nderildi.',
    type: 'info',
    isRead: true,
    createdAt: '2026-04-05T10:00:00Z',
  },
  {
    id: 'notif-8',
    title: 'Haftal\u0131k \u00d6zet',
    message: 'Bu hafta 6 seans tamamland\u0131, 2 yeni \u00fcye kat\u0131ld\u0131.',
    type: 'success',
    isRead: true,
    createdAt: '2026-04-06T08:00:00Z',
  },
]
