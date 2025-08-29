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

  const allowed = normalized ?? Boolean(defaultAllowed)
  const status = allowed ? 'ok' : 'blocked'
  const reason = allowed ? 'Access granted by default policy' : 'Access denied via parameter'

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


