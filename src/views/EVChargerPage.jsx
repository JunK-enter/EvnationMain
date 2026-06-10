import { Zap } from 'lucide-react'
import { PRICING } from '../data/services'
import ServicePageLayout from '../components/ServicePageLayout'

const features = [
  'Hardwired or plug-in Level 2 charger installation',
  'Up to 40 miles of range per hour of charging',
  'Professional conduit routing and clean cable management',
  'Dedicated 240V circuit with proper breaker sizing',
  'Panel evaluation and load calculation included',
  'Permits, inspection, and code compliance handled for you',
]

export default function EVChargerPage() {
  return (
    <ServicePageLayout
      badge={<><Zap className="w-4 h-4" /> Most Popular</>}
      title="Home EV"
      highlight="Charging"
      description="Wake up to a full battery every morning. Our licensed electricians install Level 2 chargers that add 25–40 miles of range per hour — right in your garage or driveway."
      tagline={PRICING.l2Charger.label}
      image="/images/solutions/domestic-ev-charger-768x308.jpg"
      imageAlt="Home EV charger installation"
      stats={[
        { value: '40 mi/hr', label: 'Charging speed' },
        { value: '3–6 hrs', label: 'Typical install' },
        { value: '2,000+', label: 'Homes powered' },
        { value: 'C10', label: 'Licensed pros' },
      ]}
      features={features}
    />
  )
}
