import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { blogPosts } from '../data/blogPosts'

const groups = [
  {
    title: 'Main',
    links: [
      { to: '/', label: 'Home' },
      { to: '/shop', label: 'Shop' },
      { to: '/calculator', label: 'Savings Calculator' },
      { to: '/quote', label: 'Get a Quote' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { to: '/ev-charger', label: 'Home EV Charging' },
      { to: '/commercial-charging', label: 'Commercial Charging' },
      { to: '/battery', label: 'Battery · Tesla Powerwall' },
      { to: '/warranty', label: 'Warranty' },
      { to: '/panel-upgrade', label: 'Panel Upgrade' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About Us' },
      { to: '/auto-dealers', label: 'Auto Dealer Partners' },
      { to: '/blog', label: 'Blog' },
      { to: '/intake', label: 'Customer Intake' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/terms', label: 'Terms & Conditions' },
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/racial-equality', label: 'Racial Equality' },
      { to: '/sitemap', label: 'Site Map' },
    ],
  },
  {
    title: 'Portals',
    links: [
      { to: '/employee', label: 'Employee Portal' },
      { to: '/electrician', label: 'Electrician Portal' },
      { to: '/admin/intake', label: 'Admin · Customer Intake' },
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
          <p className="text-slate-400 mt-3">Every page on the EVnation site, all in one place.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {groups.map((group) => (
            <div key={group.title} className="glass rounded-2xl p-6">
              <h2 className="font-display font-semibold text-lg mb-4 text-neon">{group.title}</h2>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-neon transition-colors">
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
                <Link to={`/blog/${post.slug}`} className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-neon transition-colors">
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
