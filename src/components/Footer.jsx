'use client'

import Link from '@/components/Link'
import { Mail, Phone, MapPin } from 'lucide-react'
import Logo from './Logo'
import { companyContact } from '@/data/companyContact'
import { SERVICE_COUNTIES } from '@/data/serviceAreasSeo'
import { useFooterLinks } from '@/i18n/useNavLinks'
import { useTranslation } from '@/i18n/LocaleProvider'

export default function Footer() {
  const { services, company, headings } = useFooterLinks()
  const { t } = useTranslation()

  return (
    <footer className="border-t border-white/[0.04] bg-transparent pb-[env(safe-area-inset-bottom,0px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-10">
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-3 sm:mb-4 hover:opacity-90 transition-opacity">
              <Logo size="md" />
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs">
              {t('site.tagline')}
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm sm:text-base mb-2.5 sm:mb-4">{headings.services}</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-400">
              {services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-neon transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm sm:text-base mb-2.5 sm:mb-4">{headings.company}</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-400">
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-neon transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-display font-semibold text-sm sm:text-base mb-2.5 sm:mb-4">{headings.serviceAreas}</h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-3 gap-y-1.5 text-[11px] sm:text-xs text-slate-400">
              {SERVICE_COUNTIES.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/service-areas/${c.slug}`} className="hover:text-neon transition-colors">
                    {c.name}, {c.state}
                  </Link>
                </li>
              ))}
              <li className="col-span-2 sm:col-span-1 pt-0.5">
                <Link href="/service-areas" className="text-neon hover:underline">
                  {headings.viewAllCities}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-display font-semibold text-sm sm:text-base mb-2.5 sm:mb-4">{headings.contact}</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neon shrink-0 mt-0.5" />
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
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neon shrink-0" />
                  <span>
                    <span className="text-white font-semibold">{headings.email} </span>
                    <span className="text-neon font-semibold break-all">{companyContact.email}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${companyContact.phoneTel}`}
                  className="flex items-center gap-2 hover:text-neon transition-colors min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neon shrink-0" />
                  <span>
                    <span className="text-white font-semibold">{headings.telephone} </span>
                    <span className="text-neon font-semibold">{companyContact.phone}</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 text-[10px] sm:text-xs text-slate-500">
          <p>{headings.copyright}</p>
          <p>{headings.license}</p>
        </div>
      </div>
    </footer>
  )
}
