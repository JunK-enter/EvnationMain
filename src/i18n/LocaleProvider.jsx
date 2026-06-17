'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_LOCALE,
  LOCALE_HTML_LANG,
  LOCALE_STORAGE_KEY,
  LOCALES,
} from './config'
import en from './messages/en.json'
import es from './messages/es.json'
import zh from './messages/zh.json'
import ko from './messages/ko.json'

const catalogs = { en, es, zh, ko }

const LocaleContext = createContext(null)

function getNested(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
}

function interpolate(str, vars = {}) {
  if (typeof str !== 'string') return str
  return str.replace(/\{(\w+)\}/g, (_, key) => (vars[key] !== undefined ? String(vars[key]) : `{${key}}`))
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCALE_STORAGE_KEY)
      if (saved && LOCALES.some((l) => l.code === saved)) {
        setLocaleState(saved)
      }
    } catch {
      /* ignore */
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = LOCALE_HTML_LANG[locale] || locale
  }, [locale, ready])

  const setLocale = useCallback((code) => {
    if (LOCALES.some((l) => l.code === code)) setLocaleState(code)
  }, [])

  const t = useCallback(
    (key, vars) => {
      const val =
        getNested(catalogs[locale], key) ??
        getNested(catalogs[DEFAULT_LOCALE], key) ??
        key
      return interpolate(val, vars)
    },
    [locale]
  )

  const value = useMemo(
    () => ({ locale, setLocale, t, locales: LOCALES, ready }),
    [locale, setLocale, t, ready]
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}

export function useTranslation() {
  const { t, locale, setLocale, locales } = useLocale()
  return { t, locale, setLocale, locales }
}
