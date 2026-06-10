import { SERVICE_ZONES, DEFAULT_ZONE_ID } from './serviceZones'
import { localSeoKeywords as countyKeywords } from './serviceAreasSeo'

export const serviceArea = {
  region: 'Southern, Central & Northern California + select states',
  regionShort: 'CA regions & select states',
  tagline:
    'Licensed EV charger, solar & panel upgrade installers across Southern, Central & Northern California — plus Illinois, Nevada, Texas, New Jersey & Arizona.',
  zones: SERVICE_ZONES,
  defaultZoneId: DEFAULT_ZONE_ID,
  primaryZone: SERVICE_ZONES[0],
  seoPath: '/service-areas',
}

export const localKeywords = [
  'EV charger installation Southern California',
  'EV charger installation Orange County',
  'EV charger installation Los Angeles',
  'EV charger installation San Diego',
  'EV charger installation Las Vegas',
  'EV charger installation San Luis Obispo',
  'Panel upgrade California',
  'Level 2 charger installer near me',
  ...countyKeywords.slice(0, 12),
]

export const stats = {
  installations: '500+',
  rating: '4.9/5',
  serviceArea: 'CA · 5 States',
  quoteTurnaround: '24hr',
}
