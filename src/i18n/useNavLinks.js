'use client'

import {
  Bolt, Building2, BatteryCharging, ShieldCheck, Calculator, FileText,
  Info, Handshake, Newspaper, MapPin, ShoppingCart,
} from 'lucide-react'
import { useTranslation } from '@/i18n/LocaleProvider'

export function useNavLinks() {
  const { t } = useTranslation()

  const serviceLinks = [
    { to: '/residential-ev-charging', label: t('nav.residentialEv'), desc: t('nav.residentialEvDesc'), icon: Bolt },
    { to: '/solar', label: t('nav.solar'), desc: t('nav.solarDesc'), icon: BatteryCharging },
    { to: '/panel-upgrades', label: t('nav.panelUpgrades'), desc: t('nav.panelUpgradesDesc'), icon: ShieldCheck },
    { to: '/commercial', label: t('nav.commercial'), desc: t('nav.commercialDesc'), icon: Building2 },
    { to: '/battery', label: t('nav.battery'), desc: t('nav.batteryDesc'), icon: BatteryCharging },
    { to: '/shop', label: t('nav.shopAll'), desc: t('nav.shopAllDesc'), icon: ShoppingCart },
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
      { href: '/residential-ev-charging', label: t('nav.residentialEv') },
      { href: '/solar', label: t('nav.solar') },
      { href: '/panel-upgrades', label: t('nav.panelUpgrades') },
      { href: '/commercial', label: t('nav.commercial') },
      { href: '/battery', label: t('nav.battery') },
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
