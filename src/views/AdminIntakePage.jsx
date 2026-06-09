'use client'

import { useEffect, useState } from 'react'
import Link from '@/components/Link'
import {
  Inbox, RefreshCw, Search, Eye, Home as HomeIcon, Database, HardDrive,
} from 'lucide-react'
import IntakeStatusBadge from '../components/IntakeStatusBadge'
import { fetchIntakes, usingFirebase } from '../services/intakeService'
import { INTAKE_STATUSES } from '../data/intakeOptions'

function formatDate(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return iso
  }
}

export default function AdminIntakePage() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  async function load() {
    setLoading(true)
    try {
      setRecords(await fetchIntakes())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = records.filter((r) => {
    if (statusFilter && r.status !== statusFilter) return false
    if (!search) return true
    const q = search.toLowerCase()
    return (
      r.fullName?.toLowerCase().includes(q) ||
      r.email?.toLowerCase().includes(q) ||
      r.phone?.toLowerCase().includes(q) ||
      r.city?.toLowerCase().includes(q)
    )
  })

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Internal header */}
      <div className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 h-14 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Inbox className="w-5 h-5 text-neon" />
          <span className="font-display font-semibold">Customer Intake</span>
          <span className="text-slate-500 text-sm">· Admin</span>
        </div>
        <Link to="/" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-neon transition-colors">
          <HomeIcon className="w-4 h-4" /> Website
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold">Submitted Intakes</h1>
            <p className="text-slate-400 text-sm mt-1 flex items-center gap-1.5">
              {usingFirebase() ? (
                <><Database className="w-3.5 h-3.5 text-neon" /> Firebase Realtime Database</>
              ) : (
                <><HardDrive className="w-3.5 h-3.5 text-yellow-400" /> Local storage (Firebase not configured)</>
              )}
            </p>
          </div>
          <button onClick={load} className="btn-secondary !py-2 !px-4 !text-sm">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="glass rounded-xl p-4 mb-6 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone, city..."
              className="w-full bg-navy-800 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
          >
            <option value="">All Statuses</option>
            {INTAKE_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Desktop table */}
        <div className="glass rounded-2xl overflow-hidden hidden lg:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-slate-400">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Address</th>
                <th className="px-4 py-3 font-medium">Property</th>
                <th className="px-4 py-3 font-medium">Panel</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={9} className="px-4 py-12 text-center text-slate-500">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={9} className="px-4 py-12 text-center text-slate-500">No intake records found.</td></tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 font-medium">{r.fullName}</td>
                    <td className="px-4 py-3 text-slate-400">{r.phone}</td>
                    <td className="px-4 py-3 text-slate-400">{r.email}</td>
                    <td className="px-4 py-3 text-slate-400">{[r.city, r.state].filter(Boolean).join(', ')}</td>
                    <td className="px-4 py-3 text-slate-400">{r.propertyType}</td>
                    <td className="px-4 py-3 text-slate-400">{r.panelSize}</td>
                    <td className="px-4 py-3"><IntakeStatusBadge status={r.status} /></td>
                    <td className="px-4 py-3 text-slate-400">{formatDate(r.createdAt)}</td>
                    <td className="px-4 py-3 text-right">
                      <Link to={`/admin/intake/${r.id}`} className="inline-flex items-center gap-1.5 text-neon hover:underline">
                        <Eye className="w-4 h-4" /> View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 lg:hidden">
          {loading ? (
            <p className="text-slate-500 text-center py-12">Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="text-slate-500 text-center py-12">No intake records found.</p>
          ) : (
            filtered.map((r) => (
              <div key={r.id} className="glass rounded-xl p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="font-semibold">{r.fullName}</p>
                    <p className="text-xs text-slate-500">{[r.city, r.state].filter(Boolean).join(', ')}</p>
                  </div>
                  <IntakeStatusBadge status={r.status} />
                </div>
                <div className="text-xs text-slate-400 space-y-1 mb-3">
                  <p>{r.phone} · {r.email}</p>
                  <p>{r.propertyType} · Panel {r.panelSize}</p>
                  <p>{formatDate(r.createdAt)}</p>
                </div>
                <Link to={`/admin/intake/${r.id}`} className="inline-flex items-center gap-1.5 text-sm text-neon hover:underline">
                  <Eye className="w-4 h-4" /> View Details
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
