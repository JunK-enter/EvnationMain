import { SERVICE_ZONES } from './serviceZones'

/** Step 1 — matches Facebook ad landing quiz */
export const SERVICE_NEEDS = [
  {
    id: 'ev-charger',
    title: 'EV Charger Installation',
    desc: 'Level 2 home charger',
    cartIds: ['l2-charger'],
    chargerType: 'hardwired',
    panelUpgrade: false,
  },
  {
    id: 'nema-outlet',
    title: 'NEMA Outlet Installation',
    desc: '240V dedicated outlet',
    cartIds: ['l2-charger'],
    chargerType: 'nema-14-50',
    panelUpgrade: false,
  },
  {
    id: 'panel-upgrade',
    title: 'Main Panel Upgrade',
    desc: 'More electrical capacity',
    cartIds: ['panel-upgrade'],
    chargerType: 'hardwired',
    panelUpgrade: true,
  },
  {
    id: 'ev-panel',
    title: 'EV Charger + Panel Upgrade',
    desc: 'Charger and panel together',
    cartIds: ['l2-charger', 'panel-upgrade'],
    chargerType: 'hardwired',
    panelUpgrade: true,
  },
  {
    id: 'charger-swap',
    title: 'Charger Swap',
    desc: 'Replace an existing unit',
    cartIds: ['l2-charger'],
    chargerType: 'hardwired',
    panelUpgrade: false,
  },
  {
    id: 'tesla-powerwall',
    title: 'Tesla Wall Battery',
    desc: 'Powerwall home battery backup',
    cartIds: ['battery-storage'],
    chargerType: 'hardwired',
    panelUpgrade: false,
  },
  {
    id: 'multifamily',
    title: 'Multifamily Project',
    desc: 'Shared charging for condos & apartments',
    cartIds: [],
    chargerType: 'hardwired',
    panelUpgrade: false,
    customQuote: true,
  },
  {
    id: 'commercial-project',
    title: 'Commercial Project',
    desc: 'L2/L3 charging for business & fleet',
    cartIds: [],
    chargerType: 'hardwired',
    panelUpgrade: false,
    customQuote: true,
  },
  {
    id: 'not-sure',
    title: 'Not sure yet',
    desc: "We'll help you figure it out",
    cartIds: ['l2-charger'],
    chargerType: 'hardwired',
    panelUpgrade: false,
  },
]

export const BREAKER_SIZES = [
  '20A',
  '30A',
  '40A',
  '50A',
  '60A',
  'Not sure',
]

/** 5 steps: service → region → info → location → detail */
export const QUOTE_QUIZ_STEPS = [
  {
    id: 'service',
    shortLabel: 'Project',
    title: 'What do you need help with?',
    subtitle: 'Pick the option that best matches your project.',
  },
  {
    id: 'region',
    shortLabel: 'Region',
    title: 'What region is the project in?',
    subtitle: 'We install across California and select states.',
  },
  {
    id: 'info',
    shortLabel: 'Contact',
    title: 'How can we reach you?',
    subtitle: "We'll send your estimate and next steps here.",
  },
  {
    id: 'location',
    shortLabel: 'Address',
    title: 'Where is the project located?',
    subtitle: 'The installation / project address.',
  },
  {
    id: 'detail',
    shortLabel: 'Details',
    title: 'A few extra details',
    subtitle: 'Optional, but anything you know helps us prepare an accurate estimate.',
  },
]

export { SERVICE_ZONES }

export function getServiceNeed(id) {
  return SERVICE_NEEDS.find((s) => s.id === id) || SERVICE_NEEDS[0]
}

export function parseFullName(fullName) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  return {
    firstName: parts[0] || '',
    lastName: parts.slice(1).join(' '),
  }
}
