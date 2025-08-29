"use client"

import { useState } from "react"

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [amount, setAmount] = useState("1999")
  const [planId, setPlanId] = useState("pro")
  const [returnUrl, setReturnUrl] = useState("")
  const [customerId, setCustomerId] = useState("cus_demo_123")

  const createAndGo = async (type: 'checkout' | 'portal') => {
    setLoading(true)
    setError("")
    try {
      const payload = type === 'checkout'
        ? { amount: Number(amount) || undefined, planId: planId || undefined, returnUrl: returnUrl || undefined }
        : { customerId: customerId || undefined, returnUrl: returnUrl || undefined }
      const res = await fetch(`/api/hosted/sessions/${type}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (data?.url) {
        window.location.href = data.url
      } else {
        setError('No URL returned')
      }
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center space-y-3">
        <h1 className="text-2xl font-semibold">Moneta Hosted</h1>
        <p className="text-gray-500">This service powers hosted checkout pages and customer portals.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
          <div className="border rounded-md p-3">
            <div className="font-medium mb-2">Checkout payload</div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Amount (minor units)
                <input className="border rounded px-2 py-1 w-full" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </label>
              <label className="text-sm">Plan ID
                <input className="border rounded px-2 py-1 w-full" value={planId} onChange={(e) => setPlanId(e.target.value)} />
              </label>
              <label className="text-sm">Return URL
                <input className="border rounded px-2 py-1 w-full" placeholder="https://yourapp.example.com/return" value={returnUrl} onChange={(e) => setReturnUrl(e.target.value)} />
              </label>
            </div>
          </div>
          <div className="border rounded-md p-3">
            <div className="font-medium mb-2">Portal payload</div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Customer ID
                <input className="border rounded px-2 py-1 w-full" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
              </label>
              <label className="text-sm">Return URL
                <input className="border rounded px-2 py-1 w-full" placeholder="https://yourapp.example.com/return" value={returnUrl} onChange={(e) => setReturnUrl(e.target.value)} />
              </label>
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-center pt-2">
          <button onClick={() => createAndGo('checkout')} disabled={loading} className="px-4 py-2 rounded-md text-white" style={{ background: '#111827' }}>
            {loading ? 'Creating…' : 'Create checkout session'}
          </button>
          <button onClick={() => createAndGo('portal')} disabled={loading} className="px-4 py-2 rounded-md text-white" style={{ background: '#2563eb' }}>
            {loading ? 'Creating…' : 'Create portal session'}
          </button>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    </main>
  )
}


