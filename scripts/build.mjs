import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const skipRoot = path.join(root, '.static-build-skip')
const pathsToSkip = ['api', 'admin']

// IONOS Deploy Now runs on GitHub Actions (CI=true). Vercel sets VERCEL during build.
const isStaticExport = process.env.NEXT_STATIC_EXPORT === 'true'
  || (process.env.CI === 'true' && !process.env.VERCEL)

const moved = []

function movePathsAside() {
  for (const segment of pathsToSkip) {
    const from = path.join(root, 'app', segment)
    const to = path.join(skipRoot, segment)
    if (!fs.existsSync(from)) continue
    fs.mkdirSync(skipRoot, { recursive: true })
    if (fs.existsSync(to)) fs.rmSync(to, { recursive: true, force: true })
    fs.cpSync(from, to, { recursive: true })
    fs.rmSync(from, { recursive: true, force: true })
    moved.push(segment)
  }
}

function restorePaths() {
  for (const segment of moved.splice(0).reverse()) {
    const from = path.join(skipRoot, segment)
    const to = path.join(root, 'app', segment)
    if (!fs.existsSync(from)) continue
    if (fs.existsSync(to)) fs.rmSync(to, { recursive: true, force: true })
    fs.cpSync(from, to, { recursive: true })
    fs.rmSync(from, { recursive: true, force: true })
  }
  if (fs.existsSync(skipRoot)) fs.rmSync(skipRoot, { recursive: true, force: true })
}

if (isStaticExport) movePathsAside()

const env = {
  ...process.env,
  NEXT_STATIC_EXPORT: isStaticExport ? 'true' : '',
}

try {
  execSync('npx next build', { stdio: 'inherit', env, cwd: root })
} finally {
  restorePaths()
}
