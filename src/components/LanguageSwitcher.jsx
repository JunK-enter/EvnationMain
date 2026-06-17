'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Globe } from 'lucide-react'
import { useTranslation } from '@/i18n/LocaleProvider'

export default function LanguageSwitcher({ compact = false }) {
  const { locale, setLocale, locales, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = locales.find((l) => l.code === locale) || locales[0]

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

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('language.choose')}
        className={`flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] text-slate-300 transition-colors hover:border-neon/30 hover:bg-neon/5 hover:text-white ${
          compact ? 'px-2.5 py-2 text-xs' : 'px-3 py-2 text-[13px]'
        }`}
      >
        <Globe className={`shrink-0 text-neon/80 ${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
        <span className="font-medium">{current.nativeLabel}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t('language.label')}
          className="absolute top-full right-0 z-[60] mt-2 min-w-[160px] overflow-hidden rounded-xl border border-white/10 bg-navy-900/98 py-1 shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
          {locales.map((item) => (
            <button
              key={item.code}
              type="button"
              role="option"
              aria-selected={locale === item.code}
              onClick={() => {
                setLocale(item.code)
                setOpen(false)
              }}
              className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors ${
                locale === item.code
                  ? 'bg-neon/10 text-neon'
                  : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              <span className="flex-1">{item.nativeLabel}</span>
              {locale === item.code && <Check className="h-3.5 w-3.5 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
