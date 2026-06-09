import { pageMetadata } from '@/lib/site'
import AdminIntakePage from '@/views/AdminIntakePage'

export const metadata = pageMetadata({ title: 'Admin Intake', path: '/admin/intake', noIndex: true })
export default function Page() { return <AdminIntakePage /> }
