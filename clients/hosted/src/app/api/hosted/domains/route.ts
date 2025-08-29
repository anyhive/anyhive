import { NextResponse } from 'next/server'

// In-memory demo store
const DOMAINS = new Map([
  ['localhost:3100', { tenantId: 'tn_demo_local', domain: 'localhost:3100' }],
])

export async function GET(request: Request) {
  const out = Array.from(DOMAINS.values())
  return NextResponse.json(out)
}

export async function POST(request: Request) {
  const body = await request.json()
  const domain = String(body?.domain || '')
  const tenantId = String(body?.tenantId || 'tn_demo_local')
  if (!domain) return NextResponse.json({ error: 'domain required' }, { status: 400 })
  DOMAINS.set(domain, { tenantId, domain })
  return NextResponse.json({ ok: true, domain, tenantId })
}


