/**
 * Push Pipedrive env vars from .env.local to Vercel (Production).
 * Prerequisites: npm i -g vercel && vercel login && vercel link
 * Run: node scripts/push-vercel-env.mjs
 */
import { execSync, spawnSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const envFile = path.join(root, '.env.local')

const KEYS = [
  'PIPEDRIVE_API_TOKEN',
  'PIPEDRIVE_COMPANY_DOMAIN',
  'PIPEDRIVE_SOURCE_CHANNEL',
  'PIPEDRIVE_LEAD_SOURCE',
  'PIPEDRIVE_OWNER_ID',
  'NEXT_PUBLIC_API_BASE_URL',
]

function parseEnv(text) {
  const out = {}
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    out[trimmed.slice(0, idx)] = trimmed.slice(idx + 1)
  }
  return out
}

function hasVercelAuth() {
  const r = spawnSync('vercel', ['whoami'], { encoding: 'utf8', shell: true })
  return r.status === 0
}

function envExists(name, target) {
  const r = spawnSync('vercel', ['env', 'ls', target], { encoding: 'utf8', shell: true, cwd: root })
  return r.stdout?.includes(name)
}

function addEnv(name, value, target) {
  if (!value) {
    console.log(`Skip ${name} (empty in .env.local)`)
    return
  }
  if (envExists(name, target)) {
    console.log(`Skip ${name} (already on Vercel ${target})`)
    return
  }
  console.log(`Adding ${name} → Vercel ${target}...`)
  const r = spawnSync('vercel', ['env', 'add', name, target], {
    input: value,
    encoding: 'utf8',
    shell: true,
    cwd: root,
  })
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout)
    process.exit(1)
  }
}

if (!fs.existsSync(envFile)) {
  console.error('Missing .env.local')
  process.exit(1)
}

if (!hasVercelAuth()) {
  console.error('Not logged in. Run: vercel login')
  console.error('Then link project: vercel link  (select evnation-main)')
  process.exit(1)
}

const vars = parseEnv(fs.readFileSync(envFile, 'utf8'))
const target = process.argv.includes('--preview') ? 'preview' : 'production'

for (const key of KEYS) {
  addEnv(key, vars[key], target)
}

console.log('\nDone. Redeploy for changes to apply:')
console.log('  vercel --prod')
console.log('Or: Vercel Dashboard → Deployments → Redeploy')
