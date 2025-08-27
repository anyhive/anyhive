import { useState } from 'react'
import { usePricingTable } from '@moneta-kit/react'
// import { useMoneta } from '@moneta-kit/core'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const pricing = usePricingTable()

  return (
    <>
      <h1>Moneta Kit</h1>
      <div style={{ marginTop: 24, marginBottom: 24 }}>
        <h2>Pricing Table (Mock)</h2>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <label>
            Billing:
            <button style={{ marginLeft: 8 }} onClick={pricing.toggleCycle}>
              {pricing.cycle === 'monthly' ? 'Switch to yearly' : 'Switch to monthly'}
            </button>
          </label>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 16 }}>
          {pricing.plans.map((plan) => (
            <div key={plan.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>{plan.name}</h3>
                <span>{pricing.formatPrice(plan.price)}</span>
              </div>
              <ul>
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <button
                onClick={() => pricing.selectPlan(plan.id)}
                style={{
                  width: '100%',
                  marginTop: 8,
                  padding: '8px 12px',
                  background: pricing.selectedPlanId === plan.id ? '#2563eb' : '#111827',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer'
                }}
              >
                {pricing.selectedPlanId === plan.id ? 'Selected' : 'Choose'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
