/** @type {import('next').NextConfig} */
import path from 'path'
import { fileURLToPath } from 'url'
import { legacyRedirects } from './src/data/redirects.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return legacyRedirects
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src')
    return config
  },
}

export default nextConfig
