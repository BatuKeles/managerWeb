// ============================================================
// Kulüp Bul Demo — Mock Data (backward compatibility)
// Existing pages import from here. They will be migrated to
// use the Zustand store directly. Do not add new exports here.
// ============================================================
export {
  mockMembers,
  mockEnrollments,
  mockEnrollmentRequests,
  mockMakeupRequests,
  mockCancellationRequests,
  // User & Child entities (used by various pages)
  coachAhmet,
  coachAyse,
  coachMehmet,
  userEmre,
  userSelin,
  userAli,
  userZeynep,
  userCan,
  parentHasan,
  parentFatma,
  parentMurat,
  parentElif,
  userPendingDeniz,
  userPendingEce,
  userBaris,
  childDerin,
  childYusuf,
  childAda,
  childEfe,
} from './data/members'

export { mockSessions, mockOccurrences, clubCoachAhmet, clubCoachAyse, clubCoachMehmet } from './data/sessions'
export { mockCoaches, mockCoachInvitations } from './data/coaches'
export { mockPayments, mockExpenses } from './data/finances'
export { mockStockItems } from './data/stock'
export { mockPackages } from './data/packages'
export { mockTemplates } from './data/messaging'
export { mockNotifications } from './data/notifications'
export { mockCurrentUser, mockClub } from './data/settings'
export { mockDashboardStats } from './data/dashboard'
