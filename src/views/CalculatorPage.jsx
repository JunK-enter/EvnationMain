'use client'

import { useState } from 'react'
import QuoteCalculator from '../components/QuoteCalculator'
import RebateFinder from '../components/RebateFinder'
import SavingsSection from '../components/SavingsSection'
import { DEFAULT_ZONE_ID } from '../data/serviceZones'

export default function CalculatorPage() {
  const [zone, setZone] = useState(DEFAULT_ZONE_ID)

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-12">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">Calculator</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Savings & Quote Calculator
          </h1>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Pick your area, describe your install, and see a line-by-line price estimate in seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 text-xs text-slate-500">
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

        <div className="space-y-10 lg:space-y-14">
          <QuoteCalculator zone={zone} onZoneChange={setZone} />

          <div>
            <div className="mb-5 sm:mb-6">
              <p className="text-neon text-xs font-semibold tracking-wider uppercase mb-2">
                Rebates & incentives
              </p>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                Programs for your service area
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                Incentive results update automatically when you change your area in the quote calculator above.
              </p>
            </div>
            <RebateFinder zone={zone} onZoneChange={setZone} showZoneSelect={false} />
          </div>
        </div>

        <SavingsSection embedded />
      </div>
    </div>
  )
}
