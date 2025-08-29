"use client";

import React, { createContext, useContext, useMemo } from 'react'
import { useAccessDecision, ACCESS_STATUS } from './index.js'

const MonetaContext = createContext({ publishableKey: undefined })

export function MonetaProvider({ publishableKey, children }) {
  const value = useMemo(() => ({ publishableKey }), [publishableKey])
  return <MonetaContext.Provider value={value}>{children}</MonetaContext.Provider>
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

export function UpgradeButton({ href = '/pricing', label = 'Pay to unlock' }) {
  return (
    <a href={href} className="moneta-btn">
      {label}
    </a>
  )
}

export function PaywallOverlay({ children, href = '/pricing', label = 'Pay to unlock', className = '' }) {
  return (
    <div className={`moneta-overlay ${className}`}>
      <div className="moneta-blur">
        {children}
      </div>
      <div className="moneta-overlay-backdrop">
        <div>
          <UpgradeButton href={href} label={label} />
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

export function AccessBanner({ status, expiresAt }) {
  if (!status || status === ACCESS_STATUS.OK) return null
  const base = 'rounded-md px-3 py-2 text-sm mb-3'
  switch (status) {
    case ACCESS_STATUS.EXPIRING_SOON:
      return (
        <div className={`${base} bg-amber-50 text-amber-800 border border-amber-200`}>
          Your access is expiring soon{expiresAt ? ` (by ${new Date(expiresAt).toLocaleDateString()})` : ''}.
        </div>
      )
    case ACCESS_STATUS.EXPIRED:
      return (
        <div className={`${base} bg-red-50 text-red-700 border border-red-200`}>
          Your membership has expired. Please renew to continue.
        </div>
      )
    case ACCESS_STATUS.NO_CONTENT:
      return (
        <div className={`${base} bg-gray-50 text-gray-700 border border-gray-200`}>
          No content available yet.
        </div>
      )
    case ACCESS_STATUS.SOFT_BLOCKED:
      return (
        <div className={`${base} bg-blue-50 text-blue-700 border border-blue-200`}>
          Limited preview mode.
        </div>
      )
    case ACCESS_STATUS.QUOTA_EXCEEDED:
      return (
        <div className={`${base} bg-purple-50 text-purple-700 border border-purple-200`}>
          You have reached your quota. Please upgrade your plan.
        </div>
      )
    case ACCESS_STATUS.BLOCKED:
    default:
      return (
        <div className={`${base} bg-red-50 text-red-700 border border-red-200`}>
          Access denied. Please upgrade to view this content.
        </div>
      )
  }
}

export function EmptyPlaceholder({ title = 'Nothing here yet', description = 'Come back later for new content.' }) {
  return (
    <div className="rounded-md border border-dashed p-6 text-center text-sm text-neutral-500">
      <div className="font-medium mb-1">{title}</div>
      <div>{description}</div>
    </div>
  )
}


