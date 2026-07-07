/** Client-side API base — use Vercel (or other Node host) when the site is static on IONOS. */
export function getPublicApiUrl(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '')
  return base ? `${base}${normalized}` : normalized
}
