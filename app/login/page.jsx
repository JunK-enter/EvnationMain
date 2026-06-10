import { Suspense } from 'react'
import BlogLoginPage from '@/views/BlogLoginPage'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Blog Editor Sign In',
  path: '/login',
  noIndex: true,
})

export default function Page() {
  return (
    <Suspense fallback={<div className="pt-28 min-h-screen" />}>
      <BlogLoginPage />
    </Suspense>
  )
}
