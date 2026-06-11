/** Official rebate program links for evNation non-CA service areas */

export const STATE_REBATE_PROGRAMS = {
  NV: {
    title: 'Nevada Home Efficiency Rebates',
    source: 'Nevada Governor\'s Office of Energy',
    description:
      'State-funded home efficiency rebates for electrification upgrades — including heat pumps, panel upgrades, and wiring that support EV charging.',
    primaryUrl: 'https://www.energy.nv.gov/funding-opportunities/home-efficiency-rebates-program/',
    programs: [
      {
        name: 'Home Efficiency Rebates Program',
        note: 'Statewide — panel, wiring, and electrification upgrades',
        url: 'https://www.energy.nv.gov/funding-opportunities/home-efficiency-rebates-program/',
      },
      {
        name: 'NV Energy — Residential Managed Charging',
        note: 'Bill credits for smart off-peak EV charging (NV Energy customers)',
        url: 'https://www.nvenergy.com/cleanenergy/transportation-electrification-plan/residential-managed-charging',
      },
    ],
  },
  IL: {
    title: 'ComEd EV Charger Rebates',
    source: 'Commonwealth Edison',
    description:
      'Northern Illinois residential customers can receive up to $3,750 toward a smart Level 2 charger and installation through ComEd\'s Clean Energy program.',
    primaryUrl: 'https://www.comed.com/clean',
    programs: [
      {
        name: 'ComEd EV Charger & Installation Rebate',
        note: 'Up to $3,750 for eligible residential customers — apply via certified installer',
        url: 'https://www.comed.com/clean',
      },
      {
        name: 'ComEd EV Resources',
        note: 'Rates, planning tools, and charger guidance for Illinois drivers',
        url: 'https://www.comed.com/ev',
      },
    ],
  },
  NJ: {
    title: 'Charge Up New Jersey',
    source: 'NJ Clean Energy',
    description:
      'State rebate for eligible Level 2 home EV chargers — up to $1,500 depending on charger type and eligibility tier.',
    primaryUrl: 'https://chargeup.njcleanenergy.com/home-ev-charger-incentive',
    programs: [
      {
        name: 'Home EV Charger Incentive',
        note: 'Up to $1,500 rebate on qualifying Level 2 chargers',
        url: 'https://chargeup.njcleanenergy.com/home-ev-charger-incentive',
      },
      {
        name: 'Charge Up NJ — EV Purchase Rebate',
        note: 'State EV purchase incentives (separate from charger program)',
        url: 'https://chargeup.njcleanenergy.com/',
      },
    ],
  },
  AZ: {
    title: 'Arizona Utility EV Programs',
    source: 'APS & SRP',
    description:
      'Arizona has no statewide EV charger rebate — incentives come from your electric utility. Check both major providers if you\'re unsure which serves your address.',
    primaryUrl: 'https://www.srpnet.com/energy-savings-rebates/home/rebates/ev-charger',
    programs: [
      {
        name: 'SRP — EV Charger Rebate',
        note: 'Salt River Project customers — Level 2 home charger rebate',
        url: 'https://www.srpnet.com/energy-savings-rebates/home/rebates/ev-charger',
      },
      {
        name: 'APS — Electric Vehicles & Marketplace',
        note: '$250 instant rebate on qualifying Level 2 smart chargers via APS Marketplace',
        url: 'https://www.aps.com/en/About/Sustainability-and-Innovation/Technology-and-Innovation/Electric-vehicles',
      },
      {
        name: 'APS Marketplace — EV Chargers',
        note: 'Shop eligible chargers with instant APS rebate applied at checkout',
        url: 'https://marketplace.aps.com/ev-charging',
      },
    ],
  },
  TX: {
    title: 'Texas Utility EV Programs',
    source: 'Utility-specific (no statewide rebate)',
    description:
      'Texas has no state-level EV charger rebate. Programs vary by municipal utility and retail electric provider — check the utility that serves your home.',
    primaryUrl: 'https://austinenergy.com/green-power/plug-in-austin/home-charging',
    programs: [
      {
        name: 'Austin Energy — Plug-In Austin',
        note: 'Up to $1,200 rebate for Austin Energy residential customers (50% of charger + install)',
        url: 'https://austinenergy.com/green-power/plug-in-austin/home-charging',
      },
      {
        name: 'CPS Energy — FlexEV Off-Peak Rewards',
        note: 'San Antonio — bill credits for off-peak home EV charging',
        url: 'https://www.cpsenergy.com/en/about-us/programs-services/electric-vehicles/ev-charging-solutions.html',
      },
      {
        name: 'Oncor — Electric Vehicles',
        note: 'DFW & North/West Texas — EV readiness resources and grid connection guidance',
        url: 'https://www.oncor.com/content/oncorwww/wire/en/home/smart-energy/electric-vehicles.html',
      },
    ],
  },
}

export function getStateRebateProgram(stateCode) {
  return STATE_REBATE_PROGRAMS[stateCode] || null
}
