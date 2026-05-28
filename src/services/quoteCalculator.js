import { chargerTypes, complexityLevels } from '../data/services'
import { statePricingMultipliers } from '../data/states'

const BASE_INSTALL = 950
const BASE_PANEL_UPGRADE = 3200
const BASE_PERMIT = 350
const DISTANCE_COST_PER_FT = 8

export function calculateQuote({
  state = 'CA',
  chargerType = 'hardwired',
  distance = 25,
  panelUpgrade = false,
  permitNeeded = true,
  complexity = 'simple',
}) {
  const stateMult = statePricingMultipliers[state] || statePricingMultipliers.DEFAULT
  const charger = chargerTypes.find((c) => c.id === chargerType) || chargerTypes[0]
  const comp = complexityLevels.find((c) => c.id === complexity) || complexityLevels[0]

  let installCost = BASE_INSTALL * charger.multiplier * comp.multiplier * stateMult
  installCost += Math.max(0, distance - 15) * DISTANCE_COST_PER_FT

  const panelCost = panelUpgrade ? BASE_PANEL_UPGRADE * stateMult : 0
  const permitCost = permitNeeded ? BASE_PERMIT * stateMult : 0

  const subtotal = installCost + panelCost + permitCost
  const low = Math.round(subtotal * 0.85)
  const high = Math.round(subtotal * 1.2)

  return {
    installCost: { low: Math.round(installCost * 0.9), high: Math.round(installCost * 1.15) },
    panelCost: panelUpgrade ? { low: Math.round(panelCost * 0.9), high: Math.round(panelCost * 1.1) } : null,
    permitCost: permitNeeded ? { low: Math.round(permitCost * 0.85), high: Math.round(permitCost * 1.15) } : null,
    total: { low, high },
  }
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
