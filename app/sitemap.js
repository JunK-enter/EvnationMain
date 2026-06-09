import { siteConfig } from '@/lib/site'
import { blogPosts } from '@/data/blogPosts'
import { getAllCountySlugs } from '@/data/serviceAreasSeo'

const staticRoutes = [
  '',
  '/about',
  '/service-areas',
  '/residential-ev-charging',
  '/solar',
  '/panel-upgrades',
  '/commercial',
  '/projects',
  '/blog',
  '/contact',
  '/quote',
  '/calculator',
  '/shop',
  '/battery',
  '/warranty',
  '/auto-dealer',
  '/sitemap',
]

export default function sitemap() {
  const base = siteConfig.url
  const now = new Date()

  const pages = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '' || path === '/blog' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/quote' ? 0.9 : 0.7,
  }))

  const posts = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const counties = getAllCountySlugs().map((slug) => ({
    url: `${base}/service-areas/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  return [...pages, ...counties, ...posts]
}
