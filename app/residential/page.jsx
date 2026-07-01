import { pageMetadata } from '@/lib/site'
import ResidentialServicesPage from '@/views/ResidentialServicesPage'

export const metadata = pageMetadata({
  title: 'Residential Services',
  description: 'Home EV charging, panel upgrades, and Tesla Powerwall installation by licensed evNation electricians.',
  path: '/residential',
})

export default function Page() {
  return <ResidentialServicesPage />
}
