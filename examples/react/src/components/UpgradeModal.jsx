export default function UpgradeModal({ open, onClose, plan, cycle, onConfirm }) {
  if (!open) return null
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
    }}>
      <div style={{ background: 'white', borderRadius: 8, width: 420, padding: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Upgrade Plan</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: 18, cursor: 'pointer' }}>×</button>
        </div>
        <div style={{ marginTop: 12, color: '#374151' }}>
          {plan ? (
            <>
              <div style={{ fontWeight: 600 }}>{plan.name}</div>
              <div style={{ marginTop: 4 }}>Billing cycle: <strong>{cycle}</strong></div>
              <div style={{ marginTop: 6, fontSize: 24, fontWeight: 700 }}>{plan.priceFormatted}</div>
              <ul style={{ marginTop: 10 }}>
                {plan.features?.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </>
          ) : (
            <div>No plan selected</div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
          <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer' }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding: '8px 12px', borderRadius: 6, background: '#111827', color: 'white', border: 'none', cursor: 'pointer' }}>Confirm upgrade</button>
        </div>
      </div>
    </div>
  )
}


