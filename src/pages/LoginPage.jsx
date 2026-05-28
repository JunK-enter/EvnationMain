import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'

export default function LoginPage() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (user) {
    navigate('/')
    return null
  }

  function handleSubmit(e) {
    e.preventDefault()
    const result = login(email, password)
    if (result.error) setError(result.error)
    else navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass rounded-2xl p-8 w-full max-w-md neon-border">
        <div className="flex justify-center mb-6">
          <Logo size="xl" className="mx-auto" />
        </div>
        <h1 className="font-display text-2xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-sm text-slate-400 text-center mb-6">Sign in to save your quote progress</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" />
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white" />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" className="btn-primary w-full">Sign In</button>
        </form>
        <p className="text-xs text-slate-500 text-center mt-4">Demo: customer@email.com / demo</p>
        <Link to="/" className="block text-center text-sm text-neon mt-4 hover:underline">Back to Website</Link>
      </div>
    </div>
  )
}
