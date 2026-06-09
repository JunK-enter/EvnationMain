'use client'

import { useState, useEffect, useCallback } from 'react'
import { getBlogPosts } from '@/services/blogStorage'

export function useBlogPosts() {
  const [posts, setPosts] = useState([])
  const [ready, setReady] = useState(false)

  const refresh = useCallback(() => {
    setPosts(getBlogPosts())
    setReady(true)
  }, [])

  useEffect(() => {
    refresh()
    const onStorage = (e) => {
      if (e.key === 'evnation_blog_posts') refresh()
    }
    const onBlogUpdate = () => refresh()
    window.addEventListener('storage', onStorage)
    window.addEventListener('evnation-blog-updated', onBlogUpdate)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('evnation-blog-updated', onBlogUpdate)
    }
  }, [refresh])

  return { posts, ready, refresh }
}
