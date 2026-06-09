import { pageMetadata } from '@/lib/site'
import { blogPosts } from '@/data/blogPosts'
import BlogPostPage from '@/views/BlogPostPage'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return { title: 'Article Not Found' }
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  })
}

export default async function Page({ params }) {
  const { slug } = await params
  return <BlogPostPage slug={slug} />
}
