import type { StateCreator } from 'zustand'
import type { ClubPackage } from '../../types'
import { mockPackages } from '../../data/packages'

export interface PackagesSlice {
  packages: ClubPackage[]
  togglePopular: (id: string) => void
  addPackage: (pkg: ClubPackage) => void
  removePackage: (id: string) => void
  updatePackage: (id: string, data: Partial<ClubPackage>) => void
}

export const createPackagesSlice: StateCreator<PackagesSlice, [], [], PackagesSlice> = (set) => ({
  packages: mockPackages,

  togglePopular: (id) =>
    set((state) => ({
      packages: state.packages.map((p) =>
        p.id === id ? { ...p, isPopular: !p.isPopular } : p
      ),
    })),

  addPackage: (pkg) =>
    set((state) => ({
      packages: [...state.packages, pkg],
    })),

  removePackage: (id) =>
    set((state) => ({
      packages: state.packages.filter((p) => p.id !== id),
    })),

  updatePackage: (id, data) =>
    set((state) => ({
      packages: state.packages.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    })),
})
