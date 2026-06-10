import { getCaliforniaZones, getStateZones } from '@/data/serviceZones'

export default function ZoneSelect({
  value,
  onChange,
  required = false,
  className = '',
  placeholder = 'Select service area',
}) {
  const california = getCaliforniaZones()
  const states = getStateZones()

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className={className}
    >
      <option value="">{placeholder}</option>
      <optgroup label="California">
        {california.map((z) => (
          <option key={z.id} value={z.id}>{z.label}</option>
        ))}
      </optgroup>
      <optgroup label="States">
        {states.map((z) => (
          <option key={z.id} value={z.id}>{z.label}</option>
        ))}
      </optgroup>
    </select>
  )
}
