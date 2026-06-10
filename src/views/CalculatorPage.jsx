'use client'

import QuoteCalculator from '../components/QuoteCalculator'
import RebateFinder from '../components/RebateFinder'
import SavingsSection from '../components/SavingsSection'

export default function CalculatorPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">Calculator</p>
          <h1 className="font-display text-4xl font-bold">Savings & Quote Calculator</h1>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto">
            Pick your area, describe your install, and see a line-by-line price estimate in seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-xs text-slate-500">
            <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
              1 · Choose your area
            </span>
            <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
              2 · Set distance & options
            </span>
            <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
              3 · See your estimate
            </span>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <QuoteCalculator />
          <RebateFinder />
        </div>
        <SavingsSection />
      </div>
    </div>
  )
}
