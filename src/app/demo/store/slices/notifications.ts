import type { StateCreator } from 'zustand'
import type { Notification } from '../../types'
import { mockNotifications } from '../../data/notifications'

export interface NotificationsSlice {
  notifications: Notification[]
  markAsRead: (id: string) => void
  markAllAsRead: () => void
}

export const createNotificationsSlice: StateCreator<NotificationsSlice, [], [], NotificationsSlice> = (set) => ({
  notifications: mockNotifications,

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    })),
})
