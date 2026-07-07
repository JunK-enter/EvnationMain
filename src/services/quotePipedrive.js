/**
 * Client helper — sends quote quiz submission to the server-side Pipedrive API.
 * On IONOS (static), set NEXT_PUBLIC_API_BASE_URL to your Vercel deployment.
 */
import { getPublicApiUrl } from '@/lib/publicApi'

export async function submitQuoteToPipedrive(submission) {
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
    }
  }

  return data
}
