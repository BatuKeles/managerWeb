import type { StateCreator } from 'zustand'
import type { ClubCoach, CoachInvitation, User } from '../../types'
import { mockCoaches, mockCoachInvitations } from '../../data/coaches'

export interface CoachesSlice {
  coaches: ClubCoach[]
  invitations: CoachInvitation[]
  toggleMessagePermission: (id: string) => void
  removeCoach: (id: string) => void
  approveInvitation: (id: string) => void
  addCoachInvitation: (data: { firstName: string; lastName: string; phone: string }) => void
}

export const createCoachesSlice: StateCreator<CoachesSlice, [], [], CoachesSlice> = (set) => ({
  coaches: mockCoaches,
  invitations: mockCoachInvitations,

  toggleMessagePermission: (id) =>
    set((state) => ({
      coaches: state.coaches.map((c) =>
        c.id === id ? { ...c, canSendMessages: !c.canSendMessages } : c
      ),
    })),

  removeCoach: (id) =>
    set((state) => ({
      coaches: state.coaches.map((c) =>
        c.id === id ? { ...c, status: 'removed' as const } : c
      ),
    })),

  approveInvitation: (id) =>
    set((state) => ({
      invitations: state.invitations.map((inv) =>
        inv.id === id ? { ...inv, status: 'accepted' as const } : inv
      ),
    })),

  addCoachInvitation: (data) =>
    set((state) => {
      const now = new Date()
      const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
      const newCoach: User = {
        id: `coach-${Date.now()}`,
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName,
        userType: 'coach',
        approvalStatus: 'pending',
        isPremium: false,
        createdAt: now.toISOString(),
      }
      const invitation: CoachInvitation = {
        id: `inv-${Date.now()}`,
        clubId: 'club-1',
        coachId: newCoach.id,
        coach: newCoach,
        status: 'pending',
        sentAt: now.toISOString(),
        expiresAt: expires.toISOString(),
      }
      const clubCoach: ClubCoach = {
        id: `cc-${Date.now()}`,
        clubId: 'club-1',
        coachId: newCoach.id,
        coach: newCoach,
        status: 'invited',
        canSendMessages: false,
      }
      return {
        coaches: [...state.coaches, clubCoach],
        invitations: [...state.invitations, invitation],
      }
    }),
})
