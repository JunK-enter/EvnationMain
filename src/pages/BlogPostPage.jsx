import { Link, useParams } from 'react-router-dom'
import { Calendar, User, ArrowLeft, Tag, ArrowRight } from 'lucide-react'
import { blogPosts, getPostBySlug, formatPostDate } from '../data/blogPosts'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="pt-28 pb-20 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Article not found</h1>
          <p className="text-slate-400 mb-8">The post you’re looking for doesn’t exist or has been moved.</p>
          <Link to="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </div>
    )
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3)
  const fallback = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)
  const suggestions = (related.length ? related : fallback).slice(0, 3)

  return (
    <div className="pt-28 pb-20">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-neon transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> All Articles
        </Link>

        <span className="inline-flex items-center gap-1.5 text-xs text-neon mb-4">
          <Tag className="w-3.5 h-3.5" /> {post.category}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-5">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-8 pb-8 border-b border-white/10">
          <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {post.author}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formatPostDate(post.date)}</span>
          <span>{post.readTime}</span>
        </div>

        <div className="aspect-video rounded-2xl bg-gradient-to-br from-neon/20 via-navy-800 to-navy-900 flex items-center justify-center p-10 mb-10">
          <span className="font-display text-2xl font-bold text-neon/80 text-center leading-snug">{post.title}</span>
        </div>

        <div className="space-y-5">
          {post.content.map((block, i) =>
            block.type === 'h' ? (
              <h2 key={i} className="font-display text-xl font-semibold text-white pt-4">{block.text}</h2>
            ) : (
              <p key={i} className="text-slate-300 leading-relaxed">{block.text}</p>
            )
          )}
        </div>

        {/* CTA */}
        <div className="glass rounded-2xl p-8 mt-12 text-center neon-border">
          <h3 className="font-display text-xl font-bold mb-2">Ready to electrify your home?</h3>
          <p className="text-slate-400 text-sm mb-6">Get a free, transparent estimate from our licensed team.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/quote" className="btn-primary">Get a Quote</Link>
            <Link to="/intake" className="btn-secondary">Start Customer Intake</Link>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {suggestions.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <h3 className="font-display text-2xl font-bold mb-8">More Articles</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {suggestions.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="group glass rounded-2xl p-6 hover:border-neon/30 transition-colors">
                <span className="text-xs text-neon">{p.category}</span>
                <h4 className="font-display font-semibold mt-2 mb-3 group-hover:text-neon transition-colors leading-snug">{p.title}</h4>
                <span className="inline-flex items-center gap-1.5 text-sm text-neon">
                  Read <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
