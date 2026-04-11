import type { StateCreator } from 'zustand'
import type { Session, SessionOccurrence } from '../../types'
import { mockSessions, mockOccurrences } from '../../data/sessions'

export interface SessionsSlice {
  sessions: Session[]
  occurrences: SessionOccurrence[]
  addSession: (session: Session) => void
  cancelOccurrence: (id: string) => void
}

export const createSessionsSlice: StateCreator<SessionsSlice, [], [], SessionsSlice> = (set) => ({
  sessions: mockSessions,
  occurrences: mockOccurrences,

  addSession: (session) =>
    set((state) => ({
      sessions: [...state.sessions, session],
    })),

  cancelOccurrence: (id) =>
    set((state) => ({
      occurrences: state.occurrences.map((o) =>
        o.id === id ? { ...o, status: 'cancelled' as const } : o
      ),
    })),
})
