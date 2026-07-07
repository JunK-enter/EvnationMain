import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

function loadEnv(file) {
  const out = {}
  const text = fs.readFileSync(path.join(root, file), 'utf8')
  for (const line of text.split(/\r?\n/)) {
    if (!line || line.startsWith('#') || !line.includes('=')) continue
    const i = line.indexOf('=')
    out[line.slice(0, i)] = line.slice(i + 1)
  }
  return out
}

const env = loadEnv('.env.local')
const token = env.PIPEDRIVE_API_TOKEN || env.VITE_PIPEDRIVE_API_TOKEN
const domain = env.PIPEDRIVE_COMPANY_DOMAIN || env.VITE_PIPEDRIVE_COMPANY_DOMAIN
const base = domain
  ? `https://${domain}.pipedrive.com/api/v1`
  : 'https://api.pipedrive.com/v1'

function withToken(p) {
  const sep = p.includes('?') ? '&' : '?'
  return `${base}${p}${sep}api_token=${encodeURIComponent(token)}`
}

async function req(pathname, body) {
  const res = await fetch(withToken(pathname), {
    method: body ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = await res.json().catch(() => ({}))
  return { status: res.status, json }
}

const person = await req('/persons', {
  name: 'Quote Test',
  email: ['quote.test.debug@evnation.us'],
  phone: ['8669136199'],
})
console.log('person:', person.status, person.json.success, person.json.error || person.json.data?.id)

const personId = person.json.data?.id
const minimalLead = await req('/leads', {
  title: 'Website Lead - Quote Test',
  person_id: personId,
})
console.log('minimal lead:', minimalLead.status, minimalLead.json.success, minimalLead.json.error || minimalLead.data?.id)

const fields = await req('/dealFields?limit=500')
const channel = fields.json.data?.find((f) => f.key === 'channel')
console.log(
  'channel options:',
  channel?.options?.map((o) => `${o.id}:${o.label}`).join(', '),
)

const fullBody = {
  title: 'Website Lead - Quote Test Full',
  person_id: personId,
  channel: 490,
  '6ad6d551e65cb0c1808d8258074a40e97b14e365': 385,
  'dd8e5276df33d628b354d336fdc5b49b364fd92a': 461,
  '43395fd8ce646815937005f5ff19435be7f5cb6f': '150 Terrapin, Irvine, CA, 92618',
  'e08c9863c84567c4340d58721afe48aec18ca5f8': 200,
  '64afc3179dd8b6d273f63503f20353608d9aafda': 'Garage',
}
const fullLead = await req('/leads', fullBody)
console.log('full lead:', fullLead.status, fullLead.json.success, fullLead.json.error || fullLead.json.data?.id)
if (!fullLead.json.success) console.log(JSON.stringify(fullLead.json, null, 2))
