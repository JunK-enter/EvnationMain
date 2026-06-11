import { pageMetadata } from '@/lib/site'
import QuotePage from '@/views/QuotePage'

export const metadata = pageMetadata({
  title: 'Get a Quote — Free EV Install Estimate',
  description: 'Answer a few quick questions and get an instant EV charger install estimate. Licensed electricians across California and select states.',
  path: '/quote',
})

export default function Page() {
  return <QuotePage />
}
