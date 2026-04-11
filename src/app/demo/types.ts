// ============================================================
// AcquaManager Demo — Type Definitions
// ============================================================

// User
export interface User {
  id: string
  phone: string
  firstName: string
  lastName: string
  birthDate?: string
  gender?: 'male' | 'female'
  tcKimlikNo?: string
  avatarUrl?: string
  userType: 'student' | 'parent' | 'coach' | 'club_owner' | 'admin'
  approvalStatus: 'pending' | 'approved' | 'rejected'
  isPremium: boolean
  createdAt: string
}

// Club
export interface Club {
  id: string
  name: string
  ownerName: string
  phone: string
  city: string
  district: string
  status: 'pending_approval' | 'active' | 'suspended' | 'rejected'
  isPremium: boolean
  messagesSentThisMonth: number
  monthlyMessageLimit: number
}

// Child
export interface Child {
  id: string
  parentId: string
  firstName: string
  lastName: string
  birthDate?: string
  gender?: 'male' | 'female'
}

// ClubMember (üye)
export interface ClubMember {
  id: string
  userId: string
  user: User
  childId?: string
  child?: Child
  status: 'pending' | 'active' | 'passive' | 'rejected'
  joinedAt?: string
}

// ClubCoach (antrenör)
export interface ClubCoach {
  id: string
  clubId: string
  coachId: string
  coach: User
  status: 'invited' | 'active' | 'removed'
  canSendMessages: boolean
  color?: string
}

// CoachInvitation
export interface CoachInvitation {
  id: string
  clubId: string
  coachId: string
  coach: User
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
  sentAt: string
  expiresAt: string
}

// Session (seans)
export interface Session {
  id: string
  clubId: string
  title: string
  sportBranch: string
  category: string
  level: string
  startDate: string
  startTime: string
  endTime?: string
  durationMinutes: number
  capacity?: number
  weekDays: number[]
  isRecurring: boolean
  status: 'active' | 'cancelled' | 'completed'
  coaches: ClubCoach[]
  enrollmentCount: number
}

// SessionOccurrence (takvim olayı)
export interface SessionOccurrence {
  id: string
  sessionId: string
  session: Session
  date: string
  startTime: string
  status: 'scheduled' | 'cancelled' | 'completed'
}

// SessionEnrollment
export interface SessionEnrollment {
  id: string
  sessionId: string
  session?: Session
  userId: string
  user: User
  childId?: string
  child?: Child
  status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'passive'
  totalLessons?: number
  remainingLessons?: number
  agreedAmount?: string
  paidAmount: string
  paymentStatus: 'unpaid' | 'partial' | 'paid'
  isFrozen: boolean
  makeupLessonsRemaining: number
  requestedAt: string
}

// MakeupRequest (telafi)
export interface MakeupRequest {
  id: string
  enrollmentId: string
  enrollment?: SessionEnrollment
  userId: string
  user: User
  childId?: string
  child?: Child
  reason?: string
  status: 'pending' | 'approved' | 'rejected'
  makeupDate?: string
  makeupTime?: string
  type: string
  createdAt: string
}

// CancellationRequest (iptal)
export interface CancellationRequest {
  id: string
  enrollmentId: string
  enrollment?: SessionEnrollment
  userId: string
  user: User
  childId?: string
  child?: Child
  reason?: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

// StudentPayment (tahsilat)
export interface StudentPayment {
  id: string
  clubId: string
  userId: string
  user: User
  childId?: string
  child?: Child
  amount: number
  paymentDate: string
  description?: string
  paymentMethod?: string
  enrollmentId?: string
}

// ClubExpense (gider)
export interface ClubExpense {
  id: string
  clubId: string
  category: 'coach' | 'document' | 'pool' | 'other'
  categoryCustom?: string
  amount: number
  date: string
  description?: string
}

// StockItem
export interface StockItem {
  id: string
  clubId: string
  name: string
  category: string
  stock: number
  lowStockThreshold: number
  purchasePrice: number
  price: number
  unit: string
  description?: string
  supplier?: string
}

// ClubPackage (üyelik paketi)
export interface ClubPackage {
  id: string
  clubId: string
  name: string
  lessonCount: number
  price: number
  durationDays: number
  isPopular?: boolean
  sortOrder: number
}

// MessageTemplate (mesaj şablonu)
export interface MessageTemplate {
  id: string
  name: string
  category: string
  templateText: string
  isActive: boolean
  isSystemTemplate: boolean
}

// Notification
export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  isRead: boolean
  createdAt: string
}

// AttendanceRecord
export interface AttendanceRecord {
  id: string
  occurrenceId: string
  userId: string
  user: User
  childId?: string
  child?: Child
  status: 'present' | 'absent' | 'excused' | 'late'
}

// Dashboard stats
export interface DashboardStats {
  totalMembers: number
  activeSessionCount: number
  pendingApprovals: number
  unreadMessages: number
  upcomingSessions: SessionOccurrence[]
  overduePayments: { user: User; child?: Child; amount: number; dueDate: string }[]
  monthlyRevenue: number
  collectionRate: number
  activeRate: number
  passiveRate: number
}
