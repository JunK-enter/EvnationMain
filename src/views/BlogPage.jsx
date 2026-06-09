'use client'

import { useState, useMemo } from 'react'
import Link from '@/components/Link'
import { motion } from 'framer-motion'
import { Sparkles, Plus, Settings, Zap } from 'lucide-react'
import { formatPostDate } from '../data/blogPosts'
import { useBlogPosts } from '@/hooks/useBlogPosts'
import { useAuth } from '@/context/AuthContext'
import BlogManager from '@/components/BlogManager'
import { BlogFeaturedHero, BlogPostCard } from '@/components/BlogArticleContent'
import { serviceArea } from '@/data/localSeo'

export default function BlogPage() {
  const { posts, ready } = useBlogPosts()
  const { user } = useAuth()
  const [activeCategory, setActiveCategory] = useState('All')
  const [managing, setManaging] = useState(false)
  const [openNew, setOpenNew] = useState(false)

  const isEmployee = user?.role === 'employee'

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts]
  )

  const filtered =
    activeCategory === 'All'
      ? posts
      : posts.filter((p) => p.category === activeCategory)

  const [featured, ...rest] = filtered

  function startNewPost() {
    setOpenNew(true)
    setManaging(true)
  }

  if (!ready) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-neon/30 border-t-neon animate-spin" />
          <p className="text-slate-500 text-sm">Loading stories…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="glow-orb w-[600px] h-[600px] bg-neon/5 top-[-20%] right-[-10%] pointer-events-none" />

      {/* Hero header */}
      <section className="relative pt-28 pb-10 sm:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-semibold uppercase tracking-wider mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                {serviceArea.region} Energy Journal
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
                EV, Solar &{' '}
                <span className="neon-text">Home Power</span>
              </h1>
              <p className="text-slate-400 mt-4 text-lg leading-relaxed max-w-xl">
                Field notes, rebate guides, and install insights from the evNation team across our service areas.
              </p>
              <p className="text-xs text-slate-500 mt-4">
                {posts.length} articles · Updated {featured ? formatPostDate(featured.date) : 'regularly'}
              </p>
            </motion.div>

            {isEmployee && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col sm:flex-row gap-2 shrink-0"
              >
                <button
                  type="button"
                  onClick={startNewPost}
                  className="btn-primary justify-center !py-3 !px-6 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> New post
                </button>
                <button
                  type="button"
                  onClick={() => { setOpenNew(false); setManaging(true) }}
                  className="btn-secondary justify-center !py-3 !px-6 flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" /> Manage
                </button>
              </motion.div>
            )}
          </div>

          {/* Category filter — horizontal scroll on mobile */}
          <div className="mt-10 flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActiveCategory(c)}
                className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === c
                    ? 'bg-neon text-navy-950 shadow-[0_0_20px_rgba(0,255,136,0.25)]'
                    : 'text-slate-300 bg-white/[0.04] border border-white/10 hover:border-neon/30 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured + grid */}
      <section className="relative pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {featured && (
            <BlogFeaturedHero post={featured} href={`/blog/${featured.slug}`} />
          )}

          {rest.length > 0 && (
            <>
              <div className="flex items-center gap-3 pt-4">
                <Zap className="w-5 h-5 text-neon" />
                <h2 className="font-display text-xl font-semibold">Latest stories</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {rest.map((post, i) => (
                  <BlogPostCard
                    key={post.slug}
                    post={post}
                    href={`/blog/${post.slug}`}
                    index={i}
                    large={i === 0 && !!post.coverImage}
                  />
                ))}
              </div>
            </>
          )}

          {filtered.length === 0 && (
            <div className="glass rounded-3xl p-16 text-center">
              <p className="text-slate-400">No articles in this category yet.</p>
            </div>
          )}

          {/* CTA band */}
          <div className="glass rounded-3xl p-8 sm:p-12 text-center neon-border mt-8">
            <h3 className="font-display text-2xl font-bold mb-3">Ready to go electric?</h3>
            <p className="text-slate-400 mb-6 max-w-lg mx-auto">
              Build your custom install quote for EV charging, solar, or panel upgrades in your service area.
            </p>
            <Link href="/quote" className="btn-primary inline-flex items-center gap-2">
              Build Your Quote
            </Link>
          </div>
        </div>
      </section>

      {managing && isEmployee && (
        <div className="fixed inset-0 z-[100] bg-navy-950/98 overflow-y-auto">
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-8 py-4 bg-navy-950/95 backdrop-blur border-b border-white/10">
            <h2 className="font-display font-semibold text-lg">Blog editor</h2>
            <button
              type="button"
              onClick={() => { setManaging(false); setOpenNew(false) }}
              className="btn-secondary !py-2 !px-4 !text-sm"
            >
              Close
            </button>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
            <BlogManager autoOpenNew={openNew} key={openNew ? 'new' : 'manage'} />
          </div>
        </div>
      )}
    </div>
  )
}
