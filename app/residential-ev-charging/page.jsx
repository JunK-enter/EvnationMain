import { pageMetadata } from '@/lib/site'
import EVChargerPage from '@/views/EVChargerPage'

export const metadata = pageMetadata({
  title: 'Residential EV Charging Installation',
  description: 'Level 2 EV charger installation in Newport Beach, Costa Mesa, Irvine & across Southern California. Licensed electricians, permits included.',
  path: '/residential-ev-charging',
})

export default function Page() {
  return <EVChargerPage />
}
