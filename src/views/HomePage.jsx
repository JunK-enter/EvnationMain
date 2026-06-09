'use client'

import Link from '@/components/Link'
import { BatteryCharging, ArrowRight } from 'lucide-react'
import Hero from '../components/Hero'
import CustomerJourney from '../components/CustomerJourney'
import SavingsSection from '../components/SavingsSection'
import TrustSection from '../components/TrustSection'
import TestimonialSection from '../components/TestimonialSection'
import FinancingSection from '../components/FinancingSection'
import GallerySection from '../components/GallerySection'
import FAQSection from '../components/FAQSection'
import RebateFinder from '../components/RebateFinder'
import LogoMarquee from '../components/LogoMarquee'
import SolutionsSection from '../components/SolutionsSection'
import ServiceZonesSection from '../components/ServiceZonesSection'
import { evChargerBrands, evPartners } from '../data/brandLogos'

function TeslaPowerwallBand() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl overflow-hidden neon-border grid lg:grid-cols-2">
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon text-sm mb-5 w-fit">
              <BatteryCharging className="w-4 h-4" /> Tesla Powerwall Partner
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Store energy. Power through anything.
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6 max-w-lg">
              As a Tesla Powerwall installation partner, we add whole-home battery backup that keeps your
              lights — and your EV charger — running during outages, while cutting your peak-hour energy costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/battery" className="btn-primary justify-center">Explore Battery Storage <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/quote" className="btn-secondary justify-center">Get a Quote</Link>
            </div>
          </div>
          <div className="relative min-h-[280px] lg:min-h-0">
            <img src="/images/battery-hero.png" alt="Tesla Powerwall home battery" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/10 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Why EVnation — lead with trust */}
      <TrustSection />

      {/* Core offerings: Home / Commercial charging, Battery, Warranty */}
      <SolutionsSection />

      <ServiceZonesSection />

      <CustomerJourney />

      {/* Tesla Powerwall partnership highlight */}
      <TeslaPowerwallBand />

      <SavingsSection />

      {/* EV brands we install chargers for */}
      <LogoMarquee
        eyebrow="Compatibility"
        title="We Install Chargers For"
        subtitle="Professional Level 2 charger installation for every major EV brand."
        logos={evChargerBrands}
        speed={38}
      />

      {/* Industry partners — no solar in title */}
      <LogoMarquee
        eyebrow="Trusted Brands"
        title="Our EV Partners"
        subtitle="We work with the industry's leading charging and energy partners."
        logos={evPartners}
        speed={34}
        reverse
        compact
      />

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <RebateFinder />
            <div className="glass rounded-2xl p-8">
              <h3 className="font-display font-semibold text-xl mb-4">Installation Readiness Score</h3>
              <p className="text-sm text-slate-400 mb-6">Complete your home assessment and upload photos to see how ready your home is for EV charger installation.</p>
              <div className="relative w-40 h-40 mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#00ff88" strokeWidth="8" strokeDasharray="264" strokeDashoffset="79" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-3xl font-bold text-neon">70%</span>
                </div>
              </div>
              <p className="text-center text-xs text-slate-500 mt-4">Start assessment to get your personalized score</p>
            </div>
          </div>
        </div>
      </section>

      <GallerySection />

      <TestimonialSection />

      <FinancingSection />

      <FAQSection />
    </>
  )
}
