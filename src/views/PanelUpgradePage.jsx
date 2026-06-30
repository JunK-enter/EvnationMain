'use client'

import { PRICING } from '../data/services'
import { projects } from '../data/projects'
import Link from '@/components/Link'
import BeforeAfterReveal, { BeforeAfterSideBySide } from '@/components/BeforeAfterReveal'
import { LayoutGrid, Check, ArrowRight } from 'lucide-react'

const panelExample = projects.find((p) => p.id === 'costa-mesa-panel')

const features = [
  'Full electrical panel replacement or upgrade',
  '200A service upgrade for modern power demands',
  'EV-ready breaker space allocation',
  'Code-compliant installation with permit',
  'Future-proof for solar, battery, and heat pump',
  'Coordination with utility company if needed',
]

export default function PanelUpgradePage() {
  const images = panelExample?.images || {}
  const hasComparison = images.before && images.after

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 text-neon text-sm mb-4">
              <LayoutGrid className="w-4 h-4" /> Electrical Upgrade
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">Panel Upgrade</h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-6">
              Older panels often can&apos;t safely support an EV charger alongside existing loads — especially when solar is already tied in. We upgrade to 200A service so you have room to grow.
            </p>
            <p className="font-display text-3xl font-bold text-neon mb-6">{PRICING.panelUpgrade.label}</p>
            <Link to="/quote" className="btn-primary">Get Your Quote <ArrowRight className="w-4 h-4" /></Link>
          </div>

          {hasComparison && panelExample ? (
            <div className="rounded-3xl overflow-hidden neon-border bg-navy-900/50">
              <BeforeAfterReveal
                project={panelExample}
                comparisonMode="swipe"
                className="w-full"
              />
              <p className="text-center text-[11px] text-slate-500 py-2 border-t border-white/5">
                Drag to compare · meter &amp; main · Costa Mesa, CA
              </p>
            </div>
          ) : (
            <div className="aspect-square rounded-3xl neon-border bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center">
              <LayoutGrid className="w-32 h-32 text-neon/30" />
            </div>
          )}
        </div>

        {hasComparison && images.beforeInterior && images.afterInterior && panelExample && (
          <section className="mb-20">
            <div className="text-center mb-8 max-w-2xl mx-auto">
              <p className="text-neon text-xs font-semibold uppercase tracking-wider mb-2">Real install example</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Before &amp; after</h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {panelExample.desc}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-navy-900">
                <BeforeAfterReveal
                  project={panelExample}
                  comparisonMode="swipe"
                  className="w-full"
                />
                <p className="text-center text-[11px] text-slate-500 py-2 border-t border-white/5">
                  Meter &amp; main
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-navy-900 p-2 sm:p-3">
                <BeforeAfterSideBySide
                  before={images.beforeInterior}
                  after={images.afterInterior}
                  beforeAlt="Breaker panel before upgrade"
                  afterAlt="Breaker panel after upgrade"
                  fit="contain"
                />
                <p className="text-center text-[11px] text-slate-500 pt-2">
                  Breaker panel
                </p>
              </div>
            </div>

            <p className="text-center text-xs text-slate-500 mt-4">
              Full project details on our{' '}
              <Link href="/projects#project-costa-mesa-panel" className="text-neon hover:underline">
                projects page
              </Link>
              .
            </p>
          </section>
        )}

        <div className="glass rounded-2xl p-8 lg:p-12">
          <h2 className="font-display text-2xl font-bold mb-6">What&apos;s Included</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-neon shrink-0 mt-0.5" />
                <span className="text-slate-300">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
