import {
  BatteryCharging,
  Bolt,
  Car,
  CloudRain,
  Gauge,
  Home,
  Plug,
  ShieldCheck,
  Sun,
  Thermometer,
  Wallet,
  Zap,
} from 'lucide-react'

export const POWERWALL_IMAGES = {
  hero: '/images/tesla-powerwall-hero.png',
  install: '/images/battery-hero.png',
  home: '/images/powerwall/home-backup.jpg',
}

export const POWERWALL_HERO = {
  badge: 'Tesla Certified Installer',
  title: 'Tesla Powerwall',
  highlight: 'Home Battery',
  tagline: 'Power Everything',
  description:
    'Whole-home backup, smarter energy use, and a clean all-in-one install — scoped and installed by evNation’s licensed electricians.',
}

export const POWERWALL_METRICS = [
  { value: '13.5', unit: 'kWh', label: 'Energy capacity' },
  { value: '11.5', unit: 'kW', label: 'Backup power' },
  { value: '97.5', unit: '%', label: 'Solar efficiency' },
  { value: '10', unit: 'yr', label: 'Warranty' },
]

export const POWERWALL_PILLARS = [
  { label: 'More Power', desc: 'Single-unit whole-home backup' },
  { label: 'More Backup', desc: 'Near-instant power when the grid goes down' },
  { label: 'More Savings', desc: 'Store solar and shift usage off peak rates' },
]

export const POWERWALL_SELLING_POINTS = [
  {
    id: 'backup',
    icon: Home,
    title: 'Whole-home backup',
    summary: 'One Powerwall 3 can back up your entire home.',
    bullets: [
      'Keeps essentials — and your EV charger — running during outages',
      'Automatic switchover in a fraction of a second',
      'Quiet, indoor/outdoor rated enclosure',
    ],
  },
  {
    id: 'savings',
    icon: Wallet,
    title: 'Lower electricity bills',
    summary: 'Use your energy smarter, not harder.',
    bullets: [
      'Stores more solar production for evening use',
      'Optimizes charging and discharge around time-of-use rates',
      'Helps reduce monthly utility spend over time',
    ],
  },
  {
    id: 'integrated',
    icon: BatteryCharging,
    title: 'Fully integrated design',
    summary: 'Battery, inverter, site management, and solar — in one system.',
    bullets: [
      'Fewer boxes on the wall and less wiring',
      'Faster installation and simpler maintenance',
      'Cleaner look for garages and exterior mounts',
    ],
  },
  {
    id: 'durable',
    icon: ShieldCheck,
    title: 'Built for real-world conditions',
    summary: 'Engineered to perform when the environment gets tough.',
    bullets: [
      'Extreme heat and cold tolerance',
      'High-humidity operation',
      'Flood resilience up to ~28 inches of water',
    ],
  },
  {
    id: 'ev',
    icon: Car,
    title: 'EV charging integration',
    summary: 'Part of the Tesla energy ecosystem at home.',
    bullets: [
      'Solar EV charging when paired with solar',
      'Off-grid charging capability',
      'Powershare functionality for supported setups',
    ],
  },
]

export const POWERWALL_INTEGRATED_PARTS = [
  { label: 'Battery', icon: BatteryCharging },
  { label: 'Inverter', icon: Zap },
  { label: 'Site management', icon: Gauge },
  { label: 'Solar integration', icon: Sun },
]

export const POWERWALL_DURABILITY = [
  { label: 'Extreme heat', icon: Thermometer },
  { label: 'Cold climates', icon: Thermometer },
  { label: 'High humidity', icon: CloudRain },
  { label: 'Flood rated (~28 in)', icon: ShieldCheck },
]

export const POWERWALL_EV_FEATURES = [
  {
    title: 'Solar EV charging',
    desc: 'Charge your EV with stored solar instead of pulling from the grid at peak rates.',
    icon: Sun,
  },
  {
    title: 'Off-grid charging',
    desc: 'Keep charging capability when utility power is unavailable.',
    icon: Plug,
  },
  {
    title: 'Powershare',
    desc: 'Share stored energy across supported Tesla energy products at home.',
    icon: Bolt,
  },
]

export const EVNATION_INSTALL_INCLUDES = [
  'Site evaluation and system sizing for your home',
  'Tesla Powerwall 3 installation by licensed C-10 electricians',
  'Permits, utility interconnection, and inspection coordination',
  'Clean mounting, labeling, and professional finish',
  'App walkthrough for monitoring and backup settings',
  'Optional pairing with EV charger and panel upgrade',
]

export const POWERWALL_INSTALL_STEPS = [
  { step: '01', title: 'Site visit', desc: 'We evaluate your panel, backup goals, and the best mount location.' },
  { step: '02', title: 'Design & permits', desc: 'System sizing, utility paperwork, and inspection scheduling.' },
  { step: '03', title: 'Install day', desc: 'Licensed electricians — clean routing, labeling, and testing.' },
  { step: '04', title: 'Handoff', desc: 'App setup, backup settings, and ongoing support from evNation.' },
]

export const POWERWALL_STORY = [
  {
    id: 'backup',
    index: '01',
    title: 'When the grid goes down, you stay on',
    body: 'Powerwall 3 detects outages and switches to backup in a fraction of a second — keeping lights, HVAC, Wi‑Fi, and your EV charger online.',
    image: POWERWALL_IMAGES.install,
    imageAlt: 'Powerwall in a home garage',
  },
  {
    id: 'savings',
    index: '02',
    title: 'Use energy when it costs less',
    body: 'Store solar or off-peak grid power, then discharge when rates spike. Powerwall optimizes automatically based on your usage and utility plan.',
    image: POWERWALL_IMAGES.home,
    imageAlt: 'Modern home',
  },
  {
    id: 'integrated',
    index: '03',
    title: 'One unit. Everything included.',
    body: 'Battery, inverter, site management, and solar integration in a single enclosure — fewer boxes, less wiring, faster install.',
    image: POWERWALL_IMAGES.hero,
    imageAlt: 'Tesla Powerwall unit',
  },
]

export const POWERWALL_FAQ = [
  {
    q: 'Can one Powerwall back up my whole home?',
    a: 'Powerwall 3 is designed so a single unit can provide whole-home backup for many homes. Final scope depends on your loads, panel, and backup priorities — we confirm on site.',
  },
  {
    q: 'Do I need solar to get a Powerwall?',
    a: 'No. Powerwall works with or without solar. With solar, you store more of what you produce; without it, you can still shift grid energy to lower-cost hours and keep backup power.',
  },
  {
    q: 'How is evNation different from a general contractor?',
    a: 'We are licensed electricians focused on EV and home energy installs — not handymen. You get code-compliant work, clear communication, and installs built to show off.',
  },
  {
    q: 'What happens during a grid outage?',
    a: 'Powerwall detects the outage and switches to backup power almost instantly — typically fast enough that electronics stay on without interruption.',
  },
]
