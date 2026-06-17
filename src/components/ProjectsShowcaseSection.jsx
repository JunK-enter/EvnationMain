'use client'

import { motion } from 'framer-motion'
import Link from '@/components/Link'
import { ArrowRight, MapPin } from 'lucide-react'
import BeforeAfterReveal, { TYPE_ACCENT } from './BeforeAfterReveal'
import SectionAmbient from './SectionAmbient'
import SectionHeader from './SectionHeader'
import { getFeaturedProject, getFeaturedProjects } from '@/lib/projectMedia'
import { useTranslation } from '@/i18n/LocaleProvider'

function ProjectTeaserCard({ project, index }) {
  const accent = TYPE_ACCENT[project.type] || TYPE_ACCENT.ev
  const cover = project.images?.cover || project.images?.after

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="shrink-0 w-[min(78vw,280px)] sm:w-auto sm:shrink"
    >
      <Link
        href={`/projects#project-${project.id}`}
        className="group block glass rounded-2xl overflow-hidden border border-white/[0.08] hover:border-neon/30 transition-colors h-full"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-navy-900">
          {cover ? (
            <img
              src={cover}
              alt={project.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
          <span
            className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border"
            style={{ color: accent, borderColor: `${accent}44`, background: `${accent}15` }}
          >
            {project.typeLabel}
          </span>
        </div>
        <div className="p-4">
          <p className="font-display font-semibold text-sm text-white group-hover:text-neon transition-colors line-clamp-2">
            {project.title}
          </p>
          <p className="flex items-center gap-1 text-[11px] text-slate-500 mt-1.5">
            <MapPin className="w-3 h-3 shrink-0" style={{ color: accent }} />
            {project.location}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ProjectsShowcaseSection() {
  const { t } = useTranslation()
  const featured = getFeaturedProject()
  const teasers = getFeaturedProjects(3)

  return (
    <section className="section-padding relative overflow-hidden section-scrim">
      <SectionAmbient sweep />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          eyebrow={t('home.projects.eyebrow')}
          title={t('home.projects.title')}
          subtitle={t('home.projects.subtitle')}
          className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl overflow-hidden border border-white/[0.08] p-3 sm:p-4 mb-8 sm:mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4 px-1 sm:px-2">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-neon font-semibold mb-1">{t('home.projects.featured')}</p>
              <h3 className="font-display font-bold text-lg sm:text-xl text-white">{featured.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{featured.location}</p>
            </div>
            <Link href={`/projects#project-${featured.id}`} className="text-xs font-medium text-neon hover:text-white inline-flex items-center gap-1 shrink-0">
              {t('common.viewCaseStudy')} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <BeforeAfterReveal project={featured} className="w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl" />
        </motion.div>

        <div className="flex items-end justify-between gap-4 mb-4 sm:mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{t('home.projects.recent')}</p>
          <Link href="/projects" className="text-xs font-medium text-neon hover:text-white inline-flex items-center gap-1">
            {t('common.viewAll')} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto scroll-touch scrollbar-hide pb-1 -mx-1 px-1">
          {teasers.map((project, i) => (
            <ProjectTeaserCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
