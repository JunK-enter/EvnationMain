import { pageMetadata } from '@/lib/site'
import BatteryPage from '@/views/BatteryPage'

export const metadata = pageMetadata({ title: 'Home Battery Storage', path: '/battery' })
export default function Page() { return <BatteryPage /> }
