'use client'

import { Suspense, useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

function sendPageView(pathname, searchParams) {
  if (!GA_ID || typeof window.gtag !== 'function') return false

  const query = searchParams?.toString()
  const pagePath = query ? `${pathname}?${query}` : pathname

  window.gtag('config', GA_ID, {
    page_path: pagePath,
    page_location: `${window.location.origin}${pagePath}`,
  })

  return true
}

function PageViewTrackerInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isFirstView = useRef(true)

  useEffect(() => {
    if (!GA_ID) return undefined

    // Initial page_view is sent by the gtag snippet in layout <head>.
    if (isFirstView.current) {
      isFirstView.current = false
      return undefined
    }

    let cancelled = false
    let attempts = 0

    const track = () => {
      if (cancelled) return

      if (sendPageView(pathname, searchParams)) return

      attempts += 1
      if (attempts < 40) {
        window.setTimeout(track, 100)
      }
    }

    track()

    return () => {
      cancelled = true
    }
  }, [pathname, searchParams])

  return null
}

/** SPA route changes only — first hit comes from static gtag in layout head. */
export default function GoogleAnalyticsPageView() {
  if (!GA_ID) return null

  return (
    <Suspense fallback={null}>
      <PageViewTrackerInner />
    </Suspense>
  )
}
