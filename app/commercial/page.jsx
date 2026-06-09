import { pageMetadata } from '@/lib/site'
import CommercialChargingPage from '@/views/CommercialChargingPage'

export const metadata = pageMetadata({
  title: 'Commercial EV Charging',
  description: 'Workplace and fleet EV charging installation for Southern California businesses.',
  path: '/commercial',
})

export default function Page() {
  return <CommercialChargingPage />
}
