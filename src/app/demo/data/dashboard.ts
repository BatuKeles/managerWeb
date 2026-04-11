// ============================================================
// AcquaManager Demo — Dashboard Data
// ============================================================
import type { DashboardStats } from '../types'
import { mockOccurrences } from './sessions'
import { parentFatma, childYusuf, parentHasan, childDerin } from './users'

const todayOccurrences = mockOccurrences.filter(
  (o) => o.date === '2026-04-09' || (o.date >= '2026-04-09' && o.date <= '2026-04-12')
)

export const mockDashboardStats: DashboardStats = {
  totalMembers: 5,
  activeSessionCount: 4,
  pendingApprovals: 2,
  unreadMessages: 4,
  upcomingSessions: todayOccurrences.slice(0, 5),
  overduePayments: [
    { user: parentFatma, child: childYusuf, amount: 1500, dueDate: '2026-03-25' },
    { user: parentHasan, child: childDerin, amount: 400, dueDate: '2026-04-01' },
  ],
  monthlyRevenue: 10000,
  collectionRate: 73,
  activeRate: 80,
  passiveRate: 20,
}
