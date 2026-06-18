'use client'

import { useIsMobile } from '@/lib/useMediaQuery'

/** Section accent only — global fixed backdrop lives in FixedPageBackground */
export default function SectionAmbient({ sweep = false }) {
  const isMobile = useIsMobile()
  if (!sweep || isMobile) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="ambient-sweep absolute inset-x-[10%] top-[35%] h-px bg-gradient-to-r from-transparent via-neon/15 to-transparent" />
    </div>
  )
}
