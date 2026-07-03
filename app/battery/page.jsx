import { pageMetadata } from '@/lib/site'
import BatteryPage from '@/views/BatteryPage'

export const metadata = pageMetadata({
  title: 'PowerWall & Battery — Tesla Powerwall, GM, Enphase',
  description:
    'Tesla Powerwall is our top recommendation for whole-home backup. evNation also installs GM Ultium, ATG, and Enphase IQ Battery systems — licensed C10 turnkey install.',
  path: '/battery',
})
export default function Page() { return <BatteryPage /> }
