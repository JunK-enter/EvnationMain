import { ShieldCheck, Wrench, BadgeCheck, Headphones, RefreshCw } from 'lucide-react'
import ServicePageLayout from '../components/ServicePageLayout'

const features = [
  'Workmanship warranty on every installation we perform',
  'Manufacturer warranties preserved with certified install',
  'Fast, no-hassle service visits if anything needs attention',
  'Priority support line for warranty-covered customers',
  'Documented inspection and code-compliance records',
  'Transferable coverage that adds value when you sell',
]

const tiers = [
  { icon: BadgeCheck, title: 'Workmanship', desc: 'We stand behind our labor. If an install issue arises, we make it right — no finger-pointing.' },
  { icon: Wrench, title: 'Parts & Equipment', desc: 'Manufacturer coverage stays intact because the work was done by licensed pros.' },
  { icon: Headphones, title: 'Priority Support', desc: 'Covered customers get a dedicated line and front-of-queue scheduling.' },
  { icon: RefreshCw, title: 'Transferable', desc: 'Coverage can transfer to the next homeowner, boosting resale appeal.' },
]

export default function WarrantyPage() {
  return (
    <ServicePageLayout
      badge={<><ShieldCheck className="w-4 h-4" /> Protection You Can Trust</>}
      title="EVnation"
      highlight="Warranty"
      description="Every EVnation installation is backed by a workmanship warranty and dedicated support. We protect your charger, your battery, and your peace of mind long after install day."
      tagline="Backed for the long haul"
      image="/images/warranty-hero.png"
      imageAlt="EV charger protected by a glowing shield"
      stats={[
        { value: 'Workmanship', label: 'Guaranteed' },
        { value: 'Priority', label: 'Support line' },
        { value: 'Certified', label: 'Licensed install' },
        { value: 'Transferable', label: 'Adds resale value' },
      ]}
      features={features}
    >
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center mb-10">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">What's Covered</p>
          <h2 className="font-display text-3xl font-bold">Coverage That Has Your Back</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((t) => (
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
