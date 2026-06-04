// Dropdown options + status configuration for the Customer Intake System.

export const CHARGER_BRANDS = [
  'Need Recommendation',
  'Tesla Wall Connector',
  'ChargePoint Home Flex',
  'Wallbox Pulsar Plus',
  'JuiceBox',
  'Emporia',
  'Grizzl-E',
  'Other',
]

export const PROPERTY_TYPES = [
  'Single Family',
  'Condo',
  'Townhome',
  'Apartment',
  'Commercial',
]

export const PANEL_SIZES = ['100A', '125A', '150A', '200A', 'Unknown']

export const INSTALL_LOCATIONS = ['Garage', 'Driveway', 'Outdoor Wall', 'Other']

export const YES_NO = ['Yes', 'No']

export const PERMIT_OPTIONS = ['Yes', 'No', 'Not Sure']

// Internal workflow statuses (in pipeline order).
export const INTAKE_STATUSES = [
  'New Intake',
  'Reviewing',
  'Quote Needed',
  'Sent to Pipedrive',
  'Scheduled',
  'Completed',
]

// Tailwind classes for each status badge, matching the EVnation neon/navy theme.
export const INTAKE_STATUS_STYLES = {
  'New Intake': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Reviewing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Quote Needed': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Sent to Pipedrive': 'bg-neon/20 text-neon border-neon/30',
  Scheduled: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
}

// Photo slots collected during intake. `key` is stored on the record.
export const PHOTO_SLOTS = [
  { key: 'mainPanel', label: 'Main Electrical Panel', description: 'Full view of the main electrical panel.' },
  { key: 'breakerCloseup', label: 'Breaker Panel Close-Up', description: 'Close-up of breakers and labels.' },
  { key: 'chargerLocation', label: 'Charger Installation Location', description: 'Where the charger will be mounted.' },
  { key: 'parkingArea', label: 'Parking Area', description: 'Where the vehicle will be parked.' },
]
