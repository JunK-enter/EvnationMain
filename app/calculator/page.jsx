import { pageMetadata } from '@/lib/site'
import CalculatorPage from '@/views/CalculatorPage'

export const metadata = pageMetadata({
  title: 'Savings & Rebate Calculator',
  description: 'Estimate EV charging savings and California rebates for your Southern California home.',
  path: '/calculator',
})

export default function Page() {
  return <CalculatorPage />
}
