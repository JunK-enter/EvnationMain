import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Zap } from 'lucide-react'
import HeroVisual from './HeroVisual'

export default function Hero() {
  return (
    <section className="relative lg:min-h-screen flex items-center overflow-hidden pt-[4.25rem] lg:pt-16">
      <div className="absolute inset-0 grid-bg" />
      <div className="glow-orb w-[500px] h-[500px] bg-neon/8 top-[-10%] right-[-5%]" />
      <div className="glow-orb w-[400px] h-[400px] bg-blue-500/5 bottom-[10%] left-[-10%]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 rounded-full glass-light text-xs sm:text-sm text-neon mb-5 sm:mb-6">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="hidden sm:inline">Trusted by 2,000+ homeowners nationwide</span>
              <span className="sm:hidden">2,000+ homeowners trust us</span>
            </div>

            <h1 className="font-display text-[1.75rem] leading-[1.12] sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
              Electrify Your Home{' '}
              <span className="neon-text">with Confidence</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-400 leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
              EV charger installation, panel upgrades, permits, and energy savings — all handled by licensed electricians.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-sm mx-auto lg:mx-0 lg:max-w-none">
              <Link to="/quote" className="btn-primary w-full sm:w-auto justify-center !py-3.5">
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/quote#assessment" className="btn-secondary w-full sm:w-auto justify-center !py-3.5">
                <Play className="w-4 h-4" />
                Start Home Assessment
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2.5 sm:gap-6 text-xs sm:text-sm text-slate-500 items-center lg:items-start">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-neon shrink-0" /> Licensed & Insured</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-neon shrink-0" /> Permit Support</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-neon shrink-0" /> Transparent Pricing</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-md mx-auto lg:max-w-none"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
