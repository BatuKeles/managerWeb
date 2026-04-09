export type Role = 'veli' | 'kulup' | 'ogrenci' | 'antrenor'

export interface ContentBlock {
  id: number
  key: string
  type: 'text' | 'image' | 'html'
  value: string | null
  role: string | null
  section: string | null
  updatedAt: string
}

export interface Package {
  id: number
  type: 'aylik' | 'senlik'
  name: string
  price: number | null
  features: string[]
  isActive: boolean
  sortOrder: number
}

export interface AdminUser {
  id: number
  username: string
  createdAt: string
}

export interface ChatSession {
  id: string
  visitorName: string | null
  status: 'waiting' | 'active' | 'closed'
  createdAt: string
  messages?: ChatMessage[]
  _count?: { messages: number }
}

export interface ChatMessage {
  id: number
  sessionId: string
  senderType: 'visitor' | 'admin'
  message: string
  createdAt: string
  readAt: string | null
}

export interface JWTPayload {
  userId: number
  username: string
}
