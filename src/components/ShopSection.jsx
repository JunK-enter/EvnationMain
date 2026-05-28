import { Link } from 'react-router-dom'
import { shopServices } from '../data/services'
import ServiceCard from './ServiceCard'

export default function ShopSection() {
  return (
    <section className="section-padding relative bg-navy-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">Shop Services</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Build Your Quote, Your Way</h2>
            <p className="text-slate-400 mt-3 max-w-xl">Browse services like shopping on Amazon — add what you need, skip what you don't. Transparent pricing on every item.</p>
          </div>
          <Link to="/shop" className="btn-secondary shrink-0">View All Services</Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shopServices.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
