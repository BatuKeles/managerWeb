import type { StateCreator } from 'zustand'
import type { StockItem } from '../../types'
import { mockStockItems } from '../../data/stock'

export interface StockSlice {
  stockItems: StockItem[]
  updateStock: (id: string, quantity: number) => void
  addStockItem: (item: StockItem) => void
  removeStockItem: (id: string) => void
}

export const createStockSlice: StateCreator<StockSlice, [], [], StockSlice> = (set) => ({
  stockItems: mockStockItems,

  updateStock: (id, quantity) =>
    set((state) => ({
      stockItems: state.stockItems.map((item) =>
        item.id === id ? { ...item, stock: quantity } : item
      ),
    })),

  addStockItem: (item) =>
    set((state) => ({
      stockItems: [...state.stockItems, item],
    })),

  removeStockItem: (id) =>
    set((state) => ({
      stockItems: state.stockItems.filter((item) => item.id !== id),
    })),
})
