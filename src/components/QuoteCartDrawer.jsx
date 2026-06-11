'use client'

import { useEffect } from 'react'
import Link from '@/components/Link'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuote } from '@/context/QuoteContext'
import { ShoppingCart, X, Trash2, ArrowRight, Plus } from 'lucide-react'

export default function QuoteCartDrawer({ open, onClose }) {
  const { cartItems, cartTotal, removeFromQuote } = useQuote()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 34 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-navy-950 border-l border-white/10 flex flex-col shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Quote cart"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-neon" />
                <h2 className="font-display font-semibold text-lg">Your Quote</h2>
                {cartItems.length > 0 && (
                  <span className="text-xs bg-neon/15 text-neon px-2 py-0.5 rounded-full font-medium">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/5 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                    <ShoppingCart className="w-7 h-7 text-slate-600" />
                  </div>
                  <p className="font-display font-semibold text-white mb-2">Your quote is empty</p>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    Browse services or start the quote quiz to add items.
                  </p>
                  <Link to="/shop" onClick={onClose} className="btn-secondary text-sm !py-2.5">
                    <Plus className="w-4 h-4" />
                    Browse services
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-start justify-between gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02]"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-200 leading-snug">{item.name}</p>
                        <p className="text-neon text-sm font-semibold mt-1 tabular-nums">{item.priceRange}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromQuote(item.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="p-5 border-t border-white/5 space-y-3 bg-navy-900/50">
              {cartItems.length > 0 && (
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-400">Estimated starting at</span>
                  <span className="font-display font-bold text-xl text-neon tabular-nums">
                    ~${cartTotal.toLocaleString()}
                  </span>
                </div>
              )}
              <Link
                to="/quote"
                onClick={onClose}
                className="btn-primary w-full justify-center !py-3"
              >
                {cartItems.length > 0 ? 'Continue quote' : 'Start quote quiz'}
                <ArrowRight className="w-4 h-4" />
              </Link>
              {cartItems.length > 0 && (
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="block text-center text-sm text-slate-500 hover:text-neon transition-colors py-1"
                >
                  Add more services
                </Link>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
