import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft, Home as HomeIcon, User, Zap, Camera, Send, Loader2, CheckCircle,
} from 'lucide-react'
import IntakeStatusBadge from '../components/IntakeStatusBadge'
import { fetchIntake, updateIntakeStatus } from '../services/intakeService'
import { sendToPipedrive } from '../services/pipedrive'
import { INTAKE_STATUSES, PHOTO_SLOTS } from '../data/intakeOptions'

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-white/5 last:border-0">
      <span className="text-slate-500 text-sm shrink-0">{label}</span>
      <span className="text-slate-200 text-sm text-right break-words">{value || '—'}</span>
    </div>
  )
}

export default function AdminIntakeDetailPage() {
  const { id } = useParams()
  const [record, setRecord] = useState(null)
  const [loading, setLoading] = useState(true)
  const [savingStatus, setSavingStatus] = useState(false)
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    let active = true
    ;(async () => {
      setLoading(true)
      const data = await fetchIntake(id)
      if (active) {
        setRecord(data)
        setLoading(false)
      }
    })()
    return () => { active = false }
  }, [id])

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 3500)
  }

  async function changeStatus(status) {
    setSavingStatus(true)
    await updateIntakeStatus(id, status)
    setRecord((r) => ({ ...r, status }))
    setSavingStatus(false)
    showToast(`Status updated to "${status}".`)
  }

  async function handleSendToPipedrive() {
    setSending(true)
    try {
      await sendToPipedrive(record)
      await updateIntakeStatus(id, 'Sent to Pipedrive')
      setRecord((r) => ({ ...r, status: 'Sent to Pipedrive' }))
      showToast('Lead prepared and marked as "Sent to Pipedrive".')
    } catch (err) {
      console.error('[EVnation] Send to Pipedrive failed:', err)
      showToast('Could not send to Pipedrive. Check the console.')
    } finally {
      setSending(false)
    }
  }

  const photos = record?.photos || {}
  const allPhotos = [
    ...PHOTO_SLOTS.map((s) => ({ label: s.label, src: photos[s.key] })).filter((p) => p.src),
    ...((photos.additional || []).map((src, i) => ({ label: `Additional ${i + 1}`, src }))),
  ]

  return (
    <div className="min-h-screen bg-navy-950">
      <div className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 h-14 flex items-center justify-between px-4 sm:px-6">
        <Link to="/admin/intake" className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-neon transition-colors">
          <ArrowLeft className="w-4 h-4" /> All Intakes
        </Link>
        <Link to="/" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-neon transition-colors">
          <HomeIcon className="w-4 h-4" /> Website
        </Link>
      </div>

      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 glass neon-border rounded-xl px-4 py-2.5 text-sm text-neon flex items-center gap-2 shadow-lg">
          <CheckCircle className="w-4 h-4" /> {toast}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {loading ? (
          <p className="text-slate-500 text-center py-20">Loading...</p>
        ) : !record ? (
          <div className="text-center py-20">
            <p className="text-slate-400 mb-4">Intake record not found.</p>
            <Link to="/admin/intake" className="btn-secondary">Back to list</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="font-display text-2xl font-bold">{record.fullName}</h1>
                <p className="text-slate-500 text-sm mt-1">
                  Intake ID: <span className="font-mono text-slate-400">{record.id}</span>
                </p>
              </div>
              <IntakeStatusBadge status={record.status} />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left: details */}
              <div className="lg:col-span-2 space-y-6">
                <section className="glass rounded-2xl p-6">
                  <h2 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-neon" /> Customer Information
                  </h2>
                  <DetailRow label="Full Name" value={record.fullName} />
                  <DetailRow label="Phone" value={record.phone} />
                  <DetailRow label="Email" value={record.email} />
                  <DetailRow label="Address" value={record.address} />
                  <DetailRow label="City" value={record.city} />
                  <DetailRow label="State" value={record.state} />
                  <DetailRow label="ZIP Code" value={record.zip} />
                </section>

                <section className="glass rounded-2xl p-6">
                  <h2 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-neon" /> Installation Information
                  </h2>
                  <DetailRow label="Vehicle Make / Model" value={record.vehicle} />
                  <DetailRow label="Charger Brand" value={record.chargerBrand} />
                  <DetailRow label="Property Type" value={record.propertyType} />
                  <DetailRow label="Main Panel Size" value={record.panelSize} />
                  <DetailRow label="Distance Panel → Charger" value={record.distance} />
                  <DetailRow label="Preferred Location" value={record.installLocation} />
                  <DetailRow label="Already Has Charger" value={record.hasCharger} />
                  <DetailRow label="Permit Needed" value={record.permitNeeded} />
                  <DetailRow label="Preferred Date" value={record.preferredDate} />
                  <DetailRow label="Notes" value={record.notes} />
                </section>

                <section className="glass rounded-2xl p-6">
                  <h2 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-neon" /> Uploaded Photos
                  </h2>
                  {allPhotos.length === 0 ? (
                    <p className="text-sm text-slate-500">No photos were uploaded.</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {allPhotos.map((p, i) => (
                        <a key={i} href={p.src} target="_blank" rel="noreferrer" className="group">
                          <div className="rounded-xl overflow-hidden border border-white/10 aspect-video bg-navy-800">
                            <img src={p.src} alt={p.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          </div>
                          <p className="text-xs text-slate-500 mt-1.5">{p.label}</p>
                        </a>
                      ))}
                    </div>
                  )}
                </section>
              </div>

              {/* Right: actions */}
              <div className="space-y-6">
                <section className="glass rounded-2xl p-6 sticky top-20">
                  <h2 className="font-display font-semibold mb-4">Internal Status</h2>
                  <select
                    value={record.status}
                    onChange={(e) => changeStatus(e.target.value)}
                    disabled={savingStatus}
                    className="w-full bg-navy-800 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white mb-2"
                  >
                    {INTAKE_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {savingStatus && <p className="text-xs text-slate-500 flex items-center gap-1.5"><Loader2 className="w-3 h-3 animate-spin" /> Saving...</p>}

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h3 className="font-display font-semibold mb-2">Pipedrive</h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Prepares this intake as a structured lead. (Integration is a placeholder
                      until API keys / webhook are configured.)
                    </p>
                    <button
                      onClick={handleSendToPipedrive}
                      disabled={sending}
                      className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {sending ? (<><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>) : (<><Send className="w-4 h-4" /> Send to Pipedrive</>)}
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10 text-xs text-slate-500 space-y-1">
                    <p>Created: {record.createdAt ? new Date(record.createdAt).toLocaleString() : '—'}</p>
                  </div>
                </section>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
