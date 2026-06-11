import { motion } from 'framer-motion'
import { Home, Camera, FileText, CalendarCheck } from 'lucide-react'
import SectionAmbient from './SectionAmbient'
import SectionHeader from './SectionHeader'

const steps = [
  { icon: Home, title: 'Tell us about your home', desc: 'Share your address, panel size, parking setup, and vehicle details in a simple form.' },
  { icon: Camera, title: 'Upload panel & garage photos', desc: 'Snap a few photos of your electrical panel and where you want the charger installed.' },
  { icon: FileText, title: 'Get an estimated quote', desc: 'Our system calculates a transparent price range based on your home\'s specific needs.' },
  { icon: CalendarCheck, title: 'EVnation reviews & schedules', desc: 'A licensed electrician reviews your project and schedules your professional installation.' },
]

function StepCard({ step, index, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`glass rounded-2xl p-6 sm:p-8 text-center ${className}`}
    >
      <div className="w-8 h-8 rounded-full bg-neon text-navy-950 text-sm font-bold flex items-center justify-center mx-auto mb-4">
        {index + 1}
      </div>
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-neon/10 flex items-center justify-center mx-auto mb-4 sm:mb-5">
        <step.icon className="w-7 h-7 sm:w-8 sm:h-8 text-neon" />
      </div>
      <h3 className="font-display font-semibold text-lg sm:text-xl mb-3 leading-snug">{step.title}</h3>
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-sm mx-auto">{step.desc}</p>
    </motion.div>
  )
}

export default function CustomerJourney() {
  return (
    <section className="section-padding relative overflow-hidden section-scrim-alt">
      <SectionAmbient />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader
          className="text-center mb-8 lg:mb-16 px-4 lg:px-1"
          titleClassName="font-display text-2xl sm:text-3xl lg:text-4xl font-bold"
          subtitleClassName="text-slate-400 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base"
          eyebrow="How It Works"
          title="Your Simple Path to Home Charging"
          subtitle="Four easy steps from curious homeowner to fully installed EV charger."
        />

        {/* Mobile & tablet: swipe cards with peek */}
        <div className="lg:hidden -mx-4 sm:-mx-6">
          <div
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth scroll-touch scrollbar-hide px-4 sm:px-6 pb-1"
            style={{ scrollPaddingInline: '1rem' }}
          >
            {steps.map((step, i) => (
              <StepCard
                key={step.title}
                step={step}
                index={i}
                className="snap-center shrink-0 w-[min(88vw,320px)] sm:w-[340px] min-h-[280px] flex flex-col justify-center"
              />
            ))}
          </div>
          <p className="text-center text-[11px] text-slate-600 mt-3 px-4">Swipe for next step →</p>
        </div>

        {/* Desktop: 4-column grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.title} className="relative pt-3">
              <div className="absolute -top-0 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-neon text-navy-950 text-xs font-bold flex items-center justify-center z-10">
                {i + 1}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center h-full pt-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-neon/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-7 h-7 text-neon" />
                </div>
                <h3 className="font-display font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
