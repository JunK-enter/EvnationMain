'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from '@/components/Link'
import BeforeAfterReveal, { TYPE_ACCENT } from '@/components/BeforeAfterReveal'
import { projects, PROJECT_TYPES, getProjectsByType } from '@/data/projects'
import { stats } from '@/data/localSeo'
import { ArrowRight, MapPin, ArrowUpRight } from 'lucide-react'

const MARQUEE_LOCATIONS = [...new Set(projects.map((p) => p.location.split(',')[0]))]

function ProjectSpread({ project, index, total }) {
  const num = String(index + 1).padStart(2, '0')
  const accent = TYPE_ACCENT[project.type] || TYPE_ACCENT.ev
  const flip = index % 2 === 1
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.25 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id={`project-${project.id}`}
      data-project-id={project.id}
      className="relative min-h-0 lg:min-h-[85vh] flex items-center py-10 sm:py-14 lg:py-24 scroll-mt-[calc(4.25rem+env(safe-area-inset-top,0px)+3rem)] lg:scroll-mt-28"
    >
      {/* Watermark number — desktop only */}
      <span
        className="pointer-events-none absolute font-display font-bold leading-none select-none opacity-[0.04] hidden sm:block"
        style={{
          fontSize: 'clamp(8rem, 22vw, 18rem)',
          color: accent,
          [flip ? 'left' : 'right']: '-2%',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        aria-hidden
      >
        {num}
      </span>

      <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
        {/* Photo column — polaroid tilt (desktop only) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`lg:col-span-7 ${flip ? 'lg:col-start-6 lg:row-start-1' : 'lg:col-start-1'}`}
        >
          <div
            className={`relative p-2 pb-8 sm:p-4 sm:pb-12 rounded-sm shadow-2xl transition-transform duration-500 max-sm:rotate-0 hover:rotate-0 ${
              flip ? 'sm:rotate-[1.5deg]' : 'sm:-rotate-[1.5deg]'
            }`}
            style={{
              background: 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
            }}
          >
            <BeforeAfterReveal project={project} className="w-full aspect-[4/3] sm:aspect-[16/10]" />
            <p className="absolute bottom-3 sm:bottom-4 inset-x-4 text-center font-mono text-[11px] text-slate-500 tracking-wide truncate">
              {project.location} · {project.year}
            </p>
          </div>
          {/* Tape strip — desktop only */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 opacity-70 pointer-events-none hidden sm:block"
            style={{
              background: 'rgba(255,255,255,0.12)',
              clipPath: 'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)',
            }}
            aria-hidden
          />
        </motion.div>

        {/* Copy column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
          className={`lg:col-span-5 flex flex-col px-0.5 sm:px-0 ${flip ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-8'}`}
        >
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <span
              className="font-display text-3xl sm:text-5xl font-bold tabular-nums leading-none"
              style={{ color: accent }}
            >
              {num}
            </span>
            <span className="h-px flex-1 max-w-[60px]" style={{ background: `${accent}55` }} />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border"
              style={{ color: accent, borderColor: `${accent}44`, background: `${accent}10` }}
            >
              {project.typeLabel}
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] mb-3 text-white">
            {project.title}
          </h2>

          <p className="flex items-center gap-1.5 text-slate-400 text-sm mb-5">
            <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
            {project.location}
          </p>

          <p className="text-slate-300 leading-relaxed mb-6 text-sm sm:text-base border-l-2 pl-4" style={{ borderColor: `${accent}66` }}>
            {project.desc}
          </p>

          <ul className="space-y-2 mb-8">
            {project.specs.map((spec) => (
              <li key={spec} className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                <span className="w-1 h-1 rounded-full shrink-0" style={{ background: accent }} />
                {spec}
              </li>
            ))}
          </ul>

          <Link
            href="/quote"
            className="inline-flex items-center gap-2 text-sm font-semibold w-fit group/link transition-colors"
            style={{ color: accent }}
          >
            Get a similar quote
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>

      {/* Section divider line */}
      {index < total - 1 && (
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}
    </section>
  )
}

export default function ProjectsPage() {
  const [activeType, setActiveType] = useState('all')
  const [activeId, setActiveId] = useState(projects[0]?.id)
  const mainRef = useRef(null)

  const filtered = useMemo(() => getProjectsByType(activeType), [activeType])

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -60])

  useEffect(() => {
    setActiveId(filtered[0]?.id)
  }, [activeType, filtered])

  useEffect(() => {
    const ids = filtered.map((p) => p.id)
    const sections = ids
      .map((id) => document.getElementById(`project-${id}`))
      .filter(Boolean)
    if (!sections.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.getAttribute('data-project-id'))
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [filtered])

  const scrollToProject = (id) => {
    document.getElementById(`project-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div ref={mainRef} className="pt-[max(5.5rem,calc(4.25rem+env(safe-area-inset-top,0px)))] pb-[max(2rem,env(safe-area-inset-bottom,0px))] overflow-x-clip">
      {/* Hero — editorial */}
      <section className="relative min-h-0 sm:min-h-[38vh] lg:min-h-[52vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 hero-mesh pointer-events-none" />
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          <div className="glow-orb w-[min(420px,90vw)] h-[min(420px,90vw)] sm:w-[600px] sm:h-[600px] bg-neon/6 top-[-30%] left-[-15%]" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-6 sm:pb-10 lg:pb-14">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-neon/80 mb-4 sm:mb-6">
              Field archive · {stats.installations} installs
            </p>
            <h1 className="font-display font-bold leading-[0.92] sm:leading-[0.9] tracking-tight">
              <span className="block text-[clamp(2.25rem,13vw,7.5rem)] text-white">INSTALL</span>
              <span className="block text-[clamp(2.25rem,13vw,7.5rem)] hero-gradient-text -mt-1 sm:-mt-4">ARCHIVE</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-slate-400 max-w-md text-sm leading-relaxed">
              Swipe the handle on each card to compare before &amp; after. Real crew photos slot in when they land.
            </p>
          </motion.div>
        </div>

        {/* Location marquee */}
        <div className="relative border-y border-white/5 bg-navy-950/60 py-3 marquee-mask overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap" style={{ animationDuration: '35s' }}>
            {[...MARQUEE_LOCATIONS, ...MARQUEE_LOCATIONS].map((loc, i) => (
              <span key={`${loc}-${i}`} className="mx-8 font-mono text-xs text-slate-500 uppercase tracking-widest">
                {loc}
                <span className="mx-8 text-neon/40">◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky nav bar */}
      <div className="sticky top-[max(4.25rem,env(safe-area-inset-top,0px))] lg:top-16 z-30 border-b border-white/5 bg-navy-950/92 max-lg:backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 sm:gap-4 py-2.5 sm:py-3 overflow-x-auto scrollbar-hide scroll-touch">
          {PROJECT_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveType(t.id)}
              className={`shrink-0 relative px-1 py-2 min-h-[44px] text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeType === t.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {t.label}
              {activeType === t.id && (
                <motion.span layoutId="project-filter" className="absolute inset-x-0 -bottom-3 h-0.5 bg-neon rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Mobile project index */}
        <div className="lg:hidden border-t border-white/5 px-4 py-2.5 overflow-x-auto scrollbar-hide scroll-touch">
          <div className="flex gap-2 w-max min-w-full">
            {filtered.map((p, i) => {
              const accent = TYPE_ACCENT[p.type]
              const isActive = activeId === p.id
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => scrollToProject(p.id)}
                  className={`shrink-0 flex items-center gap-2 rounded-full border px-3 py-2 min-h-[40px] text-left transition-colors ${
                    isActive
                      ? 'border-white/20 bg-white/[0.06] text-white'
                      : 'border-white/10 bg-white/[0.02] text-slate-400'
                  }`}
                >
                  <span className="font-mono text-[10px] tabular-nums" style={{ color: isActive ? accent : undefined }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] font-medium max-w-[9rem] truncate">
                    {p.location.split(',')[0]}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[200px_1fr] xl:grid-cols-[220px_1fr] gap-8 lg:gap-16">
          {/* Index rail — desktop only */}
          <aside className="hidden lg:block sticky top-36 self-start pt-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-600 mb-4">Index</p>
            <nav className="space-y-1">
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => {
                  const accent = TYPE_ACCENT[p.type]
                  const isActive = activeId === p.id
                  return (
                    <motion.button
                      key={p.id}
                      layout
                      type="button"
                      onClick={() => scrollToProject(p.id)}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      className={`w-full text-left flex items-baseline gap-2 py-2 px-2 rounded-lg transition-all group ${
                        isActive ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'
                      }`}
                    >
                      <span
                        className="font-mono text-xs tabular-nums w-6 shrink-0 transition-colors"
                        style={{ color: isActive ? accent : '#64748b' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={`text-xs leading-snug truncate transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
                        {p.title.split(' ').slice(0, 3).join(' ')}
                      </span>
                    </motion.button>
                  )
                })}
              </AnimatePresence>
            </nav>
          </aside>

          {/* Spreads */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeType}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {filtered.length === 0 ? (
                  <p className="text-center text-slate-500 py-32">No projects in this category yet.</p>
                ) : (
                  filtered.map((project, i) => (
                    <ProjectSpread key={project.id} project={project} index={i} total={filtered.length} />
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* CTA — full bleed */}
      <section className="relative mt-12 sm:mt-20 py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon/[0.03] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-display text-2xl sm:text-3xl font-bold mb-6">Your install could be next.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/quote" className="btn-primary inline-flex items-center gap-2">
              Start Your Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/service-areas" className="btn-secondary inline-flex items-center gap-2">
              Service areas
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
