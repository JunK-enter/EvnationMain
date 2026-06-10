import { PRICING } from '../data/services'
import { BatteryCharging, Sun, ShieldCheck, Zap, Home } from 'lucide-react'
import ServicePageLayout from '../components/ServicePageLayout'

const features = [
  'Tesla Powerwall installation by certified electricians',
  'Whole-home backup power during outages',
  'Store off-peak energy and use it when rates are highest',
  'Seamless integration with your EV charger and panel',
  'App-based monitoring of energy flow and battery status',
  'Permits, utility interconnection, and inspection handled',
]

const benefits = [
  { icon: Home, title: 'Backup Power', desc: 'Keep your lights, fridge, and EV charger running through outages.' },
  { icon: Zap, title: 'Lower Bills', desc: 'Charge the battery when power is cheap, draw from it at peak rates.' },
  { icon: Sun, title: 'Energy Independence', desc: 'Take control of your energy and rely less on the grid.' },
  { icon: ShieldCheck, title: 'Peace of Mind', desc: 'Quiet, automatic, and always ready when you need it most.' },
]

export default function BatteryPage() {
  return (
    <ServicePageLayout
      badge={<><BatteryCharging className="w-4 h-4" /> Tesla Powerwall Partner</>}
      title="Home Battery"
      highlight="Storage"
      description="Store energy, power through outages, and cut your peak-hour costs with the Tesla Powerwall. As an installation partner, EVnation designs and installs whole-home battery backup that pairs perfectly with your EV charger."
      tagline={PRICING.teslaPowerwall.label}
      image="/images/battery-hero.png"
      imageAlt="Home battery storage unit mounted on a wall"
      stats={[
        { value: 'Powerwall', label: 'Tesla partner' },
        { value: '24/7', label: 'Backup ready' },
        { value: 'App', label: 'Live monitoring' },
        { value: 'Peak', label: 'Rate savings' },
      ]}
      features={features}
    >
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center mb-10">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">Why a Home Battery</p>
          <h2 className="font-display text-3xl font-bold">Energy on Your Terms</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="glass rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center mb-4">
                <b.icon className="w-6 h-6 text-neon" />
              </div>
              <h3 className="font-display font-semibold mb-1.5">{b.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </ServicePageLayout>
  )
}
