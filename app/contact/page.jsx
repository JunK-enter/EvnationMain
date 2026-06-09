import { pageMetadata } from '@/lib/site'
import ContactPage from '@/views/ContactPage'

export const metadata = pageMetadata({
  title: 'Contact evNation',
  description: 'Get in touch with Southern California\'s EV charger and solar installation experts.',
  path: '/contact',
})

export default function Page() {
  return <ContactPage />
}
