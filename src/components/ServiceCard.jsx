import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { Check, ShoppingCart } from 'lucide-react'
import { useQuote } from '../context/QuoteContext'

export default function ServiceCard({ service, index = 0 }) {
  const { addToQuote, isInCart } = useQuote()
  const Icon = Icons[service.icon] || Icons.Zap
  const inCart = isInCart(service.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`group relative rounded-2xl glass p-6 hover:border-neon/25 transition-all duration-300 ${
        service.featured ? 'neon-border ring-1 ring-neon/10' : ''
      }`}
    >
      {service.featured && (
        <span className="absolute -top-3 left-6 px-3 py-0.5 bg-neon text-navy-950 text-xs font-bold rounded-full">
          Most Popular
        </span>
      )}

      <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center mb-4 group-hover:bg-neon/20 transition-colors">
        <Icon className="w-6 h-6 text-neon" />
      </div>

      <h3 className="font-display font-semibold text-lg mb-2">{service.name}</h3>
      <p className="text-sm text-slate-400 mb-4 leading-relaxed">{service.shortDesc}</p>

      <p className="font-display font-bold text-2xl text-neon mb-4">{service.priceRange}</p>

      <ul className="space-y-2 mb-6">
        {service.benefits.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-slate-300">
            <Check className="w-4 h-4 text-neon shrink-0 mt-0.5" />
            {b}
          </li>
        ))}
      </ul>

      <button
        onClick={() => addToQuote(service.id)}
        disabled={inCart}
        className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
          inCart
            ? 'bg-neon/20 text-neon cursor-default'
            : 'bg-white/5 hover:bg-neon hover:text-navy-950 text-white border border-white/10 hover:border-neon'
        }`}
      >
        {inCart ? (
          <><Check className="w-4 h-4" /> Added to Quote</>
        ) : (
          <><ShoppingCart className="w-4 h-4" /> Add to Quote</>
        )}
      </button>
    </motion.div>
  )
}
