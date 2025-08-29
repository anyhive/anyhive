function normalizeAccess(access) {
  if (access == null) return undefined
  const v = String(Array.isArray(access) ? access[0] : access).toLowerCase()
  if (v === 'allow' || v === '1' || v === 'true') return true
  if (v === 'deny' || v === '0' || v === 'false') return false
  return undefined
}

/**
 * getMoneta
 * Server-side helper to derive access decision from request context.
 * Accepts either `access` or a `searchParams` object.
 */
export function getMoneta(options = {}) {
  const { access, searchParams, defaultAllowed = false } = options

  const valueFromParams = searchParams ? (searchParams.access ?? undefined) : undefined
  const normalized = normalizeAccess(access ?? valueFromParams)

  // Allow forcing demo status via env
  const forced = (process.env.MONETA_FORCE_STATUS || process.env.NEXT_PUBLIC_MONETA_FORCE_STATUS || '').toString()
  const forcedLower = forced.toLowerCase()

  const statusFromForced = (() => {
    switch (forcedLower) {
      case 'ok':
        return { allowed: true, status: 'ok', reason: 'Forced OK' }
      case 'expiringsoon':
      case 'expiring_soon':
      case 'expiring-soon':
        return { allowed: true, status: 'expiringSoon', reason: 'Access expiring soon' }
      case 'nocontent':
      case 'no_content':
      case 'no-content':
        return { allowed: true, status: 'noContent', reason: 'No content available' }
      case 'expired':
        return { allowed: false, status: 'expired', reason: 'Membership expired' }
      case 'blocked':
        return { allowed: false, status: 'blocked', reason: 'Blocked by policy' }
      case 'softblocked':
      case 'soft_blocked':
      case 'soft-blocked':
        return { allowed: false, status: 'softBlocked', reason: 'Soft block' }
      case 'quotaexceeded':
      case 'quota_exceeded':
      case 'quota-exceeded':
        return { allowed: false, status: 'quotaExceeded', reason: 'Quota exceeded' }
      default:
        return null
    }
  })()

  const allowed = statusFromForced?.allowed ?? (normalized ?? Boolean(defaultAllowed))
  const status = statusFromForced?.status ?? (allowed ? 'ok' : 'blocked')
  const reason = statusFromForced?.reason ?? (allowed ? 'Access granted by default policy' : 'Access denied via parameter')

  const checkStatus = () => status

  return { allowed, status, reason, checkStatus }
}

export default { getMoneta }

// Server-safe alias matching the client API name
export function useMonetaKit(options = {}) {
  const result = getMoneta(options)
  async function gate(loadFn) {
    if (result.allowed) {
      const data = await loadFn()
      return { allowed: true, status: result.status, data }
    }
    return { allowed: false, status: result.status, reason: result.reason, data: undefined }
  }
  const fetchIfAllowed = gate
  return { ...result, gate, fetchIfAllowed }
}

// Keep named export for parity
export { getMoneta as getMonetaKit }

// Non-hook server API name (preferred for server/RSC)
export function authorize(options = {}) {
  return useMonetaKit(options)
}

// Server Component: single-tag gating with inline loader and fallback
// (Removed) Gated: merged into Protected to avoid overlap

// Server Component: Protected with rich slots similar to proposed API
export async function Protected(props) {
  const {
    resourceId,
    query,
    preview,
    loading,
    unavailable,
    locked,
    grace,
    expiringSoon,
    error,
    onBuy,
    onImpression,
    children,
    // Optional pre-fetched inputs
    allowed: allowedPrefetched,
    status: statusPrefetched,
    data: dataPrefetched,
  } = props

  const { fetchIfAllowed, status: statusFromAuth, reason } = authorize()
  const status = statusPrefetched ?? statusFromAuth

  try {
    const hasPrefetched = typeof allowedPrefetched === 'boolean'
    const result = hasPrefetched
      ? { allowed: allowedPrefetched, data: dataPrefetched }
      : await fetchIfAllowed(query)
    const ctx = { status, allowed: result.allowed, reason, resourceId }

    if (!result.allowed) {
      // Locked path
      if (typeof locked === 'function') {
        const previewData = preview ? await preview() : undefined
        return <>{locked({ ...ctx, preview: previewData, onBuy, onImpression })}</>
      }
      if (locked) return <>{locked}</>

      // Default: no locked UI provided → show preview (if any) or nothing
      const previewData = preview ? await preview() : undefined
      if (previewData) {
        if (typeof children === 'function') return <>{children(previewData, { ...ctx, preview: true })}</>
        return <></>
      }
      return <></>
    }

    // Allowed path
    const data = result.data

    // Optional expiringSoon banner slot
    const banner = status === 'expiringSoon' && expiringSoon ? expiringSoon({ status }) : null

    // No content handling
    if (Array.isArray(data) && data.length === 0) {
      if (unavailable) return (
        <>
          {banner}
          {typeof unavailable === 'function' ? unavailable({ status }) : unavailable}
        </>
      )
    }

    // Render authorized content
    const content = typeof children === 'function' ? children(data, { status }) : children
    return (
      <>
        {banner}
        {content}
      </>
    )
  } catch (_err) {
    // Error slot
    if (error) return <>{typeof error === 'function' ? error({ status }) : error}</>
    return <></>
  }
}

// Preferred naming for paywall context
export { Protected as Paywalled }

// Helper: opinionated paywall with conventional UI, preserving fetchIfAllowed style
import { PaywallOverlay, AccessBanner, EmptyPlaceholder } from './moneta-client.js'

function DefaultListPlaceholder() {
  return (
    <ul className="space-y-3">
      <li className="rounded border p-3"><div className="font-semibold">Post title example</div><div className="text-sm text-gray-600 dark:text-gray-300">Post preview content…</div></li>
      <li className="rounded border p-3"><div className="font-semibold">Post title example</div><div className="text-sm text-gray-600 dark:text-gray-300">Post preview content…</div></li>
      <li className="rounded border p-3"><div className="font-semibold">Post title example</div><div className="text-sm text-gray-600 dark:text-gray-300">Post preview content…</div></li>
    </ul>
  )
}

export async function paywall(loadFn, options = {}) {
  const { pricingUrl = '/pricing', placeholder = <DefaultListPlaceholder />, tips = true } = options
  const { fetchIfAllowed, status } = authorize()
  const { allowed, data } = await fetchIfAllowed(loadFn)

  function render(renderChildren) {
    return (
      <>
        <AccessBanner status={status} />
        {!allowed ? (
          <>
            <PaywallOverlay href={pricingUrl}>{placeholder}</PaywallOverlay>
            {tips ? (
              <p className="text-xs text-neutral-500 mt-2">Tip: append <code>?access=allow</code> to simulate paid access.</p>
            ) : null}
          </>
        ) : Array.isArray(data) && data.length === 0 ? (
          <EmptyPlaceholder />
        ) : (
          renderChildren(data, { status })
        )}
      </>
    )
  }

  return { allowed, data, status, render }
}


