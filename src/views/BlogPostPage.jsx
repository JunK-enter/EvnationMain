'use client'

import Link from '@/components/Link'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft, Tag, ArrowRight, Clock } from 'lucide-react'
import { getPostBySlug, formatPostDate } from '../data/blogPosts'
import { useBlogPosts } from '@/hooks/useBlogPosts'
import { BlogArticleBody, BlogPostCard } from '@/components/BlogArticleContent'

export default function BlogPostPage({ slug }) {
  const { posts, ready } = useBlogPosts()
  const post = ready ? getPostBySlug(slug, posts) : null

  if (!ready) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading article…</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="pt-28 pb-20 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Article not found</h1>
          <p className="text-slate-400 mb-8">The post you’re looking for doesn’t exist or has been moved.</p>
          <Link href="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </div>
    )
  }

  const related = posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3)
  const fallback = posts.filter((p) => p.slug !== post.slug).slice(0, 3)
  const suggestions = (related.length ? related : fallback).slice(0, 3)

  return (
    <div className="pb-20">
      {/* Full-bleed hero */}
      <header className="relative pt-24 min-h-[50vh] flex items-end overflow-hidden">
        {post.coverImage ? (
          <>
            <img
              src={post.coverImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neon/10 via-navy-900 to-navy-950">
            <div className="absolute inset-0 grid-bg opacity-40" />
          </div>
        )}

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-8">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-neon transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon/15 border border-neon/30 text-neon text-xs font-semibold mb-4">
              <Tag className="w-3.5 h-3.5" /> {post.category}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.12] mb-5">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-neon" /> {post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formatPostDate(post.date)}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-20">
        <div className="glass rounded-3xl p-8 sm:p-10 lg:p-12 border border-white/10 shadow-2xl shadow-black/30">
          <BlogArticleBody post={post} hideCover />
        </div>

        <div className="glass rounded-2xl p-8 mt-10 text-center neon-border">
          <h3 className="font-display text-xl font-bold mb-2">Ready to electrify your home?</h3>
          <p className="text-slate-400 text-sm mb-6">Get a free, transparent estimate from our licensed regional team.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quote" className="btn-primary">Get a Quote</Link>
            <Link href="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </div>
      </article>

      {suggestions.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <h3 className="font-display text-2xl font-bold mb-8 flex items-center gap-2">
            Continue reading
            <ArrowRight className="w-5 h-5 text-neon" />
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((p, i) => (
              <BlogPostCard key={p.slug} post={p} href={`/blog/${p.slug}`} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
