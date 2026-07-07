import { mapQuoteSubmissionToPipedrive } from '@/lib/pipedrive/mapQuoteLead'
import { createQuoteLead, isPipedriveConfigured } from '@/lib/pipedrive/createQuoteLead'
import { jsonWithCors, optionsResponse } from '@/lib/apiCors'

export const runtime = 'nodejs'

function validateSubmission(body) {
  const personal = body?.personal || {}
  const home = body?.home || {}
  const errors = []

  if (!personal.firstName?.trim() && !personal.lastName?.trim()) {
    errors.push('Name is required')
  }
  if (!personal.email?.trim() || !/\S+@\S+\.\S+/.test(personal.email)) {
    errors.push('Valid email is required')
  }
  if (!personal.phone?.trim() || personal.phone.trim().length < 7) {
    errors.push('Valid phone is required')
  }
  if (!home.street?.trim() || !home.city?.trim() || !home.zip?.trim()) {
    errors.push('Project address is required')
  }
  if (!body?.serviceNeed) {
    errors.push('Service selection is required')
  }

  return errors
}

export async function OPTIONS(request) {
  return optionsResponse(request)
}

export async function POST(request) {
  try {
    if (!isPipedriveConfigured()) {
      return jsonWithCors(
        request,
        { ok: false, skipped: true, error: 'Pipedrive is not configured' },
        { status: 503 },
      )
    }

    const body = await request.json()
    const errors = validateSubmission(body)
    if (errors.length) {
      return jsonWithCors(request, { ok: false, error: errors.join('; ') }, { status: 400 })
    }

    const pipedrivePayload = mapQuoteSubmissionToPipedrive(body)
    const result = await createQuoteLead(pipedrivePayload)

    return jsonWithCors(request, {
      ok: true,
      skipped: false,
      personId: result.personId,
      leadId: result.leadId,
    })
  } catch (err) {
    console.error('[api/quote]', err)
    return jsonWithCors(
      request,
      { ok: false, error: err?.message || 'Pipedrive sync failed' },
      { status: 500 },
    )
  }
}
