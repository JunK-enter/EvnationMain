'use client'

import { createContext, useContext, useCallback } from 'react'
import { findBlogEditor, isBlogEditor as checkBlogEditor } from '@/data/blogEditors'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const AuthContext = createContext(null)

const SESSION_KEY = 'evnation_blog_editor'

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage(SESSION_KEY, null)

  const login = useCallback((email, password) => {
    const match = findBlogEditor(email, password)
    if (!match) {
      return { ok: false, error: 'Invalid email or password' }
    }
    const session = { email: match.email, name: match.name, role: match.role }
    setUser(session)
    return { ok: true, user: session }
  }, [setUser])

  const logout = useCallback(() => {
    setUser(null)
  }, [setUser])

  const isBlogEditor = checkBlogEditor(user)

  return (
    <AuthContext.Provider value={{ user, login, logout, isBlogEditor, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
