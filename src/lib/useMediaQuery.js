'use client'

import { useSyncExternalStore } from 'react'

/** Shared matchMedia subscriptions — one listener per query string. */
const queryCache = new Map()

function getQueryEntry(query) {
  let entry = queryCache.get(query)
  if (!entry) {
    const mq = window.matchMedia(query)
    entry = {
      mq,
      subs: new Set(),
      onChange: null,
    }
    entry.onChange = () => {
      for (const cb of entry.subs) cb()
    }
    mq.addEventListener('change', entry.onChange)
    queryCache.set(query, entry)
  }
  return entry
}

function subscribeQuery(query, callback) {
  const entry = getQueryEntry(query)
  entry.subs.add(callback)
  return () => {
    entry.subs.delete(callback)
    if (entry.subs.size === 0) {
      entry.mq.removeEventListener('change', entry.onChange)
      queryCache.delete(query)
    }
  }
}

function getSnapshot(query) {
  return window.matchMedia(query).matches
}

/** SSR-safe matchMedia hook — defaults to `defaultValue` until mounted. */
export function useMediaQuery(query, defaultValue = false) {
  return useSyncExternalStore(
    (callback) => subscribeQuery(query, callback),
    () => getSnapshot(query),
    () => defaultValue,
  )
}

export function useIsMobile() {
  return useMediaQuery('(max-width: 1023px)', true)
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)', false)
}
