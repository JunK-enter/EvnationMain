import { Check } from 'lucide-react'
import { statusFlow } from '../data/services'

export default function StatusTracker({ currentStatus = 'submitted' }) {
  const currentIndex = statusFlow.findIndex((s) => s.key === currentStatus)

  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto">
      {statusFlow.map((step, i) => {
        const done = i <= currentIndex
        const active = i === currentIndex
        return (
          <div key={step.key} className="flex flex-col items-center flex-1 relative">
            {i > 0 && (
              <div className={`absolute top-4 right-1/2 w-full h-0.5 ${done ? 'bg-neon' : 'bg-white/10'}`} style={{ transform: 'translateY(-50%)' }} />
            )}
            <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
              done ? 'bg-neon border-neon text-navy-950' : 'bg-navy-800 border-white/20 text-slate-500'
            } ${active ? 'ring-4 ring-neon/20' : ''}`}>
              {done && i < currentIndex ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <p className={`text-[10px] sm:text-xs mt-2 text-center ${active ? 'text-neon font-semibold' : 'text-slate-500'}`}>
              {step.label}
            </p>
          </div>
        )
      })}
    </div>
  )
}
