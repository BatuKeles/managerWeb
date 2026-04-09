import { Server as SocketIOServer } from 'socket.io'
import type { Server as HTTPServer } from 'http'

let io: SocketIOServer | null = null

export function initSocket(httpServer: HTTPServer): SocketIOServer {
  if (io) return io

  io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    path: '/socket.io',
  })

  io.on('connection', (socket) => {
    console.log('[Socket] Client connected:', socket.id)

    // Join a chat session room
    socket.on('join:session', (sessionId: string) => {
      socket.join(`session:${sessionId}`)
      console.log(`[Socket] ${socket.id} joined session:${sessionId}`)
    })

    // Admin joins to monitor all sessions
    socket.on('join:admin', () => {
      socket.join('admin')
      console.log(`[Socket] Admin joined: ${socket.id}`)
    })

    // Visitor sends a message
    socket.on('visitor:message', async (data: { sessionId: string; message: string }) => {
      const { sessionId, message } = data

      // Broadcast to the session room (admin sees it)
      io?.to(`session:${sessionId}`).emit('message:new', {
        sessionId,
        senderType: 'visitor',
        message,
        createdAt: new Date().toISOString(),
      })

      // Notify all admins of new/updated session
      io?.to('admin').emit('session:update', { sessionId, status: 'waiting' })
    })

    // Admin sends a message
    socket.on('admin:message', async (data: { sessionId: string; message: string }) => {
      const { sessionId, message } = data

      // Broadcast to the session room (visitor sees it)
      io?.to(`session:${sessionId}`).emit('message:new', {
        sessionId,
        senderType: 'admin',
        message,
        createdAt: new Date().toISOString(),
      })

      // Update session status to active
      io?.to('admin').emit('session:update', { sessionId, status: 'active' })
    })

    // New session notification (called from API after creating session)
    socket.on('session:new', (data: { sessionId: string; visitorName: string }) => {
      io?.to('admin').emit('session:new', data)
    })

    // Admin closes session
    socket.on('session:close', (sessionId: string) => {
      io?.to(`session:${sessionId}`).emit('session:closed')
      io?.to('admin').emit('session:update', { sessionId, status: 'closed' })
    })

    socket.on('disconnect', () => {
      console.log('[Socket] Client disconnected:', socket.id)
    })
  })

  return io
}

export function getIO(): SocketIOServer | null {
  return io
}
