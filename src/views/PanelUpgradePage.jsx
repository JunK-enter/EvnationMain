'use client'

import { projects } from '../data/projects'
import Link from '@/components/Link'
import { BeforeAfterSideBySide } from '@/components/BeforeAfterReveal'
import { LayoutGrid, Check, ArrowRight, Wallet, AlertTriangle, Sparkles } from 'lucide-react'
import { usePanelUpgradeCopy } from '@/i18n/hooks/useExtraPages'

const panelExample = projects.find((p) => p.id === 'costa-mesa-panel')
const HERO_IMAGE = '/images/solutions/panel-upgrade.jpg'

function ComparisonCard({ title, hint, children }) {
  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden border border-white/10 bg-navy-900/60">
      <div className="p-2 sm:p-3 flex-1 flex flex-col">{children}</div>
      <div className="px-4 py-3 border-t border-white/[0.06] bg-navy-950/40">
        <p className="font-display font-semibold text-sm text-white text-center">{title}</p>
        {hint ? <p className="text-[11px] text-slate-500 text-center mt-1">{hint}</p> : null}
      </div>
    </div>
  )
}

export default function PanelUpgradePage() {
  const copy = usePanelUpgradeCopy()
  const images = panelExample?.images || {}
  const hasExterior = images.before && images.after
  const hasInterior = images.beforeInterior && images.afterInterior

  return (
    <div className="page-top page-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 text-neon text-sm mb-4">
              <LayoutGrid className="w-4 h-4" /> {copy.hero.badge}
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">{copy.hero.title}</h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-6">{copy.hero.description}</p>
            <p className="font-display text-3xl font-bold text-neon mb-6">{copy.hero.price}</p>
            <Link to="/quote" className="btn-primary">{copy.hero.getQuote} <ArrowRight className="w-4 h-4" /></Link>
          </div>

          <div className="relative rounded-3xl overflow-hidden neon-border aspect-[4/3]">
            <img
              src={HERO_IMAGE}
              alt={copy.hero.imageAlt}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
          </div>
        </div>

        {(hasExterior || hasInterior) && panelExample && (
          <section className="mb-20">
            <div className="text-center mb-8 max-w-2xl mx-auto">
              <p className="text-neon text-xs font-semibold uppercase tracking-wider mb-2">{copy.beforeAfter.eyebrow}</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">{copy.beforeAfter.title}</h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">{panelExample.desc}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 sm:gap-6 max-w-6xl mx-auto items-stretch">
              {hasExterior && (
                <ComparisonCard title={copy.beforeAfter.meterMain} hint={copy.beforeAfter.dragHint}>
                  <BeforeAfterSideBySide
                    before={images.before}
                    after={images.after}
                    beforeAlt="Electrical meter and main before upgrade"
                    afterAlt="Electrical meter and main after upgrade"
                    beforePosition="center center"
                    afterPosition="center center"
                    fit="contain"
                    aspectClass="min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] bg-navy-950"
                  />
                </ComparisonCard>
              )}

              {hasInterior && (
                <ComparisonCard title={copy.beforeAfter.breakerPanel}>
                  <BeforeAfterSideBySide
                    before={images.beforeInterior}
                    after={images.afterInterior}
                    beforeAlt="Breaker panel before upgrade"
                    afterAlt="Breaker panel after upgrade"
                    fit="contain"
                    aspectClass="min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] bg-navy-950"
                  />
                </ComparisonCard>
              )}
            </div>

            {panelExample.before && panelExample.after && (
              <div className="grid md:grid-cols-2 gap-4 max-w-6xl mx-auto mt-6">
                <div className="rounded-xl border border-red-500/20 bg-red-950/10 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-red-400 mb-1.5">Before</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{panelExample.before}</p>
                </div>
                <div className="rounded-xl border border-neon/20 bg-neon/[0.04] px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neon mb-1.5">After</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{panelExample.after}</p>
                </div>
              </div>
            )}

            <p className="text-center text-xs text-slate-500 mt-6">
              {copy.beforeAfter.galleryLink}{' '}
              <Link href="/gallery" className="text-neon hover:underline">
                {copy.beforeAfter.gallery}
              </Link>
              .
            </p>
          </section>
        )}

        <section className="mb-20">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neon mb-2">
              {copy.whyUpgrade.eyebrow}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              {copy.whyUpgrade.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {copy.whyUpgrade.intro}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <div className="glass rounded-2xl p-6 sm:p-8 border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-5">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                <h3 className="font-display font-bold text-lg text-white">{copy.whyUpgrade.reasonsTitle}</h3>
              </div>
              <ul className="space-y-3">
                {copy.whyUpgrade.reasons.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-2xl p-6 sm:p-8 border border-neon/15 bg-neon/[0.02]">
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="w-5 h-5 text-neon shrink-0" />
                <h3 className="font-display font-bold text-lg text-white">{copy.whyUpgrade.benefitsTitle}</h3>
              </div>
              <ul className="space-y-3">
                {copy.whyUpgrade.benefits.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                    <Check className="w-4 h-4 text-neon shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-20 rounded-3xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
          <div className="h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="max-w-3xl mb-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neon mb-2">
                {copy.programs.eyebrow}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                {copy.programs.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {copy.programs.intro}
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {copy.programs.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-light rounded-2xl p-5 border border-white/[0.06]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Wallet className="w-4 h-4 text-neon shrink-0" />
                    <p className="font-display text-xl sm:text-2xl font-bold text-neon leading-none">
                      {stat.value}
                    </p>
                  </div>
                  <p className="font-semibold text-sm text-white mb-2 leading-snug">{stat.label}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{stat.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-500 leading-relaxed border-t border-white/[0.06] pt-5">
              {copy.programs.note}
            </p>
          </div>
        </section>

        <div className="glass rounded-2xl p-8 lg:p-12">
          <h2 className="font-display text-2xl font-bold mb-6">{copy.features.title}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {copy.features.items.map((f) => (
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
