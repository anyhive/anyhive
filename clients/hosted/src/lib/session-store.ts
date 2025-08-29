export type CheckoutSession = {
  amount?: number
  planId?: string
  returnUrl?: string
  createdAt: string
  tenantId: string
}

export type PortalSession = {
  customerId?: string
  returnUrl?: string
  createdAt: string
  tenantId: string
}

export const checkoutSessions = new Map<string, CheckoutSession>()
export const portalSessions = new Map<string, PortalSession>()


