/**
 * 301 redirects from legacy WordPress / long URLs → new Next.js routes.
 * Add entries here as you migrate; also mirrored in vercel.json for edge redirects.
 */
export const legacyRedirects = [
  // Shorter service URLs
  { source: '/residential-ev-charging-installation', destination: '/residential-ev-charging', permanent: true },
  { source: '/residential-ev-charging-installation/:path*', destination: '/residential-ev-charging', permanent: true },
  { source: '/ev-charger-installation', destination: '/residential-ev-charging', permanent: true },
  { source: '/home-ev-charger-installation', destination: '/residential-ev-charging', permanent: true },
  { source: '/panel-upgrade-services', destination: '/panel-upgrades', permanent: true },
  { source: '/panel-upgrade', destination: '/panel-upgrades', permanent: true },
  { source: '/solar-energy', destination: '/solar', permanent: true },
  { source: '/commercial-charging', destination: '/commercial', permanent: true },
  { source: '/commercial-ev-charging', destination: '/commercial', permanent: true },
  { source: '/get-a-quote', destination: '/quote', permanent: true },
  { source: '/contact-us', destination: '/contact', permanent: true },
  { source: '/about-us', destination: '/about', permanent: true },
  { source: '/portfolio', destination: '/projects', permanent: true },
  { source: '/our-work', destination: '/projects', permanent: true },
  { source: '/ev-charger', destination: '/residential-ev-charging', permanent: true },
  { source: '/auto-dealers', destination: '/auto-dealer', permanent: true },
  { source: '/electrician', destination: '/', permanent: true },
  { source: '/employee', destination: '/', permanent: true },
  { source: '/employee/:path*', destination: '/', permanent: true },

  // Southern California landing pages → main service + anchor
  { source: '/ev-charger-installation-newport-beach', destination: '/service-areas/orange-county', permanent: true },
  { source: '/ev-charger-installation-costa-mesa', destination: '/service-areas/orange-county', permanent: true },
  { source: '/ev-charger-installation-irvine', destination: '/service-areas/orange-county', permanent: true },
  { source: '/ev-charger-installation-orange-county', destination: '/service-areas/orange-county', permanent: true },

  // Keep blog slugs — only redirect index variants
  { source: '/blog/page/:page', destination: '/blog', permanent: true },
  { source: '/category/:slug', destination: '/blog', permanent: true },
]
