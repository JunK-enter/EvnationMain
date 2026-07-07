import {
  PIPEDRIVE_FIELDS,
  PIPEDRIVE_OPTION_IDS,
  isFieldKeySet,
} from '@/config/pipedriveFields'

const API_TOKEN =
  process.env.PIPEDRIVE_API_TOKEN || process.env.VITE_PIPEDRIVE_API_TOKEN || ''
const COMPANY_DOMAIN =
  process.env.PIPEDRIVE_COMPANY_DOMAIN || process.env.VITE_PIPEDRIVE_COMPANY_DOMAIN || ''
const OWNER_ID =
  process.env.PIPEDRIVE_OWNER_ID || process.env.VITE_PIPEDRIVE_OWNER_ID || ''
const DEFAULT_SOURCE_CHANNEL = process.env.PIPEDRIVE_SOURCE_CHANNEL || 'Web forms'
const DEFAULT_LEAD_SOURCE = process.env.PIPEDRIVE_LEAD_SOURCE || 'Website'

const ENUM_FIELDS = new Set(['sourceChannel', 'zone', 'installationType', 'breakerSize', 'leadSource'])
const MULTI_OPTION_FIELDS = new Set(['leadSource'])

const BASE_URL = COMPANY_DOMAIN
  ? `https://${COMPANY_DOMAIN}.pipedrive.com/api/v1`
  : 'https://api.pipedrive.com/v1'

export function isPipedriveConfigured() {
  return Boolean(API_TOKEN)
}

function withToken(path) {
  const sep = path.includes('?') ? '&' : '?'
  return `${BASE_URL}${path}${sep}api_token=${encodeURIComponent(API_TOKEN)}`
}

