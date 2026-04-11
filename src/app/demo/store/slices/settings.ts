import type { StateCreator } from 'zustand'
import type { Club, User } from '../../types'
import { mockClub, mockCurrentUser, defaultNotificationSettings, type NotificationSettings } from '../../data/settings'

export interface SettingsSlice {
  club: Club
  currentUser: User
  notificationSettings: NotificationSettings
  updateClubInfo: (updates: Partial<Club>) => void
  toggleNotificationSetting: (key: keyof NotificationSettings) => void
}

export const createSettingsSlice: StateCreator<SettingsSlice, [], [], SettingsSlice> = (set) => ({
  club: mockClub,
  currentUser: mockCurrentUser,
  notificationSettings: defaultNotificationSettings,

  updateClubInfo: (updates) =>
    set((state) => ({
      club: { ...state.club, ...updates },
    })),

  toggleNotificationSetting: (key) =>
    set((state) => ({
      notificationSettings: {
        ...state.notificationSettings,
        [key]: !state.notificationSettings[key],
      },
    })),
})
