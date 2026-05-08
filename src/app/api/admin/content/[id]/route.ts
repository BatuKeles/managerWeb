import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10)
    if (Number.isNaN(id)) return NextResponse.json({ error: 'Geçersiz id' }, { status: 400 })

    const body = await req.json().catch(() => null)
    const data: Record<string, unknown> = {}
    if (body?.value !== undefined) data.value = String(body.value)
    if (body?.type !== undefined) data.type = String(body.type)
    if (body?.role !== undefined) data.role = body.role ? String(body.role) : null
    if (body?.section !== undefined) data.section = body.section ? String(body.section) : null

    const block = await prisma.contentBlock.update({ where: { id }, data })
    return NextResponse.json(block)
  } catch (e) {
    console.error('[admin/content PUT]', e)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10)
    if (Number.isNaN(id)) return NextResponse.json({ error: 'Geçersiz id' }, { status: 400 })
    await prisma.contentBlock.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[admin/content DELETE]', e)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
