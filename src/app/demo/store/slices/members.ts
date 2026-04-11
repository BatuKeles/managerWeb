import type { StateCreator } from 'zustand'
import type { ClubMember, SessionEnrollment, MakeupRequest, CancellationRequest } from '../../types'
import {
  mockMembers,
  mockEnrollments,
  mockEnrollmentRequests,
  mockMakeupRequests,
  mockCancellationRequests,
} from '../../data/members'

export interface MembersSlice {
  members: ClubMember[]
  enrollments: SessionEnrollment[]
  enrollmentRequests: SessionEnrollment[]
  makeupRequests: MakeupRequest[]
  cancellationRequests: CancellationRequest[]
  addMember: (name: string, surname: string, phone: string) => void
  removeMember: (id: string) => void
  approveMember: (id: string) => void
  rejectMember: (id: string) => void
  approveEnrollment: (id: string) => void
  rejectEnrollment: (id: string) => void
  approveMakeup: (id: string) => void
  rejectMakeup: (id: string) => void
  approveCancellation: (id: string) => void
  rejectCancellation: (id: string) => void
}

export const createMembersSlice: StateCreator<MembersSlice, [], [], MembersSlice> = (set) => ({
  members: mockMembers,
  enrollments: mockEnrollments,
  enrollmentRequests: mockEnrollmentRequests,
  makeupRequests: mockMakeupRequests,
  cancellationRequests: mockCancellationRequests,

  addMember: (name, surname, phone) =>
    set((state) => ({
      members: [
        ...state.members,
        {
          id: `member-${Date.now()}`,
          userId: `user-${Date.now()}`,
          user: {
            id: `user-${Date.now()}`,
            phone: `+90${phone.replace(/\D/g, '')}`,
            firstName: name,
            lastName: surname,
            userType: 'student' as const,
            approvalStatus: 'approved' as const,
            isPremium: false,
            createdAt: new Date().toISOString(),
          },
          status: 'active' as const,
          joinedAt: new Date().toISOString(),
        },
      ],
    })),

  removeMember: (id) =>
    set((state) => ({
      members: state.members.filter((m) => m.id !== id),
    })),

  approveMember: (id) =>
    set((state) => ({
      members: state.members.map((m) => (m.id === id ? { ...m, status: 'active' as const } : m)),
    })),

  rejectMember: (id) =>
    set((state) => ({
      members: state.members.map((m) => (m.id === id ? { ...m, status: 'rejected' as const } : m)),
    })),

  approveEnrollment: (id) =>
    set((state) => ({
      enrollmentRequests: state.enrollmentRequests.map((e) =>
        e.id === id ? { ...e, status: 'approved' as const } : e
      ),
    })),

  rejectEnrollment: (id) =>
    set((state) => ({
      enrollmentRequests: state.enrollmentRequests.map((e) =>
        e.id === id ? { ...e, status: 'rejected' as const } : e
      ),
    })),

  approveMakeup: (id) =>
    set((state) => ({
      makeupRequests: state.makeupRequests.map((r) =>
        r.id === id ? { ...r, status: 'approved' as const } : r
      ),
    })),

  rejectMakeup: (id) =>
    set((state) => ({
      makeupRequests: state.makeupRequests.map((r) =>
        r.id === id ? { ...r, status: 'rejected' as const } : r
      ),
    })),

  approveCancellation: (id) =>
    set((state) => ({
      cancellationRequests: state.cancellationRequests.map((r) =>
        r.id === id ? { ...r, status: 'approved' as const } : r
      ),
    })),

  rejectCancellation: (id) =>
    set((state) => ({
      cancellationRequests: state.cancellationRequests.map((r) =>
        r.id === id ? { ...r, status: 'rejected' as const } : r
      ),
    })),
})
