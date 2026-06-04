import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight, Tag } from 'lucide-react'
import { blogPosts, formatPostDate } from '../data/blogPosts'

const categories = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory)

  const [featured, ...rest] = filtered

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">EVnation Blog</p>
          <h1 className="font-display text-4xl font-bold">Insights on EVs, Solar & Energy</h1>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto">
            Tips, trends, and transparent advice to help you electrify your home and life with confidence.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === c ? 'bg-neon text-navy-950' : 'text-slate-300 bg-white/5 hover:bg-white/10'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {featured && (
          <Link
            to={`/blog/${featured.slug}`}
            className="group block glass rounded-3xl overflow-hidden mb-12 hover:border-neon/30 transition-colors"
          >
            <div className="grid md:grid-cols-2">
              <div className="aspect-video md:aspect-auto bg-gradient-to-br from-neon/20 via-navy-800 to-navy-900 flex items-center justify-center p-10">
                <span className="font-display text-2xl font-bold text-neon/80 text-center leading-snug">{featured.title}</span>
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <span className="inline-flex items-center gap-1.5 text-xs text-neon mb-3">
                  <Tag className="w-3.5 h-3.5" /> {featured.category}
                </span>
                <h2 className="font-display text-2xl font-bold mb-3 group-hover:text-neon transition-colors">{featured.title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-5">
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {featured.author}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formatPostDate(featured.date)}</span>
                  <span>{featured.readTime}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-neon text-sm font-semibold">
                  Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Post grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group glass rounded-2xl overflow-hidden flex flex-col hover:border-neon/30 transition-colors"
            >
              <div className="aspect-video bg-gradient-to-br from-neon/15 via-navy-800 to-navy-900 flex items-center justify-center p-6">
                <span className="font-display text-base font-semibold text-neon/70 text-center leading-snug">{post.category}</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display font-semibold mb-2 group-hover:text-neon transition-colors leading-snug">{post.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formatPostDate(post.date)}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
