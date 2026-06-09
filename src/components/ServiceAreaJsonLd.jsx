import { siteConfig } from '@/lib/site'
import { SERVICE_COUNTIES } from '@/data/serviceAreasSeo'

export default function ServiceAreaJsonLd({ counties = SERVICE_COUNTIES }) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    description: siteConfig.description,
    areaServed: counties.map((county) => ({
      '@type': 'AdministrativeArea',
      name: `${county.name}, ${county.state}`,
      containsPlace: county.cities.map((city) => ({
        '@type': 'City',
        name: city,
      })),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
