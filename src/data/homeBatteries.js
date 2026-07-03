/** Home battery catalog — real product photos in public/images/batteries/ */

export const BATTERY_BRAND_LOGOS = [
  {
    id: 'tesla',
    name: 'Tesla',
    logo: '/images/batteries/logos/tesla.svg',
    href: '#features',
  },
  {
    id: 'gm',
    name: 'GM',
    logo: '/images/batteries/logos/gm.svg',
    href: '#gm',
  },
  {
    id: 'atg',
    name: 'ATG',
    logo: '/images/batteries/logos/atg.svg',
    href: '#atg',
  },
  {
    id: 'enphase',
    name: 'Enphase',
    logo: '/images/batteries/logos/enphase.svg',
    href: '#enphase',
  },
]

export const ALTERNATIVE_HOME_BATTERIES = [
  {
    id: 'gm',
    brand: 'GM',
    productName: 'GM Energy PowerBank',
    tagline: 'Scalable home storage from GM Energy — modular backup with Ultium Home integration.',
    image: '/images/batteries/products/gm-powerbank.jpg',
    imageFit: 'contain',
    highlights: [
      'Modular capacity to match your backup goals',
      'Integrates with GM Energy ecosystem',
      'Professional install with load & panel evaluation',
      'V2H-ready paths on supported Ultium vehicles',
    ],
  },
  {
    id: 'atg',
    brand: 'ATG',
    productName: 'Whole Home Backup System',
    tagline: 'ATG-spec home backup packages — inverter, battery stack, and solar-ready integration.',
    image: '/images/batteries/products/atg-home-backup.webp',
    imageFit: 'contain',
    highlights: [
      'Indoor/outdoor rated enclosure options',
      'Pairs with new or existing solar',
      'Licensed C10 install & permitting',
      'Sized to your critical-load list',
    ],
  },
  {
    id: 'enphase',
    brand: 'Enphase',
    productName: 'IQ Battery 5P',
    tagline: 'Modular Enphase IQ Battery packs with app monitoring — ideal for Enphase solar homes.',
    image: '/images/batteries/products/enphase-iq-battery.png',
    imageFit: 'contain',
    imageBg: 'dark',
    highlights: [
      'Stackable IQ Battery 5P / 10T configurations',
      'Enphase app monitoring & storm guard modes',
      'AC-coupled — works with existing Enphase microinverters',
      'Expand capacity as your needs grow',
    ],
  },
]
