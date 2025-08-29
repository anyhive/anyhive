import { useEffect, useMemo, useState } from 'react'

const DEFAULT_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    priceMonthly: 9,
    priceYearly: 90,
    features: ['Basic analytics', 'Email support']
  },
  {
    id: 'pro',
    name: 'Pro',
    priceMonthly: 29,
    priceYearly: 290,
    features: ['Advanced analytics', 'Priority support', 'Custom reports']
  },
  {
    id: 'business',
    name: 'Business',
    priceMonthly: 99,
    priceYearly: 990,
    features: ['All Pro features', 'SLA', 'Dedicated manager']
  }
]

export function usePricingTable(options = {}) {
  const { plans = DEFAULT_PLANS, billingCycle = 'monthly', onSelect } = options

  const [selectedPlanId, setSelectedPlanId] = useState(plans[0]?.id ?? null)
  const [cycle, setCycle] = useState(billingCycle)

  const visiblePlans = useMemo(() => {
    return plans.map((plan) => ({
      ...plan,
      price: cycle === 'monthly' ? plan.priceMonthly : plan.priceYearly
    }))
  }, [plans, cycle])

  const selectedPlan = useMemo(
    () => visiblePlans.find((p) => p.id === selectedPlanId) ?? null,
    [visiblePlans, selectedPlanId]
  )

  function selectPlan(planId) {
    setSelectedPlanId(planId)
    if (onSelect) {
      const plan = visiblePlans.find((p) => p.id === planId) ?? null
      onSelect(plan)
    }
  }

  function toggleCycle() {
    setCycle((c) => (c === 'monthly' ? 'yearly' : 'monthly'))
  }

  function formatPrice(value) {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value)
  }

  return {
    plans: visiblePlans,
    cycle,
    setCycle,
    toggleCycle,
    selectedPlanId,
    selectedPlan,
    selectPlan,
    formatPrice
  }
}

export default { usePricingTable }


// Access gating hook for demo purposes (non-authenticated simulation)
export function useAccessDecision(options = {}) {
  const {
    // If provided, this boolean directly determines access
    allowed: allowedOverride,
    // Optional: read from URL search param, e.g. access=allow|deny
    urlParam = 'access',
  } = options

  const [status, setStatus] = useState('checking') // 'checking' | 'ok' | 'blocked'
  const [reason, setReason] = useState('Determining access...')

  useEffect(() => {
    if (typeof allowedOverride === 'boolean') {
      setStatus(allowedOverride ? 'ok' : 'blocked')
      setReason(allowedOverride ? 'Access granted by override' : 'Access denied by override')
      return
    }

    try {
      const params = new URLSearchParams(window.location.search)
      const value = params.get(urlParam)
      if (value === 'allow' || value === '1' || value === 'true') {
        setStatus('ok')
        setReason('Access granted via URL parameter')
      } else if (value === 'deny' || value === '0' || value === 'false') {
        setStatus('blocked')
        setReason('Access denied via URL parameter')
      } else {
        // Default demo policy: allow
        setStatus('ok')
        setReason('Access granted by default policy')
      }
    } catch {
      setStatus('ok')
      setReason('Access granted (fallback)')
    }
  }, [allowedOverride, urlParam])

  return {
    status,
    reason,
    isAllowed: status === 'ok',
  }
}

// Public, ergonomic client hook name
export function useMonetaKit(options = {}) {
  const result = useAccessDecision(options)
  async function gate(loadFn) {
    if (result.isAllowed) {
      const data = await loadFn()
      return { allowed: true, status: result.status, data }
    }
    return { allowed: false, status: result.status, reason: result.reason, data: undefined }
  }
  const fetchIfAllowed = gate
  const { status, reason, isAllowed } = result
  function checkStatus() {
    return status
  }
  return {
    ...result,
    allowed: isAllowed,
    checkStatus,
    gate,
    fetchIfAllowed,
  }
}

export { getMoneta as getMonetaKit } from './moneta-server.js'

