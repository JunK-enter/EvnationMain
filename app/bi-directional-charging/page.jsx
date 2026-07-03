import { pageMetadata } from '@/lib/site'
import BiDirectionalChargingPage from '@/views/BiDirectionalChargingPage'

export const metadata = pageMetadata({
  title: 'Bi-Directional EV Charging & V2H Installation',
  description: 'Vehicle-to-home and bi-directional EV charger installation for Tesla and GM. Licensed C10 electricians across California and select states.',
  path: '/bi-directional-charging',
})

export default function Page() {
  return <BiDirectionalChargingPage />
}
