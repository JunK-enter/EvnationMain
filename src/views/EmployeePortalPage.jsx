'use client'

import Link from '@/components/Link'
import { useAuth } from '../context/AuthContext'
import AdminDashboard from '../components/AdminDashboard'
import Logo from '../components/Logo'
import { LogOut } from 'lucide-react'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function EmployeePortalContent() {
  const { user, login, logout } = useAuth()
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab') || 'submissions'
  const openBlogNew = searchParams.get('new') === '1'
  const [email, setEmail] = useState('employee@evnation.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleLogin(e) {
    e.preventDefault()
    const result = login(email, password)
    if (result.error) setError(result.error)
    else if (result.user?.role !== 'employee') {
      setError('Employee credentials required')
      logout()
    }
  }

  if (!user || user.role !== 'employee') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass rounded-2xl p-8 w-full max-w-md neon-border">
          <div className="flex justify-center mb-6">
            <Logo size="xl" className="mx-auto" />
          </div>
          <p className="text-center text-sm text-slate-400 mb-6">Employee Portal — manage leads & blog</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" className="btn-primary w-full">Sign In</button>
          </form>
          <Link href="/" className="block text-center text-sm text-neon mt-4 hover:underline">Back to Website</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 h-14 flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Logo size="sm" variant="icon" />
          <span className="text-slate-500 font-normal text-sm">Admin</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">{user.name}</span>
          <button onClick={logout} className="flex items-center gap-1 text-sm text-slate-400 hover:text-red-400"><LogOut className="w-4 h-4" /> Logout</button>
        </div>
      </div>
      <AdminDashboard initialTab={initialTab} openBlogNew={openBlogNew} />
    </>
  )
}

export default function EmployeePortalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-500">Loading…</div>}>
      <EmployeePortalContent />
    </Suspense>
  )
}
