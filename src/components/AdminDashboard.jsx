'use client'

import { useState, useEffect } from 'react'
import {
  Users, DollarSign, Clock, CheckCircle, Search, Filter,
  BarChart3, TrendingUp, Zap, Edit2, Trash2, Plus, X, Save, Newspaper,
} from 'lucide-react'
import { fetchSubmissions, fetchStats, patchSubmission } from '../services/api'
import { shopServices, statusFlow } from '../data/services'
import { US_STATES } from '../data/states'
import StatusBadge from './StatusBadge'
import BlogManager from './BlogManager'

export default function AdminDashboard({ initialTab = 'submissions', openBlogNew = false }) {
  const [submissions, setSubmissions] = useState([])
  const [stats, setStats] = useState(null)
  const [selected, setSelected] = useState(null)
  const [filters, setFilters] = useState({ search: '', status: '', state: '', service: '' })
  const [tab, setTab] = useState(initialTab === 'blog' ? 'blog' : initialTab === 'shop' ? 'shop' : initialTab === 'analytics' ? 'analytics' : 'submissions')
  const [shopItems, setShopItems] = useState(shopServices)
  const [editingItem, setEditingItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [filters])

  async function loadData() {
    setLoading(true)
    const [subs, st] = await Promise.all([fetchSubmissions(filters), fetchStats()])
    setSubmissions(subs)
    setStats(st)
    setLoading(false)
  }

  async function updateStatus(id, status) {
    await patchSubmission(id, { status })
    loadData()
    if (selected?.id === id) setSelected((s) => ({ ...s, status }))
  }

  function saveShopItem(item) {
    setShopItems((prev) => {
      const exists = prev.find((i) => i.id === item.id)
      if (exists) return prev.map((i) => (i.id === item.id ? item : i))
      return [...prev, item]
    })
    setEditingItem(null)
  }

  function deleteShopItem(id) {
    setShopItems((prev) => prev.filter((i) => i.id !== id))
  }

  const tabs = [
    { id: 'submissions', label: 'Submissions', icon: Users },
    { id: 'blog', label: 'Blog', icon: Newspaper },
    { id: 'shop', label: 'Shop Items', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-navy-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">Employee Portal</h1>
          <p className="text-slate-400 mt-1">Manage customers, quotes, shop inventory, and blog content</p>
        </div>

        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {[
              { icon: Users, label: 'Total Leads', value: stats.total, color: 'text-blue-400' },
              { icon: Clock, label: 'Pending Review', value: stats.pending, color: 'text-yellow-400' },
              { icon: TrendingUp, label: 'Scheduled', value: stats.scheduled, color: 'text-purple-400' },
              { icon: CheckCircle, label: 'Installed', value: stats.installed, color: 'text-neon' },
              { icon: DollarSign, label: 'Revenue Est.', value: `$${(stats.revenueLow / 1000).toFixed(0)}k–$${(stats.revenueHigh / 1000).toFixed(0)}k`, color: 'text-neon' },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl p-4">
                <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
                <p className="font-display text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                tab === t.id ? 'bg-neon/10 text-neon' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'submissions' && (
          <>
            <div className="glass rounded-xl p-4 mb-6 flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  placeholder="Search customers..."
                  className="w-full bg-navy-800 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white"
                />
              </div>
              <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white">
                <option value="">All Statuses</option>
                {statusFlow.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
              </select>
              <select value={filters.state} onChange={(e) => setFilters({ ...filters, state: e.target.value })} className="bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white">
                <option value="">All States</option>
                {US_STATES.map((s) => <option key={s.code} value={s.code}>{s.code}</option>)}
              </select>
              <select value={filters.service} onChange={(e) => setFilters({ ...filters, service: e.target.value })} className="bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white">
                <option value="">All Services</option>
                {shopServices.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-3">
                {loading ? (
                  <p className="text-slate-500 text-center py-12">Loading...</p>
                ) : submissions.length === 0 ? (
                  <p className="text-slate-500 text-center py-12">No submissions found</p>
                ) : (
                  submissions.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelected(sub)}
                      className={`w-full text-left glass rounded-xl p-4 hover:border-neon/20 transition-colors ${
                        selected?.id === sub.id ? 'border-neon/30 ring-1 ring-neon/10' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">{sub.personal.firstName} {sub.personal.lastName}</p>
                          <p className="text-xs text-slate-500">{sub.id} · {sub.home.city}, {sub.home.state}</p>
                        </div>
                        <StatusBadge status={sub.status} />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs text-slate-400">{sub.vehicle.make} {sub.vehicle.model}</span>
                        <span className="text-xs text-neon">${sub.estimatedTotal?.low?.toLocaleString()}–${sub.estimatedTotal?.high?.toLocaleString()}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>

              <div className="glass rounded-xl p-6 h-fit sticky top-24">
                {selected ? (
                  <>
                    <h3 className="font-display font-semibold text-lg mb-4">Customer Detail</h3>
                    <div className="space-y-3 text-sm">
                      <div><span className="text-slate-500">Name:</span> {selected.personal.firstName} {selected.personal.lastName}</div>
                      <div><span className="text-slate-500">Email:</span> {selected.personal.email}</div>
                      <div><span className="text-slate-500">Phone:</span> {selected.personal.phone}</div>
                      <div><span className="text-slate-500">Location:</span> {selected.home.city}, {selected.home.state} {selected.home.zip}</div>
                      <div><span className="text-slate-500">Panel:</span> {selected.home.panelSize}</div>
                      <div><span className="text-slate-500">Vehicle:</span> {selected.vehicle.make} {selected.vehicle.model}</div>
                      <div><span className="text-slate-500">Lead Source:</span> {selected.leadSource}</div>
                      <div><span className="text-slate-500">Readiness:</span> <span className="text-neon">{selected.readinessScore}%</span></div>
                      {selected.notes && <div><span className="text-slate-500">Notes:</span> {selected.notes}</div>}
                      <div className="flex gap-2 pt-2">
                        {selected.photos?.panel && <span className="text-xs px-2 py-1 rounded bg-neon/10 text-neon">Panel Photo</span>}
                        {selected.photos?.garage && <span className="text-xs px-2 py-1 rounded bg-neon/10 text-neon">Garage Photo</span>}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5">
                      <label className="text-xs text-slate-500 mb-1.5 block">Update Status</label>
                      <select
                        value={selected.status}
                        onChange={(e) => updateStatus(selected.id, e.target.value)}
                        className="w-full bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                      >
                        {statusFlow.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                      </select>
                    </div>
                  </>
                ) : (
                  <p className="text-slate-500 text-sm text-center py-8">Select a submission to view details</p>
                )}
              </div>
            </div>
          </>
        )}

        {tab === 'blog' && <BlogManager autoOpenNew={openBlogNew} />}

        {tab === 'shop' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display font-semibold text-lg">Service Catalog</h2>
              <button onClick={() => setEditingItem({ id: '', name: '', shortDesc: '', priceRange: '', basePrice: 0, benefits: [''], icon: 'Zap', category: 'installation' })} className="btn-primary !py-2 !px-4 !text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>

            <div className="space-y-3">
              {shopItems.map((item) => (
                <div key={item.id} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.priceRange} · Base: ${item.basePrice}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingItem({ ...item })} className="p-2 rounded-lg hover:bg-white/5"><Edit2 className="w-4 h-4 text-slate-400" /></button>
                    <button onClick={() => deleteShopItem(item.id)} className="p-2 rounded-lg hover:bg-red-500/10"><Trash2 className="w-4 h-4 text-red-400" /></button>
                  </div>
                </div>
              ))}
            </div>

            {editingItem && (
              <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                <div className="glass rounded-2xl p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-display font-semibold">{editingItem.id ? 'Edit' : 'Add'} Service</h3>
                    <button onClick={() => setEditingItem(null)}><X className="w-5 h-5" /></button>
                  </div>
                  <div className="space-y-3">
                    <input value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} placeholder="Name" className="w-full bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white" />
                    <input value={editingItem.shortDesc} onChange={(e) => setEditingItem({ ...editingItem, shortDesc: e.target.value })} placeholder="Description" className="w-full bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white" />
                    <input value={editingItem.priceRange} onChange={(e) => setEditingItem({ ...editingItem, priceRange: e.target.value })} placeholder="Price Range" className="w-full bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white" />
                    <input type="number" value={editingItem.basePrice} onChange={(e) => setEditingItem({ ...editingItem, basePrice: Number(e.target.value) })} placeholder="Base Price" className="w-full bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white" />
                    <button onClick={() => saveShopItem({ ...editingItem, id: editingItem.id || `custom-${Date.now()}` })} className="btn-primary w-full flex items-center justify-center gap-2">
                      <Save className="w-4 h-4" /> Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'analytics' && stats && (
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="glass rounded-xl p-6">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Filter className="w-4 h-4 text-neon" /> Lead Sources</h3>
              <div className="space-y-3">
                {Object.entries(stats.leadSources).map(([source, count]) => (
                  <div key={source} className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">{source}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-navy-800 rounded-full overflow-hidden">
                        <div className="h-full bg-neon rounded-full" style={{ width: `${(count / stats.total) * 100}%` }} />
                      </div>
                      <span className="text-sm font-semibold text-neon w-6">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-xl p-6">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-neon" /> Pipeline Overview</h3>
              <div className="space-y-3">
                {statusFlow.map((s) => {
                  const count = submissions.filter((sub) => sub.status === s.key).length
                  return (
                    <div key={s.key} className="flex items-center justify-between">
                      <StatusBadge status={s.key} />
                      <span className="font-semibold">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
