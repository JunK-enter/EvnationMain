import { Building2, Network, BarChart3, Users } from 'lucide-react'
import ServicePageLayout from '../components/ServicePageLayout'

const features = [
  'Multi-port Level 2 and DC fast charging installations',
  'Workplace, fleet, retail, and multifamily property solutions',
  'Load management and smart networking across all stations',
  'Usage reporting, access control, and billing integration',
  'Scalable design that grows with your EV adoption',
  'Full permitting, utility coordination, and inspection support',
]

const useCases = [
  { icon: Building2, title: 'Workplaces', desc: 'Attract and retain talent with convenient on-site charging.' },
  { icon: Users, title: 'Multifamily', desc: 'Add resident-friendly charging to condos and apartments.' },
  { icon: BarChart3, title: 'Retail & Fleet', desc: 'Draw customers and keep commercial fleets always ready.' },
  { icon: Network, title: 'Networked', desc: 'Smart load balancing keeps every port running efficiently.' },
]

export default function CommercialChargingPage() {
  return (
    <ServicePageLayout
      badge={<><Building2 className="w-4 h-4" /> For Business</>}
      title="Commercial EV"
      highlight="Charging"
      description="Power your business, fleet, or property with scalable EV charging infrastructure. From a few workplace ports to networked DC fast charging — we design, install, and support it all."
      tagline="Custom scoped to your site"
      image="/images/solutions/commercial-ev-charger-768x308.jpg"
      imageAlt="Commercial EV charging stations"
      stats={[
        { value: 'L2 + DCFC', label: 'Station types' },
        { value: 'Networked', label: 'Smart load mgmt' },
        { value: 'Turnkey', label: 'Design to install' },
        { value: 'Scalable', label: 'Grows with you' },
      ]}
      features={features}
    >
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center mb-10">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">Built For</p>
          <h2 className="font-display text-3xl font-bold">Solutions for Every Property</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((u) => (
            <div key={u.title} className="glass rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center mb-4">
                <u.icon className="w-6 h-6 text-neon" />
              </div>
              <h3 className="font-display font-semibold mb-1.5">{u.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{u.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </ServicePageLayout>
  )
}
