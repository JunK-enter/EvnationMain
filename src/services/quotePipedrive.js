/**
 * Client helper — sends quote quiz submission to the server-side Pipedrive API.
 * On IONOS/static hosting, calls the Vercel API backend automatically.
 */
import { getPublicApiUrl } from '@/lib/publicApi'

export async function submitQuoteToPipedrive(submission) {
  try {
    const res = await fetch(getPublicApiUrl('/api/quote'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      return {
        ok: false,
        skipped: res.status === 503,
        error: data.error || `Request failed (${res.status})`,
        status: res.status,
      }
    }

    return data
  } catch (err) {
    return {
      ok: false,
      skipped: false,
      error: err?.message || 'Network error calling quote API',
    }
  }
}
