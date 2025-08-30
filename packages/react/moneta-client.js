"use client";

import React, { createContext, useContext, useMemo, useState } from 'react'
import { useAccessDecision, ACCESS_STATUS } from './index.js'

const MonetaContext = createContext({ publishableKey: undefined })

export function MonetaProvider({ publishableKey, theme, children }) {
  const value = useMemo(() => ({ publishableKey }), [publishableKey])
  const content = (
    <MonetaContext.Provider value={value}>{children}</MonetaContext.Provider>
  )
  if (theme) {
    return <div data-moneta-theme={theme}>{content}</div>
  }
  return content
}

export function useMonetaContext() {
  return useContext(MonetaContext)
}

export function MonetaGate({ children }) {
  const { isAllowed, status } = useAccessDecision()
  if (status === 'checking') return null
  if (!isAllowed) return null
  return <>{children}</>
}

export function MonetaStatus() {
  const { isAllowed, status, reason } = useAccessDecision()
  if (status === 'checking') return <div className="text-sm">Checking access…</div>
  if (!isAllowed) return (
    <div className="rounded border border-red-300 dark:border-red-600 bg-red-50/70 dark:bg-red-900/20 p-3 text-sm">
      Access denied: {reason}
    </div>
  )
  return null
}

export function useMoneta(options = {}) {
  // Alias for readability in app code
  const ctx = useMonetaContext()
  return useAccessDecision({ ...options, publishableKey: ctx.publishableKey })
}

