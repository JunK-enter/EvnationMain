import Link from '@/components/Link'
import { ArrowRight, Gauge } from 'lucide-react'

const steps = [
  {
    title: 'Home & panel details',
    desc: 'Address, panel size, and where you park',
  },
  {
    title: 'Upload photos',
    desc: 'Electrical panel and charger location',
  },
  {
    title: 'Get your score',
    desc: 'See how ready you are before install day',
  },
]

export default function InstallationReadinessCard() {
  return (
    <div className="glass rounded-2xl p-6 lg:p-8 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center">
          <Gauge className="w-5 h-5 text-neon" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg">Installation Readiness</h3>
          <p className="text-xs text-slate-500">Free home assessment — takes about 5 minutes</p>
        </div>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed mb-6">
        Share a few details and photos so our team can estimate scope, flag panel upgrades early, and speed up your quote.
      </p>

      <ul className="space-y-3 mb-8 flex-1">
        {steps.map((step, i) => (
          <li key={step.title} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-3">
            <div className="w-8 h-8 rounded-lg bg-neon/10 flex items-center justify-center shrink-0 text-xs font-bold text-neon">
              {i + 1}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-200">{step.title}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{step.desc}</p>
            </div>
          </li>
        ))}
      </ul>

      <Link to="/intake" className="btn-primary justify-center w-full mt-auto">
        Start home assessment
        <ArrowRight className="w-4 h-4" />
      </Link>

      <p className="text-center text-[11px] text-slate-500 mt-3">
        Prefer a quick price first?{' '}
        <Link to="/quote" className="text-neon hover:underline">
          Get a quote
        </Link>
      </p>
    </div>
  )
}
