/** Client-side API base — IONOS/static sites call the Vercel API backend. */
const VERCEL_API_FALLBACK = 'https://evnation-main.vercel.app'

function shouldUseSameOriginApi(hostname) {
  if (!hostname) return true
  if (hostname === 'localhost' || hostname === '127.0.0.1') return true
  if (hostname.endsWith('.vercel.app')) return true
  return false
}

export function getPublicApiUrl(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`

  if (typeof window !== 'undefined') {
    if (shouldUseSameOriginApi(window.location.hostname)) return normalized
  }

  const base = (process.env.NEXT_PUBLIC_API_BASE_URL || VERCEL_API_FALLBACK).replace(/\/$/, '')
  return `${base}${normalized}`
}
