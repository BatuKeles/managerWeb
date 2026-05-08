import { Server as SocketIOServer } from 'socket.io'
import type { Server as HTTPServer } from 'http'
import { prisma } from './db'

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
    // Join a chat session room
    socket.on('join:session', (sessionId: string) => {
      if (typeof sessionId === 'string' && sessionId.length < 100) {
        socket.join(`session:${sessionId}`)
      }
    })

    // Admin joins to monitor all sessions
    socket.on('join:admin', () => {
      socket.join('admin')
    })

    // Visitor sends a message — persist + broadcast
    socket.on('visitor:message', async (data: { sessionId: string; message: string }) => {
      const sessionId = (data?.sessionId || '').toString().trim()
      const message = (data?.message || '').toString().trim().slice(0, 2000)
      if (!sessionId || !message) return

      try {
        const session = await prisma.chatSession.findUnique({ where: { id: sessionId } })
        if (!session || session.status === 'closed') return

        const saved = await prisma.chatMessage.create({
          data: { sessionId, senderType: 'visitor', message },
        })

        if (session.status === 'waiting') {
          // first visitor message keeps it waiting; broadcast to admins
          io?.to('admin').emit('session:update', { sessionId, status: 'waiting' })
        }

        io?.to(`session:${sessionId}`).emit('message:new', {
          id: saved.id,
          sessionId,
          senderType: 'visitor',
          message: saved.message,
          createdAt: saved.createdAt.toISOString(),
        })
        io?.to('admin').emit('admin:newMessage', {
          sessionId,
          senderType: 'visitor',
          message: saved.message,
        })
      } catch (e) {
        console.error('[Socket] visitor:message persist failed', e)
      }
    })

    // Admin sends a message — persist + broadcast
    socket.on('admin:message', async (data: { sessionId: string; message: string }) => {
      const sessionId = (data?.sessionId || '').toString().trim()
      const message = (data?.message || '').toString().trim().slice(0, 2000)
      if (!sessionId || !message) return

      try {
        const session = await prisma.chatSession.findUnique({ where: { id: sessionId } })
        if (!session) return

        const saved = await prisma.chatMessage.create({
          data: { sessionId, senderType: 'admin', message },
        })

        if (session.status !== 'active') {
          await prisma.chatSession.update({
            where: { id: sessionId },
            data: { status: 'active' },
          })
          io?.to('admin').emit('session:update', { sessionId, status: 'active' })
        }

        io?.to(`session:${sessionId}`).emit('message:new', {
          id: saved.id,
          sessionId,
          senderType: 'admin',
          message: saved.message,
          createdAt: saved.createdAt.toISOString(),
        })
      } catch (e) {
        console.error('[Socket] admin:message persist failed', e)
      }
    })

    // Admin closes session
    socket.on('session:close', async (sessionId: string) => {
      if (typeof sessionId !== 'string') return
      try {
        await prisma.chatSession.update({
          where: { id: sessionId },
          data: { status: 'closed' },
        })
        io?.to(`session:${sessionId}`).emit('session:closed')
        io?.to('admin').emit('session:update', { sessionId, status: 'closed' })
      } catch (e) {
        console.error('[Socket] session:close failed', e)
      }
    })
  })

  return io
}

export function getIO(): SocketIOServer | null {
  return io
}
