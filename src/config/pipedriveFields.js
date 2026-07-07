// Pipedrive custom field API keys (from evNation Facebook ad landing quiz).
// Settings -> Data fields -> Copy API key

export const PIPEDRIVE_FIELDS = {
  zone: '6ad6d551e65cb0c1808d8258074a40e97b14e365',
  installationType: 'dd8e5276df33d628b354d336fdc5b49b364fd92a',
  sourceChannel: 'channel',
  leadSource: '414ce1557a71add719000bc186fec50df6221872',
  projectAddress: '43395fd8ce646815937005f5ff19435be7f5cb6f',
  mainService: 'e08c9863c84567c4340d58721afe48aec18ca5f8',
  breakerSize: '40d9fa460c2f787597d89c2a7fb5ea3486f5ee55',
  panelLocation: '64afc3179dd8b6d273f63503f20353608d9aafda',
}

export const PIPEDRIVE_OPTION_IDS = {
  sourceChannel: {
    FaceBook: 490,
    'Web forms': 342,
    Dealer: 367,
  },
  installationType: {
    CHG: 461,
    NEMA: 475,
    MPU: 462,
    'CHG + MPU': 467,
    'NO PERMIT RQ': 470,
    SWAP: 479,
    'MPU + NEMA': 482,
    SOLAR: 483,
  },
  zone: {
    'Zone 1 Southern Cal': 385,
    'Zone 2 Central Cal': 386,
    'Zone 3 San Fran Bay': 387,
    'Zone 4 North San Fran Bay': 388,
    'Zone 5 Chicago 1': 389,
    'Zone 6 Las Vegas': 390,
    'Zone 7 San Antonio Tx': 391,
    'Zone 8 New Jersey': 392,
    'Zone 9 Arizona': 394,
    'Zone 10 Reno Nevada': 481,
  },
  breakerSize: {
    '30A': 463,
    '40A': 464,
    '50A': 465,
    '60A': 466,
    '70A': 468,
    '80A': 469,
  },
}

export function isFieldKeySet(key) {
  if (!key) return false
  const v = String(key).trim()
  if (!v) return false
  if (v.includes('field key')) return false
  if (v.includes('PASTE_')) return false
  return true
}
