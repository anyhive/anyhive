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

export declare function useMoneta(options?: { publishableKey?: string }): any

export declare const moneta: {
  Provider: (props: { publishableKey?: string; theme?: string; children?: React.ReactNode }) => React.ReactNode,
  PaywallOverlay: (props: { children?: React.ReactNode; href?: string; label?: string; className?: string; backdropClassName?: string; contentClassName?: string; buttonClassName?: string }) => React.ReactNode,
  UpgradeButton: typeof UpgradeButton,
  useMoneta: typeof useMoneta,
}


