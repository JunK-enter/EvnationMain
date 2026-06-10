import { pageMetadata } from '@/lib/site'
import HomePage from '@/views/HomePage'

export const metadata = pageMetadata({
  title: 'Electrify Your Home with Confidence',
  description: 'EV charger installation, electric panel upgrades, home batteries, solar, electric water heaters, dryers and ovens — licensed full-home electrification across Southern California, Central California & Nevada.',
  path: '/',
})

export default function Page() {
  return <HomePage />
}
