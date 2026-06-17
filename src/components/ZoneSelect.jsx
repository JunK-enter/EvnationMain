'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { getCaliforniaZones, getStateZones, getZoneLabel } from '@/data/serviceZones'

function ZoneSelectMenu({
  value,
  onChange,
  className = '',
  placeholder = 'Select service area',
  california,
  states,
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    if (!open) return
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  const selectedLabel = value ? getZoneLabel(value) : placeholder

  function pick(id) {
    onChange(id)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-2 text-left ${className}`}
      >
        <span className={`truncate ${value ? '' : 'text-slate-500'}`}>{selectedLabel}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute top-full left-0 right-0 z-[100] mt-1.5 max-h-64 overflow-y-auto rounded-xl border border-white/10 bg-navy-900 py-1 shadow-2xl shadow-black/50"
        >
          <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">California</p>
          {california.map((z) => (
            <button
              key={z.id}
              type="button"
              role="option"
              aria-selected={value === z.id}
              onClick={() => pick(z.id)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                value === z.id
                  ? 'bg-neon/10 text-neon'
                  : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              <span className="flex-1 truncate">{z.label}</span>
              {value === z.id && <Check className="h-3.5 w-3.5 shrink-0" />}
            </button>
          ))}

          <p className="mt-1 border-t border-white/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            States
          </p>
          {states.map((z) => (
            <button
              key={z.id}
              type="button"
              role="option"
              aria-selected={value === z.id}
              onClick={() => pick(z.id)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                value === z.id
                  ? 'bg-neon/10 text-neon'
                  : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              <span className="flex-1 truncate">{z.label}</span>
              {value === z.id && <Check className="h-3.5 w-3.5 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ZoneSelect({
  value,
  onChange,
  required = false,
  className = '',
  placeholder = 'Select service area',
  variant = 'native',
}) {
  const california = getCaliforniaZones()
  const states = getStateZones()

  if (variant === 'menu') {
    return (
      <ZoneSelectMenu
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        california={california}
        states={states}
      />
    )
  }

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
