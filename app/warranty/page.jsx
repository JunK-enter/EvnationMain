import { pageMetadata } from '@/lib/site'
import WarrantyPage from '@/views/WarrantyPage'

export const metadata = pageMetadata({ title: 'Warranty', path: '/warranty' })
export default function Page() { return <WarrantyPage /> }
