/**
 * Zone Price Detail — retail line items from evNation Master Page
 * Source: https://evnation-master.vercel.app/
 */
import { DEFAULT_ZONE_ID, getMasterZoneKey } from './serviceZones'

/** Line items billed per foot when distance is provided */
export const PER_FOOT_LINE_ITEMS = [
  '3 wire',
  '4 wire',
  '3 wire trench',
  '4 wire trench',
  'Trench Work',
  'Concrete work',
]

/**
 * @typedef {{ description: string, cost: number|string, retail: number|string, profit: number|string|null }} ZoneLineItem
 */

/** @type {Record<string, ZoneLineItem[]>} */
export const ZONE_PRICE_DETAIL = {
  'So Cal': [
    { description: 'Base Installation', cost: 450, retail: 750, profit: 300 },
    { description: '3 wire', cost: 12, retail: 21, profit: 9 },
    { description: '4 wire', cost: 14, retail: 24, profit: 10 },
    { description: '3 wire trench', cost: 'This trenching is required to have rigid steel pipe', retail: 'This trenching is required to have rigid steel pipe', profit: null },
    { description: '4 wire trench', cost: 'This trenching is required to have rigid steel pipe', retail: 'This trenching is required to have rigid steel pipe', profit: null },
    { description: 'Trench Work', cost: 10, retail: 15, profit: 5 },
    { description: 'Concrete work', cost: 15, retail: 20, profit: 5 },
    { description: 'Panel Work', cost: 150, retail: 450, profit: 300 },
    { description: 'Cut Off Switch', cost: 250, retail: 750, profit: 500 },
    { description: 'Sub Panel', cost: 750, retail: 1120, profit: 370 },
    { description: 'Permits', cost: 200, retail: 450, profit: 250 },
    { description: 'Panel Upgrade', cost: '3500-4500', retail: '3500-4500', profit: null },
    { description: 'Filing Fee', cost: 250, retail: 250, profit: 0 },
    { description: 'Hems Unit', cost: 300, retail: 395, profit: 95 },
    { description: 'Programming', cost: 175, retail: 275, profit: 100 },
    { description: 'DCC Load device', cost: 975, retail: 1275, profit: 300 },
    { description: 'Installation', cost: 175, retail: 250, profit: 75 },
  ],
  Monterey: [
    { description: 'Base Installation', cost: 550, retail: 950, profit: 400 },
    { description: '3 wire', cost: 16, retail: 34, profit: 18 },
    { description: '4 wire', cost: 18, retail: 38, profit: 20 },
    { description: '3 wire trench', cost: 'This trenching is required to have rigid steel pipe', retail: 'This trenching is required to have rigid steel pipe', profit: null },
    { description: '4 wire trench', cost: 'This trenching is required to have rigid steel pipe', retail: 'This trenching is required to have rigid steel pipe', profit: null },
    { description: 'Trench Work', cost: 14, retail: 35, profit: 21 },
    { description: 'Concrete work', cost: 15, retail: 45, profit: 30 },
    { description: 'Panel Work', cost: 200, retail: 625, profit: 425 },
    { description: 'Cut Off Switch', cost: 250, retail: 750, profit: 500 },
    { description: 'Sub Panel', cost: 750, retail: 1120, profit: 370 },
    { description: 'Permits', cost: 350, retail: 450, profit: 100 },
    { description: 'Panel Upgrade', cost: '4500-6200', retail: '4500-6200', profit: null },
    { description: 'Filing Fee', cost: 250, retail: 250, profit: 0 },
    { description: 'Hems Unit', cost: 300, retail: 395, profit: 95 },
    { description: 'Programming', cost: 175, retail: 275, profit: 100 },
    { description: 'DCC Load device', cost: 975, retail: 1275, profit: 300 },
    { description: 'Installation', cost: 175, retail: 250, profit: 75 },
  ],
  'No Cal': [
    { description: 'Base Installation', cost: 550, retail: 850, profit: 300 },
    { description: '3 wire', cost: 12, retail: 21, profit: 9 },
    { description: '4 wire', cost: 14, retail: 24, profit: 10 },
    { description: '3 wire trench', cost: 'This trenching is required to have rigid steel pipe', retail: 'This trenching is required to have rigid steel pipe', profit: null },
    { description: '4 wire trench', cost: 'This trenching is required to have rigid steel pipe', retail: 'This trenching is required to have rigid steel pipe', profit: null },
    { description: 'Trench Work', cost: 12, retail: 25, profit: 13 },
    { description: 'Concrete work', cost: 15, retail: 35, profit: 20 },
    { description: 'Panel Work', cost: 200, retail: 500, profit: 300 },
    { description: 'Cut Off Switch', cost: 250, retail: 750, profit: 500 },
    { description: 'Sub Panel', cost: 750, retail: 1120, profit: 370 },
    { description: 'Permits', cost: 400, retail: 500, profit: 100 },
    { description: 'Panel Upgrade', cost: '3800-5000', retail: '3800-5000', profit: null },
    { description: 'Filing Fee', cost: 250, retail: 250, profit: 0 },
    { description: 'Hems Unit', cost: 300, retail: 395, profit: 95 },
    { description: 'Programming', cost: 175, retail: 275, profit: 100 },
    { description: 'DCC Load device', cost: 975, retail: 1275, profit: 300 },
    { description: 'Installation', cost: 175, retail: 250, profit: 75 },
  ],
  'Vegas Baby': [
    { description: 'Base Installation', cost: 450, retail: 850, profit: 400 },
    { description: '3 wire', cost: 12, retail: 21, profit: 9 },
    { description: '4 wire', cost: 14, retail: 24, profit: 10 },
    { description: '3 wire trench', cost: 'This trenching is required to have rigid steel pipe', retail: 'This trenching is required to have rigid steel pipe', profit: null },
    { description: '4 wire trench', cost: 'This trenching is required to have rigid steel pipe', retail: 'This trenching is required to have rigid steel pipe', profit: null },
    { description: 'Trench Work', cost: 12, retail: 25, profit: 13 },
    { description: 'Concrete work', cost: 15, retail: 35, profit: 20 },
    { description: 'Panel Work', cost: 200, retail: 350, profit: 150 },
    { description: 'Cut Off Switch', cost: 250, retail: 750, profit: 500 },
    { description: 'Sub Panel', cost: 750, retail: 900, profit: 150 },
    { description: 'Permits', cost: 250, retail: 500, profit: 250 },
    { description: 'Panel Upgrade', cost: '3500-4500', retail: '3500-4500', profit: null },
    { description: 'Filing Fee', cost: 250, retail: 250, profit: 0 },
    { description: 'Hems Unit', cost: 300, retail: 395, profit: 95 },
    { description: 'Programming', cost: 175, retail: 275, profit: 100 },
    { description: 'DCC Load device', cost: 975, retail: 1275, profit: 300 },
    { description: 'Installation', cost: 175, retail: 250, profit: 75 },
  ],
  AZ: [
    { description: 'Base Installation', cost: 450, retail: 850, profit: 400 },
    { description: '3 wire', cost: 12, retail: 21, profit: 9 },
    { description: '4 wire', cost: 14, retail: 24, profit: 10 },
    { description: '3 wire trench', cost: 'This trenching is required to have rigid steel pipe', retail: 'This trenching is required to have rigid steel pipe', profit: null },
    { description: '4 wire trench', cost: 'This trenching is required to have rigid steel pipe', retail: 'This trenching is required to have rigid steel pipe', profit: null },
    { description: 'Trench Work', cost: 12, retail: 25, profit: 13 },
    { description: 'Concrete work', cost: 15, retail: 35, profit: 20 },
    { description: 'Panel Work', cost: 200, retail: 350, profit: 150 },
    { description: 'Cut Off Switch', cost: 250, retail: 750, profit: 500 },
    { description: 'Sub Panel', cost: 750, retail: 900, profit: 150 },
    { description: 'Permits', cost: 250, retail: 350, profit: 100 },
    { description: 'Panel Upgrade', cost: '3500-4500', retail: '3500-4500', profit: null },
    { description: 'Filing Fee', cost: 250, retail: 250, profit: 0 },
    { description: 'Hems Unit', cost: 300, retail: 395, profit: 95 },
    { description: 'Programming', cost: 175, retail: 275, profit: 100 },
    { description: 'DCC Load device', cost: 975, retail: 1275, profit: 300 },
    { description: 'Installation', cost: 175, retail: 250, profit: 75 },
  ],
  Texas: [
    { description: 'Base Installation', cost: 450, retail: 850, profit: 400 },
    { description: '3 wire', cost: 12, retail: 21, profit: 9 },
    { description: '4 wire', cost: 14, retail: 24, profit: 10 },
    { description: '3 wire trench', cost: 'This trenching is required to have rigid steel pipe', retail: 'This trenching is required to have rigid steel pipe', profit: null },
    { description: '4 wire trench', cost: 'This trenching is required to have rigid steel pipe', retail: 'This trenching is required to have rigid steel pipe', profit: null },
    { description: 'Trench Work', cost: 12, retail: 25, profit: 13 },
    { description: 'Concrete work', cost: 15, retail: 35, profit: 20 },
    { description: 'Panel Work', cost: 200, retail: 350, profit: 150 },
    { description: 'Cut Off Switch', cost: 250, retail: 750, profit: 500 },
    { description: 'Sub Panel', cost: 750, retail: 900, profit: 150 },
    { description: 'Permits', cost: 250, retail: 450, profit: 200 },
    { description: 'Panel Upgrade', cost: '3500-4500', retail: '3500-4500', profit: null },
    { description: 'Filing Fee', cost: 250, retail: 250, profit: 0 },
    { description: 'Hems Unit', cost: 300, retail: 395, profit: 95 },
    { description: 'Programming', cost: 175, retail: 275, profit: 100 },
    { description: 'DCC Load device', cost: 975, retail: 1275, profit: 300 },
    { description: 'Installation', cost: 175, retail: 250, profit: 75 },
  ],
  NJ: [
    { description: 'Base Installation', cost: 400, retail: 950, profit: 550 },
    { description: '3 wire', cost: 12, retail: 22, profit: 10 },
    { description: '4 wire', cost: 14, retail: 25, profit: 11 },
    { description: '3 wire trench', cost: 'This trenching is required to have rigid steel pipe', retail: 'This trenching is required to have rigid steel pipe', profit: null },
    { description: '4 wire trench', cost: 'This trenching is required to have rigid steel pipe', retail: 'This trenching is required to have rigid steel pipe', profit: null },
    { description: 'Trench Work', cost: 12, retail: 25, profit: 13 },
    { description: 'Concrete work', cost: 15, retail: 35, profit: 20 },
    { description: 'Panel Work', cost: 200, retail: 350, profit: 150 },
    { description: 'Cut Off Switch', cost: 250, retail: 750, profit: 500 },
    { description: 'Sub Panel', cost: 750, retail: 1120, profit: 370 },
    { description: 'Permits', cost: 250, retail: 500, profit: 250 },
    { description: 'Panel Upgrade', cost: '4500-5500', retail: '4500-5500', profit: null },
    { description: 'Filing Fee', cost: 250, retail: 250, profit: 0 },
    { description: 'Hems Unit', cost: 300, retail: 395, profit: 95 },
    { description: 'Programming', cost: 175, retail: 275, profit: 100 },
    { description: 'DCC Load device', cost: 975, retail: 1275, profit: 300 },
    { description: 'Installation', cost: 175, retail: 250, profit: 75 },
  ],
  Chicago: [
    { description: 'Base Installation', cost: 500, retail: 850, profit: 350 },
    { description: '3 wire', cost: 14, retail: 24, profit: 10 },
    { description: '4 wire', cost: 16, retail: 26, profit: 10 },
    { description: '3 wire trench', cost: '22', retail: '45', profit: 23 },
    { description: '4 wire trench', cost: '25', retail: '49', profit: 24 },
    { description: 'Trench Work', cost: 50, retail: 'Up to 100', profit: '-' },
    { description: 'Concrete work', cost: 15, retail: 15, profit: 0 },
    { description: 'Panel Work', cost: 200, retail: 450, profit: 250 },
    { description: 'Cut Off Switch', cost: 250, retail: 750, profit: 500 },
    { description: 'Sub Panel', cost: 750, retail: 1120, profit: 370 },
    { description: 'Permits', cost: 'these vary', retail: 'these vary', profit: null },
    { description: 'Panel Upgrade', cost: '4500-5500', retail: '4500-5500', profit: null },
    { description: 'Filing Fee', cost: 250, retail: 250, profit: 0 },
    { description: 'Hems Unit', cost: 300, retail: 395, profit: 95 },
    { description: 'Programming', cost: 175, retail: 275, profit: 100 },
    { description: 'DCC Load device', cost: 975, retail: 1275, profit: 300 },
    { description: 'Installation', cost: 175, retail: 250, profit: 75 },
  ],
}

