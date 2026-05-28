import { Link } from 'react-router-dom'
import { Sun, Battery, ArrowRight, Check } from 'lucide-react'

const services = [
  { icon: Sun, title: 'Solar Consultation', desc: 'Roof assessment, system sizing, and ROI analysis for solar panel installation.' },
  { icon: Battery, title: 'Battery Storage', desc: 'Home battery systems to store solar energy and provide backup power.' },
  { icon: Sun, title: 'Solar + EV Bundle', desc: 'Charge your EV with sunshine. Integrated solar and EV charger packages.' },
]

export default function SolarEnergyPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">Solar & Energy</p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">Power Your EV with Clean Energy</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">Combine EV charging with solar and battery storage for the ultimate home energy ecosystem.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {services.map((s) => (
            <div key={s.title} className="glass rounded-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-neon/10 flex items-center justify-center mx-auto mb-4">
                <s.icon className="w-7 h-7 text-neon" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-8 lg:p-12 neon-border">
          <h2 className="font-display text-2xl font-bold mb-6">Why Solar + EV?</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {['Charge your car with free sunshine', 'Reduce grid dependence', 'Lock in energy costs for 25+ years', 'Increase home value by up to 4%'].map((f) => (
              <div key={f} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-neon shrink-0" />
                <span className="text-slate-300">{f}</span>
              </div>
            ))}
          </div>
          <Link to="/quote" className="btn-primary">Schedule Free Consultation <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </div>
  )
}
