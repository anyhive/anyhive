import { useCallback, useMemo, useState } from 'react'

export const SCENARIOS = [
  'none',
  'trial_expired',
  'quota_exceeded',
  'feature_locked',
  'seats_exceeded',
  'past_due',
  'recommend_upgrade',
]

function buildDecision(scenario) {
  switch (scenario) {
    case 'trial_expired':
      return {
        status: 'blocked',
        severity: 'error',
        title: 'Your trial has ended',
        description: 'To continue, please choose a plan. You can keep your data.',
        requiredPlan: 'Pro',
        ctas: [
          { id: 'upgrade', label: 'Upgrade now' },
          { id: 'contact', label: 'Contact sales' },
        ],
      }
    case 'quota_exceeded':
      return {
        status: 'blocked',
        severity: 'warning',
        title: 'Monthly quota exceeded',
        description: 'You have reached your plan limits. Upgrade to resume usage.',
        requiredPlan: 'Team',
        ctas: [
          { id: 'upgrade', label: 'See plans' },
          { id: 'manage_usage', label: 'Manage usage' },
        ],
      }
    case 'feature_locked':
      return {
        status: 'blocked',
        severity: 'info',
        title: 'This feature is available on Pro and above',
        description: 'Unlock advanced analytics and automation with Pro.',
        requiredPlan: 'Pro',
        ctas: [
          { id: 'upgrade', label: 'Upgrade to Pro' },
          { id: 'learn_more', label: 'Learn more' },
        ],
      }
    case 'seats_exceeded':
      return {
        status: 'soft_block',
        severity: 'warning',
        title: 'Seats exceeded',
        description: 'You have more members than your current plan allows.',
        requiredPlan: 'Team',
        ctas: [
          { id: 'manage_seats', label: 'Manage seats' },
          { id: 'upgrade', label: 'Upgrade plan' },
        ],
      }
    case 'past_due':
      return {
        status: 'blocked',
        severity: 'error',
        title: 'Payment past due',
        description: 'We could not process your last payment. Please update billing.',
        requiredPlan: null,
        ctas: [
          { id: 'update_billing', label: 'Update billing' },
          { id: 'retry_payment', label: 'Retry payment' },
        ],
      }
    case 'recommend_upgrade':
      return {
        status: 'ok',
        severity: 'success',
        title: 'You are growing fast! 🎉',
        description: 'Consider upgrading to get higher limits and priority support.',
        requiredPlan: 'Team',
        ctas: [
          { id: 'compare', label: 'Compare plans' },
        ],
      }
    case 'none':
    default:
      return {
        status: 'ok',
        severity: 'neutral',
        title: 'All good',
        description: 'Your current plan covers your usage.',
        requiredPlan: null,
        ctas: [],
      }
  }
}

export function useBillingDecision(options = {}) {
  const { initialScenario = 'none' } = options
  const [scenario, setScenario] = useState(initialScenario)

  const decision = useMemo(() => buildDecision(scenario), [scenario])

  const handleAction = useCallback((actionId) => {
    // In demo, we just log. Integrations can be wired here.
    // eslint-disable-next-line no-console
    console.log('[billing-action]', actionId, { scenario, decision })
    if (actionId === 'upgrade' || actionId === 'compare') {
      // no-op in demo
    }
  }, [scenario, decision])

  return {
    scenario,
    setScenario,
    decision,
    handleAction,
    scenarios: SCENARIOS,
  }
}