async function pdRequest(path, options = {}) {
  const res = await fetch(withToken(path), {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...options,
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok || json.success === false) {
    const message =
      json?.error || json?.error_info || `Pipedrive request failed (${res.status})`
    throw new Error(typeof message === 'string' ? message : JSON.stringify(message))
  }
  return json.data
}

let enumMapsCache = null

async function loadEnumMaps() {
  if (enumMapsCache) return enumMapsCache

  const maps = {
    installationType: {},
    zone: {},
    sourceChannel: {},
    breakerSize: {},
    leadSource: {},
  }
  try {
    const fields = await pdRequest('/dealFields?limit=500')
    const byKey = {}
    ;(fields || []).forEach((f) => {
      if (f?.key) byKey[f.key] = f
    })

    const build = (fieldName) => {
      const field = byKey[PIPEDRIVE_FIELDS[fieldName]]
      const m = {}
      if (field?.options) {
        field.options.forEach((o) => {
          m[String(o.label).trim()] = o.id
        })
      }
      return m
    }

    maps.installationType = build('installationType')
    maps.zone = build('zone')
    maps.sourceChannel = build('sourceChannel')
    maps.breakerSize = build('breakerSize')
    maps.leadSource = build('leadSource')
  } catch {
    // Fall back to manual option ids in pipedriveFields.js
  }

  enumMapsCache = maps
  return maps
}

function resolveOptionValue(fieldName, label, runtimeMaps) {
  if (label === undefined || label === null || label === '') return undefined
  const key = String(label).trim()

  const manual = PIPEDRIVE_OPTION_IDS?.[fieldName]
  if (manual && manual[key] != null) return manual[key]

  const runtime = runtimeMaps?.[fieldName]
  if (runtime && runtime[key] != null) return runtime[key]

  return undefined
}

function toOptionId(value) {
  if (value === undefined || value === null || value === '') return undefined
  if (typeof value === 'number' && Number.isFinite(value)) return value
  const n = Number(String(value).trim())
  return Number.isFinite(n) ? n : undefined
}

function toAmpsNumber(value) {
  if (value === undefined || value === null) return undefined
  const digits = String(value).replace(/[^\d.]/g, '')
  if (!digits) return undefined
  const n = Number(digits)
  return Number.isFinite(n) ? n : undefined
}

function buildCustomFields(formData, runtimeMaps) {
  const fields = {}

  const set = (fieldName, value) => {
    const key = PIPEDRIVE_FIELDS[fieldName]
    if (!isFieldKeySet(key) || value === undefined || value === null || value === '') return

    if (ENUM_FIELDS.has(fieldName)) {
      const optionId = toOptionId(value)
      if (optionId == null) return
      fields[key] = MULTI_OPTION_FIELDS.has(fieldName) ? [optionId] : optionId
      return
    }

    fields[key] = value
  }

  set(
    'sourceChannel',
    resolveOptionValue('sourceChannel', formData.sourceChannel || DEFAULT_SOURCE_CHANNEL, runtimeMaps),
  )
  set(
    'leadSource',
    resolveOptionValue('leadSource', formData.leadSource || DEFAULT_LEAD_SOURCE, runtimeMaps),
  )
  set('zone', resolveOptionValue('zone', formData.zone, runtimeMaps))
  set(
    'installationType',
    resolveOptionValue('installationType', formData.installationType, runtimeMaps),
  )
  set('projectAddress', formData.fullAddress)
  set('mainService', toAmpsNumber(formData.mainService))
  set('breakerSize', resolveOptionValue('breakerSize', formData.breakerSize, runtimeMaps))
  set('panelLocation', formData.panelLocation)

  return fields
}

async function findExistingPerson({ email, phone }) {
  const term = email || phone
  if (!term) return null
  const fields = email ? 'email' : 'phone'
  try {
    const data = await pdRequest(
      `/persons/search?term=${encodeURIComponent(term)}&fields=${fields}&exact_match=true&limit=1`,
    )
    const item = data?.items?.[0]?.item
    return item?.id ? item.id : null
  } catch {
    return null
  }
}

async function createPerson({ name, email, phone }) {
  const fullName = (name || '').trim()
  const parts = fullName.split(/\s+/).filter(Boolean)
  const firstName = parts.length ? parts[0] : ''
  const lastName = parts.length > 1 ? parts.slice(1).join(' ') : ''

  const body = {
    name: fullName || 'EVnation Lead',
    first_name: firstName,
    last_name: lastName,
    phone: phone ? [phone] : [],
    email: email ? [email] : [],
  }
  if (OWNER_ID) body.owner_id = Number(OWNER_ID)

  const person = await pdRequest('/persons', {
    method: 'POST',
    body: JSON.stringify(body),
  })
  return person?.id || null
}

function buildNote(formData) {
  const lines = [
    'EVnation Website Quote Quiz',
    '',
    `Lead source: ${formData.leadSource || 'Website'}`,
    `Submission ID: ${formData.submissionId || '-'}`,
    '',
    `Service: ${formData.installationTypeLabel || formData.installationType || '-'}`,
    `Installation Type: ${formData.installationType || '-'}`,
    `Zone / Region: ${formData.zoneLabel || formData.zone || '-'}`,
    `Starting estimate: ${formData.estimatedTotal || '-'}`,
    '',
    `Contact: ${formData.fullName || '-'}`,
    `Phone: ${formData.phone || '-'}`,
    `Email: ${formData.email || '-'}`,
    '',
    `Project Address: ${formData.fullAddress || '-'}`,
    '',
    'Additional Project Details:',
    `  Main Service Amps: ${formData.mainService || '-'}`,
    `  Breaker Size: ${formData.breakerSize || '-'}`,
    `  Panel Location: ${formData.panelLocation || '-'}`,
    `  Panel upgrade suggested: ${formData.panelUpgrade || '-'}`,
    `  Charger type: ${formData.chargerType || '-'}`,
    `  Permit needed: ${formData.permitNeeded || '-'}`,
    `  Cart services: ${formData.services || '-'}`,
    `  Notes: ${formData.notes || '-'}`,
  ]
  return lines.join('\n')
}

/**
 * Create a website quote lead in Pipedrive.
 * @returns {Promise<{personId:number|null, leadId:string|null}>}
 */
export async function createQuoteLead(formData) {
  if (!isPipedriveConfigured()) {
    throw new Error('Pipedrive API token is not configured.')
  }

  let personId = await findExistingPerson({
    email: formData.email,
    phone: formData.phone,
  })

  if (!personId) {
    personId = await createPerson({
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
    })
  }

  const enumMaps = await loadEnumMaps()
  const leadBody = {
    title: `Website Lead - ${formData.fullName || 'EVnation'}`,
    ...(personId ? { person_id: personId } : {}),
    ...(OWNER_ID ? { owner_id: Number(OWNER_ID) } : {}),
    ...buildCustomFields(formData, enumMaps),
  }

  const lead = await pdRequest('/leads', {
    method: 'POST',
    body: JSON.stringify(leadBody),
  })
  const leadId = lead?.id || null

  if (leadId) {
    try {
      await pdRequest('/notes', {
        method: 'POST',
        body: JSON.stringify({ content: buildNote(formData), lead_id: leadId }),
      })
    } catch {
      // Note failure should not fail the lead
    }
  }

  return { personId, leadId }
}
