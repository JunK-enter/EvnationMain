import { pageMetadata } from '@/lib/site'
import SolarPage from '@/views/SolarPage'

export const metadata = pageMetadata({
  title: 'Solar Installation Southern California',
  description: 'Residential & commercial solar consultation and installation across Orange County and Southern California.',
  path: '/solar',
})

export default function Page() {
  return <SolarPage />
}
