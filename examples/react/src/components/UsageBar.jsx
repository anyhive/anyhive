export default function UsageBar({ value = 0, limit = 100 }) {
  const pct = Math.max(0, Math.min(100, Math.round((value / limit) * 100)))
  const color = pct < 70 ? '#10b981' : pct < 100 ? '#f59e0b' : '#ef4444'
  return (
    <div style={{ width: '100%', background: '#e5e7eb', borderRadius: 6, padding: 2 }}>
      <div style={{ width: `${pct}%`, background: color, height: 10, borderRadius: 4, transition: 'width 200ms ease' }} />
      <div style={{ fontSize: 12, color: '#374151', marginTop: 6 }}>{value} / {limit} ({pct}%)</div>
    </div>
  )
}


