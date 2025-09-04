import { headers } from 'next/headers'
import { portalSessions } from '@/lib/session-store'

async function fetchBrand(tenantId: string) {
  const hdrs = await headers()
  const host = hdrs.get('host')
  const protocol = host && !host.startsWith('localhost') ? 'https' : 'http'
  const base = host ? `${protocol}://${host}` : ''
  const res = await fetch(`${base}/api/hosted/brand?tenantId=${tenantId}`, { cache: 'no-store' })
  return res.json()
}

export default async function PortalPage({ params }: { params: Promise<{ customerId: string }> }) {
  const tenantId = 'tn_demo_local'
  const brand = await fetchBrand(tenantId)
  const { customerId } = await params
  const payload = portalSessions.get(customerId)
  return (
    <main className="min-h-screen flex items-center justify-center p-6" style={{ background: '#f9fafb' }}>
      <div className="w-full max-w-3xl bg-white shadow rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="font-semibold">{brand.name}</div>
          <div className="text-xs text-gray-500">Customer: {customerId}</div>
        </div>
        <h1 className="text-xl font-bold mt-4">Customer Portal</h1>
        <p className="text-gray-600 text-sm">Manage your subscriptions, billing details, and invoices.</p>
        {payload && (
          <div className="mt-4 text-sm text-gray-600 border rounded-md p-3 bg-gray-50">
            <div>Customer ID: {payload.customerId ?? '—'}</div>
            <div>Return URL: {payload.returnUrl ?? '—'}</div>
          </div>
        )}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <div className="font-medium">Subscription</div>
            <p className="text-sm text-gray-600">Pro plan — $29/month</p>
            <div className="mt-2 flex gap-2">
              <button className="px-3 py-1 rounded-md text-white" style={{ background: brand.accent }}>Change plan</button>
              <button className="px-3 py-1 rounded-md border">Cancel</button>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="font-medium">Billing</div>
            <p className="text-sm text-gray-600">Visa •••• 4242 — Next bill on 28th</p>
            <div className="mt-2 flex gap-2">
              <button className="px-3 py-1 rounded-md text-white" style={{ background: brand.accent }}>Update payment method</button>
              <button className="px-3 py-1 rounded-md border">View invoices</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


