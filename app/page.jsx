import { pageMetadata } from '@/lib/site'
import HomePage from '@/views/HomePage'

export const metadata = pageMetadata({
  title: 'EV Charger Installation & Solar — Regional Service Areas',
  description: 'Licensed EV charger, panel upgrade, and solar installers across select regional service areas from Southern California to Chicago, Las Vegas, Texas & New Jersey.',
  path: '/',
})

export default function Page() {
  return <HomePage />
}
