/** Published starting prices — shown across shop, quotes, and service pages */
export const PRICING = {
  l2Charger: { starting: 575, label: 'From $575' },
  panelUpgrade: { starting: 3250, label: 'From $3,250' },
  permit: { starting: 250, label: 'From $250' },
  teslaPowerwall: { starting: 9995, label: 'From $9,995' },
  chargerBatteryBundle: { starting: 9995, label: 'From $9,995' },
}

export const shopServices = [
  {
    id: 'l2-charger',
    name: 'Level 2 EV Charger Installation',
    shortDesc: 'Professional hardwired or plug-in Level 2 charger setup at your home.',
    priceRange: PRICING.l2Charger.label,
    basePrice: PRICING.l2Charger.starting,
    benefits: ['Up to 40 miles range/hour', 'Licensed electrician install', 'Clean cable routing'],
    icon: 'Zap',
    category: 'installation',
  },
  {
    id: 'panel-upgrade',
    name: 'Electric Panel Upgrade',
    shortDesc: 'Upgrade your electrical panel to safely support EV charging and future loads.',
    priceRange: PRICING.panelUpgrade.label,
    basePrice: PRICING.panelUpgrade.starting,
    benefits: ['200A service upgrade', 'Code-compliant work', 'Future-proof capacity'],
    icon: 'LayoutGrid',
    category: 'electrical',
  },
  {
    id: 'permit-handling',
    name: 'Permit Service',
    shortDesc: 'We handle all permit paperwork and inspections with your local authority.',
    priceRange: PRICING.permit.label,
    basePrice: PRICING.permit.starting,
    benefits: ['City permit filing', 'Inspection scheduling', 'Zero paperwork for you'],
    icon: 'FileCheck',
    category: 'permits',
  },
  {
    id: 'load-calculation',
    name: 'Load Calculation',
    shortDesc: 'NEC-compliant load analysis to determine if your panel can support an EV charger.',
    priceRange: '$150 – $350',
    basePrice: 225,
    benefits: ['NEC Article 220 compliant', 'Written report', 'Upgrade recommendations'],
    icon: 'Calculator',
    category: 'electrical',
  },
  {
    id: 'battery-storage',
    name: 'Tesla Powerwall Battery',
    shortDesc: 'Whole-home backup power and peak-rate savings with the Tesla Powerwall.',
    priceRange: PRICING.teslaPowerwall.label,
    basePrice: PRICING.teslaPowerwall.starting,
    benefits: ['Whole-home backup', 'Peak-rate savings', 'Live app monitoring'],
    icon: 'BatteryCharging',
    category: 'battery',
  },
  {
    id: 'smart-energy-bundle',
    name: 'Charger + Battery Bundle',
    shortDesc: 'EV charger + Tesla Powerwall + smart monitoring — the complete home energy package.',
    priceRange: PRICING.chargerBatteryBundle.label,
    basePrice: PRICING.chargerBatteryBundle.starting,
    benefits: ['All-in-one package', 'Smart energy monitoring', 'Priority scheduling'],
    icon: 'Sparkles',
    category: 'bundle',
    featured: true,
  },
]

export const statusFlow = [
  { key: 'submitted', label: 'Submitted' },
  { key: 'under_review', label: 'Under Review' },
  { key: 'quote_ready', label: 'Quote Ready' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'installed', label: 'Installed' },
]

export const homeTypes = [
  'Single Family Home',
  'Townhouse',
  'Condo / Apartment',
  'Multi-Family',
  'Other',
]

export const parkingTypes = [
  'Attached Garage',
  'Detached Garage',
  'Carport',
  'Driveway (Outdoor)',
  'Street Parking',
]

export const panelSizes = [
  '60A',
  '100A',
  '125A',
  '150A',
  '200A',
  'Unknown',
]

export const chargerTypes = [
  { id: 'hardwired', label: 'Hardwired Level 2 (40A)', multiplier: 1 },
  { id: 'plug-in', label: 'Plug-in Level 2 (32A)', multiplier: 0.85 },
  { id: 'nema-14-50', label: 'NEMA 14-50 Outlet', multiplier: 0.75 },
]

export const complexityLevels = [
  { id: 'simple', label: 'Simple (< 25 ft run)', multiplier: 1 },
  { id: 'moderate', label: 'Moderate (25–50 ft)', multiplier: 1.25 },
  { id: 'complex', label: 'Complex (50+ ft or drywall)', multiplier: 1.6 },
]
