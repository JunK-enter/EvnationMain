const STORAGE_KEY = 'evnation_submissions'
const QUOTE_KEY = 'evnation_quote_cart'
const USER_KEY = 'evnation_user'

export function getSubmissions() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveSubmission(submission) {
  const existing = getSubmissions()
  const updated = [submission, ...existing]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return submission
}

export function updateSubmission(id, updates) {
  const existing = getSubmissions()
  const updated = existing.map((s) => (s.id === id ? { ...s, ...updates } : s))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated.find((s) => s.id === id)
}

export function getQuoteCart() {
  try {
    const data = localStorage.getItem(QUOTE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveQuoteCart(items) {
  localStorage.setItem(QUOTE_KEY, JSON.stringify(items))
}

export function getUser() {
  try {
    const data = localStorage.getItem(USER_KEY)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearUser() {
  localStorage.removeItem(USER_KEY)
}

export function generateSubmissionId() {
  const num = String(getSubmissions().length + 1).padStart(3, '0')
  return `EVN-2026-${num}`
}
