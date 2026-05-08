import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getIO } from '@/lib/socket'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    const visitorName = (body?.visitorName || '').toString().trim().slice(0, 80)
    if (!visitorName) {
      return NextResponse.json({ error: 'İsim gerekli' }, { status: 400 })
    }

    const session = await prisma.chatSession.create({
      data: { visitorName, status: 'waiting' },
    })

    // Broadcast new session to admin room (if any admins are connected)
    const io = getIO()
    io?.to('admin').emit('session:new', { sessionId: session.id, visitorName: session.visitorName })

    return NextResponse.json({ id: session.id, visitorName: session.visitorName, status: session.status })
  } catch (e) {
    console.error('[chat/session POST]', e)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
