import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const blocks = await prisma.contentBlock.findMany({ orderBy: { key: 'asc' } })
    return NextResponse.json(blocks)
  } catch (e) {
    console.error('[admin/content GET]', e)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    const key = (body?.key || '').toString().trim()
    const value = (body?.value || '').toString()
    const type = (body?.type || 'text').toString().trim()
    const role = body?.role ? String(body.role) : null
    const section = body?.section ? String(body.section) : null

    if (!key) return NextResponse.json({ error: 'Key gerekli' }, { status: 400 })

    const block = await prisma.contentBlock.upsert({
      where: { key },
      create: { key, value, type, role, section },
      update: { value, type, role, section },
    })
    return NextResponse.json(block)
  } catch (e) {
    console.error('[admin/content POST]', e)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
