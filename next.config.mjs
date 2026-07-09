/** @type {import('next').NextConfig} */
import path from 'path'
import { fileURLToPath } from 'url'
import { legacyRedirects } from './src/data/redirects.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const staticExport = process.env.NEXT_STATIC_EXPORT === 'true'
  || (process.env.CI === 'true' && !process.env.VERCEL)

const nextConfig = {
  // IONOS Apache ignores most rewrite rules — folder/index.html is the reliable pattern.
  ...(staticExport ? { output: 'export', trailingSlash: true } : {}),
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: staticExport,
    ...(!staticExport ? { formats: ['image/avif', 'image/webp'] } : {}),
  },
  ...(!staticExport
    ? {
        async redirects() {
          return legacyRedirects
        },
      }
    : {}),
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src')
    return config
  },
}

export default nextConfig
