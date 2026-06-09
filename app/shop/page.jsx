import { pageMetadata } from '@/lib/site'
import ShopPage from '@/views/ShopPage'

export const metadata = pageMetadata({
  title: 'Shop EV Chargers',
  path: '/shop',
})

export default function Page() {
  return <ShopPage />
}
