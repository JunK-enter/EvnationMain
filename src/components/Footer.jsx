import Link from '@/components/Link'
import { Mail, Phone, MapPin } from 'lucide-react'
import Logo from './Logo'
import { serviceArea } from '@/data/localSeo'
import { SERVICE_COUNTIES } from '@/data/serviceAreasSeo'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div>
            <Link href="/" className="inline-block mb-4 hover:opacity-90 transition-opacity">
              <Logo size="md" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              {serviceArea.tagline}
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/residential-ev-charging" className="hover:text-neon transition-colors">Residential EV Charging</Link></li>
              <li><Link href="/solar" className="hover:text-neon transition-colors">Solar</Link></li>
              <li><Link href="/panel-upgrades" className="hover:text-neon transition-colors">Panel Upgrades</Link></li>
              <li><Link href="/commercial" className="hover:text-neon transition-colors">Commercial</Link></li>
              <li><Link href="/battery" className="hover:text-neon transition-colors">Battery Storage</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-neon transition-colors">About</Link></li>
              <li><Link href="/projects" className="hover:text-neon transition-colors">Projects</Link></li>
              <li><Link href="/service-areas" className="hover:text-neon transition-colors">Service Areas</Link></li>
              <li><Link href="/auto-dealer" className="hover:text-neon transition-colors">Auto Dealer Partners</Link></li>
              <li><Link href="/blog" className="hover:text-neon transition-colors">Blog</Link></li>
              <li><Link href="/quote" className="hover:text-neon transition-colors">Get a Quote</Link></li>
              <li><Link href="/contact" className="hover:text-neon transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Service Areas</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {SERVICE_COUNTIES.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/service-areas/${c.slug}`} className="hover:text-neon transition-colors">
                    {c.name}, {c.state}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/service-areas" className="text-neon hover:underline">
                  View all cities →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-neon" /> hello@evnation.com</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-neon" /> (888) 384-6287</li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-neon shrink-0 mt-0.5" /> {serviceArea.region}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col gap-4">
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-slate-400">
            <Link href="/sitemap" className="hover:text-neon transition-colors">Site Map</Link>
            <Link href="/blog" className="hover:text-neon transition-colors">Blog</Link>
            <Link href="/calculator" className="hover:text-neon transition-colors">Savings Calculator</Link>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p suppressHydrationWarning>&copy; {new Date().getFullYear()} evNation. All rights reserved.</p>
            <p>Licensed electrical contractor · {serviceArea.primaryZone.label}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
