import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const sessions = await prisma.chatSession.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        _count: { select: { messages: true } },
        messages: { orderBy: { createdAt: 'desc' }, take: 1, select: { createdAt: true } },
      },
    })
    return NextResponse.json(
      sessions.map((s) => ({
        id: s.id,
        visitorName: s.visitorName,
        status: s.status,
        createdAt: s.createdAt.toISOString(),
        updatedAt: (s.messages[0]?.createdAt || s.createdAt).toISOString(),
        messageCount: s._count.messages,
      })),
    )
  } catch (e) {
    console.error('[admin/chat/sessions GET]', e)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