export function UpgradeModal({ open, onClose, onCheckout = undefined, href = '/pricing', plans = [
  { id: 'basic', name: 'Basic', priceMonthly: 9, priceYearly: 90 },
  { id: 'pro', name: 'Pro', priceMonthly: 29, priceYearly: 290 },
  { id: 'team', name: 'Team', priceMonthly: 99, priceYearly: 990 },
], defaultPlan = 'pro', defaultCycle = 'monthly' }) {
  const [planId, setPlanId] = useState(defaultPlan)
  const [cycle, setCycle] = useState(defaultCycle) // 'monthly' | 'yearly'
  const price = (() => {
    const p = plans.find(p => p.id === planId)
    if (!p) return 0
    return cycle === 'monthly' ? p.priceMonthly : p.priceYearly
  })()
  const [method, setMethod] = useState('card') // 'card' | 'paypal'
  const [card, setCard] = useState({ name: '', number: '', exp: '', cvc: '' })
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-5 shadow-xl">
        <div className="text-base font-semibold mb-3">Upgrade your plan</div>
        <p className="text-sm text-gray-600 mb-4">Unlock full access and higher limits. Choose a plan and complete your upgrade.</p>

        <div className="space-y-3 mb-4">
          <div>
            <div className="text-sm font-medium mb-2">Billing cycle</div>
            <div className="flex gap-2">
              <button type="button" className={`px-3 py-1.5 rounded border text-sm ${cycle==='monthly'?'bg-blue-50 border-blue-200 text-blue-700':'border-gray-200'}`} onClick={()=>setCycle('monthly')}>Monthly</button>
              <button type="button" className={`px-3 py-1.5 rounded border text-sm ${cycle==='yearly'?'bg-blue-50 border-blue-200 text-blue-700':'border-gray-200'}`} onClick={()=>setCycle('yearly')}>Yearly</button>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Plan</div>
            <div className="grid grid-cols-3 gap-2">
              {plans.map(p => (
                <button key={p.id} type="button" className={`px-3 py-2 rounded border text-sm text-left ${planId===p.id?'bg-blue-50 border-blue-200 text-blue-700':'border-gray-200'}`} onClick={()=>setPlanId(p.id)}>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-gray-600">{cycle==='monthly'?`$${p.priceMonthly}/mo`:`$${p.priceYearly}/yr`}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="text-sm font-medium">Payment method</div>
          <div className="flex gap-2 mb-2">
            <button type="button" className={`px-3 py-1.5 rounded border text-sm ${method==='card'?'bg-blue-50 border-blue-200 text-blue-700':'border-gray-200'}`} onClick={()=>setMethod('card')}>Card</button>
            <button type="button" className={`px-3 py-1.5 rounded border text-sm ${method==='paypal'?'bg-blue-50 border-blue-200 text-blue-700':'border-gray-200'}`} onClick={()=>setMethod('paypal')}>PayPal</button>
          </div>
          {method==='card' ? (
            <div className="grid grid-cols-2 gap-2">
              <input className="col-span-2 border border-gray-300 rounded px-3 py-2 text-sm" placeholder="Name on card" value={card.name} onChange={(e)=>setCard({...card, name:e.target.value})} />
              <input className="col-span-2 border border-gray-300 rounded px-3 py-2 text-sm" placeholder="Card number" value={card.number} onChange={(e)=>setCard({...card, number:e.target.value})} />
              <input className="border border-gray-300 rounded px-3 py-2 text-sm" placeholder="MM/YY" value={card.exp} onChange={(e)=>setCard({...card, exp:e.target.value})} />
              <input className="border border-gray-300 rounded px-3 py-2 text-sm" placeholder="CVC" value={card.cvc} onChange={(e)=>setCard({...card, cvc:e.target.value})} />
            </div>
          ) : (
            <div className="text-sm text-gray-600">You will be redirected to PayPal to complete your purchase.</div>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span>Total</span>
          <span className="font-semibold text-gray-900">${price}{cycle==='monthly'?'/mo':'/yr'}</span>
        </div>

        <div className="flex justify-end gap-2">
          <button className="rounded border px-3 py-1.5 text-sm" onClick={onClose}>Cancel</button>
          <button
            className="rounded bg-blue-600 text-white px-3 py-1.5 text-sm hover:bg-blue-700"
            onClick={() => {
              const payload = { planId, cycle, method, card }
              if (onCheckout) { onCheckout(payload); return }
              if (href) window.location.href = href
            }}
          >
            Pay now
          </button>
        </div>
      </div>
    </div>
  )
}

export function UpgradeButton({ href = '/pricing', label = 'Pay to unlock', className = '', mode = 'link', onCheckout = undefined } = {}) {
  const [open, setOpen] = useState(false)
  if (mode === 'modal') {
    return (
      <>
        <button
          type="button"
          data-moneta="upgrade-button"
          className={`inline-flex items-center gap-2 rounded-md bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700 ${className}`}
          onClick={() => setOpen(true)}
        >
          {label}
        </button>
        <UpgradeModal open={open} onClose={() => setOpen(false)} onCheckout={onCheckout} href={href} />
      </>
    )
  }
  return (
    <a
      href={href}
      data-moneta="upgrade-button"
      className={`inline-flex items-center gap-2 rounded-md bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700 ${className}`}
    >
      {label}
    </a>
  )
}

export function PaywallOverlay({ children, href = '/pricing', label = 'Pay to unlock', className = '', backdropClassName = '', contentClassName = '', buttonClassName = '' }) {
  return (
    <div className={`relative ${className}`} data-moneta="paywall-overlay">
      <div className={`pointer-events-none blur-sm select-none ${contentClassName}`} data-moneta="blurred-content">
        {children}
      </div>
      <div className={`absolute inset-0 flex items-center justify-center ${backdropClassName}`} data-moneta="overlay-backdrop">
        <div className="rounded-md bg-black/40 px-4 py-3">
          <UpgradeButton href={href} label={label} className={buttonClassName} />
        </div>
      </div>
    </div>
  )
}

// Aggregated client facade for ergonomic imports
export const moneta = {
  Provider: MonetaProvider,
  PaywallOverlay,
  UpgradeButton,
  useMoneta,
}

export function UsageMeter({ used, limit }) {
  const ratio = limit > 0 ? Math.min(1, used / limit) : 0
  const pct = Math.round(ratio * 100)
  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between text-xs mb-1">
        <span>Usage</span>
        <span>{used} / {limit}</span>
      </div>
      <div className="h-2 w-full rounded bg-gray-200 overflow-hidden">
        <div className="h-2 bg-blue-600" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function UsageGate({ allowed, children, fallback }) {
  if (!allowed) return fallback ?? null
  return <>{children}</>
}

export function AccessBanner({ status, expiresAt, className = '' }) {
  if (!status || status === ACCESS_STATUS.OK) return null
  const base = 'rounded-md px-3 py-2 text-sm mb-3'
  switch (status) {
    case ACCESS_STATUS.EXPIRING_SOON:
      return (
        <div className={`${base} bg-amber-50 text-amber-800 border border-amber-200 ${className}`} data-moneta="banner" data-status="expiringSoon">
          Your access is expiring soon{expiresAt ? ` (by ${new Date(expiresAt).toLocaleDateString()})` : ''}.
        </div>
      )
    case ACCESS_STATUS.EXPIRED:
      return (
        <div className={`${base} bg-red-50 text-red-700 border border-red-200 ${className}`} data-moneta="banner" data-status="expired">
          Your membership has expired. Please renew to continue.
        </div>
      )
    case ACCESS_STATUS.NO_CONTENT:
      return (
        <div className={`${base} bg-gray-50 text-gray-700 border border-gray-200 ${className}`} data-moneta="banner" data-status="noContent">
          No content available yet.
        </div>
      )
    case ACCESS_STATUS.SOFT_BLOCKED:
      return (
        <div className={`${base} bg-blue-50 text-blue-700 border border-blue-200 ${className}`} data-moneta="banner" data-status="softBlocked">
          Limited preview mode.
        </div>
      )
    case ACCESS_STATUS.QUOTA_EXCEEDED:
      return (
        <div className={`${base} bg-purple-50 text-purple-700 border border-purple-200 ${className}`} data-moneta="banner" data-status="quotaExceeded">
          You have reached your quota. Please upgrade your plan.
        </div>
      )
    case ACCESS_STATUS.BLOCKED:
    default:
      return (
        <div className={`${base} bg-red-50 text-red-700 border border-red-200 ${className}`} data-moneta="banner" data-status="blocked">
          Access denied. Please upgrade to view this content.
        </div>
      )
  }
}

export function EmptyPlaceholder({ title = 'Nothing here yet', description = 'Come back later for new content.', className = '' }) {
  return (
    <div className={`rounded-md border border-dashed p-6 text-center text-sm text-neutral-500 ${className}`} data-moneta="empty">
      <div className="font-medium mb-1">{title}</div>
      <div>{description}</div>
    </div>
  )
}


