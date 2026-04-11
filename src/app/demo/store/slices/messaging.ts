import type { StateCreator } from 'zustand'
import type { MessageTemplate } from '../../types'
import { mockTemplates } from '../../data/messaging'

export interface MessagingSlice {
  templates: MessageTemplate[]
  toggleTemplate: (id: string) => void
  updateTemplate: (id: string, text: string) => void
  addTemplate: (template: MessageTemplate) => void
  removeTemplate: (id: string) => void
  updateTemplateName: (id: string, name: string) => void
}

export const createMessagingSlice: StateCreator<MessagingSlice, [], [], MessagingSlice> = (set) => ({
  templates: mockTemplates,

  toggleTemplate: (id) =>
    set((state) => ({
      templates: state.templates.map((t) =>
        t.id === id ? { ...t, isActive: !t.isActive } : t
      ),
    })),

  updateTemplate: (id, text) =>
    set((state) => ({
      templates: state.templates.map((t) =>
        t.id === id ? { ...t, templateText: text } : t
      ),
    })),

  addTemplate: (template) =>
    set((state) => ({
      templates: [...state.templates, template],
    })),

  removeTemplate: (id) =>
    set((state) => ({
      templates: state.templates.filter((t) => t.id !== id),
    })),

  updateTemplateName: (id, name) =>
    set((state) => ({
      templates: state.templates.map((t) =>
        t.id === id ? { ...t, name } : t
      ),
    })),
})
