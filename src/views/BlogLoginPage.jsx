'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from '@/components/Link'
import { useAuth } from '@/context/AuthContext'
import { PenLine } from 'lucide-react'

export default function BlogLoginPage() {
  const { login, isBlogEditor } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const redirect = searchParams.get('from') || '/blog'

  useEffect(() => {
    if (isBlogEditor) router.replace(redirect)
  }, [isBlogEditor, redirect, router])

  if (isBlogEditor) {
    return null
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const result = login(email, password)
    if (!result.ok) {
      setError(result.error)
      return
    }
    router.replace(redirect)
  }

  return (
    <div className="pt-28 pb-16 min-h-screen flex items-center justify-center px-4">
      <div className="glass rounded-2xl p-8 w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center">
            <PenLine className="w-5 h-5 text-neon" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold">Blog editor sign in</h1>
            <p className="text-xs text-slate-500">For evNation team — create & edit blog posts</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Email</label>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Password</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" className="btn-primary w-full">Sign in</button>
        </form>

        <Link to="/blog" className="block text-center text-sm text-slate-500 hover:text-neon mt-6">
          ← Back to blog
        </Link>
      </div>
    </div>
  )
}
