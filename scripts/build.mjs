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

/** Next RSC *.txt artifacts confuse Apache MultiViews and Googlebot */
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
      if (!entry.name.endsWith('.txt') || entry.name === 'robots.txt') continue
      fs.rmSync(full, { force: true })
      removed += 1
    }
  }
  walk(outDir)
  if (removed) console.log(`[build] Removed ${removed} Next.js .txt artifacts for Apache`)
}

/** Remove page.html when page/index.html exists — stale flat files break Apache MultiViews on IONOS */
function pruneConflictingFlatHtml(outDir) {
  if (!fs.existsSync(outDir)) return
  let removed = 0

  const maybeRemoveFlat = (dir) => {
    const base = path.basename(dir)
    if (base === '404') return
    const indexPath = path.join(dir, 'index.html')
    if (!fs.existsSync(indexPath)) return
    const flatPath = path.join(path.dirname(dir), `${path.basename(dir)}.html`)
    if (!fs.existsSync(flatPath)) return
    fs.rmSync(flatPath, { force: true })
    removed += 1
    console.log(`[build] Removed conflicting flat HTML ${path.relative(outDir, flatPath)}`)
  }

  for (const entry of fs.readdirSync(outDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith('_')) continue
    maybeRemoveFlat(path.join(outDir, entry.name))
  }

  const serviceAreasDir = path.join(outDir, 'service-areas')
  if (fs.existsSync(serviceAreasDir)) {
    for (const entry of fs.readdirSync(serviceAreasDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      const flatCounty = path.join(serviceAreasDir, `${entry.name}.html`)
      if (fs.existsSync(flatCounty)) {
        fs.rmSync(flatCounty, { force: true })
        removed += 1
        console.log(`[build] Removed conflicting flat HTML service-areas/${entry.name}.html`)
      }
    }
  }

  if (removed) console.log(`[build] Pruned ${removed} conflicting flat HTML file(s) for Apache`)
}

/** IONOS template placeholder sometimes survives the static export — normalize to production URL */
function fixSiteUrlPlaceholders(outDir) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://evnation.us'
  if (!fs.existsSync(outDir)) return
  let fixed = 0
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
        continue
      }
      if (!entry.name.endsWith('.html') && entry.name !== 'robots.txt' && entry.name !== 'sitemap.xml') continue
      const text = fs.readFileSync(full, 'utf8')
      if (!text.includes('ionos_deploy_now_site_url') && !text.includes('IONOS_DEPLOY_NOW_SITE_URL')) continue
      fs.writeFileSync(
        full,
        text
          .replaceAll('https://ionos_deploy_now_site_url', siteUrl)
          .replaceAll('https://IONOS_DEPLOY_NOW_SITE_URL', siteUrl),
      )
      fixed += 1
    }
  }
  walk(outDir)
  if (fixed) console.log(`[build] Fixed site URL placeholder in ${fixed} file(s)`)
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
    pruneConflictingFlatHtml(outDir)
    fixSiteUrlPlaceholders(outDir)
  }
} finally {
  restorePaths()
}
