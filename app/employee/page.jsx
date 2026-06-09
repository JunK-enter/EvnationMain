import { pageMetadata } from '@/lib/site'
import EmployeePortalPage from '@/views/EmployeePortalPage'

export const metadata = pageMetadata({ title: 'Employee Portal', path: '/employee', noIndex: true })
export default function Page() { return <EmployeePortalPage /> }
