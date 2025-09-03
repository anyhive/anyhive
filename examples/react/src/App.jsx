import { useState } from 'react'
import { usePricingTable } from '@anyhive/react'
// import { useAnyhive } from '@anyhive/core'
import { useBillingDecision, SCENARIOS } from './hooks/useBillingDecision'
import UpgradeModal from './components/UpgradeModal'
import UsageBar from './components/UsageBar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const pricing = usePricingTable({
    onSelect: (plan) => {
      // eslint-disable-next-line no-console
      console.log('[pricing-select]', plan)
    }
  })
  const billing = useBillingDecision({ initialScenario: 'none' })
  const [upgradeOpen, setUpgradeOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Anyhive Kit</h1>

        <section className="mt-8">
          <h2 className="text-lg font-medium text-slate-900">Pricing Table (Mock)</h2>
          <div className="mt-3 flex items-center gap-3">
            <label className="text-sm text-slate-600">Billing:</label>
            <button
              className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              onClick={pricing.toggleCycle}
            >
              {pricing.cycle === 'monthly' ? 'Switch to yearly' : 'Switch to monthly'}
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pricing.plans.map((plan) => {
              const isRecommended = billing.decision.requiredPlan && plan.id === billing.decision.requiredPlan.toLowerCase()
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-lg border p-4 ${isRecommended ? 'border-blue-500' : 'border-slate-200'}`}
                >
                  {isRecommended && (
                    <span className="absolute right-2 top-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">Recommended</span>
                  )}
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-slate-900">{plan.name}</h3>
                    <span className="text-sm text-slate-600">{pricing.formatPrice(plan.price)}</span>
                  </div>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {plan.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => pricing.selectPlan(plan.id)}
                    className={`mt-3 w-full rounded-md px-3 py-2 text-sm font-medium text-white ${pricing.selectedPlanId === plan.id ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-900 hover:bg-slate-800'}`}
                  >
                    {pricing.selectedPlanId === plan.id ? 'Selected' : 'Choose'}
                  </button>
                </div>
              )})}
          </div>
        </section>

        <section className="mt-10 border-t pt-6">
          <h2 className="text-lg font-medium text-slate-900">Billing Decision Demo</h2>
          <div className="mt-2 flex items-center gap-2">
            <label className="text-sm text-slate-600">Scenario:</label>
            <select
              className="rounded-md border px-2 py-1 text-sm text-slate-700 shadow-sm hover:bg-slate-50"
              value={billing.scenario}
              onChange={(e) => billing.setScenario(e.target.value)}
            >
              {SCENARIOS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="mt-3 rounded-lg border bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900">{billing.decision.title}</div>
                <div className="text-sm text-slate-600">{billing.decision.description}</div>
                {billing.decision.requiredPlan && (
                  <div className="mt-1 text-xs text-slate-700">
                    Required plan: <strong>{billing.decision.requiredPlan}</strong>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                {billing.decision.ctas.map((cta) => (
                  <button
                    key={cta.id}
                    onClick={() => {
                      if (billing.decision.requiredPlan) {
                        const targetId = billing.decision.requiredPlan.toLowerCase()
                        pricing.selectPlan(targetId)
                      }
                      if (cta.id === 'upgrade' || cta.id === 'compare') {
                        setUpgradeOpen(true)
                      }
                      billing.handleAction(cta.id)
                    }}
                    className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
                  >
                    {cta.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 border-t pt-6">
          <h2 className="text-lg font-medium text-slate-900">Usage</h2>
          <p className="text-sm text-slate-600">Different scenarios simulate different usage levels.</p>
          <div className="mt-3 max-w-[480px]">
            <UsageBar
              value={(() => {
                switch (billing.scenario) {
                  case 'none': return 30
                  case 'recommend_upgrade': return 60
                  case 'seats_exceeded': return 95
                  case 'quota_exceeded': return 120
                  case 'trial_expired': return 100
                  case 'past_due': return 80
                  case 'feature_locked': return 40
                  default: return 50
                }
              })()}
              limit={100}
            />
          </div>
        </section>

        <UpgradeModal
          open={upgradeOpen}
          onClose={() => setUpgradeOpen(false)}
          plan={(pricing.selectedPlan ? {
            ...pricing.selectedPlan,
            priceFormatted: pricing.formatPrice(pricing.selectedPlan.price),
          } : null)}
          cycle={pricing.cycle}
          onConfirm={() => {
            // eslint-disable-next-line no-console
            console.log('[upgrade-confirm]', pricing.selectedPlan)
            setUpgradeOpen(false)
          }}
        />
      </div>
    </div>
  )
}

export default App
