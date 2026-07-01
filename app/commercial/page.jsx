import { pageMetadata } from '@/lib/site'
import CommercialChargingPage from '@/views/CommercialChargingPage'

export const metadata = pageMetadata({
  title: 'Commercial EV Charging',
  description: 'Level 2 and Level 3 commercial EV charging for multifamily properties and fleets.',
  path: '/commercial',
})

export default function Page() {
  return <CommercialChargingPage />
}
