import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const cacheDir = path.join(root, '.next', 'cache')

function killPortListeners(port) {
  try {
    const out = execSync(`netstat -ano -p TCP | findstr "LISTENING" | findstr ":${port} "`, {
      encoding: 'utf8',
      shell: true,
    })
    const pids = new Set()
    for (const line of out.split('\n')) {
      const match = line.trim().match(/\s(\d+)\s*$/)
      if (match) pids.add(match[1])
    }
    for (const pid of pids) {
      try {
        execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore', shell: true })
        console.log(`  Stopped PID ${pid} (port ${port})`)
      } catch {
        /* already gone */
      }
    }
  } catch {
    /* nothing listening */
  }
}

console.log('')
console.log('  evNation — cleaning dev environment')
console.log('')

if (fs.existsSync(cacheDir)) {
  fs.rmSync(cacheDir, { recursive: true, force: true })
  console.log('  Cleared .next/cache')
}

for (const port of [3000, 3001, 3002, 3003]) {
  killPortListeners(port)
}

console.log('')
console.log('  Done. Run: npm run dev')
console.log('')
