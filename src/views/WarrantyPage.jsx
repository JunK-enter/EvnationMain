'use client'

import { ShieldCheck } from 'lucide-react'
import ServicePageLayout from '../components/ServicePageLayout'
import { useWarrantyCopy } from '@/i18n/hooks/useExtraPages'

export default function WarrantyPage() {
  const { layout, tiers } = useWarrantyCopy()

  return (
    <ServicePageLayout
      badge={<><ShieldCheck className="w-4 h-4" /> {layout.badge}</>}
      title={layout.title}
      highlight={layout.highlight}
      description={layout.description}
      tagline={layout.tagline}
      image="/images/projects/costa-mesa-panel/after-interior.png"
      imageAlt={layout.imageAlt}
      stats={layout.stats}
      features={layout.features}
    >
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center mb-10">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">{tiers.eyebrow}</p>
          <h2 className="font-display text-3xl font-bold">{tiers.title}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.items.map((t) => (
            <div key={t.title} className="glass rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center mb-4">
                <t.icon className="w-6 h-6 text-neon" />
              </div>
              <h3 className="font-display font-semibold mb-1.5">{t.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </ServicePageLayout>
  )
}
