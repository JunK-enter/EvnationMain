import { PRICING, shopServices } from '@/data/services'
import { SERVICE_ZONES } from '@/data/serviceZones'
import { stats } from '@/data/localSeo'
import { calculateQuizBaseEstimate } from '@/services/quoteCalculator'

const DEFAULT_ZONE = 'zone-1'

export const CHAT_QUICK_PROMPTS = [
  'How much does installation cost?',
  'Do I need a panel upgrade?',
  'What areas do you serve?',
  'How do I get a quote?',
]

export const CHAT_WELCOME = {
  text: "Hi! I'm the EVnation assistant. Ask me about EV charger installation, panel upgrades, pricing, rebates, or how to get a quote — I'll keep it simple.",
  links: [
    { label: 'Get a quote', href: '/quote' },
    { label: 'Price calculator', href: '/calculator' },
  ],
}

function includesAny(text, words) {
  return words.some((w) => text.includes(w))
}

function zoneListText() {
  return SERVICE_ZONES.map((z) => z.label).join(', ')
}

function pricingText() {
  const base = calculateQuizBaseEstimate(DEFAULT_ZONE, 'ev-charger')
  return (
    `Starting prices (final quote confirmed by a licensed electrician):\n` +
    `• Level 2 charger install — ${base.display} base install (Southern California)\n` +
    `• Panel upgrade — ${PRICING.panelUpgrade.label}\n` +
    `• Permit service — ${PRICING.permit.label}\n` +
    `• Tesla Powerwall — ${PRICING.teslaPowerwall.label}\n\n` +
    `Cable runs, permits, and add-ons are quoted after your site review. Use our quick quote quiz for a personalized starting estimate.`
  )
}

