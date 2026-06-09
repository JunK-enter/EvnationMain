import { siteConfig } from '@/lib/site'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/employee', '/login', '/intake'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
