import { pageMetadata } from '@/lib/site'
import PanelUpgradePage from '@/views/PanelUpgradePage'

export const metadata = pageMetadata({
  title: 'Panel Upgrades for EV Charging',
  description: '200A panel upgrades in Orange County & Southern California. Code-compliant service for safe EV charger installation.',
  path: '/panel-upgrades',
})

export default function Page() {
  return <PanelUpgradePage />
}
