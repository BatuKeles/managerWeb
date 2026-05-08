import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { signAdminToken, COOKIE_NAME, COOKIE_OPTIONS } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    const username = (body?.username || '').toString().trim()
    const password = (body?.password || '').toString()

    if (!username || !password) {
      return NextResponse.json({ error: 'Kullanıcı adı ve parola gerekli' }, { status: 400 })
    }

    const user = await prisma.adminUser.findUnique({ where: { username } })
    if (!user) {
      return NextResponse.json({ error: 'Geçersiz kullanıcı adı veya parola' }, { status: 401 })
    }

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) {
      return NextResponse.json({ error: 'Geçersiz kullanıcı adı veya parola' }, { status: 401 })
    }

    const token = await signAdminToken({ id: user.id, username: user.username })

    const res = NextResponse.json({ ok: true, username: user.username })
    res.cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS)
    return res
  } catch (e) {
    console.error('[Login]', e)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
