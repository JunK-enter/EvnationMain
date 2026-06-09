import { pageMetadata } from '@/lib/site'
import AutoDealerPage from '@/views/AutoDealerPage'

export const metadata = pageMetadata({ title: 'Auto Dealer EV Programs', path: '/auto-dealer' })
export default function Page() { return <AutoDealerPage /> }
