import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  { q: 'How long does EV charger installation take?', a: 'Most Level 2 installations are completed in 3–6 hours. Panel upgrades may require a full day and a follow-up inspection visit.' },
  { q: 'Do I need a panel upgrade for an EV charger?', a: 'It depends on your existing panel size and current electrical load. A 200A panel typically supports an EV charger without upgrade. We perform a load calculation to determine this.' },
  { q: 'Will EVnation handle permits?', a: 'Yes! Permit handling is included in our service packages. We file with your local authority, schedule inspections, and ensure code compliance.' },
  { q: 'What charger brands do you install?', a: 'We install all major brands including Tesla Wall Connector, ChargePoint Home Flex, Grizzl-E, Emporia, and more. You can purchase your own or buy through us.' },
  { q: 'How much does installation cost?', a: 'Level 2 EV charger installation starts at $575. Panel upgrades start at $3,250 and permit service starts at $250. Tesla Powerwall and charger + battery packages start at $9,995. Use our quote calculator for a personalized estimate.' },
  { q: 'Are there rebates available?', a: 'Yes. California customers can search official programs by ZIP on Drive Clean (driveclean.ca.gov) — use our Rebate Finder on the home or calculator page. We help coordinate SCE, PG&E, SDG&E, and other charger rebates during your install.' },
]

export default function FAQSection() {
  const [open, setOpen] = useState(null)

  return (
    <section className="section-padding">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">FAQ</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Common Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-sm pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-neon shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
