/** Home charger catalog — product images in /public/images/chargers/ */

export const STANDARD_HOME_CHARGERS = [
  {
    id: 'tesla',
    brand: 'Tesla',
    productName: 'Wall Connector',
    tagline: 'Sleek, hardwired Level 2 charging for Tesla and universal J1772 vehicles.',
    image: '/images/chargers/tesla-wall-connector.png',
    highlights: [
      'Up to 48A / 11.5 kW on compatible circuits',
      'Hardwired install with clean conduit routing',
      'Wi‑Fi connectivity and over-the-air updates',
      'Compact low-profile design for garages and carports',
    ],
  },
  {
    id: 'emporia',
    brand: 'Emporia',
    productName: 'Smart Level 2 EV Charger',
    tagline: 'App-connected charging with load management for busy panels.',
    image: '/images/chargers/emporia-smart-charger.png',
    highlights: [
      '40A Level 2 — up to 9.6 kW',
      'Emporia app scheduling and usage tracking',
      'Works with Emporia Vue for whole-home load balancing',
      'UL-listed for indoor and outdoor installs',
    ],
  },
  {
    id: 'chargepoint',
    brand: 'ChargePoint',
    productName: 'Home Flex',
    tagline: 'Adjustable amperage and a proven platform for daily home charging.',
    image: '/images/chargers/chargepoint-home-flex.png',
    highlights: [
      'Adjustable 16A–50A output to match your panel',
      'Hardwired or NEMA 14-50 plug-in options',
      'ChargePoint app with scheduling and reminders',
      'Energy Star certified',
    ],
  },
  {
    id: 'mercedes',
    brand: 'Mercedes-Benz',
    productName: 'Wallbox Charger',
    tagline: 'OEM wallbox installs for Mercedes-EQ owners who want a factory-aligned setup.',
    image: '/images/chargers/mercedes-wallbox.png',
    highlights: [
      'Level 2 AC charging for Mercedes-EQ models',
      'Integrated RFID / app authorization options',
      'Professional mount and cable management',
      'Coordinated with Mercedes me charge settings',
    ],
  },
  {
    id: 'wallbox',
    brand: 'Wallbox',
    productName: 'Pulsar Plus',
    tagline: 'Compact smart charger with strong app control and a clean wall profile.',
    image: '/images/chargers/wallbox-pulsar-plus.png',
    highlights: [
      'Up to 40A / 9.6 kW Level 2',
      'myWallbox app — schedules, locks, and power sharing',
      'Bluetooth setup for fast commissioning',
      'Compact form factor for tight garage spaces',
    ],
  },
  {
    id: 'solaredge',
    brand: 'SolarEdge',
    productName: 'Smart EV Charger',
    tagline: 'Solar-aware Level 2 charging when paired with a SolarEdge energy system.',
    image: '/images/chargers/solaredge-smart-ev-charger.png',
    highlights: [
      'Charge from solar surplus when available',
      'Integrates with SolarEdge monitoring platform',
      'Built-in meter for accurate session tracking',
      'Ideal for solar + EV homes in our service areas',
    ],
  },
]

export const BIDIRECTIONAL_HOME_CHARGERS = [
  {
    id: 'tesla-bi',
    brand: 'Tesla',
    productName: 'Wall Connector + Powerwall',
    tagline: 'Store energy and support backup — with V2H-style use when paired with Powerwall and supported hardware.',
    image: '/images/chargers/tesla-wall-connector.png',
    highlights: [
      'Home backup when integrated with Tesla Powerwall',
      'Solar charging and stored-energy dispatch',
      'Powershare capabilities on supported setups',
      'Installed and commissioned by evNation electricians',
    ],
  },
  {
    id: 'gm',
    brand: 'GM',
    productName: 'Ultium V2H Ready',
    tagline: 'Bi-directional charging for compatible GM Ultium vehicles — home backup is coming to more driveways.',
    image: '/images/solutions/residential-ev-charger.jpg',
    highlights: [
      'Vehicle-to-home (V2H) on supported Ultium models',
      'Requires compatible bidirectional hardware and utility approval',
      'Panel and service sizing evaluated on site',
      'More GM options added as they become available — ask our team',
    ],
  },
]
