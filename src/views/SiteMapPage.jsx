'use client'

import Link from '@/components/Link'
import { ChevronRight } from 'lucide-react'
import { blogPosts } from '../data/blogPosts'
import { useSitemapCopy } from '@/i18n/hooks/useExtraPages'

export default function SiteMapPage() {
  const copy = useSitemapCopy()

  const groups = [
    {
      title: copy.groups.main,
      links: [
        { to: '/', label: copy.links.home },
        { to: '/quote', label: copy.links.getQuote },
        { to: '/gallery', label: copy.links.gallery },
        { to: '/contact', label: copy.links.contact },
      ],
    },
    {
      title: copy.groups.services,
      links: [
        { to: '/residential-ev-charging', label: copy.links.residentialEv },
        { to: '/bi-directional-charging', label: copy.links.biDirectional },
        { to: '/solar', label: copy.links.solar },
        { to: '/panel-upgrades', label: copy.links.panelUpgrades },
        { to: '/commercial', label: copy.links.commercial },
        { to: '/battery', label: copy.links.battery },
        { to: '/warranty', label: copy.links.warranty },
        { to: '/shop', label: copy.links.shop },
      ],
    },
    {
      title: copy.groups.serviceAreas,
      links: [
        { to: '/service-areas', label: copy.links.allServiceAreas },
        { to: '/service-areas/orange-county', label: copy.links.orangeCounty },
        { to: '/service-areas/los-angeles', label: copy.links.losAngeles },
        { to: '/service-areas/san-diego', label: copy.links.sanDiego },
        { to: '/service-areas/clark-county', label: copy.links.clarkCounty },
        { to: '/service-areas/san-luis-obispo', label: copy.links.sanLuisObispo },
      ],
    },
    {
      title: copy.groups.company,
      links: [
        { to: '/about', label: copy.links.about },
        { to: '/auto-dealer', label: copy.links.autoDealer },
        { to: '/blog', label: copy.links.blog },
        { to: '/intake', label: copy.links.customerIntake },
      ],
    },
    {
      title: copy.groups.internal,
      links: [
        { to: '/admin/intake', label: copy.links.adminIntake },
        { to: '/sitemap', label: copy.links.siteMap },
      ],
    },
  ]

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">{copy.eyebrow}</p>
          <h1 className="font-display text-4xl font-bold">{copy.title}</h1>
          <p className="text-slate-400 mt-3">{copy.subtitle}</p>
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
          <h2 className="font-display font-semibold text-lg mb-4 text-neon">{copy.blogArticles}</h2>
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
