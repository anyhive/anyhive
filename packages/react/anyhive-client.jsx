"use client";

import React, { createContext, useContext, useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@anyhive-kit/ui/components/dialog'
import { useAccessDecision, ACCESS_STATUS } from './index.js'

const AnyhiveContext = createContext({ publishableKey: undefined })

export function AnyhiveProvider({ publishableKey, theme, children }) {
  const value = useMemo(() => ({ publishableKey }), [publishableKey])
  const content = (
    <AnyhiveContext.Provider value={value}>{children}</AnyhiveContext.Provider>
  )
  if (theme) {
    return <div data-anyhive-theme={theme}>{content}</div>
  }
  return content
}

export function useAnyhiveContext() {
  return useContext(AnyhiveContext)
}

export function AnyhiveGate({ children }) {
  const { isAllowed, status } = useAccessDecision()
  if (status === 'checking') return null
  if (!isAllowed) return null
  return <>{children}</>
}

export function AnyhiveStatus() {
  const { isAllowed, status, reason } = useAccessDecision()
  if (status === 'checking') return <div className="anyhive:text-sm">Checking access…</div>
  if (!isAllowed) return (
    <div className="anyhive:rounded anyhive:border anyhive:border-red-300 anyhive:dark:border-red-600 anyhive:bg-red-50/70 anyhive:dark:bg-red-900/20 anyhive:p-3 anyhive:text-sm">
      Access denied: {reason}
    </div>
  )
  return null
}

export function useAnyhive(options = {}) {
  // Alias for readability in app code
  const ctx = useAnyhiveContext()
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
      <DialogContent className="sm:max-w-lg bg-white dark:bg-slate-900">
        <DialogHeader>
          <DialogTitle>Upgrade your plan</DialogTitle>
          <DialogDescription>
            Unlock full access and higher limits. Choose a plan and complete your upgrade.
          </DialogDescription>
        </DialogHeader>

        <div className="anyhive:space-y-3 anyhive:mb-2">
          <div>
            <div className="anyhive:text-sm anyhive:font-medium anyhive:mb-2">Billing cycle</div>
            <div className="anyhive:flex anyhive:gap-2">
              <button type="button" className={`anyhive:px-3 anyhive:py-1.5 anyhive:rounded anyhive:border anyhive:text-sm ${cycle==='monthly'?'anyhive:bg-blue-50 anyhive:border-blue-200 anyhive:text-blue-700':'anyhive:border-gray-200'}`} onClick={()=>setCycle('monthly')}>Monthly</button>
              <button type="button" className={`anyhive:px-3 anyhive:py-1.5 anyhive:rounded anyhive:border anyhive:text-sm ${cycle==='yearly'?'anyhive:bg-blue-50 anyhive:border-blue-200 anyhive:text-blue-700':'anyhive:border-gray-200'}`} onClick={()=>setCycle('yearly')}>Yearly</button>
            </div>
          </div>
          <div>
            <div className="anyhive:text-sm anyhive:font-medium anyhive:mb-2">Plan</div>
            <div className="anyhive:grid anyhive:grid-cols-3 anyhive:gap-2">
              {plans.map(p => (
                <button key={p.id} type="button" className={`anyhive:px-3 anyhive:py-2 anyhive:rounded anyhive:border anyhive:text-sm anyhive:text-left ${planId===p.id?'anyhive:bg-blue-50 anyhive:border-blue-200 anyhive:text-blue-700':'anyhive:border-gray-200'}`} onClick={()=>setPlanId(p.id)}>
                  <div className="anyhive:font-medium">{p.name}</div>
                  <div className="anyhive:text-xs anyhive:text-gray-600">{cycle==='monthly'?`$${p.priceMonthly}/mo`:`$${p.priceYearly}/yr`}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="anyhive:space-y-3 anyhive:mb-2">
          <div className="anyhive:text-sm anyhive:font-medium">Payment method</div>
          <div className="anyhive:flex anyhive:gap-2 anyhive:mb-2">
            <button type="button" className={`anyhive:px-3 anyhive:py-1.5 anyhive:rounded anyhive:border anyhive:text-sm ${method==='card'?'anyhive:bg-blue-50 anyhive:border-blue-200 anyhive:text-blue-700':'anyhive:border-gray-200'}`} onClick={()=>setMethod('card')}>Card</button>
            <button type="button" className={`anyhive:px-3 anyhive:py-1.5 anyhive:rounded anyhive:border anyhive:text-sm ${method==='paypal'?'anyhive:bg-blue-50 anyhive:border-blue-200 anyhive:text-blue-700':'anyhive:border-gray-200'}`} onClick={()=>setMethod('paypal')}>PayPal</button>
          </div>
          {method==='card' ? (
            <div className="anyhive:grid anyhive:grid-cols-2 anyhive:gap-2">
              <input className="anyhive:col-span-2 anyhive:border anyhive:border-gray-300 anyhive:rounded anyhive:px-3 anyhive:py-2 anyhive:text-sm" placeholder="Name on card" value={card.name} onChange={(e)=>setCard({...card, name:e.target.value})} />
              <input className="anyhive:col-span-2 anyhive:border anyhive:border-gray-300 anyhive:rounded anyhive:px-3 anyhive:py-2 anyhive:text-sm" placeholder="Card number" value={card.number} onChange={(e)=>setCard({...card, number:e.target.value})} />
              <input className="anyhive:border anyhive:border-gray-300 anyhive:rounded anyhive:px-3 anyhive:py-2 anyhive:text-sm" placeholder="MM/YY" value={card.exp} onChange={(e)=>setCard({...card, exp:e.target.value})} />
              <input className="anyhive:border anyhive:border-gray-300 anyhive:rounded anyhive:px-3 anyhive:py-2 anyhive:text-sm" placeholder="CVC" value={card.cvc} onChange={(e)=>setCard({...card, cvc:e.target.value})} />
            </div>
          ) : (
            <div className="anyhive:text-sm anyhive:text-gray-600">You will be redirected to PayPal to complete your purchase.</div>
          )}
        </div>

        <div className="anyhive:flex anyhive:items-center anyhive:justify-between anyhive:text-sm anyhive:text-gray-600 anyhive:mb-2">
          <span>Total</span>
          <span className="anyhive:font-semibold anyhive:text-gray-900">${price}{cycle==='monthly'?'/mo':'/yr'}</span>
        </div>
        <DialogFooter>
          <button className="anyhive:rounded anyhive:border anyhive:px-3 anyhive:py-1.5 anyhive:text-sm" onClick={onClose}>Cancel</button>
          <button
            className="anyhive:rounded anyhive:bg-blue-600 anyhive:text-white anyhive:px-3 anyhive:py-1.5 anyhive:text-sm anyhive:hover:bg-blue-700"
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
          data-anyhive="upgrade-button"
          className={`anyhive:inline-flex anyhive:items-center anyhive:gap-2 anyhive:rounded-md anyhive:bg-blue-600 anyhive:text-white anyhive:px-3 anyhive:py-2 anyhive:text-sm anyhive:hover:bg-blue-700 ${className}`}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true) }}
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
      data-anyhive="upgrade-button"
      className={`anyhive:inline-flex anyhive:items-center anyhive:gap-2 anyhive:rounded-md anyhive:bg-blue-600 anyhive:text-white anyhive:px-3 anyhive:py-2 anyhive:text-sm anyhive:hover:bg-blue-700 ${className}`}
    >
      {label}
    </a>
  )
}