const RULES = [
  {
    id: 'greeting',
    score: (t) => (includesAny(t, ['hello', 'hi ', 'hi!', 'hey', 'good morning', 'good afternoon']) ? 3 : 0),
    reply: () => ({
      text: `${CHAT_WELCOME.text}\n\nTry asking about pricing, panel upgrades, or service areas.`,
      links: CHAT_WELCOME.links,
    }),
  },
  {
    id: 'quote',
    score: (t) =>
      includesAny(t, ['quote', 'estimate', 'get started', 'book', 'schedule', 'assessment'])
        ? 4
        : includesAny(t, ['how do i', 'how can i']) && includesAny(t, ['start', 'quote'])
          ? 4
          : 0,
    reply: () => ({
      text:
        `Getting a quote takes about 2 minutes:\n` +
        `1. Pick your service (charger, NEMA outlet, panel upgrade, etc.)\n` +
        `2. Choose your region\n` +
        `3. Share contact & address details\n` +
        `4. Add panel/charger notes\n\n` +
        `You'll see a starting estimate right away. A licensed C-10 electrician confirms the final scope — usually within ${stats.quoteTurnaround}.`,
      links: [
        { label: 'Start quote quiz', href: '/quote' },
        { label: 'Home assessment', href: '/intake' },
      ],
    }),
  },
  {
    id: 'pricing',
    score: (t) =>
      includesAny(t, ['cost', 'price', 'how much', 'expensive', 'afford', 'starting', 'from $', 'rate', 'fee'])
        ? 5
        : 0,
    reply: () => ({
      text: pricingText(),
      links: [
        { label: 'Get starting estimate', href: '/quote' },
        { label: 'Full calculator', href: '/calculator' },
      ],
    }),
  },
  {
    id: 'nema',
    score: (t) => (includesAny(t, ['nema', '14-50', '1450', 'outlet', 'plug-in', 'plug in']) ? 5 : 0),
    reply: () => ({
      text:
        `A NEMA 14-50 outlet is a 240V receptacle — the same type used for many RV and dryer circuits. Some EV owners prefer a portable charger plugged into this outlet instead of a hardwired wall unit.\n\n` +
        `EVnation installs dedicated NEMA circuits with proper breaker sizing and code-compliant routing. Starting install pricing follows our base installation rate; cable length and panel work are confirmed on-site.`,
      links: [{ label: 'Quote for NEMA outlet', href: '/quote' }],
    }),
  },
  {
    id: 'charger',
    score: (t) =>
      includesAny(t, ['charger', 'level 2', 'level2', 'l2', 'ev charging', 'charge at home', 'wallbox'])
        ? 4
        : 0,
    reply: () => ({
      text:
        `A Level 2 home charger uses 240V power (like an electric dryer) and typically adds 25–40 miles of range per hour — much faster than a standard wall outlet.\n\n` +
        `Most homeowners choose a hardwired unit on the garage wall. We handle mounting, wiring, breaker installation, and cleanup. Brands we install include Tesla, ChargePoint, Grizzly, and more.`,
      links: [
        { label: 'EV charger services', href: '/residential-ev-charging' },
        { label: 'Get a quote', href: '/quote' },
      ],
    }),
  },
  {
    id: 'panel',
    score: (t) =>
      includesAny(t, ['panel', '100a', '100 amp', '125a', '125 amp', '150a', '200a', '200 amp', 'breaker', 'main service'])
        ? 5
        : 0,
    reply: () => ({
      text:
        `Your electrical panel distributes power through your home. If it's 100A–125A and already loaded with AC, dryer, and kitchen circuits, you may need a panel upgrade before adding a 40A–50A EV circuit.\n\n` +
        `A 200A service gives comfortable headroom for EV charging plus future loads like solar or a heat pump. EVnation performs load calculations and upgrades to NEC code. Panel upgrades start ${PRICING.panelUpgrade.label}.`,
      links: [
        { label: 'Panel upgrade info', href: '/panel-upgrades' },
        { label: 'Get a quote', href: '/quote' },
      ],
    }),
  },
  {
    id: 'permit',
    score: (t) => (includesAny(t, ['permit', 'inspection', 'city hall', 'code', 'hoa']) ? 5 : 0),
    reply: () => ({
      text:
        `Most EV charger and panel projects require a local electrical permit and inspection. EVnation handles permit filing, inspection scheduling, and code compliance — you don't need to visit city hall.\n\n` +
        `Permit costs vary by city and are quoted after we review your project. Permit service starts ${PRICING.permit.label}.`,
      links: [{ label: 'Contact us', href: '/contact' }],
    }),
  },
  {
    id: 'rebate',
    score: (t) => (includesAny(t, ['rebate', 'incentive', 'tax credit', 'credit', 'drive clean', 'utility rebate']) ? 5 : 0),
    reply: () => ({
      text:
        `California homeowners can check charger and utility rebates with our Rebate Finder — it links to the official Drive Clean tool at driveclean.ca.gov.\n\n` +
        `Other states we serve (NV, IL, TX, NJ, AZ) may have utility or local programs too. Rebates change often; we'll point you to current official sources.`,
      links: [{ label: 'Rebate Finder', href: '/#rebates' }],
    }),
  },
  {
    id: 'areas',
    score: (t) =>
      includesAny(t, ['area', 'serve', 'location', 'where', 'near me', 'county', 'city', 'region'])
        ? 4
        : SERVICE_ZONES.some((z) => t.includes(z.label.toLowerCase()) || t.includes(z.state.toLowerCase()))
          ? 5
          : 0,
    reply: () => ({
      text:
        `EVnation serves licensed EV charger and panel work across:\n${SERVICE_ZONES.map((z) => `• ${z.label}`).join('\n')}\n\n` +
        `We've completed ${stats.installations} installations with a ${stats.rating} customer rating.`,
      links: [{ label: 'Service areas map', href: '/service-areas' }],
    }),
  },
  {
    id: 'timeline',
    score: (t) =>
      includesAny(t, ['how long', 'timeline', 'when', 'turnaround', 'wait', 'install take', 'duration']) ? 4 : 0,
    reply: () => ({
      text:
        `Typical timeline:\n` +
        `• Quote review — about ${stats.quoteTurnaround} after you submit\n` +
        `• Level 2 install — usually one day (3–6 hours on site)\n` +
        `• Panel upgrade — often one day plus inspection visit\n\n` +
        `Permit timing depends on your city. We keep you updated at every step.`,
      links: [{ label: 'Get a quote', href: '/quote' }],
    }),
  },
  {
    id: 'solar',
    score: (t) => (includesAny(t, ['solar', 'powerwall', 'battery', 'storage', 'backup']) ? 4 : 0),
    reply: () => ({
      text:
        `EVnation also helps with solar tie-ins, load calculations, and home battery storage.\n\n` +
        `• Tesla Powerwall — ${PRICING.teslaPowerwall.label}\n` +
        `• Charger + battery bundles — ${PRICING.chargerBatteryBundle.label}\n\n` +
        `We coordinate electrical scope so your charger, panel, and solar work together safely.`,
      links: [
        { label: 'Solar & energy', href: '/solar' },
        { label: 'Battery storage', href: '/battery' },
      ],
    }),
  },
  {
    id: 'contact',
    score: (t) =>
      includesAny(t, ['contact', 'phone', 'call', 'email', 'talk to', 'human', 'speak to', 'representative']) ? 5 : 0,
    reply: () => ({
      text:
        `Want to talk to our team? Visit the Contact page to call, email, or send a message. For the fastest ballpark price, start the quote quiz — you'll get a starting estimate immediately.`,
      links: [
        { label: 'Contact', href: '/contact' },
        { label: 'Get a quote', href: '/quote' },
      ],
    }),
  },
  {
    id: 'warranty',
    score: (t) => (includesAny(t, ['warranty', 'guarantee', 'insured', 'licensed', 'insured']) ? 4 : 0),
    reply: () => ({
      text:
        `EVnation is a licensed C-10 electrical contractor. Installations follow NEC and local code, and we stand behind our workmanship. See our Warranty page for coverage details.`,
      links: [
        { label: 'Warranty', href: '/warranty' },
        { label: 'About EVnation', href: '/about' },
      ],
    }),
  },
  {
    id: 'services',
    score: (t) => (includesAny(t, ['service', 'what do you', 'what can you', 'offer', 'shop']) ? 3 : 0),
    reply: () => ({
      text:
        `Popular services:\n` +
        shopServices
          .slice(0, 5)
          .map((s) => `• ${s.name} — ${s.priceRange}`)
          .join('\n') +
        `\n\nBrowse the shop or tell me what you're planning (charger, panel, permits, solar).`,
      links: [
        { label: 'Shop services', href: '/shop' },
        { label: 'Get a quote', href: '/quote' },
      ],
    }),
  },
]

