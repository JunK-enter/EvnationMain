import { SERVICE_ZONES } from '@/data/serviceZones'

export default function ZoneSelect({
  value,
  onChange,
  required = false,
  className = '',
  placeholder = 'Select service area',
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className={className}
    >
      <option value="">{placeholder}</option>
      {SERVICE_ZONES.map((z) => (
        <option key={z.id} value={z.id}>
          {z.label}
        </option>
      ))}
    </select>
  )
}
