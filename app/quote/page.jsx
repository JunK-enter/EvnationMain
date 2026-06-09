import { pageMetadata } from '@/lib/site'
import QuotePage from '@/views/QuotePage'

export const metadata = pageMetadata({
  title: 'Get a Quote â€” Build Your Install',
  description: 'Build your custom EV charger, panel upgrade, or solar quote online. Free assessment for Southern California homeowners.',
  path: '/quote',
})

export default function Page() {
  return <QuotePage />
}
