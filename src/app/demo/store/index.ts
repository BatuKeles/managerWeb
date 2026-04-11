import { create } from 'zustand'
import { createDashboardSlice, type DashboardSlice } from './slices/dashboard'
import { createMembersSlice, type MembersSlice } from './slices/members'
import { createSessionsSlice, type SessionsSlice } from './slices/sessions'
import { createCoachesSlice, type CoachesSlice } from './slices/coaches'
import { createFinancesSlice, type FinancesSlice } from './slices/finances'
import { createStockSlice, type StockSlice } from './slices/stock'
import { createPackagesSlice, type PackagesSlice } from './slices/packages'
import { createMessagingSlice, type MessagingSlice } from './slices/messaging'
import { createNotificationsSlice, type NotificationsSlice } from './slices/notifications'
import { createSettingsSlice, type SettingsSlice } from './slices/settings'

export type DemoStore = DashboardSlice &
  MembersSlice &
  SessionsSlice &
  CoachesSlice &
  FinancesSlice &
  StockSlice &
  PackagesSlice &
  MessagingSlice &
  NotificationsSlice &
  SettingsSlice & {
    resetDemo: () => void
  }

export const useDemoStore = create<DemoStore>()((...a) => ({
  ...createDashboardSlice(...a),
  ...createMembersSlice(...a),
  ...createSessionsSlice(...a),
  ...createCoachesSlice(...a),
  ...createFinancesSlice(...a),
  ...createStockSlice(...a),
  ...createPackagesSlice(...a),
  ...createMessagingSlice(...a),
  ...createNotificationsSlice(...a),
  ...createSettingsSlice(...a),

  resetDemo: () => {
    const [set] = a
    set({
      ...createDashboardSlice(...a),
      ...createMembersSlice(...a),
      ...createSessionsSlice(...a),
      ...createCoachesSlice(...a),
      ...createFinancesSlice(...a),
      ...createStockSlice(...a),
      ...createPackagesSlice(...a),
      ...createMessagingSlice(...a),
      ...createNotificationsSlice(...a),
      ...createSettingsSlice(...a),
    })
  },
}))

// Re-export slice types for convenience
export type {
  DashboardSlice,
  MembersSlice,
  SessionsSlice,
  CoachesSlice,
  FinancesSlice,
  StockSlice,
  PackagesSlice,
  MessagingSlice,
  NotificationsSlice,
  SettingsSlice,
}