/** Parse a retail/cost value into { low, high } or null if not numeric */
export function parsePriceValue(value) {
  if (value == null || value === '') return null
  if (typeof value === 'number' && !Number.isNaN(value)) {
    return { low: value, high: value }
  }
  const str = String(value).trim()
  if (!str) return null

  const rangeMatch = str.match(/^(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)$/)
  if (rangeMatch) {
    return { low: parseFloat(rangeMatch[1]), high: parseFloat(rangeMatch[2]) }
  }

  const upToMatch = str.match(/^up to\s*(\d+(?:\.\d+)?)$/i)
  if (upToMatch) {
    const high = parseFloat(upToMatch[1])
    return { low: high * 0.5, high }
  }

  const single = parseFloat(str)
  if (!Number.isNaN(single)) {
    return { low: single, high: single }
  }

  return null
}

export function getZoneLineItems(zoneId = DEFAULT_ZONE_ID) {
  const key = getMasterZoneKey(zoneId)
  return ZONE_PRICE_DETAIL[key] || ZONE_PRICE_DETAIL['So Cal']
}

export function getRetailLineItem(zoneId, description) {
  const item = getZoneLineItems(zoneId).find((line) => line.description === description)
  if (!item) return null
  return parsePriceValue(item.retail)
}

/** Retail total for a per-foot line item at a given distance */
export function getRetailPerFootTotal(zoneId, description, feet) {
  const rate = getRetailLineItem(zoneId, description)
  if (!rate || feet <= 0) return { low: 0, high: 0 }
  return { low: rate.low * feet, high: rate.high * feet }
}

/** Map shop service IDs to zone price detail line items (retail) */
export const SERVICE_TO_LINE_ITEM = {
  'l2-charger': 'Base Installation',
  'panel-upgrade': 'Panel Upgrade',
  'permit-handling': 'Permits',
  'load-calculation': 'DCC Load device',
}

export function getServiceRetailPrice(zoneId, serviceId) {
  const lineItem = SERVICE_TO_LINE_ITEM[serviceId]
  if (!lineItem) return null
  return getRetailLineItem(zoneId, lineItem)
}

export function formatRetailRange({ low, high }) {
  if (low == null && high == null) return 'Contact for quote'
  if (low === high) return `$${Math.round(low).toLocaleString()}`
  return `$${Math.round(low).toLocaleString()} – $${Math.round(high).toLocaleString()}`
}

export function formatFromPrice({ low, high }) {
  if (low == null && high == null) return 'Contact for quote'
  return `From $${Math.round(low ?? high).toLocaleString()}`
}
