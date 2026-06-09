const STORAGE_KEY = 'evnation_submissions'
const QUOTE_KEY = 'evnation_quote_cart'
const USER_KEY = 'evnation_user'

function getStorage() {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function getSubmissions() {
  const storage = getStorage()
  if (!storage) return []
  try {
    const data = storage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveSubmission(submission) {
  const storage = getStorage()
  if (!storage) return submission
  const existing = getSubmissions()
  const updated = [submission, ...existing]
  storage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return submission
}

export function updateSubmission(id, updates) {
  const storage = getStorage()
  if (!storage) return null
  const existing = getSubmissions()
  const updated = existing.map((s) => (s.id === id ? { ...s, ...updates } : s))
  storage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated.find((s) => s.id === id)
}

export function getQuoteCart() {
  const storage = getStorage()
  if (!storage) return []
  try {
    const data = storage.getItem(QUOTE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveQuoteCart(items) {
  const storage = getStorage()
  if (!storage) return
  storage.setItem(QUOTE_KEY, JSON.stringify(items))
}

export function getUser() {
  const storage = getStorage()
  if (!storage) return null
  try {
    const data = storage.getItem(USER_KEY)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export function saveUser(user) {
  const storage = getStorage()
  if (!storage) return
  storage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearUser() {
  const storage = getStorage()
  if (!storage) return
  storage.removeItem(USER_KEY)
}

export function generateSubmissionId() {
  const num = String(getSubmissions().length + 1).padStart(3, '0')
  return `EVN-2026-${num}`
}
