import { SignJWT, jwtVerify, type JWTPayload as JoseJWTPayload } from 'jose'

const SECRET = process.env.JWT_SECRET || ''
const SECRET_BYTES = SECRET ? new TextEncoder().encode(SECRET) : null
const TOKEN_TTL = '7d'
export const COOKIE_NAME = 'kb_admin_token'

export interface AdminTokenPayload extends JoseJWTPayload {
  sub: string
  username: string
  role: 'admin'
}

function ensureSecret(): Uint8Array {
  if (!SECRET_BYTES) {
    throw new Error('JWT_SECRET environment variable is not set')
  }
  if (SECRET.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters')
  }
  return SECRET_BYTES
}

export async function signAdminToken(payload: { id: string | number; username: string }): Promise<string> {
  const key = ensureSecret()
  return new SignJWT({ username: payload.username, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(String(payload.id))
    .setIssuedAt()
    .setExpirationTime(TOKEN_TTL)
    .sign(key)
}

export async function verifyAdminToken(token: string): Promise<AdminTokenPayload | null> {
  if (!token) return null
  try {
    const key = ensureSecret()
    const { payload } = await jwtVerify(token, key)
    if (payload.role !== 'admin' || typeof payload.sub !== 'string' || typeof payload.username !== 'string') {
      return null
    }
    return payload as AdminTokenPayload
  } catch {
    return null
  }
}

export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 days
}
