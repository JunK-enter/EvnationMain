const DEFAULT_ORIGINS = [
  'https://evnation.us',
  'https://www.evnation.us',
  'http://localhost:3000',
]

function extraOrigins() {
  const fromEnv = process.env.API_ALLOWED_ORIGINS || ''
  return fromEnv
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
}

export function isAllowedApiOrigin(origin) {
  if (!origin) return false
  if (origin.endsWith('.app-ionos.space')) return true

  const allowed = [
    process.env.NEXT_PUBLIC_SITE_URL,
    ...DEFAULT_ORIGINS,
    ...extraOrigins(),
  ].filter(Boolean)

  return allowed.includes(origin)
}

export function apiCorsHeaders(request) {
  const origin = request.headers.get('origin')
  if (!isAllowedApiOrigin(origin)) return {}

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

export function jsonWithCors(request, data, init = {}) {
  const headers = new Headers(init.headers)
  Object.entries(apiCorsHeaders(request)).forEach(([key, value]) => headers.set(key, value))
  return Response.json(data, { ...init, headers })
}

export function optionsResponse(request) {
  return new Response(null, {
    status: 204,
    headers: apiCorsHeaders(request),
  })
}
