import { pageMetadata } from '@/lib/site'
import RacialEqualityPage from '@/views/RacialEqualityPage'

export const metadata = pageMetadata({ title: 'Racial Equality', path: '/racial-equality' })
export default function Page() { return <RacialEqualityPage /> }
