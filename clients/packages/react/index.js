import { useMemo, useState } from 'react'

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


