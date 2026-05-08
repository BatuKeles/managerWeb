import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const packages = await prisma.package.findMany({ orderBy: { sortOrder: 'asc' } })
    return NextResponse.json(packages)
  } catch (e) {
    console.error('[admin/packages GET]', e)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body?.name || body?.price === undefined) {
      return NextResponse.json({ error: 'name ve price zorunlu' }, { status: 400 })
    }
    const pkg = await prisma.package.create({
      data: {
        name: String(body.name),
        type: String(body.type || 'aylik'),
        price: body.price,
        features: body.features ?? [],
        isActive: body.isActive !== false,
        sortOrder: Number(body.sortOrder ?? 0),
      },
    })
    return NextResponse.json(pkg)
  } catch (e) {
    console.error('[admin/packages POST]', e)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
