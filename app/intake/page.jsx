import { pageMetadata } from '@/lib/site'
import CustomerIntakePage from '@/views/CustomerIntakePage'

export const metadata = pageMetadata({ title: 'Customer Intake', path: '/intake', noIndex: true })
export default function Page() { return <CustomerIntakePage /> }
