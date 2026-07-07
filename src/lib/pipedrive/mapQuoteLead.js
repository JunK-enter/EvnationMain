import { getZoneLabel } from '@/data/serviceZones'

/** Quiz service id -> Pipedrive Installation Type label */
export const SERVICE_NEED_TO_INSTALLATION_TYPE = {
  'ev-charger': 'CHG',
  'nema-outlet': 'NEMA',
  'panel-upgrade': 'MPU',
  'ev-panel': 'CHG + MPU',
  'charger-swap': 'SWAP',
  'tesla-powerwall': 'SOLAR',
  'multifamily': 'CHG',
  'commercial-project': 'CHG',
  'not-sure': 'CHG',
}

/** Site zone id -> exact Pipedrive Zone enum label */
export const ZONE_ID_TO_PIPEDRIVE = {
  'zone-1': 'Zone 1 Southern Cal',
  'zone-2': 'Zone 2 Central Cal',
  'zone-3': 'Zone 3 San Fran Bay',
  'zone-4': 'Zone 5 Chicago 1',
  'zone-5': 'Zone 6 Las Vegas',
  'zone-6': 'Zone 7 San Antonio Tx',
  'zone-7': 'Zone 8 New Jersey',
  'zone-8': 'Zone 9 Arizona',
}

const VALID_BREAKER_SIZES = new Set(['30A', '40A', '50A', '60A', '70A', '80A'])

function formatEstimate(estimatedTotal) {
  if (!estimatedTotal) return '-'
  if (typeof estimatedTotal === 'object' && estimatedTotal.low != null) {
    const low = estimatedTotal.low
    const high = estimatedTotal.high
    return high && high !== low ? `$${low} – $${high}` : `$${low}`
  }
  return String(estimatedTotal)
}

/**
 * Normalize quote quiz submission into the shape expected by the Pipedrive client.
 */
export function mapQuoteSubmissionToPipedrive(submission = {}) {
  const personal = submission.personal || {}
  const home = submission.home || {}
  const install = submission.install || {}

  const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(' ').trim()
  const fullAddress = [home.street, home.city, home.state, home.zip].filter(Boolean).join(', ')

  const installationType =
    SERVICE_NEED_TO_INSTALLATION_TYPE[submission.serviceNeed] || 'CHG'
  const zone =
    ZONE_ID_TO_PIPEDRIVE[home.zone] || ZONE_ID_TO_PIPEDRIVE['zone-1']

  const breakerSize = VALID_BREAKER_SIZES.has(home.breakerSize) ? home.breakerSize : ''

  return {
    fullName,
    email: personal.email || '',
    phone: personal.phone || '',
    fullAddress,
    installationType,
    installationTypeLabel: submission.serviceLabel || submission.serviceNeed || '',
    zone,
    zoneLabel: home.zoneLabel || getZoneLabel(home.zone),
    mainService: (home.panelSize || '').replace(/[^\d.]/g, '') || '',
    breakerSize,
    panelLocation: home.panelLocation || '',
    notes: submission.notes || '',
    sourceChannel: submission.sourceChannel || 'Web forms',
    leadSource: submission.leadSource || 'Website',
    submissionId: submission.id || null,
    serviceNeed: submission.serviceNeed || '',
    chargerType: install.chargerType || '',
    panelUpgrade: install.panelUpgrade ? 'Yes' : 'No',
    permitNeeded: install.permitNeeded ? 'Yes' : 'No',
    estimatedTotal: formatEstimate(submission.estimatedTotal),
    services: Array.isArray(submission.services) ? submission.services.join(', ') : '',
  }
}
