import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { getUser, saveUser, clearUser } from '../services/storage'

const AuthContext = createContext(null)

const DEMO_USERS = {
  employee: { email: 'employee@evnation.com', password: 'green111', role: 'employee', name: 'Admin User' },
  customer: { email: 'customer@email.com', password: 'demo', role: 'customer', name: 'Demo Customer' },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(getUser())
  }, [])

  const login = useCallback((email, password) => {
    const match = Object.values(DEMO_USERS).find(
      (u) => u.email === email && u.password === password
    )
    if (!match) return { error: 'Invalid credentials' }
    const session = { email: match.email, role: match.role, name: match.name }
    saveUser(session)
    setUser(session)
    return { user: session }
  }, [])

  const logout = useCallback(() => {
    clearUser()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
