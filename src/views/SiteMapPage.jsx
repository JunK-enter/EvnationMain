import Link from '@/components/Link'
import { ChevronRight } from 'lucide-react'
import { blogPosts } from '../data/blogPosts'

const groups = [
  {
    title: 'Main',
    links: [
      { to: '/', label: 'Home' },
      { to: '/quote', label: 'Get a Quote' },
      { to: '/calculator', label: 'Savings Calculator' },
      { to: '/projects', label: 'Projects' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { to: '/residential-ev-charging', label: 'Residential EV Charging' },
      { to: '/solar', label: 'Solar' },
      { to: '/panel-upgrades', label: 'Panel Upgrades' },
      { to: '/commercial', label: 'Commercial' },
      { to: '/battery', label: 'Battery Storage' },
      { to: '/warranty', label: 'Warranty' },
      { to: '/shop', label: 'Shop All Services' },
    ],
  },
  {
    title: 'Service Areas',
    links: [
      { to: '/service-areas', label: 'All Service Areas' },
      { to: '/service-areas/orange-county', label: 'Orange County, CA' },
      { to: '/service-areas/los-angeles', label: 'Los Angeles, CA' },
      { to: '/service-areas/san-diego', label: 'San Diego, CA' },
      { to: '/service-areas/clark-county', label: 'Clark County, NV' },
      { to: '/service-areas/san-luis-obispo', label: 'San Luis Obispo, CA' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/auto-dealer', label: 'Auto Dealer Partners' },
      { to: '/blog', label: 'Blog' },
      { to: '/intake', label: 'Customer Intake' },
    ],
  },
  {
    title: 'Internal',
    links: [
      { to: '/admin/intake', label: 'Admin · Customer Intake' },
      { to: '/sitemap', label: 'Site Map' },
    ],
  },
]

export default function SiteMapPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">Navigation</p>
          <h1 className="font-display text-4xl font-bold">Site Map</h1>
          <p className="text-slate-400 mt-3">Every page on the evNation site, all in one place.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {groups.map((group) => (
            <div key={group.title} className="glass rounded-2xl p-6">
              <h2 className="font-display font-semibold text-lg mb-4 text-neon">{group.title}</h2>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link href={link.to} className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-neon transition-colors">
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600" /> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="font-display font-semibold text-lg mb-4 text-neon">Blog Articles</h2>
          <ul className="grid sm:grid-cols-2 gap-2">
            {blogPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-neon transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" /> {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
