const statusConfig = {
  submitted: { label: 'Submitted', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  under_review: { label: 'Under Review', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  quote_ready: { label: 'Quote Ready', color: 'bg-neon/20 text-neon border-neon/30' },
  scheduled: { label: 'Scheduled', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  installed: { label: 'Installed', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
}

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.submitted
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
      {config.label}
    </span>
  )
}

export { statusConfig }
