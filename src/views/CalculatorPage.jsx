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
          <p className="text-slate-400 mt-3 max-w-xl mx-auto">Estimate your installation cost and see how much you'll save by switching to home EV charging.</p>
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
