/**
 * Copy Pipedrive env vars from EvnationFacebook into this project's .env.local.
 * Run: node scripts/setup-pipedrive-env.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const src = path.join(process.env.USERPROFILE || '', 'OneDrive', 'Desktop', 'EvnationFacebook', '.env')
const dest = path.join(root, '.env.local')

const MAP = {
  VITE_PIPEDRIVE_API_TOKEN: 'PIPEDRIVE_API_TOKEN',
  VITE_PIPEDRIVE_COMPANY_DOMAIN: 'PIPEDRIVE_COMPANY_DOMAIN',
  VITE_PIPEDRIVE_OWNER_ID: 'PIPEDRIVE_OWNER_ID',
}

function parseEnv(text) {
  const out = {}
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (m) out[m[1]] = m[2]
  }
  return out
}

if (!fs.existsSync(src)) {
  console.error('Source not found:', src)
  console.error('Copy these into .env.local manually from your Facebook project .env:')
  console.error('  PIPEDRIVE_API_TOKEN=')
  console.error('  PIPEDRIVE_COMPANY_DOMAIN=')
  console.error('  PIPEDRIVE_OWNER_ID=')
  console.error('  PIPEDRIVE_SOURCE_CHANNEL=Website')
  process.exit(1)
}

const srcVars = parseEnv(fs.readFileSync(src, 'utf8'))
let destText = fs.existsSync(dest) ? fs.readFileSync(dest, 'utf8') : ''
const existing = new Set(
  destText
    .split(/\r?\n/)
    .filter(Boolean)
    .map((l) => l.split('=')[0]),
)

const additions = []
for (const [from, to] of Object.entries(MAP)) {
  const val = srcVars[from]
  if (val && !existing.has(to)) additions.push(`${to}=${val}`)
}
if (!existing.has('PIPEDRIVE_SOURCE_CHANNEL')) {
  additions.push('PIPEDRIVE_SOURCE_CHANNEL=Web forms')
}

if (!additions.length) {
  console.log('Pipedrive vars already present in .env.local')
  process.exit(0)
}

if (destText && !destText.endsWith('\n')) destText += '\n'
destText += '\n# Pipedrive\n' + additions.join('\n') + '\n'
fs.writeFileSync(dest, destText)
console.log('Added to .env.local:', additions.map((l) => l.split('=')[0]).join(', '))
console.log('Restart dev server: npm run dev')
