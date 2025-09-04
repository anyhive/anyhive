import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Demo domain map and canonical domain
const CANONICAL_DOMAIN = process.env.NEXT_PUBLIC_HOSTED_DOMAIN || 'anyhivepay.com'
const DOMAIN_MAP: Record<string, { tenantId: string }> = {
  'localhost:3100': { tenantId: 'tn_demo_local' },
  [CANONICAL_DOMAIN]: { tenantId: 'tn_demo_local' },
}

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const match = DOMAIN_MAP[host]
  // Redirect to canonical domain if needed (keep path/query)
  if (host !== CANONICAL_DOMAIN && !host.startsWith('localhost') && request.nextUrl.hostname !== CANONICAL_DOMAIN) {
    const url = request.nextUrl.clone()
    url.hostname = CANONICAL_DOMAIN
    url.protocol = 'https:'
    return NextResponse.redirect(url, 308)
  }
  const response = NextResponse.next()
  if (match) {
    response.headers.set('x-anyhive-tenant', match.tenantId)
  }
  return response
}

export const config = {
  matcher: ['/checkout/:path*', '/portal/:path*']
}


