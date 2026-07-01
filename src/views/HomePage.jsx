'use client'

import Link from '@/components/Link'
import { BatteryCharging, ArrowRight } from 'lucide-react'
import Hero from '../components/Hero'
import HomeFinalCTA from '../components/HomeFinalCTA'
import InstallReadinessCheck from '../components/InstallReadinessCheck'
import CustomerJourney from '../components/CustomerJourney'
import SavingsSection from '../components/SavingsSection'
import TrustSection from '../components/TrustSection'
import TestimonialSection from '../components/TestimonialSection'
import FinancingSection from '../components/FinancingSection'
import FAQSection from '../components/FAQSection'
import RebateFinder from '../components/RebateFinder'
import LogoMarquee from '../components/LogoMarquee'
import SolutionsSection from '../components/SolutionsSection'
import ServiceZonesSection from '../components/ServiceZonesSection'
import SectionAmbient from '../components/SectionAmbient'
import SectionHeader from '../components/SectionHeader'
import { evChargerBrands, evPartners } from '../data/brandLogos'
import { useTranslation } from '@/i18n/LocaleProvider'

function TeslaPowerwallBand() {
  const { t } = useTranslation()

  return (
    <section className="section-padding relative overflow-hidden">
      <SectionAmbient sweep />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="glass rounded-3xl overflow-hidden neon-border grid lg:grid-cols-2">
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon text-sm mb-5 w-fit">
              <BatteryCharging className="w-4 h-4" /> {t('home.powerwall.badge')}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              {t('home.powerwall.title')}
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6 max-w-lg">
              {t('home.powerwall.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/battery" className="btn-primary justify-center">{t('common.exploreBattery')} <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/quote" className="btn-secondary justify-center">{t('common.getQuote')}</Link>
            </div>
          </div>
          <div className="relative min-h-[280px] lg:min-h-0">
            <img src="/images/tesla-powerwall-hero.png" alt="Tesla Powerwall home battery" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/10 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

function RebatesReadinessSection() {
  const { t } = useTranslation()

  return (
    <section id="rebates" className="section-padding relative overflow-hidden section-scrim">
      <SectionAmbient />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto"
          subtitleClassName="text-sm text-slate-400 leading-relaxed"
          eyebrow={t('home.rebates.eyebrow')}
          title={t('home.rebates.title')}
          subtitle={t('home.rebates.subtitle')}
        />

        <RebateFinder />
      </div>
    </section>
  )
}

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <>
      <Hero />

      <SolutionsSection />

      <CustomerJourney />

      <TrustSection />

      <InstallReadinessCheck />

      <RebatesReadinessSection />

      <SavingsSection />

      <ServiceZonesSection />

      <TestimonialSection />

      <LogoMarquee
        eyebrow={t('home.brands.eyebrow')}
        title={t('home.brands.title')}
        subtitle={t('home.brands.subtitle')}
        logos={evChargerBrands}
        speed={38}
      />
      <LogoMarquee logos={evPartners} speed={34} reverse compact />

      <TeslaPowerwallBand />

      <FinancingSection />

      <HomeFinalCTA />

      <FAQSection />
    </>
  )
}
