import { complexityLevels } from '../data/services'
import { DEFAULT_ZONE_ID, getMasterZoneKey } from '../data/serviceZones'
import {
  formatFromPrice,
  formatRetailRange,
  getRetailLineItem,
  getRetailPerFootTotal,
  getZoneLineItems,
} from '../data/zonePriceDetail'

const WIRE_BY_CHARGER = {
  hardwired: '4 wire',
  'plug-in': '3 wire',
  'nema-14-50': '3 wire',
}

const WIRE_LABEL = {
  hardwired: '4-wire (hardwired 40A)',
  'plug-in': '3-wire (plug-in 32A)',
  'nema-14-50': '3-wire (NEMA 14-50 outlet)',
}

const WIRE_MULTIPLIER = {
  hardwired: 1,
  'plug-in': 1,
  'nema-14-50': 0.65,
}

/** Optional add-ons mapped to Master Page line items */
export const QUOTE_EXTRAS = [
  { id: 'panelWork', lineItem: 'Panel Work', label: 'Electrical panel work', hint: 'Breaker space, labeling & connections at the panel' },
  { id: 'cutOffSwitch', lineItem: 'Cut Off Switch', label: 'Emergency cut-off switch', hint: 'Required by some utilities and local codes' },
  { id: 'subPanel', lineItem: 'Sub Panel', label: 'Sub-panel install', hint: 'When the main panel is too far or lacks capacity' },
  { id: 'loadCalculation', lineItem: 'DCC Load device', label: 'Load calculation device', hint: 'NEC-compliant load management for your panel' },
]

function addRanges(a, b) {
  return { low: a.low + b.low, high: a.high + b.high }
}

function scaleRange(range, factor) {
  return { low: range.low * factor, high: range.high * factor }
}

function roundRange({ low, high }) {
  return { low: Math.round(low), high: Math.round(high) }
}

function breakdownEntry(id, label, detail, range) {
  const rounded = roundRange(range)
  return {
    id,
    label,
    detail,
    low: rounded.low,
    high: rounded.high,
    display: formatRetailRange(rounded),
  }
}

/**
 * Zone-based quote using Master Page retail prices.
 * @see https://evnation-master.vercel.app/ — Zone Price Detail
 */
export function calculateQuote({
  zoneId = DEFAULT_ZONE_ID,
  chargerType = 'hardwired',
  distance = 25,
  panelUpgrade = false,
  permitNeeded = true,
  complexity = 'simple',
  extras = {},
}) {
  const masterZone = getMasterZoneKey(zoneId)
  const items = getZoneLineItems(zoneId)
  const feet = Math.max(0, Number(distance) || 0)
  const breakdown = []

  const baseInstall = getRetailLineItem(zoneId, 'Base Installation') || { low: 0, high: 0 }
  breakdown.push(breakdownEntry(
    'base',
    'Base charger installation',
    'Licensed electrician, mounting & setup',
    baseInstall,
  ))

  let installCost = { ...baseInstall }

  const wireKey = WIRE_BY_CHARGER[chargerType] || '4 wire'
  const wireMult = WIRE_MULTIPLIER[chargerType] ?? 1
  const wireRate = getRetailLineItem(zoneId, wireKey)
  const wireRun = getRetailPerFootTotal(zoneId, wireKey, feet)

  if (wireRun.low > 0 || wireRun.high > 0) {
    const scaled = scaleRange(wireRun, wireMult)
    installCost = addRanges(installCost, scaled)
    const rateLabel = wireRate ? `$${wireRate.low}/ft` : ''
    breakdown.push(breakdownEntry(
      'wire',
      `Cable run — ${WIRE_LABEL[chargerType] || wireKey}`,
      feet > 0 ? `${feet} ft × ${rateLabel}`.trim() : null,
      scaled,
    ))
  }

  const comp = complexityLevels.find((c) => c.id === complexity) || complexityLevels[0]
  if (comp.id === 'moderate') {
    const trenchFeet = feet * 0.5
    const trench = getRetailPerFootTotal(zoneId, 'Trench Work', trenchFeet)
    installCost = addRanges(installCost, trench)
    breakdown.push(breakdownEntry(
      'trench',
      'Trench work (partial run)',
      `~${Math.round(trenchFeet)} ft underground routing`,
      trench,
    ))
  } else if (comp.id === 'complex') {
    const trench = getRetailPerFootTotal(zoneId, 'Trench Work', feet)
    const concreteFeet = Math.min(feet, 25)
    const concrete = getRetailPerFootTotal(zoneId, 'Concrete work', concreteFeet)
    installCost = addRanges(installCost, addRanges(trench, concrete))
    breakdown.push(breakdownEntry(
      'trench',
      'Trench work (full run)',
      `${feet} ft underground routing`,
      trench,
    ))
    breakdown.push(breakdownEntry(
      'concrete',
      'Concrete / surface restoration',
      `${concreteFeet} ft patch & finish`,
      concrete,
    ))
  }

  for (const extra of QUOTE_EXTRAS) {
    if (!extras[extra.id]) continue
    const price = getRetailLineItem(zoneId, extra.lineItem)
    if (!price) continue
    breakdown.push(breakdownEntry(extra.id, extra.label, extra.hint, price))
    installCost = addRanges(installCost, price)
  }

  const panelCost = panelUpgrade ? getRetailLineItem(zoneId, 'Panel Upgrade') : null
  if (panelCost) {
    breakdown.push(breakdownEntry(
      'panelUpgrade',
      'Electrical panel upgrade',
      '200A service — final scope confirmed on-site',
      panelCost,
    ))
  }

  let permitCost = permitNeeded ? getRetailLineItem(zoneId, 'Permits') : null
  if (permitNeeded && !permitCost) {
    permitCost = { low: 250, high: 500 }
  }
  if (permitCost) {
    breakdown.push(breakdownEntry(
      'permits',
      'Permits & filing',
      'City permit application & inspection coordination',
      permitCost,
    ))
  }

  const total = breakdown.reduce(
    (sum, line) => addRanges(sum, { low: line.low, high: line.high }),
    { low: 0, high: 0 },
  )

  const installOnly = breakdown
    .filter((line) => !['panelUpgrade', 'permits'].includes(line.id))
    .reduce((sum, line) => addRanges(sum, { low: line.low, high: line.high }), { low: 0, high: 0 })

  return {
    zoneId,
    masterZone,
    breakdown,
    installCost: roundRange(installOnly),
    panelCost: panelCost ? roundRange(panelCost) : null,
    permitCost: permitCost ? roundRange(permitCost) : null,
    total: roundRange(total),
    lineItemCount: items.length,
  }
}

