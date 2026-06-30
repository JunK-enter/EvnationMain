export const PROJECT_TYPES = [
  { id: 'all', label: 'All projects' },
  { id: 'ev', label: 'EV Charger' },
  { id: 'panel', label: 'Panel Upgrade' },
  { id: 'solar', label: 'Solar + EV' },
  { id: 'commercial', label: 'Commercial' },
]

/**
 * Project photos — upload to public/images/projects/{id}/
 * then set paths below, e.g. `/images/projects/newport-beach-l2/before.jpg`
 *
 * Supported files: before.jpg, after.jpg (optional cover.jpg for card thumbnail)
 */
export const projects = [
  {
    id: 'newport-beach-l2',
    title: 'Newport Beach Level 2 Install',
    location: 'Newport Beach, CA',
    region: 'Southern California',
    type: 'ev',
    typeLabel: 'EV Charger',
    desc: 'Garage-mounted ChargePoint Home Flex with clean conduit run, dedicated 50A circuit, and permit sign-off.',
    before: '120V outlet only — overnight charging not practical for daily commute.',
    after: 'Hardwired 48A Level 2 with concealed conduit and load calculation on file.',
    specs: ['48A Level 2', 'ChargePoint Home Flex', 'Permitted & inspected'],
    year: '2025',
    featured: true,
    images: {
      before: null,
      after: null,
      cover: null,
    },
  },
  {
    id: 'costa-mesa-panel',
    title: 'Costa Mesa 200A Panel Upgrade',
    location: 'Costa Mesa, CA',
    region: 'Southern California',
    type: 'panel',
    typeLabel: 'Panel Upgrade',
    desc: 'Service upgrade for a solar-equipped home — new 200A capacity for a dedicated car-charger circuit and future loads.',
    before: 'Existing meter/main with solar disconnect labeling and a crowded breaker panel — car charger, HVAC, and kitchen circuits at capacity.',
    after: 'New Square D 200A service — NEMA 14-50 EV circuit, solar backfeed retained, whole-home surge protection, and labeled spare capacity.',
    specs: ['Solar + EV ready', 'NEMA 14-50 circuit', '200A upgrade'],
    year: '2025',
    featured: false,
    comparisonMode: 'swipe',
    images: {
      before: '/images/projects/costa-mesa-panel/before-exterior.png',
      beforeInterior: '/images/projects/costa-mesa-panel/before-interior.png',
      after: '/images/projects/costa-mesa-panel/after-exterior.png',
      afterInterior: '/images/projects/costa-mesa-panel/after-interior.png',
      cover: '/images/projects/costa-mesa-panel/after-exterior.png',
    },
  },
  {
    id: 'irvine-solar-ev',
    title: 'Irvine Solar + EV Hub',
    location: 'Irvine, CA',
    region: 'Southern California',
    type: 'solar',
    typeLabel: 'Solar + EV',
    desc: 'Roof-mounted array paired with Tesla Wall Connector — sized for daily commuting and lower peak utility draw.',
    before: 'Separate solar quote and charger install with no coordinated electrical plan.',
    after: 'Single electrification scope — array, panel, and Wall Connector sized together.',
    specs: ['Tesla Wall Connector', 'Coordinated scope', 'Daily commute load'],
    year: '2024',
    featured: false,
    images: { before: null, after: null, cover: null },
  },
  {
    id: 'huntington-commercial',
    title: 'Huntington Beach Workplace Charging',
    location: 'Huntington Beach, CA',
    region: 'Southern California',
    type: 'commercial',
    typeLabel: 'Commercial',
    desc: 'Dual-port workplace chargers with load management for employee fleet and visitor parking.',
    before: 'No workplace charging — employees relying on public stations.',
    after: 'Two managed Level 2 ports with scheduling and usage monitoring.',
    specs: ['Dual Level 2 ports', 'Load management', 'Employee fleet'],
    year: '2024',
    featured: false,
    images: { before: null, after: null, cover: null },
  },
  {
    id: 'irvine-outdoor',
    title: 'Irvine Outdoor NEMA Install',
    location: 'Irvine, CA',
    region: 'Southern California',
    type: 'ev',
    typeLabel: 'EV Charger',
    desc: 'Weather-rated outdoor outlet with in-use cover, GFCI protection, and trench run to driveway.',
    before: 'Extension cord from garage — not code-compliant for daily use.',
    after: 'NEMA 14-50 with weatherproof enclosure and dedicated 50A circuit.',
    specs: ['NEMA 14-50', 'Outdoor rated', 'Trench conduit'],
    year: '2025',
    featured: false,
    images: { before: null, after: null, cover: null },
  },
  {
    id: 'laguna-panel-ev',
    title: 'Laguna Niguel Panel + Charger',
    location: 'Laguna Niguel, CA',
    region: 'Southern California',
    type: 'panel',
    typeLabel: 'Panel Upgrade',
    desc: 'Subpanel addition and Level 2 install for ADU — separate metering path with shared main service.',
    before: 'ADU tenant with no charging option; main panel fully loaded.',
    after: 'Subpanel feed with dedicated EV circuit and clear load documentation.',
    specs: ['Subpanel add', 'ADU feed', 'Level 2 ready'],
    year: '2024',
    featured: false,
    images: { before: null, after: null, cover: null },
  },
]

export function getProjectsByType(typeId) {
  if (!typeId || typeId === 'all') return projects
  return projects.filter((p) => p.type === typeId)
}
