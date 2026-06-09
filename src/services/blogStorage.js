import { defaultBlogPosts } from '@/data/blogPosts'

const BLOG_KEY = 'evnation_blog_posts'

function getStorage() {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function getBlogPosts() {
  const storage = getStorage()
  if (!storage) return [...defaultBlogPosts]
  try {
    const raw = storage.getItem(BLOG_KEY)
    if (!raw) {
      storage.setItem(BLOG_KEY, JSON.stringify(defaultBlogPosts))
      return [...defaultBlogPosts]
    }
    return JSON.parse(raw)
  } catch {
    return [...defaultBlogPosts]
  }
}

export function saveBlogPosts(posts) {
  const storage = getStorage()
  if (!storage) return
  storage.setItem(BLOG_KEY, JSON.stringify(posts))
}

export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function textToContent(text) {
  return text
    .split(/\n\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      if (line.startsWith('# ')) return { type: 'h', text: line.slice(2).trim() }
      if (line.startsWith('![')) {
        const match = line.match(/^!\[(.*?)\]\((.+)\)$/)
        if (match) return { type: 'img', alt: match[1], src: match[2] }
      }
      return { type: 'p', text: line }
    })
}

export function contentToText(content = []) {
  return content
    .filter((block) => block.type === 'p' || block.type === 'h')
    .map((block) => (block.type === 'h' ? `# ${block.text}` : block.text))
    .join('\n\n')
}

export function getContentImages(content = []) {
  return content.filter((block) => block.type === 'img')
}

export function estimateReadTime(content) {
  const words = content.reduce((n, b) => {
    if (b.type === 'img' || !b.text) return n
    return n + b.text.split(/\s+/).length
  }, 0)
  const mins = Math.max(1, Math.round(words / 200))
  return `${mins} min read`
}

export function upsertBlogPost(post) {
  const posts = getBlogPosts()
  const idx = posts.findIndex((p) => p.slug === post.slug)
  const next = idx >= 0 ? posts.map((p, i) => (i === idx ? post : p)) : [post, ...posts]
  saveBlogPosts(next)
  return next
}

export function deleteBlogPost(slug) {
  const next = getBlogPosts().filter((p) => p.slug !== slug)
  saveBlogPosts(next)
  return next
}

export function resetBlogPosts() {
  saveBlogPosts([...defaultBlogPosts])
  return [...defaultBlogPosts]
}
