import { pageMetadata } from '@/lib/site'
import AdminIntakeDetailPage from '@/views/AdminIntakeDetailPage'

export const metadata = pageMetadata({ title: 'Intake Detail', path: '/admin/intake', noIndex: true })

export default async function Page({ params }) {
  const { id } = await params
  return <AdminIntakeDetailPage id={id} />
}