export function PaywallOverlay({ children, href = '/pricing', label = 'Pay to unlock', className = '', backdropClassName = '', contentClassName = '', buttonClassName = '' }) {
  return (
    <div className={`anyhive:relative ${className}`} data-anyhive="paywall-overlay">
      <div className={`anyhive:pointer-events-none anyhive:blur-sm anyhive:select-none ${contentClassName}`} data-anyhive="blurred-content">
        {children}
      </div>
      <div className={`anyhive:absolute anyhive:inset-0 anyhive:flex anyhive:items-center anyhive:justify-center ${backdropClassName}`} data-anyhive="overlay-backdrop">
        <div className="anyhive:rounded-md anyhive:bg-black/40 anyhive:px-4 anyhive:py-3">
          <UpgradeButton href={href} label={label} className={buttonClassName} />
        </div>
      </div>
    </div>
  )
}

// Aggregated client facade for ergonomic imports
export const anyhive = {
  Provider: AnyhiveProvider,
  PaywallOverlay,
  UpgradeButton,
  useAnyhive,
}

export function UsageMeter({ used, limit }) {
  const ratio = limit > 0 ? Math.min(1, used / limit) : 0
  const pct = Math.round(ratio * 100)
  return (
    <div className="anyhive:w-full anyhive:max-w-md">
      <div className="anyhive:flex anyhive:justify-between anyhive:text-xs anyhive:mb-1">
        <span>Usage</span>
        <span>{used} / {limit}</span>
      </div>
      <div className="anyhive:h-2 anyhive:w-full anyhive:rounded anyhive:bg-gray-200 anyhive:overflow-hidden">
        <div className="anyhive:h-2 anyhive:bg-blue-600" style={{ width: `${pct}%` }} />
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
  const base = 'anyhive:rounded-md anyhive:px-3 anyhive:py-2 anyhive:text-sm anyhive:mb-3'
  switch (status) {
    case ACCESS_STATUS.EXPIRING_SOON:
      return (
        <div className={`${base} anyhive:bg-amber-50 anyhive:text-amber-800 anyhive:border anyhive:border-amber-200 ${className}`} data-anyhive="banner" data-status="expiringSoon">
          Your access is expiring soon{expiresAt ? ` (by ${new Date(expiresAt).toLocaleDateString()})` : ''}.
        </div>
      )
    case ACCESS_STATUS.EXPIRED:
      return (
        <div className={`${base} anyhive:bg-red-50 anyhive:text-red-700 anyhive:border anyhive:border-red-200 ${className}`} data-anyhive="banner" data-status="expired">
          Your membership has expired. Please renew to continue.
        </div>
      )
    case ACCESS_STATUS.NO_CONTENT:
      return (
        <div className={`${base} anyhive:bg-gray-50 anyhive:text-gray-700 anyhive:border anyhive:border-gray-200 ${className}`} data-anyhive="banner" data-status="noContent">
          No content available yet.
        </div>
      )
    case ACCESS_STATUS.SOFT_BLOCKED:
      return (
        <div className={`${base} anyhive:bg-blue-50 anyhive:text-blue-700 anyhive:border anyhive:border-blue-200 ${className}`} data-anyhive="banner" data-status="softBlocked">
          Limited preview mode.
        </div>
      )
    case ACCESS_STATUS.QUOTA_EXCEEDED:
      return (
        <div className={`${base} anyhive:bg-purple-50 anyhive:text-purple-700 anyhive:border anyhive:border-purple-200 ${className}`} data-anyhive="banner" data-status="quotaExceeded">
          You have reached your quota. Please upgrade your plan.
        </div>
      )
    case ACCESS_STATUS.BLOCKED:
    default:
      return (
        <div className={`${base} anyhive:bg-red-50 anyhive:text-red-700 anyhive:border anyhive:border-red-200 ${className}`} data-anyhive="banner" data-status="blocked">
          Access denied. Please upgrade to view this content.
        </div>
      )
  }
}

export function EmptyPlaceholder({ title = 'Nothing here yet', description = 'Come back later for new content.', className = '' }) {
  return (
    <div className={`anyhive:rounded-md anyhive:border anyhive:border-dashed anyhive:p-6 anyhive:text-center anyhive:text-sm anyhive:text-neutral-500 ${className}`} data-anyhive="empty">
      <div className="anyhive:font-medium anyhive:mb-1">{title}</div>
      <div>{description}</div>
    </div>
  )
}


