'use client'

import {
  Home, Building2, ShoppingCart, ShieldCheck, Calculator, FileText,
  Info, Handshake, Newspaper, MapPin,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LocaleProvider'

export const RESIDENTIAL_SERVICE_PATHS = [
  '/residential',
  '/residential-ev-charging',
  '/panel-upgrades',
  '/battery',
]

export function isServiceNavActive(pathname, linkTo) {
  if (linkTo === '/residential') {
    return RESIDENTIAL_SERVICE_PATHS.includes(pathname)
  }
  return pathname === linkTo
}

export function useNavLinks() {
  const { t } = useTranslation()

  const serviceLinks = [
    { to: '/residential', label: t('nav.residential'), desc: t('nav.residentialDesc'), icon: Home },
    { to: '/commercial', label: t('nav.commercial'), desc: t('nav.commercialDesc'), icon: Building2 },
    { to: '/shop', label: t('nav.allServices'), desc: t('nav.allServicesDesc'), icon: ShoppingCart },
  ]

  const mainLinks = [
    { to: '/projects', label: t('nav.projects') },
    { to: '/service-areas', label: t('nav.serviceAreas'), icon: MapPin },
    { to: '/calculator', label: t('nav.calculator'), icon: Calculator },
  ]

  const mobileExtraLinks = [
    { to: '/warranty', label: t('nav.warranty'), icon: ShieldCheck },
  ]

  const companyLinks = [
    { to: '/about', label: t('nav.about'), desc: t('nav.aboutDesc'), icon: Info },
    { to: '/auto-dealer', label: t('nav.autoDealer'), desc: t('nav.autoDealerDesc'), icon: Handshake },
    { to: '/blog', label: t('nav.blog'), desc: t('nav.blogDesc'), icon: Newspaper },
  ]

  return { serviceLinks, mainLinks, mobileExtraLinks, companyLinks }
}

export function useFooterLinks() {
  const { t } = useTranslation()

  return {
    services: [
      { href: '/residential', label: t('nav.residential') },
      { href: '/commercial', label: t('nav.commercial') },
      { href: '/shop', label: t('nav.allServices') },
    ],
    company: [
      { href: '/about', label: t('nav.about') },
      { href: '/projects', label: t('nav.projects') },
      { href: '/service-areas', label: t('nav.serviceAreas') },
      { href: '/auto-dealer', label: t('nav.autoDealer') },
      { href: '/blog', label: t('nav.blog') },
      { href: '/quote', label: t('nav.getQuote') },
      { href: '/contact', label: t('footer.contact') },
    ],
    headings: {
      services: t('footer.services'),
      company: t('footer.company'),
      serviceAreas: t('footer.serviceAreas'),
      contact: t('footer.contact'),
      viewAllCities: t('footer.viewAllCities'),
      address: t('footer.address'),
      email: t('footer.email'),
      telephone: t('footer.telephone'),
      copyright: t('footer.copyright', { year: new Date().getFullYear() }),
      license: t('footer.license'),
    },
  }
}
