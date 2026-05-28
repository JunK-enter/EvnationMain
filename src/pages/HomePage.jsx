import Hero from '../components/Hero'
import CustomerJourney from '../components/CustomerJourney'
import ShopSection from '../components/ShopSection'
import HomeAssessmentForm from '../components/HomeAssessmentForm'
import QuoteCalculator from '../components/QuoteCalculator'
import SavingsSection from '../components/SavingsSection'
import TrustSection from '../components/TrustSection'
import TestimonialSection from '../components/TestimonialSection'
import FinancingSection from '../components/FinancingSection'
import GallerySection from '../components/GallerySection'
import FAQSection from '../components/FAQSection'
import RebateFinder from '../components/RebateFinder'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CustomerJourney />
      <ShopSection />
      <section className="section-padding bg-navy-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">Get Started</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Home Assessment & Quote</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <HomeAssessmentForm compact />
            <QuoteCalculator />
          </div>
        </div>
      </section>
      <SavingsSection />
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
      <TrustSection />
      <GallerySection />
      <TestimonialSection />
      <FinancingSection />
      <FAQSection />
    </>
  )
}
