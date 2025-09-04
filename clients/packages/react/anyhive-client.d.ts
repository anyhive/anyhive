import * as React from 'react'

export interface UpgradeModalProps {
  open: boolean
  onClose?: () => void
  onCheckout?: (payload: { planId: string; cycle: 'monthly' | 'yearly'; method: 'card' | 'paypal'; card: { name: string; number: string; exp: string; cvc: string } }) => void
  href?: string
  plans?: Array<{ id: string; name: string; priceMonthly: number; priceYearly: number }>
  defaultPlan?: string
  defaultCycle?: 'monthly' | 'yearly'
}

export declare function UpgradeModal(props: UpgradeModalProps): React.ReactNode

export interface UpgradeButtonProps {
  href?: string
  label?: string
  className?: string
  mode?: 'link' | 'modal'
  onCheckout?: (payload: { planId: string; cycle: 'monthly' | 'yearly'; method: 'card' | 'paypal'; card: { name: string; number: string; exp: string; cvc: string } }) => void
}

export declare function UpgradeButton(props: UpgradeButtonProps): React.ReactNode

export interface UsageMeterProps { used: number; limit: number }
export declare function UsageMeter(props: UsageMeterProps): React.ReactNode

export interface UsageGateProps { allowed: boolean; children?: React.ReactNode; fallback?: React.ReactNode }
export declare function UsageGate(props: UsageGateProps): React.ReactNode

export declare function useAnyhive(options?: { publishableKey?: string }): any

export declare function AnyhiveProvider(props: { publishableKey?: string; theme?: string; children?: React.ReactNode }): React.ReactNode
export declare function useAnyhiveContext(): { publishableKey?: string }
export declare function AnyhiveGate(props: { children?: React.ReactNode }): React.ReactNode
export declare function AnyhiveStatus(): React.ReactNode
export declare function PaywallOverlay(props: { children?: React.ReactNode; href?: string; label?: string; className?: string; backdropClassName?: string; contentClassName?: string; buttonClassName?: string }): React.ReactNode
export declare function AccessBanner(props: { status?: any; expiresAt?: string; className?: string }): React.ReactNode
export declare function EmptyPlaceholder(props: { title?: string; description?: string; className?: string }): React.ReactNode

export declare const anyhive: {
  Provider: typeof AnyhiveProvider,
  PaywallOverlay: typeof PaywallOverlay,
  UpgradeButton: typeof UpgradeButton,
  useAnyhive: typeof useAnyhive,
}


