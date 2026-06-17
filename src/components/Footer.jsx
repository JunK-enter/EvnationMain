'use client'

import Link from '@/components/Link'
import { Mail, Phone, MapPin } from 'lucide-react'
import Logo from './Logo'
import { serviceArea } from '@/data/localSeo'
import { companyContact } from '@/data/companyContact'
import { SERVICE_COUNTIES } from '@/data/serviceAreasSeo'
import { useFooterLinks } from '@/i18n/useNavLinks'

export default function Footer() {
  const { services, company, headings } = useFooterLinks()

  return (
    <footer className="border-t border-white/[0.04] bg-transparent pb-[env(safe-area-inset-bottom,0px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
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
            <h4 className="font-display font-semibold mb-4">{headings.services}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-neon transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">{headings.company}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-neon transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">{headings.serviceAreas}</h4>
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
                  {headings.viewAllCities}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">{headings.contact}</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-neon shrink-0 mt-0.5" />
                <span>
                  <span className="text-white font-semibold">{headings.address} </span>
                  {companyContact.address.line1}
                  <br />
                  {companyContact.address.line2}
                </span>
              </li>
              <li>
                <a
                  href={`mailto:${companyContact.email}`}
                  className="flex items-center gap-2 hover:text-neon transition-colors min-h-[44px]"
                >
                  <Mail className="w-4 h-4 text-neon shrink-0" />
                  <span>
                    <span className="text-white font-semibold">{headings.email} </span>
                    <span className="text-neon font-semibold">{companyContact.email}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${companyContact.phoneTel}`}
                  className="flex items-center gap-2 hover:text-neon transition-colors min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-neon shrink-0" />
                  <span>
                    <span className="text-white font-semibold">{headings.telephone} </span>
                    <span className="text-neon font-semibold">{companyContact.phone}</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-slate-500">
          <p>{headings.copyright}</p>
          <p>{headings.license}</p>
        </div>
      </div>
    </footer>
  )
}
