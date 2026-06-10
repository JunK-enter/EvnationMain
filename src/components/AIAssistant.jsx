import { useState } from 'react'
import { Bot, Send, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const responses = {
  default: "Hi! I'm your EVnation assistant. Ask me anything about EV charger installation, panel upgrades, or home electrification. I'll explain it in simple terms!",
  charger: "A Level 2 charger is like a fast phone charger for your car. It uses a 240V outlet (same as your dryer) and adds about 25–40 miles of range per hour. Most homeowners choose a hardwired unit mounted on the garage wall.",
  panel: "Your electrical panel is the heart of your home's power system. If it's 100A or less, you may need an upgrade to safely add an EV charger. A 200A panel gives you plenty of room for charging plus future needs like solar.",
  permit: "Permits ensure your installation meets local electrical codes. EVnation handles all permit paperwork — you don't need to visit city hall or deal with inspectors. We take care of everything.",
  cost: 'Level 2 EV charger installation starts at $575. Electric panel upgrades start at $3,250 and permit service starts at $250. Tesla Powerwall and charger + battery bundles start at $9,995. Use our quote calculator for a personalized estimate!',
  rebate: 'For California, use our Rebate Finder with your ZIP code — it links to the official Drive Clean tool at driveclean.ca.gov for charger, utility, and income-based incentives. Other states may have utility or local programs too.',
}

function getResponse(input) {
  const lower = input.toLowerCase()
  if (lower.includes('charger') || lower.includes('level 2')) return responses.charger
  if (lower.includes('panel')) return responses.panel
  if (lower.includes('permit')) return responses.permit
  if (lower.includes('cost') || lower.includes('price') || lower.includes('much')) return responses.cost
  if (lower.includes('rebate') || lower.includes('incentive')) return responses.rebate
  return "That's a great question! For the most accurate answer, I recommend starting a Home Assessment or using our Quote Calculator. Our team can also review your specific situation. Would you like to get a quote?"
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'assistant', text: responses.default }])
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }])
    setInput('')
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', text: getResponse(userMsg) }])
    }, 600)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-3 left-3 sm:left-auto sm:w-[360px] z-50 glass rounded-2xl overflow-hidden neon-border shadow-2xl max-lg:max-h-[70vh] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-neon/5">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-neon" />
                <span className="font-display font-semibold text-sm">EVnation Assistant</span>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/5 rounded-lg"><X className="w-4 h-4" /></button>
            </div>

            <div className="h-52 sm:h-72 overflow-y-auto p-4 space-y-3 flex-1">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    m.role === 'user' ? 'bg-neon/20 text-white' : 'bg-navy-800 text-slate-300'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-white/5 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask about EV charging..."
                className="flex-1 bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-600"
              />
              <button onClick={send} className="p-2 rounded-xl bg-neon text-navy-950 hover:bg-neon-dim transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-4 lg:bottom-6 lg:right-6 z-50 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-neon text-navy-950 shadow-lg shadow-neon/25 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        aria-label="Open AI assistant"
      >
        <Bot className="w-6 h-6" />
      </button>
    </>
  )
}
