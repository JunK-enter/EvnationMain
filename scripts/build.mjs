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

const IONOS_SKIP_DIRS = new Set(['_next', 'images', 'logos', 'videos', 'icons'])

/** Collect /path/ routes from folder/index.html export layout */
function collectDirectoryRoutes(outDir, prefix = '') {
  const routes = []
  for (const entry of fs.readdirSync(outDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || IONOS_SKIP_DIRS.has(entry.name)) continue
    const indexPath = path.join(outDir, entry.name, 'index.html')
    if (!fs.existsSync(indexPath)) continue
    const route = `${prefix}/${entry.name}/`.replace(/\/+/g, '/')
    routes.push(route)
    routes.push(...collectDirectoryRoutes(path.join(outDir, entry.name), `${prefix}/${entry.name}`.replace(/\/+/g, '/')))
  }
  return routes
}

/**
 * IONOS rsync keeps stale page.html + page.txt from older deploys next to page/index.html.
 * mod_alias Redirect works even when mod_rewrite is ignored.
 */
function writeIonosHtaccess(outDir) {
  const templatePath = path.join(root, 'public', '.htaccess')
  const base = fs.existsSync(templatePath) ? fs.readFileSync(templatePath, 'utf8').trim() : ''
  const routes = collectDirectoryRoutes(outDir)
  const lines = ['# Auto-generated — extensionless + legacy .html → trailing slash folders']
  for (const route of routes) {
    const bare = route.replace(/\/$/, '')
    if (!bare) continue
    lines.push(`Redirect 301 ${bare} ${route}`)
    lines.push(`Redirect 301 ${bare}.html ${route}`)
  }
  lines.push('Redirect 301 /projects /gallery/')
  lines.push('Redirect 301 /projects.html /gallery/')
  fs.writeFileSync(path.join(outDir, '.htaccess'), `${base}\n\n${lines.join('\n')}\n`)
  console.log(`[build] Wrote Apache redirects for ${routes.length} routes`)
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
    pruneNextRscTxtFiles(outDir)
    writeIonosHtaccess(outDir)
  }
} finally {
  restorePaths()
}
