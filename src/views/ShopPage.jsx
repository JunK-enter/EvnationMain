'use client'

import { shopServices } from '../data/services'
import ServiceCard from '../components/ServiceCard'
import { useQuote } from '../context/QuoteContext'
import Link from '@/components/Link'
import { ShoppingCart } from 'lucide-react'

export default function ShopPage() {
  const { cart, cartTotal } = useQuote()

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">Shop</p>
            <h1 className="font-display text-4xl font-bold">All Services</h1>
            <p className="text-slate-400 mt-3">Add services to your quote cart and submit when ready.</p>
          </div>
          {cart.length > 0 && (
            <Link to="/quote" className="btn-primary flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              View Quote ({cart.length}) · ~${cartTotal.toLocaleString()}
            </Link>
          )}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shopServices.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