/** Quiz funnel — base starting price only (no cable run, permits, or add-ons) */
const QUIZ_CUSTOM_ESTIMATE = new Set(['multifamily', 'commercial-project'])

const QUIZ_SERVICE_LINE_ITEM = {
  'ev-charger': 'Base Installation',
  'nema-outlet': 'Base Installation',
  'panel-upgrade': 'Panel Upgrade',
  'ev-panel': 'Base Installation',
  'charger-swap': 'Base Installation',
  'tesla-powerwall': 'Tesla Powerwall',
  'not-sure': 'Base Installation',
}

const QUIZ_LINE_FALLBACK = {
  'Base Installation': { low: 575, high: 575 },
  'Panel Upgrade': { low: 3500, high: 4500 },
  'Tesla Powerwall': { low: 9995, high: 9995 },
}

export function calculateQuizBaseEstimate(zoneId, serviceNeedId) {
  if (QUIZ_CUSTOM_ESTIMATE.has(serviceNeedId)) {
    return {
      lineItem: 'Custom scope',
      from: null,
      display: 'Custom quote',
      custom: true,
    }
  }

  if (serviceNeedId === 'ev-panel') {
    const base = getRetailLineItem(zoneId, 'Base Installation') || QUIZ_LINE_FALLBACK['Base Installation']
    const panel = getRetailLineItem(zoneId, 'Panel Upgrade') || QUIZ_LINE_FALLBACK['Panel Upgrade']
    const from = { low: base.low + panel.low, high: base.high + panel.high }
    return {
      lineItem: 'Install + panel upgrade',
      from,
      display: formatFromPrice(from),
      custom: false,
    }
  }

  const lineItem = QUIZ_SERVICE_LINE_ITEM[serviceNeedId] || 'Base Installation'
  const raw = getRetailLineItem(zoneId, lineItem) || QUIZ_LINE_FALLBACK[lineItem] || { low: 575, high: 575 }
  const from = { low: Math.round(raw.low), high: Math.round(raw.high) }
  return {
    lineItem,
    from,
    display: formatFromPrice(from),
    custom: false,
  }
}

const READINESS_PARKING_DISTANCE = { garage: 15, driveway: 28, outdoor: 35 }
const READINESS_PARKING_COMPLEXITY = { garage: 'simple', driveway: 'simple', outdoor: 'moderate' }

/** Home-page Quick Check — ballpark total using parking distance and panel size */
export function calculateReadinessEstimate({
  zoneId = DEFAULT_ZONE_ID,
  parking = 'garage',
  panel = '200',
}) {
  const distance = READINESS_PARKING_DISTANCE[parking] ?? 25
  const complexity = READINESS_PARKING_COMPLEXITY[parking] ?? 'simple'
  const panelAmps = panel === 'unknown' ? '' : `${panel}A`
  const needsPanel = shouldSuggestPanelUpgrade(panelAmps)

  const quote = calculateQuote({
    zoneId,
    chargerType: 'hardwired',
    distance,
    panelUpgrade: needsPanel,
    permitNeeded: true,
    complexity,
    extras: {},
  })

  const total = quote.total
  const display = total.low !== total.high
    ? formatRetailRange(total)
    : formatFromPrice(total)

  return {
    serviceNeed: needsPanel ? 'ev-panel' : 'ev-charger',
    needsPanel,
    distance,
    total,
    lineItem: needsPanel ? 'Install + panel upgrade' : 'Install + cable run',
    display,
  }
}

/** Suggest panel upgrade when existing panel is 125A or below */
export function shouldSuggestPanelUpgrade(panelSize) {
  if (!panelSize || panelSize === 'Unknown') return false
  const amps = parseInt(panelSize, 10)
  return !Number.isNaN(amps) && amps <= 125
}

export function calculateReadinessScore(home, photos, services) {
  let score = 30
  if (home.panelSize === '200A') score += 25
  else if (home.panelSize === '150A') score += 15
  else if (home.panelSize === '125A') score += 10
  else if (home.panelSize === '100A') score += 5

  if (parseInt(home.distance) <= 25) score += 15
  else if (parseInt(home.distance) <= 50) score += 8

  if (photos?.panel) score += 15
  if (photos?.garage) score += 10

  if (!services?.includes('panel-upgrade')) score += 5

  return Math.min(100, score)
}

export function calculateGasSavings(milesPerYear = 12000, mpg = 25, gasPrice = 3.8, electricityRate = 0.15) {
  const gasCost = (milesPerYear / mpg) * gasPrice
  const evMilesPerKwh = 3.5
  const evCost = (milesPerYear / evMilesPerKwh) * electricityRate
  return {
    annualGasCost: Math.round(gasCost),
    annualEvCost: Math.round(evCost),
    annualSavings: Math.round(gasCost - evCost),
    fiveYearSavings: Math.round((gasCost - evCost) * 5),
  }
}
