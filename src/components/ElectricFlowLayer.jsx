'use client'

/** SVG circuit paths with CSS pulse — lightweight electricity flow backdrop */
export default function ElectricFlowLayer() {
  return (
    <div className="electric-flow-layer" aria-hidden="true">
      <svg
        className="electric-flow-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ef-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,255,136,0)" />
            <stop offset="45%" stopColor="rgba(0,255,136,0.95)" />
            <stop offset="55%" stopColor="rgba(96,165,250,0.85)" />
            <stop offset="100%" stopColor="rgba(96,165,250,0)" />
          </linearGradient>
          <filter id="ef-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="electric-circuits">
          <path d="M-60 220 H360 V480 H720 V300 H1080 V560 H1500" />
          <path d="M-60 640 H300 V360 H620 V780 H960 V500 H1500" />
          <path d="M-60 420 H520 V160 H980 V680 H1500" />
          <path d="M720 -60 V960" />
          <path d="M180 -60 V520 H1260" />
        </g>

        <g className="electric-pulses" filter="url(#ef-glow)">
          <path className="electric-pulse electric-pulse-1" d="M-60 220 H360 V480 H720 V300 H1080 V560 H1500" />
          <path className="electric-pulse electric-pulse-2" d="M-60 640 H300 V360 H620 V780 H960 V500 H1500" />
          <path className="electric-pulse electric-pulse-3" d="M-60 420 H520 V160 H980 V680 H1500" />
          <path className="electric-pulse electric-pulse-4" d="M720 -60 V960" />
          <path className="electric-pulse electric-pulse-5" d="M180 -60 V520 H1260" />
        </g>

        <g className="electric-nodes">
          <circle className="electric-node electric-node-1" cx="360" cy="480" r="3.5" />
          <circle className="electric-node electric-node-2" cx="720" cy="300" r="3" />
          <circle className="electric-node electric-node-3" cx="620" cy="780" r="3" />
          <circle className="electric-node electric-node-4" cx="520" cy="160" r="2.5" />
          <circle className="electric-node electric-node-5" cx="720" cy="520" r="2.5" />
        </g>
      </svg>
    </div>
  )
}
