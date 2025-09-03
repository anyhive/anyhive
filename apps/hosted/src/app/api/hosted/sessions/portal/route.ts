import { NextResponse } from 'next/server'
import { portalSessions } from '@/lib/session-store'

function randomId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 12)}`
}

export async function POST(request: Request) {
  const host = request.headers.get('host') || process.env.NEXT_PUBLIC_HOSTED_DOMAIN || 'anyhivepay.com'
  const protocol = host.startsWith('localhost') ? 'http' : 'https'
  const token = randomId('ps')
  const body = await request.json().catch(() => ({} as any))
  portalSessions.set(token, {
    customerId: body?.customerId ? String(body.customerId) : undefined,
    returnUrl: body?.returnUrl ? String(body.returnUrl) : undefined,
    createdAt: new Date().toISOString(),
    tenantId: 'tn_demo_local',
  })
  const sessionUrl = `${protocol}://${host}/portal/${token}`
  return NextResponse.json({ id: token, url: sessionUrl })
}


