/**
 * Supabase/Firebase-ready API layer.
 * Replace stub implementations with real backend calls when ready.
 *
 * Example Supabase:
 *   import { createClient } from '@supabase/supabase-js'
 *   const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
 */

import { mockSubmissions } from '../data/mockCustomers'
import {
  getSubmissions,
  saveSubmission,
  updateSubmission,
  generateSubmissionId,
} from './storage'
import { calculateReadinessScore } from './quoteCalculator'

let seeded = false

function seedIfEmpty() {
  if (seeded) return
  const existing = getSubmissions()
  if (existing.length === 0) {
    localStorage.setItem('evnation_submissions', JSON.stringify(mockSubmissions))
  }
  seeded = true
}

export async function fetchSubmissions(filters = {}) {
  seedIfEmpty()
  await delay(300)
  let data = getSubmissions()

  if (filters.status) data = data.filter((s) => s.status === filters.status)
  if (filters.state) data = data.filter((s) => s.home.state === filters.state)
  if (filters.service) data = data.filter((s) => s.services.includes(filters.service))
  if (filters.search) {
    const q = filters.search.toLowerCase()
    data = data.filter(
      (s) =>
        s.personal.firstName.toLowerCase().includes(q) ||
        s.personal.lastName.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.personal.email.toLowerCase().includes(q)
    )
  }

  return data
}

export async function createSubmission(formData) {
  await delay(500)
  const submission = {
    id: generateSubmissionId(),
    createdAt: new Date().toISOString(),
    status: 'submitted',
    leadSource: 'Website',
    ...formData,
    readinessScore: calculateReadinessScore(formData.home, formData.photos, formData.services),
  }
  saveSubmission(submission)
  return submission
}

export async function patchSubmission(id, updates) {
  await delay(200)
  return updateSubmission(id, updates)
}

export async function fetchStats() {
  seedIfEmpty()
  await delay(200)
  const data = getSubmissions()
  const pending = data.filter((s) => ['submitted', 'under_review'].includes(s.status)).length
  const scheduled = data.filter((s) => s.status === 'scheduled').length
  const installed = data.filter((s) => s.status === 'installed').length
  const revenueLow = data.reduce((sum, s) => sum + (s.estimatedTotal?.low || 0), 0)
  const revenueHigh = data.reduce((sum, s) => sum + (s.estimatedTotal?.high || 0), 0)

  const leadSources = {}
  data.forEach((s) => {
    leadSources[s.leadSource] = (leadSources[s.leadSource] || 0) + 1
  })

  return { total: data.length, pending, scheduled, installed, revenueLow, revenueHigh, leadSources }
}

export async function uploadPhoto(_file, _type) {
  await delay(400)
  return { url: URL.createObjectURL(_file), name: _file.name }
}

export async function sendNotificationEmail(submission) {
  await delay(300)
  console.info('[EVnation] Email notification sent for', submission.id)
  return { success: true }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
