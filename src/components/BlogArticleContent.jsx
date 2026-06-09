'use client'

import Link from '@/components/Link'
import { motion } from 'framer-motion'

/** Cover / card image — fills frame without awkward letterboxing */
export function BlogMediaFrame({
  src,
  alt,
  fallbackLabel,
  className = '',
  imageClassName = '',
  variant = 'card',
}) {
  const aspect =
    variant === 'hero' ? 'min-h-[420px] sm:min-h-[480px]' :
    variant === 'featured-split' ? 'min-h-[280px] lg:min-h-full lg:absolute lg:inset-0' :
    variant === 'card' ? 'h-52 sm:h-56' :
    'aspect-[16/10]'

  if (src) {
    return (
      <div className={`relative overflow-hidden bg-navy-900 ${aspect} ${className}`}>
        <img
          src={src}
          alt={alt || ''}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04] ${imageClassName}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent pointer-events-none" />
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden bg-navy-900 ${aspect} ${className}`}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-br from-neon/20 via-navy-800/90 to-navy-950" />
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <span className="font-display text-lg sm:text-xl font-bold text-neon/60 text-center leading-snug line-clamp-4">
          {fallbackLabel}
        </span>
      </div>
    </div>
  )
}

export function BlogFeaturedHero({ post, href }) {
  return (
    <Link href={href} className="group block relative rounded-3xl overflow-hidden border border-white/10 hover:border-neon/40 transition-all duration-300 shadow-2xl shadow-black/40">
      {post.coverImage ? (
        <>
          <img
            src={post.coverImage}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/75 to-navy-950/30 sm:via-navy-950/60 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neon/10 via-navy-900 to-navy-950">
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>
      )}

      <div className="relative z-10 flex flex-col justify-end min-h-[420px] sm:min-h-[520px] p-8 sm:p-12 lg:p-14 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-neon/15 border border-neon/30 text-neon text-xs font-semibold uppercase tracking-wider">
              Featured
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs">
              {post.category}
            </span>
            <span className="text-xs text-slate-400">{post.readTime}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4 group-hover:text-neon transition-colors">
            {post.title}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed line-clamp-3 mb-6 max-w-2xl">
            {post.excerpt}
          </p>
          <span className="inline-flex items-center gap-2 text-neon font-semibold text-sm">
            Read full story
            <span className="w-8 h-8 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center group-hover:bg-neon group-hover:text-navy-950 transition-all">
              →
            </span>
          </span>
        </motion.div>
      </div>
    </Link>
  )
}

export function BlogPostCard({ post, href, index = 0, large = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className={large ? 'sm:col-span-2' : ''}
    >
      <Link
        href={href}
        className={`group flex flex-col h-full rounded-2xl overflow-hidden border border-white/10 bg-navy-900/40 hover:border-neon/30 hover:shadow-[0_0_40px_rgba(0,255,136,0.08)] transition-all duration-300 ${large ? 'lg:flex-row lg:min-h-[280px]' : ''}`}
      >
        <div className={large ? 'lg:w-[52%] shrink-0' : ''}>
          <BlogMediaFrame
            src={post.coverImage}
            alt={post.title}
            fallbackLabel={post.category}
            variant={large ? 'featured-split' : 'card'}
            className={large ? 'lg:rounded-none lg:h-full' : 'rounded-none'}
          />
        </div>
        <div className={`flex flex-col flex-1 p-6 sm:p-7 ${large ? 'lg:justify-center' : ''}`}>
          <span className="text-neon text-xs font-semibold uppercase tracking-wider mb-2">{post.category}</span>
          <h3 className={`font-display font-bold mb-2 group-hover:text-neon transition-colors leading-snug ${large ? 'text-xl sm:text-2xl' : 'text-lg line-clamp-2'}`}>
            {post.title}
          </h3>
          <p className="text-sm text-slate-400 line-clamp-2 flex-1 leading-relaxed">{post.excerpt}</p>
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5 text-xs text-slate-500">
            <span>{post.author}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function ArticleImage({ src, alt, className = '', contain = false }) {
  return (
    <figure className={`relative overflow-hidden rounded-2xl border border-white/10 bg-navy-900 ${className}`}>
      <img
        src={src}
        alt={alt || ''}
        className={`w-full ${contain ? 'object-contain max-h-[70vh] mx-auto' : 'object-cover object-center aspect-[16/10]'}`}
      />
    </figure>
  )
}

export function BlogArticleBody({ post, hideCover = false }) {
  return (
    <>
      {!hideCover && post.coverImage ? (
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 mb-12 rounded-2xl overflow-hidden border border-white/10 bg-navy-900">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full max-h-[min(70vh,560px)] object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent pointer-events-none" />
        </div>
      ) : null}

      <div className="space-y-6 prose-spacing">
        {(post.content || []).map((block, i) => {
          if (block.type === 'h') {
            return (
              <h2 key={i} className="font-display text-2xl font-semibold text-white pt-2 border-l-2 border-neon pl-4">
                {block.text}
              </h2>
            )
          }
          if (block.type === 'img') {
            return (
              <ArticleImage key={i} src={block.src} alt={block.alt} contain className="my-8" />
            )
          }
          return (
            <p key={i} className="text-slate-300 text-lg leading-relaxed">
              {block.text}
            </p>
          )
        })}
      </div>

      {post.gallery?.length > 0 && (
        <div className="mt-16 pt-10 border-t border-white/10">
          <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon" />
            Project gallery
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {post.gallery.map((src, i) => (
              <ArticleImage key={i} src={src} alt={`${post.title} ${i + 1}`} contain />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

/** @deprecated use BlogPostCard */
export function BlogCardImage() {
  return null
}
