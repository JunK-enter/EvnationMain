import { useState, useEffect } from 'react'
import {
  Calculator, ClipboardCheck, FileText, CheckCircle,
  AlertTriangle, Send, Zap, Home,
} from 'lucide-react'
import { fetchSubmissions, patchSubmission } from '../services/api'
import StatusBadge from './StatusBadge'

const checklistItems = [
  { id: 'panel_capacity', label: 'Panel has adequate capacity for EV load' },
  { id: 'grounding', label: 'Grounding system meets NEC requirements' },
  { id: 'conduit_path', label: 'Conduit path is feasible and code-compliant' },
  { id: 'gfci_protection', label: 'GFCI/AFCI protection requirements verified' },
  { id: 'permit_requirements', label: 'Local permit requirements identified' },
  { id: 'load_calc', label: 'NEC Article 220 load calculation completed' },
  { id: 'clearances', label: 'Working clearances around panel verified' },
  { id: 'charger_location', label: 'Charger location meets manufacturer specs' },
]

export default function ElectricianDashboard() {
  const [submissions, setSubmissions] = useState([])
  const [selected, setSelected] = useState(null)
  const [checklist, setChecklist] = useState({})
  const [notes, setNotes] = useState('')
  const [loadCalc, setLoadCalc] = useState({
    panelSize: 200,
    existingLoad: 80,
    evLoad: 40,
    otherLoads: 20,
  })

  useEffect(() => {
    fetchSubmissions({ status: '' }).then(setSubmissions)
  }, [])

  useEffect(() => {
    if (selected) {
      setNotes(selected.electricianNotes || '')
      setChecklist({})
    }
  }, [selected])

  const availableCapacity = loadCalc.panelSize - loadCalc.existingLoad
  const totalWithEv = loadCalc.existingLoad + loadCalc.evLoad + loadCalc.otherLoads
  const needsUpgrade = totalWithEv > loadCalc.panelSize * 0.8
  const loadPercentage = Math.round((totalWithEv / loadCalc.panelSize) * 100)

  async function submitReview() {
    if (!selected) return
    const allChecked = checklistItems.every((item) => checklist[item.id])
    const readinessScore = Math.round(
      (Object.values(checklist).filter(Boolean).length / checklistItems.length) * 60 +
      (allChecked ? 40 : 0)
    )

    await patchSubmission(selected.id, {
      electricianNotes: notes,
      readinessScore,
      status: allChecked && !needsUpgrade ? 'quote_ready' : 'under_review',
      loadCalcResults: { ...loadCalc, totalWithEv, loadPercentage, needsUpgrade },
    })

    const updated = await fetchSubmissions({})
    setSubmissions(updated)
    setSelected(updated.find((s) => s.id === selected.id))
  }

  return (
    <div className="min-h-screen bg-navy-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">Electrician Portal</h1>
          <p className="text-slate-400 mt-1">Technical review, load calculations, and installation sign-off</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h2 className="font-display font-semibold text-sm text-slate-400 uppercase tracking-wider">Pending Reviews</h2>
            {submissions.filter((s) => s.status !== 'installed').map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelected(sub)}
                className={`w-full text-left glass rounded-xl p-4 hover:border-neon/20 transition-colors ${
                  selected?.id === sub.id ? 'border-neon/30 ring-1 ring-neon/10' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">{sub.personal.firstName} {sub.personal.lastName}</p>
                    <p className="text-xs text-slate-500">{sub.home.city}, {sub.home.state}</p>
                  </div>
                  <StatusBadge status={sub.status} />
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                  <span>{sub.home.panelSize} panel</span>
                  <span className="text-neon">{sub.readinessScore}% ready</span>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 space-y-6">
            {selected ? (
              <>
                <div className="glass rounded-xl p-6">
                  <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                    <Home className="w-5 h-5 text-neon" /> Customer Home Info
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-slate-500">Customer:</span> {selected.personal.firstName} {selected.personal.lastName}</div>
                    <div><span className="text-slate-500">Vehicle:</span> {selected.vehicle.make} {selected.vehicle.model}</div>
                    <div><span className="text-slate-500">Panel Size:</span> {selected.home.panelSize}</div>
                    <div><span className="text-slate-500">Parking:</span> {selected.home.parking}</div>
                    <div><span className="text-slate-500">Distance:</span> {selected.home.distance}</div>
                    <div><span className="text-slate-500">Home Type:</span> {selected.home.homeType}</div>
                  </div>
                  {selected.notes && (
                    <div className="mt-4 p-3 bg-navy-800/50 rounded-xl text-sm text-slate-300">
                      <span className="text-slate-500">Customer Notes:</span> {selected.notes}
                    </div>
                  )}
                  <div className="flex gap-3 mt-4">
                    {selected.photos?.panel && (
                      <div className="flex-1 aspect-video rounded-xl bg-navy-800 flex items-center justify-center border border-white/5">
                        <div className="text-center"><Zap className="w-6 h-6 text-neon mx-auto mb-1" /><p className="text-xs text-slate-400">Panel Photo</p></div>
                      </div>
                    )}
                    {selected.photos?.garage && (
                      <div className="flex-1 aspect-video rounded-xl bg-navy-800 flex items-center justify-center border border-white/5">
                        <div className="text-center"><Home className="w-6 h-6 text-neon mx-auto mb-1" /><p className="text-xs text-slate-400">Garage Photo</p></div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-neon" /> Load Calculator
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    {[
                      { key: 'panelSize', label: 'Panel Size (A)' },
                      { key: 'existingLoad', label: 'Existing Load (A)' },
                      { key: 'evLoad', label: 'EV Charger Load (A)' },
                      { key: 'otherLoads', label: 'Other New Loads (A)' },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="text-xs text-slate-500 mb-1 block">{field.label}</label>
                        <input
                          type="number"
                          value={loadCalc[field.key]}
                          onChange={(e) => setLoadCalc({ ...loadCalc, [field.key]: Number(e.target.value) })}
                          className="w-full bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="glass-light rounded-xl p-4 text-center">
                      <p className="text-xs text-slate-500">Available</p>
                      <p className={`font-display text-2xl font-bold ${availableCapacity > 0 ? 'text-neon' : 'text-red-400'}`}>{availableCapacity}A</p>
                    </div>
                    <div className="glass-light rounded-xl p-4 text-center">
                      <p className="text-xs text-slate-500">Total Load</p>
                      <p className="font-display text-2xl font-bold">{totalWithEv}A</p>
                    </div>
                    <div className="glass-light rounded-xl p-4 text-center">
                      <p className="text-xs text-slate-500">Utilization</p>
                      <p className={`font-display text-2xl font-bold ${loadPercentage > 80 ? 'text-red-400' : 'text-neon'}`}>{loadPercentage}%</p>
                    </div>
                  </div>

                  {needsUpgrade && (
                    <div className="mt-4 flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-sm text-yellow-400">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      Panel upgrade recommended — load exceeds 80% capacity
                    </div>
                  )}
                </div>

                <div className="glass rounded-xl p-6">
                  <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5 text-neon" /> Regulation Checklist
                  </h3>
                  <div className="space-y-2">
                    {checklistItems.map((item) => (
                      <label key={item.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!checklist[item.id]}
                          onChange={(e) => setChecklist({ ...checklist, [item.id]: e.target.checked })}
                          className="w-4 h-4 accent-neon rounded"
                        />
                        <span className="text-sm">{item.label}</span>
                        {checklist[item.id] && <CheckCircle className="w-4 h-4 text-neon ml-auto" />}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-neon" /> Electrician Notes
                  </h3>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    placeholder="Add technical notes, concerns, or recommendations..."
                    className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white resize-none"
                  />
                  <button onClick={submitReview} className="btn-primary mt-4 flex items-center gap-2">
                    <Send className="w-4 h-4" /> Submit Technical Review
                  </button>
                </div>
              </>
            ) : (
              <div className="glass rounded-xl p-12 text-center">
                <Calculator className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-500">Select a customer to begin technical review</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
