import type { StateCreator } from 'zustand'
import type { StudentPayment, ClubExpense } from '../../types'
import { mockPayments, mockExpenses } from '../../data/finances'

export interface FinancesSlice {
  payments: StudentPayment[]
  expenses: ClubExpense[]
  addPayment: (payment: StudentPayment) => void
  removePayment: (id: string) => void
  addExpense: (expense: ClubExpense) => void
  removeExpense: (id: string) => void
}

export const createFinancesSlice: StateCreator<FinancesSlice, [], [], FinancesSlice> = (set) => ({
  payments: mockPayments,
  expenses: mockExpenses,

  addPayment: (payment) =>
    set((state) => ({
      payments: [...state.payments, payment],
    })),

  removePayment: (id) =>
    set((state) => ({
      payments: state.payments.filter((p) => p.id !== id),
    })),

  addExpense: (expense) =>
    set((state) => ({
      expenses: [...state.expenses, expense],
    })),

  removeExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((e) => e.id !== id),
    })),
})
