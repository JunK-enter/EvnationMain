// Auto-scrolling logo strip (no arrows). Loops seamlessly and pauses on hover.
// Pass `reverse` to scroll the opposite direction. `compact` trims the top
// padding so two marquees can sit directly back-to-back.

'use client'

import { useMemo } from 'react'
import { useIsMobile } from '@/lib/useMediaQuery'

function LogoGrid({ logos }) {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-10">
        {logos.map((logo) => (
          <div key={logo.src} className="flex items-center justify-center min-h-[2.25rem]">
            <img
              src={logo.src}
              alt={logo.alt || ''}
              loading="lazy"
              decoding="async"
              className="logo-blend h-8 sm:h-10 w-full max-w-[110px] object-contain opacity-80"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LogoMarquee({
  eyebrow,
  title,
  subtitle,
  logos = [],
  speed = 32,
  reverse = false,
  compact = false,
}) {
  const isMobile = useIsMobile()
  const loop = useMemo(() => [...logos, ...logos], [logos])

  return (
    <section
      className={`section-padding section-scrim overflow-hidden ${compact ? '!pt-0' : ''}`}
    >
      {(eyebrow || title || subtitle) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            {eyebrow && (
              <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">{eyebrow}</p>
            )}
            {title && <h2 className="font-display text-3xl sm:text-4xl font-bold">{title}</h2>}
            {subtitle && <p className="text-slate-400 mt-4 max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        </div>
      )}

      {isMobile ? (
        <LogoGrid logos={logos} />
      ) : (
        <div className="marquee-mask marquee-pause">
          <div
            className="marquee-track flex w-max items-center animate-marquee"
            style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
          >
            {loop.map((logo, i) => (
              <div
                key={`${logo.src}-${i}`}
                className="shrink-0 px-8 sm:px-12 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt || ''}
                  loading="lazy"
                  decoding="async"
                  className="logo-blend h-9 sm:h-11 w-auto max-w-[150px] object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
