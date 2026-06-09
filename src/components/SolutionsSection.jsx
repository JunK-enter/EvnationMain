'use client'

import Link from '@/components/Link'
import { ArrowUpRight, Bolt, Building2, BatteryCharging, ShieldCheck } from 'lucide-react'

const pillars = [
  {
    title: 'Residential EV Charging',
    desc: 'Level 2 chargers across our regional service areas — licensed, permitted, done right.',
    img: '/images/solutions/domestic-ev-charger-768x308.jpg',
    to: '/residential-ev-charging',
    icon: Bolt,
    span: 'lg:col-span-2 lg:row-span-2',
    big: true,
  },
  {
    title: 'Solar',
    desc: 'Roof-mounted systems sized for California sun and your driving habits.',
    img: '/images/solutions/commercial-ev-charger-768x308.jpg',
    to: '/solar',
    icon: Building2,
    span: 'lg:col-span-2',
  },
  {
    title: 'Panel Upgrades',
    desc: '200A service upgrades for safe EV charging at home.',
    img: '/images/battery-hero.png',
    to: '/panel-upgrades',
    icon: BatteryCharging,
    span: 'lg:col-span-1',
  },
  {
    title: 'Commercial',
    desc: 'Workplace & fleet charging in select metro service areas.',
    img: '/images/warranty-hero.png',
    to: '/commercial',
    icon: ShieldCheck,
    span: 'lg:col-span-1',
  },
]

function PillarCard({ title, desc, img, to, icon: Icon, span, big }) {
  return (
    <Link
      to={to}
      className={`group relative block rounded-3xl overflow-hidden border border-white/10 hover:border-neon/40 transition-colors min-h-[220px] ${span} ${big ? 'lg:min-h-[460px]' : ''}`}
    >
      <img
        src={img}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-transparent" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-9 h-9 rounded-xl bg-neon/15 backdrop-blur-sm border border-neon/30 flex items-center justify-center">
            <Icon className="w-4.5 h-4.5 text-neon" />
          </span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className={`font-display font-bold text-white drop-shadow ${big ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>{title}</h3>
            <p className={`text-slate-300/90 mt-1.5 leading-relaxed ${big ? 'text-sm max-w-md' : 'text-xs'}`}>{desc}</p>
          </div>
          <span className="w-9 h-9 rounded-full bg-neon text-navy-950 flex items-center justify-center shrink-0 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function SolutionsSection() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">What We Do</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Your regional electrification partner</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            EV charging, solar, panel upgrades, and commercial installs — one licensed team across regional service areas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[220px] gap-5">
          {pillars.map((p) => (
            <PillarCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}
