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
import InstallationReadinessCard from '../components/InstallationReadinessCard'
import LogoMarquee from '../components/LogoMarquee'
import SolutionsSection from '../components/SolutionsSection'
import ServiceZonesSection from '../components/ServiceZonesSection'
import SectionAmbient from '../components/SectionAmbient'
import SectionHeader from '../components/SectionHeader'
import { evChargerBrands, evPartners } from '../data/brandLogos'

function TeslaPowerwallBand() {
  return (
    <section className="section-padding relative overflow-hidden">
      <SectionAmbient sweep />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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

function RebatesReadinessSection() {
  return (
    <section id="rebates" className="section-padding relative overflow-hidden section-scrim">
      <SectionAmbient />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader
          className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto"
          subtitleClassName="text-sm text-slate-400 leading-relaxed"
          eyebrow="Savings & incentives"
          title="Rebates & install readiness"
          subtitle="Search official incentive programs for your area, then complete a quick home assessment so we can quote faster."
        />

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <RebateFinder />
          <InstallationReadinessCard />
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />

      <SolutionsSection />

      <CustomerJourney />

      <TrustSection />

      <RebatesReadinessSection />

      <SavingsSection />

      <ServiceZonesSection />

      <GallerySection />

      <TestimonialSection />

      <LogoMarquee
        eyebrow="Trusted brands"
        title="EV brands & partners we work with"
        subtitle="Professional Level 2 installation for every major EV — backed by industry-leading charging and energy partners."
        logos={evChargerBrands}
        speed={38}
      />
      <LogoMarquee logos={evPartners} speed={34} reverse compact />

      <TeslaPowerwallBand />

      <FinancingSection />

      <FAQSection />
    </>
  )
}
