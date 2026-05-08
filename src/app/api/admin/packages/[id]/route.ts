import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10)
    if (Number.isNaN(id)) return NextResponse.json({ error: 'Geçersiz id' }, { status: 400 })

    const body = await req.json().catch(() => null)
    const data: Record<string, unknown> = {}
    if (body?.name !== undefined) data.name = String(body.name)
    if (body?.type !== undefined) data.type = String(body.type)
    if (body?.price !== undefined) data.price = body.price
    if (body?.features !== undefined) data.features = body.features
    if (body?.isActive !== undefined) data.isActive = Boolean(body.isActive)
    if (body?.sortOrder !== undefined) data.sortOrder = Number(body.sortOrder)

    const pkg = await prisma.package.update({ where: { id }, data })
    return NextResponse.json(pkg)
  } catch (e) {
    console.error('[admin/packages PUT]', e)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10)
    if (Number.isNaN(id)) return NextResponse.json({ error: 'Geçersiz id' }, { status: 400 })
    await prisma.package.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[admin/packages DELETE]', e)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
