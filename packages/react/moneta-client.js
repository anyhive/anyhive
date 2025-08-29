"use client";

import React, { createContext, useContext, useMemo } from 'react'
import { useAccessDecision } from './index.js'

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

export function UpgradeButton({ href = '/pricing', label = 'Upgrade to read' }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-md bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700"
    >
      {label}
    </a>
  )
}

export function PaywallOverlay({ children, href = '/pricing', label = 'Upgrade to read' }) {
  return (
    <div className="relative">
      <div className="pointer-events-none blur-sm select-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-md bg-black/40 px-4 py-3">
          <UpgradeButton href={href} label={label} />
        </div>
      </div>
    </div>
  )
}

// Backward-compatible alias
export { PaywallOverlay as BlurOverlay }

// Aggregated client facade for ergonomic imports
export const moneta = {
  Provider: MonetaProvider,
  PaywallOverlay,
  UpgradeButton,
  useMoneta,
}


