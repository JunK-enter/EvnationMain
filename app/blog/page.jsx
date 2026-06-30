import { pageMetadata } from '@/lib/site'
import BlogPage from '@/views/BlogPage'

export const metadata = pageMetadata({
  title: 'Blog — EV Charging & Solar Insights',
  description: 'Tips, rebates, and guides for EV owners in California.',
  path: '/blog',
})

export default function Page() {
  return <BlogPage />
}
