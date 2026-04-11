import type { StateCreator } from 'zustand'
import type { DashboardStats } from '../../types'
import { mockDashboardStats } from '../../data/dashboard'

export interface DashboardSlice {
  dashboardStats: DashboardStats
}

export const createDashboardSlice: StateCreator<DashboardSlice, [], [], DashboardSlice> = () => ({
  dashboardStats: mockDashboardStats,
})
