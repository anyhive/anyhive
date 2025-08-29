import { NextResponse } from 'next/server'
import { checkoutSessions } from '@/lib/session-store'

function randomId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 12)}`
}

export async function POST(request: Request) {
  const host = request.headers.get('host') || process.env.NEXT_PUBLIC_HOSTED_DOMAIN || 'monetapay.com'
  const protocol = host.startsWith('localhost') ? 'http' : 'https'
  const token = randomId('cs')
  const body = await request.json().catch(() => ({} as any))
  checkoutSessions.set(token, {
    amount: body?.amount ? Number(body.amount) : undefined,
    planId: body?.planId ? String(body.planId) : undefined,
    returnUrl: body?.returnUrl ? String(body.returnUrl) : undefined,
    createdAt: new Date().toISOString(),
    tenantId: 'tn_demo_local',
  })
  const sessionUrl = `${protocol}://${host}/checkout/${token}`
  return NextResponse.json({ id: token, url: sessionUrl })
}


