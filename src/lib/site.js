import { serviceArea } from '@/data/localSeo'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://evnation.us')

export const siteConfig = {
  name: 'evNation',
  url: siteUrl,
  description: serviceArea.tagline,
  locale: 'en_US',
  region: serviceArea.region,
  phone: '(888) 384-6287',
  email: 'hello@evnation.com',
}

export const defaultMetadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'evNation | EV Charger Installation & Solar — Regional Service Areas',
    template: '%s | evNation',
  },
  description: siteConfig.description,
  keywords: [
    'EV charger installation Southern California',
    'EV charger installation San Francisco Bay Area',
    'EV charger installation Chicago',
    'EV charger installation Las Vegas',
    'panel upgrade California',
    'EV charger installation New Jersey',
    'commercial EV charging',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'evNation',
    title: 'evNation | EV Charger & Solar — Regional Service Areas',
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'evNation | Regional EV & Solar Experts',
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
}

export function pageMetadata({ title, description, path = '', noIndex = false }) {
  const url = `${siteUrl}${path}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  }
}
