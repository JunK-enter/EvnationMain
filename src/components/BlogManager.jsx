'use client'

import { useState } from 'react'
import { Edit2, Trash2, Plus, X, Save, ExternalLink, RotateCcw, ImagePlus } from 'lucide-react'
import Link from '@/components/Link'
import UploadBox from '@/components/UploadBox'
import {
  getBlogPosts,
  upsertBlogPost,
  deleteBlogPost,
  resetBlogPosts,
  slugify,
  contentToText,
  textToContent,
  estimateReadTime,
  getContentImages,
} from '@/services/blogStorage'
import { readImageAsDataUrl, readCoverImageAsDataUrl } from '@/services/blogImage'

const emptyPost = () => ({
  slug: '',
  title: '',
  author: 'evNation Team',
  date: new Date().toISOString().slice(0, 10),
  category: 'Tips & Savings',
  readTime: '5 min read',
  excerpt: '',
  bodyText: '',
  coverImage: null,
  gallery: [],
  contentImages: [],
})

function toEditingState(post) {
  const content = post.content || []
  return {
    ...post,
    bodyText: contentToText(content),
    coverImage: post.coverImage || null,
    gallery: post.gallery || [],
    contentImages: getContentImages(content),
  }
}

export default function BlogManager({ autoOpenNew = false }) {
  const [posts, setPosts] = useState(() => getBlogPosts())
  const [editing, setEditing] = useState(autoOpenNew ? emptyPost() : null)
  const [uploadError, setUploadError] = useState('')
  const [uploading, setUploading] = useState(false)

  function reload() {
    setPosts(getBlogPosts())
  }

  function openNew() {
    setUploadError('')
    setEditing(emptyPost())
  }

  function openEdit(post) {
    setUploadError('')
    setEditing(toEditingState(post))
  }

  async function handleImageFile(file, target) {
    setUploadError('')
    setUploading(true)
    try {
      const dataUrl = target === 'cover'
        ? await readCoverImageAsDataUrl(file)
        : await readImageAsDataUrl(file)
      if (target === 'cover') {
        setEditing((prev) => ({ ...prev, coverImage: dataUrl }))
      } else if (target === 'gallery') {
        setEditing((prev) => ({ ...prev, gallery: [...(prev.gallery || []), dataUrl] }))
      } else if (target === 'inline') {
        setEditing((prev) => ({
          ...prev,
          contentImages: [...(prev.contentImages || []), { src: dataUrl, alt: prev.title || 'Blog image' }],
        }))
      }
    } catch (err) {
      setUploadError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  function handleSave() {
    if (!editing.title.trim() || !editing.excerpt.trim()) return
    const slug = editing.slug.trim() || slugify(editing.title)
    const textBlocks = textToContent(editing.bodyText)
    const imageBlocks = (editing.contentImages || []).map((img) => ({
      type: 'img',
      src: img.src,
      alt: img.alt || editing.title,
    }))
    const content = [...textBlocks, ...imageBlocks]
    const post = {
      slug,
      title: editing.title.trim(),
      author: editing.author.trim() || 'evNation Team',
      date: editing.date,
      category: editing.category.trim() || 'General',
      readTime: estimateReadTime(content),
      excerpt: editing.excerpt.trim(),
      coverImage: editing.coverImage || null,
      gallery: editing.gallery || [],
      content,
    }
    upsertBlogPost(post)
    reload()
    window.dispatchEvent(new Event('evnation-blog-updated'))
    setEditing(null)
  }

  function handleDelete(slug) {
    if (!confirm('Delete this blog post?')) return
    deleteBlogPost(slug)
    reload()
    window.dispatchEvent(new Event('evnation-blog-updated'))
  }

  function handleReset() {
    if (!confirm('Reset all blog posts to defaults? This cannot be undone.')) return
    resetBlogPosts()
    reload()
    window.dispatchEvent(new Event('evnation-blog-updated'))
  }

  return (
    <div>
      <div className="sticky top-14 z-40 -mx-4 px-4 py-3 mb-6 bg-navy-950/95 backdrop-blur border-b border-white/5 sm:static sm:mx-0 sm:px-0 sm:py-0 sm:bg-transparent sm:border-0 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between sm:items-center gap-3">
          <div>
            <h2 className="font-display font-semibold text-lg">Blog Posts</h2>
            <p className="text-sm text-slate-500 mt-1">Create, edit, and publish articles with photos.</p>
          </div>
          <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
            <button type="button" onClick={openNew} className="btn-primary w-full sm:w-auto !py-3 !px-5 !text-sm flex items-center justify-center gap-2 order-1">
              <Plus className="w-4 h-4" /> New post
            </button>
            <button type="button" onClick={handleReset} className="btn-secondary w-full sm:w-auto !py-2 !px-4 !text-sm flex items-center justify-center gap-2 order-2">
              <RotateCcw className="w-4 h-4" /> Reset defaults
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.slug} className="glass rounded-xl p-4 flex gap-4">
            <div className="w-20 h-14 rounded-lg overflow-hidden bg-navy-800 shrink-0 border border-white/10">
              {post.coverImage ? (
                <img src={post.coverImage} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600">
                  <ImagePlus className="w-5 h-5" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold truncate">{post.title}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {post.category} · {post.date} · /blog/{post.slug}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link href={`/blog/${post.slug}`} className="p-2 rounded-lg hover:bg-white/5" title="View on site">
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </Link>
                <button type="button" onClick={() => openEdit(post)} className="p-2 rounded-lg hover:bg-white/5">
                  <Edit2 className="w-4 h-4 text-slate-400" />
                </button>
                <button type="button" onClick={() => handleDelete(post.slug)} className="p-2 rounded-lg hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass rounded-2xl p-6 w-full max-w-2xl my-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display font-semibold text-lg">
                {editing.slug ? 'Edit post' : 'New post'}
              </h3>
              <button type="button" onClick={() => setEditing(null)} aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <UploadBox
                label="Cover photo"
                description="Shown on the blog list and article hero. Landscape 16:9 or 3:2 works best — we auto-resize to fit."
                preview={editing.coverImage}
                onUpload={async (payload) => {
                  if (!payload?.file) {
                    setEditing((prev) => ({ ...prev, coverImage: null }))
                    return
                  }
                  await handleImageFile(payload.file, 'cover')
                }}
              />

              <input
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                placeholder="Title"
                className="w-full bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
              />
              <input
                value={editing.slug}
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                placeholder="URL slug (auto from title if empty)"
                className="w-full bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
              />
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  value={editing.author}
                  onChange={(e) => setEditing({ ...editing, author: e.target.value })}
                  placeholder="Author"
                  className="w-full bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                />
                <input
                  type="date"
                  value={editing.date}
                  onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                  className="w-full bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>
              <input
                value={editing.category}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                placeholder="Category"
                className="w-full bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
              />
              <textarea
                value={editing.excerpt}
                onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                placeholder="Short excerpt (shown on blog index)"
                rows={2}
                className="w-full bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white resize-y"
              />
              <textarea
                value={editing.bodyText}
                onChange={(e) => setEditing({ ...editing, bodyText: e.target.value })}
                placeholder="Body — separate paragraphs with blank lines. Start a line with # for a heading."
                rows={10}
                className="w-full bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white font-mono resize-y"
              />

              <div>
                <p className="text-sm font-medium text-slate-300 mb-2">Photos in article</p>
                <p className="text-xs text-slate-500 mb-3">Added at the end of the article body.</p>
                {(editing.contentImages || []).length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {editing.contentImages.map((img, i) => (
                      <div key={i} className="relative rounded-xl overflow-hidden aspect-video border border-white/10">
                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setEditing((prev) => ({
                            ...prev,
                            contentImages: prev.contentImages.filter((_, idx) => idx !== i),
                          }))}
                          className="absolute top-2 right-2 p-1 rounded-lg bg-navy-950/80 hover:bg-red-500/80"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <label className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed border-white/15 hover:border-neon/30 text-sm text-slate-400 cursor-pointer transition-colors">
                  <ImagePlus className="w-4 h-4" />
                  {uploading ? 'Processing…' : 'Add photo to article'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (file) await handleImageFile(file, 'inline')
                      e.target.value = ''
                    }}
                  />
                </label>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-300 mb-2">Photo gallery (optional)</p>
                {(editing.gallery || []).length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                    {editing.gallery.map((src, i) => (
                      <div key={i} className="relative rounded-xl overflow-hidden aspect-square border border-white/10">
                        <img src={src} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setEditing((prev) => ({
                            ...prev,
                            gallery: prev.gallery.filter((_, idx) => idx !== i),
                          }))}
                          className="absolute top-2 right-2 p-1 rounded-lg bg-navy-950/80 hover:bg-red-500/80"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <label className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed border-white/15 hover:border-neon/30 text-sm text-slate-400 cursor-pointer transition-colors">
                  <ImagePlus className="w-4 h-4" />
                  {uploading ? 'Processing…' : 'Add gallery photo'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (file) await handleImageFile(file, 'gallery')
                      e.target.value = ''
                    }}
                  />
                </label>
              </div>

              {uploadError && <p className="text-red-400 text-sm">{uploadError}</p>}
            </div>

            <button type="button" onClick={handleSave} disabled={uploading} className="btn-primary w-full mt-4 flex items-center justify-center gap-2">
              <Save className="w-4 h-4" /> Save post
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
