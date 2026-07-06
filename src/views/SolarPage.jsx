'use client'

import ServicePageLayout from '@/components/ServicePageLayout'
import { useSolarCopy } from '@/i18n/hooks/useExtraPages'

export default function SolarPage() {
  const { layout, whySolar } = useSolarCopy()

  return (
    <ServicePageLayout
      eyebrow={layout.eyebrow}
      title={layout.title}
      highlight={layout.highlight}
      description={layout.description}
      tagline={layout.tagline}
      image="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&q=80"
      imageAlt={layout.imageAlt}
      primaryCta={layout.primaryCta}
      secondaryCta={layout.secondaryCta}
      stats={layout.stats}
      features={layout.features}
    >
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">{whySolar.title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whySolar.items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass rounded-2xl p-6">
              <Icon className="w-8 h-8 text-neon mb-4" />
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </ServicePageLayout>
  )
}
