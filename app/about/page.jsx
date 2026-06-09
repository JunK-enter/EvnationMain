import { pageMetadata } from '@/lib/site'
import AboutPage from '@/views/AboutPage'

export const metadata = pageMetadata({
  title: 'About evNation',
  description: 'Southern California\'s trusted team for EV charger installation, panel upgrades, and clean energy.',
  path: '/about',
})

export default function Page() {
  return <AboutPage />
}
