import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/content — Fetch content blocks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    const section = searchParams.get('section')

    const where: Record<string, unknown> = {}
    if (role) where.role = role
    if (section) where.section = section

    const blocks = await prisma.contentBlock.findMany({ where })
    return NextResponse.json(blocks)
  } catch (error) {
    console.error('[Content GET]', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
