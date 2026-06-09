import { pageMetadata } from '@/lib/site'
import LoginPage from '@/views/LoginPage'

export const metadata = pageMetadata({ title: 'Login', path: '/login', noIndex: true })
export default function Page() { return <LoginPage /> }
