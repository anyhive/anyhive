import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const tenantId = url.searchParams.get('tenantId') || 'tn_demo_local'
  // Demo brand config
  const brand = {
    tenantId,
    logoUrl: 'https://dummyimage.com/120x32/111827/ffffff&text=Anyhive',
    primary: '#111827',
    accent: '#2563eb',
    name: 'Demo Store',
  }
  return NextResponse.json(brand)
}


