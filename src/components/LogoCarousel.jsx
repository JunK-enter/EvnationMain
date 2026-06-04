import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Shows logos `perView` at a time (5 on desktop) with prev/next arrows and
// page dots, matching the EVnation partner-carousel style.
function usePerView() {
  const [perView, setPerView] = useState(5)
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      setPerView(w >= 1024 ? 5 : w >= 640 ? 3 : 2)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])
  return perView
}

export default function LogoCarousel({ eyebrow, title, subtitle, logos = [] }) {
  const perView = usePerView()
  const pages = Math.max(1, Math.ceil(logos.length / perView))
  const [page, setPage] = useState(0)

  // Keep the active page valid when perView (breakpoint) changes.
  useEffect(() => {
    if (page > pages - 1) setPage(0)
  }, [pages, page])

  const go = (dir) => setPage((p) => (p + dir + pages) % pages)

  return (
    <section className="section-padding bg-navy-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {eyebrow && (
            <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">{eyebrow}</p>
          )}
          {title && <h2 className="font-display text-3xl sm:text-4xl font-bold">{title}</h2>}
          {subtitle && <p className="text-slate-400 mt-4 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="relative">
          {pages > 1 && (
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-white/10 bg-navy-900/80 flex items-center justify-center text-slate-300 hover:text-neon hover:border-neon/40 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div className="overflow-hidden mx-12">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {logos.map((logo, i) => (
                <div
                  key={i}
                  className="shrink-0 px-4 sm:px-6 flex items-center justify-center"
                  style={{ flex: `0 0 ${100 / perView}%` }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt || 'Brand logo'}
                    loading="lazy"
                    className="h-10 sm:h-12 w-auto max-w-[150px] object-contain opacity-75 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {pages > 1 && (
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-white/10 bg-navy-900/80 flex items-center justify-center text-slate-300 hover:text-neon hover:border-neon/40 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {pages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === page ? 'w-6 bg-neon' : 'w-2 bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
