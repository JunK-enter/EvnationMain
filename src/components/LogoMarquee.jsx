// Auto-scrolling logo strip (no arrows). Loops seamlessly and pauses on hover.
// Pass `reverse` to scroll the opposite direction. `compact` trims the top
// padding so two marquees can sit directly back-to-back.

export default function LogoMarquee({
  eyebrow,
  title,
  subtitle,
  logos = [],
  speed = 32,
  reverse = false,
  compact = false,
}) {
  // Duplicate the list so the -50% translate loops without a visible jump.
  const loop = [...logos, ...logos]

  return (
    <section
      className={`section-padding section-scrim overflow-hidden ${compact ? '!pt-0' : ''}`}
    >
      {(eyebrow || title || subtitle) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {eyebrow && (
              <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">{eyebrow}</p>
            )}
            {title && <h2 className="font-display text-3xl sm:text-4xl font-bold">{title}</h2>}
            {subtitle && <p className="text-slate-400 mt-4 max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        </div>
      )}

      <div className="marquee-mask marquee-pause">
        <div
          className="flex w-max items-center animate-marquee"
          style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
        >
          {loop.map((logo, i) => (
            <div
              key={`${logo.src}-${i}`}
              className="shrink-0 px-8 sm:px-12 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt || 'Brand logo'}
                loading="lazy"
                className="h-9 sm:h-11 w-auto max-w-[150px] object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
