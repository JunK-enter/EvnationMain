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

/** Next export creates page.html plus page/ sub-routes — Apache 403s on /page/ without index.html */
function fixStaticExportDirectoryIndexes(outDir) {
  if (!fs.existsSync(outDir)) return
  for (const entry of fs.readdirSync(outDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue
    const base = entry.name.slice(0, -5)
    if (base === 'index' || base === '404') continue
    const dirPath = path.join(outDir, base)
    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) continue
    const indexPath = path.join(dirPath, 'index.html')
    if (fs.existsSync(indexPath)) continue
    fs.copyFileSync(path.join(outDir, entry.name), indexPath)
    console.log(`[build] Added ${base}/index.html for Apache`)
  }
}

/** Next RSC *.txt artifacts trigger Apache 300 Multiple Choices next to *.html */
function pruneNextRscTxtFiles(outDir) {
  if (!fs.existsSync(outDir)) return
  let removed = 0
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
        continue
      }
      if (!entry.name.endsWith('.txt')) continue
      fs.rmSync(full, { force: true })
      removed += 1
    }
  }
  walk(outDir)
  if (removed) console.log(`[build] Removed ${removed} Next.js .txt artifacts for Apache`)
}

if (isStaticExport) movePathsAside()

const env = {
  ...process.env,
  NEXT_STATIC_EXPORT: isStaticExport ? 'true' : '',
}

try {
  execSync('npx next build', { stdio: 'inherit', env, cwd: root })
  if (isStaticExport) {
    const outDir = path.join(root, 'out')
    fixStaticExportDirectoryIndexes(outDir)
    pruneNextRscTxtFiles(outDir)
  }
} finally {
  restorePaths()
}
