import { pageMetadata } from '@/lib/site'
import SiteMapPage from '@/views/SiteMapPage'

export const metadata = pageMetadata({ title: 'Site Map', path: '/sitemap' })
export default function Page() { return <SiteMapPage /> }
