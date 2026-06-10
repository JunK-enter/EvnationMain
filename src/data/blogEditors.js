/**
 * Blog editor accounts — change passwords here or via .env.local (see .env.example).
 * Used only for blog New post / Manage on /blog.
 */
export const BLOG_EDITORS = [
  {
    email: process.env.NEXT_PUBLIC_BLOG_EDITOR_1_EMAIL || 'editor@evnation.com',
    password: process.env.NEXT_PUBLIC_BLOG_EDITOR_1_PASSWORD || 'green111',
    name: process.env.NEXT_PUBLIC_BLOG_EDITOR_1_NAME || 'Blog Editor',
    role: 'blog_editor',
  },
  {
    email: process.env.NEXT_PUBLIC_BLOG_EDITOR_2_EMAIL || 'editor2@evnation.com',
    password: process.env.NEXT_PUBLIC_BLOG_EDITOR_2_PASSWORD || 'green222',
    name: process.env.NEXT_PUBLIC_BLOG_EDITOR_2_NAME || 'Blog Editor 2',
    role: 'blog_editor',
  },
]

export function findBlogEditor(email, password) {
  const normalized = email?.trim().toLowerCase()
  return BLOG_EDITORS.find(
    (e) => e.email.toLowerCase() === normalized && e.password === password
  ) || null
}

export function isBlogEditor(user) {
  return user?.role === 'blog_editor'
}
