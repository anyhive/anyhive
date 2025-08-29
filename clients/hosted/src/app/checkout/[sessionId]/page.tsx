import { headers } from 'next/headers'
import { checkoutSessions } from '@/lib/session-store'
async function fetchBrand(tenantId: string) {
  const hdrs = headers()
  const host = hdrs.get('host')
  const protocol = host && !host.startsWith('localhost') ? 'https' : 'http'
  const base = host ? `${protocol}://${host}` : ''
  const res = await fetch(`${base}/api/hosted/brand?tenantId=${tenantId}`, { cache: 'no-store' })
  return res.json()
}

export default async function CheckoutPage({ params }: { params: { sessionId: string } }) {
  // In real case, tenantId from middleware/request headers. Here we fallback to demo.
  const tenantId = 'tn_demo_local'
  const brand = await fetchBrand(tenantId)
  const payload = checkoutSessions.get(params.sessionId)
  return (
    <main className="min-h-screen flex items-center justify-center p-6" style={{ background: '#f9fafb' }}>
      <div className="w-full max-w-xl bg-white shadow rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="font-semibold">{brand.name}</div>
          <div className="text-xs text-gray-500">Session: {params.sessionId}</div>
        </div>
        <h1 className="text-xl font-bold mt-4">Checkout</h1>
        <p className="text-gray-600 text-sm">This is a demo hosted checkout page.</p>
        <div className="mt-4 text-sm text-gray-600">
          {payload && (
            <div className="border rounded-md p-3 bg-gray-50">
              <div>Amount: {payload.amount ?? '—'}</div>
              <div>Plan ID: {payload.planId ?? '—'}</div>
              <div>Return URL: {payload.returnUrl ?? '—'}</div>
            </div>
          )}
        </div>
        <div className="mt-6">
          <button className="px-4 py-2 rounded-md text-white" style={{ background: brand.accent }}>Pay now</button>
        </div>
      </div>
    </main>
  )
}


