import { spawn } from 'node:child_process'
import net from 'node:net'

const PREFERRED_PORTS = [3000, 3001, 3002, 3003]

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer()
    server.once('error', () => resolve(false))
    server.once('listening', () => server.close(() => resolve(true)))
    server.listen(port, '0.0.0.0')
  })
}

async function isServerResponding(port) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}`, {
      signal: AbortSignal.timeout(4000),
      redirect: 'follow',
    })
    return res.status < 500
  } catch {
    return false
  }
}

async function findRunningDevServer() {
  for (const port of PREFERRED_PORTS) {
    if (await isServerResponding(port)) return port
  }
  return null
}

async function findBlockedPort() {
  for (const port of PREFERRED_PORTS) {
    const free = await isPortFree(port)
    if (!free && !(await isServerResponding(port))) return port
  }
  return null
}

async function pickPort() {
  for (const port of PREFERRED_PORTS) {
    if (await isPortFree(port)) return port
  }
  return null
}

const existing = await findRunningDevServer()
if (existing) {
  console.log('')
  console.log('  evNation — dev server already running')
  console.log(`  Open in browser: http://localhost:${existing}`)
  console.log('')
  process.exit(0)
}

const blocked = await findBlockedPort()
if (blocked) {
  console.error('')
  console.error(`  ERROR: Port ${blocked} is in use but not responding (stuck process).`)
  console.error('  Fix: npm run dev:clean')
  console.error('  Then: npm run dev')
  console.error('')
  process.exit(1)
}

const port = await pickPort()
if (!port) {
  console.error('')
  console.error('  ERROR: No free port found (3000–3003).')
  console.error('  Run: npm run dev:clean')
  console.error('')
  process.exit(1)
}

const url = `http://localhost:${port}`

console.log('')
console.log('  evNation — local dev (no evnation.us connection needed)')
console.log(`  Open in browser: ${url}`)
if (port !== 3000) {
  console.log('')
  console.log('  Note: port 3000 was busy — do NOT open http://localhost:3000')
}
console.log('')

const child = spawn('npx', ['next', 'dev', '-p', String(port)], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NEXT_PUBLIC_SITE_URL: url,
  },
})

child.on('exit', (code) => process.exit(code ?? 0))
