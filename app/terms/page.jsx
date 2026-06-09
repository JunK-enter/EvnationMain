import { pageMetadata } from '@/lib/site'
import TermsPage from '@/views/TermsPage'

export const metadata = pageMetadata({ title: 'Terms & Conditions', path: '/terms' })
export default function Page() { return <TermsPage /> }
