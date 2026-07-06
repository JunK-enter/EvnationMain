'use client'

import ServiceCard from '../components/ServiceCard'
import { useQuote } from '../context/QuoteContext'
import Link from '@/components/Link'
import { ShoppingCart } from 'lucide-react'
import { useTranslation } from '@/i18n/LocaleProvider'
import { useShopServices } from '@/i18n/useShopServices'

export default function ShopPage() {
  const { cart, cartTotal } = useQuote()
  const { t } = useTranslation()
  const shopServices = useShopServices()

  return (
    <div className="page-top page-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">{t('shop.eyebrow')}</p>
            <h1 className="font-display text-4xl font-bold">{t('shop.title')}</h1>
            <p className="text-slate-400 mt-3">{t('shop.subtitle')}</p>
          </div>
          {cart.length > 0 && (
            <Link to="/quote" className="btn-primary flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              {t('shop.viewQuote', { count: cart.length, total: cartTotal.toLocaleString() })}
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
