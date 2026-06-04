import { INTAKE_STATUS_STYLES } from '../data/intakeOptions'

export default function IntakeStatusBadge({ status }) {
  const style = INTAKE_STATUS_STYLES[status] || INTAKE_STATUS_STYLES['New Intake']
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${style}`}>
      {status || 'New Intake'}
    </span>
  )
}
