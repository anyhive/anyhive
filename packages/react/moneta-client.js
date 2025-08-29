"use client";

import React, { createContext, useContext, useMemo } from 'react'
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

export function UpgradeButton({ href = '/pricing', label = 'Pay to unlock', className = '' }) {
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