const DEFAULT_REPLY = {
  text:
    `I'm not sure I caught that — but I can help with EV charger installs, panel upgrades, pricing, rebates, and service areas.\n\n` +
    `For a personalized starting price, try our quote quiz. For complex questions, our team can review your home details.`,
  links: [
    { label: 'Get a quote', href: '/quote' },
    { label: 'Contact us', href: '/contact' },
  ],
}

/** @param {string} input */
export function getChatbotReply(input) {
  const text = input.trim().toLowerCase()
  if (!text) return CHAT_WELCOME

  let best = { id: 'default', score: 0, reply: () => DEFAULT_REPLY }
  for (const rule of RULES) {
    const score = rule.score(text)
    if (score > best.score) best = { ...rule, score }
  }

  if (best.score === 0) return DEFAULT_REPLY
  return best.reply()
}

/** System prompt snapshot for optional OpenAI */
export function getChatbotSystemPrompt() {
  return `You are EVnation's friendly website assistant. Keep answers concise (2–4 short paragraphs max), plain English for non-technical homeowners.

Company: Licensed C-10 EV charger & panel installer. ${stats.installations} installs, ${stats.rating} rating.

Service areas: ${zoneListText()}.

Starting prices: L2 charger ${calculateQuizBaseEstimate(DEFAULT_ZONE, 'ev-charger').display} base (So Cal); panel ${PRICING.panelUpgrade.label}; permits ${PRICING.permit.label}; Powerwall ${PRICING.teslaPowerwall.label}. Cable runs, permits, and add-ons are quoted after electrician review.

Key pages: /quote (quote quiz), /calculator, /contact, /service-areas, /panel-upgrades, /residential-ev-charging.

Do not invent exact final prices. Encourage /quote for estimates. Never claim to schedule installs directly — say the team follows up within ${stats.quoteTurnaround}.`
}
