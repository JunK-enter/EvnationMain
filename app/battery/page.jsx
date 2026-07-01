import { pageMetadata } from '@/lib/site'
import BatteryPage from '@/views/BatteryPage'

export const metadata = pageMetadata({
  title: 'Tesla Powerwall Home Battery',
  description:
    'Whole-home backup, lower electricity bills, and professional Tesla Powerwall 3 installation by evNation — a Tesla Certified Installer.',
  path: '/battery',
})
export default function Page() { return <BatteryPage /> }
