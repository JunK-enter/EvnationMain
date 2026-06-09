import { pageMetadata } from '@/lib/site'
import ServiceAreaJsonLd from '@/components/ServiceAreaJsonLd'
import ServiceAreasPage from '@/views/ServiceAreasPage'
import { getTotalCityCount, SERVICE_COUNTIES } from '@/data/serviceAreasSeo'

const totalCities = getTotalCityCount()

export const metadata = pageMetadata({
  title: 'Service Areas — Southern California, Central California & Nevada',
  description: `evNation installs EV chargers, panel upgrades & solar across Orange County, Los Angeles, San Diego, Riverside, San Bernardino, Ventura, San Luis Obispo, Clark County NV & Maricopa AZ — ${totalCities}+ cities.`,
  path: '/service-areas',
})

export default function Page() {
  return (
    <>
      <ServiceAreaJsonLd counties={SERVICE_COUNTIES} />
      <ServiceAreasPage />
    </>
  )
}
