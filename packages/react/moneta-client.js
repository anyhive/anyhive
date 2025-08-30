"use client";

import React, { createContext, useContext, useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@moneta-kit/ui/components/dialog'
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
  if (status === 'checking') return <div className="moneta:text-sm">Checking access…</div>
  if (!isAllowed) return (
    <div className="moneta:rounded moneta:border moneta:border-red-300 moneta:dark:border-red-600 moneta:bg-red-50/70 moneta:dark:bg-red-900/20 moneta:p-3 moneta:text-sm">
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
  return (
    <Dialog open={!!open} onOpenChange={(v)=>{ if(!v && onClose) onClose() }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Upgrade your plan</DialogTitle>
          <DialogDescription>
            Unlock full access and higher limits. Choose a plan and complete your upgrade.
          </DialogDescription>
        </DialogHeader>

        <div className="moneta:space-y-3 moneta:mb-2">
          <div>
            <div className="moneta:text-sm moneta:font-medium moneta:mb-2">Billing cycle</div>
            <div className="moneta:flex moneta:gap-2">
              <button type="button" className={`moneta:px-3 moneta:py-1.5 moneta:rounded moneta:border moneta:text-sm ${cycle==='monthly'?'moneta:bg-blue-50 moneta:border-blue-200 moneta:text-blue-700':'moneta:border-gray-200'}`} onClick={()=>setCycle('monthly')}>Monthly</button>
              <button type="button" className={`moneta:px-3 moneta:py-1.5 moneta:rounded moneta:border moneta:text-sm ${cycle==='yearly'?'moneta:bg-blue-50 moneta:border-blue-200 moneta:text-blue-700':'moneta:border-gray-200'}`} onClick={()=>setCycle('yearly')}>Yearly</button>
            </div>
          </div>
          <div>
            <div className="moneta:text-sm moneta:font-medium moneta:mb-2">Plan</div>
            <div className="moneta:grid moneta:grid-cols-3 moneta:gap-2">
              {plans.map(p => (
                <button key={p.id} type="button" className={`moneta:px-3 moneta:py-2 moneta:rounded moneta:border moneta:text-sm moneta:text-left ${planId===p.id?'moneta:bg-blue-50 moneta:border-blue-200 moneta:text-blue-700':'moneta:border-gray-200'}`} onClick={()=>setPlanId(p.id)}>
                  <div className="moneta:font-medium">{p.name}</div>
                  <div className="moneta:text-xs moneta:text-gray-600">{cycle==='monthly'?`$${p.priceMonthly}/mo`:`$${p.priceYearly}/yr`}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="moneta:space-y-3 moneta:mb-2">
          <div className="moneta:text-sm moneta:font-medium">Payment method</div>
          <div className="moneta:flex moneta:gap-2 moneta:mb-2">
            <button type="button" className={`moneta:px-3 moneta:py-1.5 moneta:rounded moneta:border moneta:text-sm ${method==='card'?'moneta:bg-blue-50 moneta:border-blue-200 moneta:text-blue-700':'moneta:border-gray-200'}`} onClick={()=>setMethod('card')}>Card</button>
            <button type="button" className={`moneta:px-3 moneta:py-1.5 moneta:rounded moneta:border moneta:text-sm ${method==='paypal'?'moneta:bg-blue-50 moneta:border-blue-200 moneta:text-blue-700':'moneta:border-gray-200'}`} onClick={()=>setMethod('paypal')}>PayPal</button>
          </div>
          {method==='card' ? (
            <div className="moneta:grid moneta:grid-cols-2 moneta:gap-2">
              <input className="moneta:col-span-2 moneta:border moneta:border-gray-300 moneta:rounded moneta:px-3 moneta:py-2 moneta:text-sm" placeholder="Name on card" value={card.name} onChange={(e)=>setCard({...card, name:e.target.value})} />
              <input className="moneta:col-span-2 moneta:border moneta:border-gray-300 moneta:rounded moneta:px-3 moneta:py-2 moneta:text-sm" placeholder="Card number" value={card.number} onChange={(e)=>setCard({...card, number:e.target.value})} />
              <input className="moneta:border moneta:border-gray-300 moneta:rounded moneta:px-3 moneta:py-2 moneta:text-sm" placeholder="MM/YY" value={card.exp} onChange={(e)=>setCard({...card, exp:e.target.value})} />
              <input className="moneta:border moneta:border-gray-300 moneta:rounded moneta:px-3 moneta:py-2 moneta:text-sm" placeholder="CVC" value={card.cvc} onChange={(e)=>setCard({...card, cvc:e.target.value})} />
            </div>
          ) : (
            <div className="moneta:text-sm moneta:text-gray-600">You will be redirected to PayPal to complete your purchase.</div>
          )}
        </div>

        <div className="moneta:flex moneta:items-center moneta:justify-between moneta:text-sm moneta:text-gray-600 moneta:mb-2">
          <span>Total</span>
          <span className="moneta:font-semibold moneta:text-gray-900">${price}{cycle==='monthly'?'/mo':'/yr'}</span>
        </div>
        <DialogFooter>
          <button className="moneta:rounded moneta:border moneta:px-3 moneta:py-1.5 moneta:text-sm" onClick={onClose}>Cancel</button>
          <button
            className="moneta:rounded moneta:bg-blue-600 moneta:text-white moneta:px-3 moneta:py-1.5 moneta:text-sm moneta:hover:bg-blue-700"
            onClick={() => {
              const payload = { planId, cycle, method, card }
              if (onCheckout) { onCheckout(payload); return }
              if (href) window.location.href = href
            }}
          >
            Pay now
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
          className={`moneta:inline-flex moneta:items-center moneta:gap-2 moneta:rounded-md moneta:bg-blue-600 moneta:text-white moneta:px-3 moneta:py-2 moneta:text-sm moneta:hover:bg-blue-700 ${className}`}
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
      className={`moneta:inline-flex moneta:items-center moneta:gap-2 moneta:rounded-md moneta:bg-blue-600 moneta:text-white moneta:px-3 moneta:py-2 moneta:text-sm moneta:hover:bg-blue-700 ${className}`}
    >
      {label}
    </a>
  )
}

export function PaywallOverlay({ children, href = '/pricing', label = 'Pay to unlock', className = '', backdropClassName = '', contentClassName = '', buttonClassName = '' }) {
  return (
    <div className={`moneta:relative ${className}`} data-moneta="paywall-overlay">
      <div className={`moneta:pointer-events-none moneta:blur-sm moneta:select-none ${contentClassName}`} data-moneta="blurred-content">
        {children}
      </div>
      <div className={`moneta:absolute moneta:inset-0 moneta:flex moneta:items-center moneta:justify-center ${backdropClassName}`} data-moneta="overlay-backdrop">
        <div className="moneta:rounded-md moneta:bg-black/40 moneta:px-4 moneta:py-3">
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
    <div className="moneta:w-full moneta:max-w-md">
      <div className="moneta:flex moneta:justify-between moneta:text-xs moneta:mb-1">
        <span>Usage</span>
        <span>{used} / {limit}</span>
      </div>
      <div className="moneta:h-2 moneta:w-full moneta:rounded moneta:bg-gray-200 moneta:overflow-hidden">
        <div className="moneta:h-2 moneta:bg-blue-600" style={{ width: `${pct}%` }} />
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
  const base = 'moneta:rounded-md moneta:px-3 moneta:py-2 moneta:text-sm moneta:mb-3'
  switch (status) {
    case ACCESS_STATUS.EXPIRING_SOON:
      return (
        <div className={`${base} moneta:bg-amber-50 moneta:text-amber-800 moneta:border moneta:border-amber-200 ${className}`} data-moneta="banner" data-status="expiringSoon">
          Your access is expiring soon{expiresAt ? ` (by ${new Date(expiresAt).toLocaleDateString()})` : ''}.
        </div>
      )
    case ACCESS_STATUS.EXPIRED:
      return (
        <div className={`${base} moneta:bg-red-50 moneta:text-red-700 moneta:border moneta:border-red-200 ${className}`} data-moneta="banner" data-status="expired">
          Your membership has expired. Please renew to continue.
        </div>
      )
    case ACCESS_STATUS.NO_CONTENT:
      return (
        <div className={`${base} moneta:bg-gray-50 moneta:text-gray-700 moneta:border moneta:border-gray-200 ${className}`} data-moneta="banner" data-status="noContent">
          No content available yet.
        </div>
      )
    case ACCESS_STATUS.SOFT_BLOCKED:
      return (
        <div className={`${base} moneta:bg-blue-50 moneta:text-blue-700 moneta:border moneta:border-blue-200 ${className}`} data-moneta="banner" data-status="softBlocked">
          Limited preview mode.
        </div>
      )
    case ACCESS_STATUS.QUOTA_EXCEEDED:
      return (
        <div className={`${base} moneta:bg-purple-50 moneta:text-purple-700 moneta:border moneta:border-purple-200 ${className}`} data-moneta="banner" data-status="quotaExceeded">
          You have reached your quota. Please upgrade your plan.
        </div>
      )
    case ACCESS_STATUS.BLOCKED:
    default:
      return (
        <div className={`${base} moneta:bg-red-50 moneta:text-red-700 moneta:border moneta:border-red-200 ${className}`} data-moneta="banner" data-status="blocked">
          Access denied. Please upgrade to view this content.
        </div>
      )
  }
}

export function EmptyPlaceholder({ title = 'Nothing here yet', description = 'Come back later for new content.', className = '' }) {
  return (
    <div className={`moneta:rounded-md moneta:border moneta:border-dashed moneta:p-6 moneta:text-center moneta:text-sm moneta:text-neutral-500 ${className}`} data-moneta="empty">
      <div className="moneta:font-medium moneta:mb-1">{title}</div>
      <div>{description}</div>
    </div>
  )
}


