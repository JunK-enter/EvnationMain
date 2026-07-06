'use client'

import Link from '@/components/Link'
import TeamMemberCard from '@/components/TeamMemberCard'
import { leadershipTeam } from '@/data/team'
import { companyContact } from '@/data/companyContact'
import { useAboutCopy } from '@/i18n/hooks/useExtraPages'
import { Bolt, MapPin, ArrowRight, Award } from 'lucide-react'

export default function AboutPage() {
  const copy = useAboutCopy()

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">{copy.eyebrow}</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-5">
            {copy.title} <span className="text-neon">{copy.titleAccent}</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">{copy.subtitle}</p>
        </div>

        <div className="glass rounded-3xl p-8 lg:p-12 mb-16">
          <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
            <Bolt className="w-6 h-6 text-neon" /> {copy.whoWeAre}
          </h2>
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>{copy.whoP1}</p>
            <p>{copy.whoP2}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {copy.stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-6 text-center">
              <p className="font-display text-3xl font-bold text-neon">{s.value}</p>
              <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl font-bold text-center mb-8">{copy.valuesTitle}</h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {copy.values.map((v) => (
            <div key={v.title} className="glass rounded-2xl p-6 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center shrink-0">
                <v.icon className="w-6 h-6 text-neon" />
              </div>
              <div>
                <h3 className="font-display font-semibold mb-1.5">{v.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{v.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-10">{copy.teamTitle}</h2>
          <div className="space-y-10 sm:space-y-12 lg:space-y-14">
            {leadershipTeam.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-neon" />
            </div>
            <div>
              <h3 className="font-display font-semibold mb-1">{copy.visitUs}</h3>
              <p className="text-sm text-slate-400">{companyContact.address.line1}<br />{companyContact.address.line2}</p>
              <p className="text-sm text-slate-400 mt-2">{companyContact.email} · {companyContact.phone}</p>
            </div>
          </div>
          <Award className="w-16 h-16 text-neon/20 hidden md:block" />
        </div>

        <div className="text-center">
          <h2 className="font-display text-2xl font-bold mb-3">{copy.ctaTitle}</h2>
          <p className="text-slate-400 mb-6">{copy.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/quote" className="btn-primary">{copy.ctaButton} <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/blog" className="btn-secondary">{copy.readBlog}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
