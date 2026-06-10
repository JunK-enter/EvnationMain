import { complexityLevels } from '../data/services'
import { DEFAULT_ZONE_ID, getMasterZoneKey } from '../data/serviceZones'
import {
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
