import { pageMetadata } from '@/lib/site'
import PrivacyPage from '@/views/PrivacyPage'

export const metadata = pageMetadata({ title: 'Privacy Policy', path: '/privacy' })
export default function Page() { return <PrivacyPage /> }
