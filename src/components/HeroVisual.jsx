'use client'

import { Zap, Battery, Home, BatteryCharging, Gauge } from 'lucide-react'

const nodes = [
  { id: 'ev', x: 78, y: 18, icon: Zap, color: '#00ff88', label: 'Level 2', sub: '40 mi/hr', stat: '32A' },
  { id: 'battery', x: 14, y: 72, icon: Battery, color: '#34d399', label: 'Powerwall', sub: 'Backup ready', stat: '13.5 kWh' },
  { id: 'price', x: 72, y: 78, icon: null, color: '#00ff88', label: '$575', sub: 'L2 from', stat: null },
  { id: 'panel', x: 12, y: 22, icon: BatteryCharging, color: '#60a5fa', label: '200A Panel', sub: 'Upgrade ready', stat: 'OK' },
]

function StaticConnectionLines() {
  const cx = 50
  const cy = 50
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="lineGradStatic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00ff88" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {nodes.map((node) => (
        <g key={node.id}>
          <line x1={cx} y1={cy} x2={node.x} y2={node.y} stroke="url(#lineGradStatic)" strokeWidth="0.15" strokeOpacity="0.45" />
          <circle cx={node.x} cy={node.y} r="0.75" fill={node.color} opacity="0.85" />
        </g>
      ))}
    </svg>
  )
}

function HudBadge({ className, children }) {
  return (
    <div className={`absolute rounded-lg px-2.5 py-1.5 border border-white/5 text-[10px] font-mono tracking-wider bg-navy-900/80 ${className}`}>
      {children}
    </div>
  )
}

/** Mobile: compact hub */
function HeroVisualMobile() {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="relative aspect-[2.4/1] max-h-[140px] rounded-2xl neon-border overflow-hidden bg-gradient-to-br from-navy-800/90 via-navy-900/95 to-navy-950">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,136,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.05) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,136,0.1),transparent_60%)]" />

        <div className="absolute top-2.5 inset-x-3 flex items-center justify-between text-[9px] font-mono z-10">
          <span className="flex items-center gap-1 text-neon">
            <span className="w-1.5 h-1.5 rounded-full bg-neon" />
            SYSTEM ONLINE
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Gauge className="w-3 h-3 text-neon" /> 94% READY
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pt-2">
          <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-gradient-to-br from-neon/15 to-neon/5 border border-neon/30 flex items-center justify-center shadow-[0_0_24px_rgba(0,255,136,0.15)]">
            <Home className="w-8 h-8 text-neon" />
          </div>
        </div>
      </div>
    </div>
  )
}

/** Desktop: static hub — no infinite JS animations (GPU-friendly) */
function HeroVisualDesktop() {
  return (
    <div className="relative aspect-square max-w-lg mx-auto w-full hero-visual-desktop">
      <div className="relative h-full rounded-3xl neon-border overflow-hidden bg-gradient-to-br from-navy-800/90 via-navy-900/95 to-navy-950">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,136,0.08),transparent_55%)]" />

        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 400 400" aria-hidden="true">
          <circle cx="200" cy="200" r="80" stroke="#00ff88" strokeWidth="0.5" fill="none" />
          <circle cx="200" cy="200" r="140" stroke="#00ff88" strokeWidth="0.5" fill="none" strokeDasharray="4 8" />
        </svg>

        <StaticConnectionLines />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] aspect-square rounded-full border border-dashed border-neon/15 orbit-ring-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[68%] aspect-square rounded-full border border-neon/20 orbit-ring-slow-reverse" />

        <HudBadge className="top-4 left-4 flex items-center gap-1.5 text-neon">
          <span className="w-1.5 h-1.5 rounded-full bg-neon" />
          SYSTEM ONLINE
        </HudBadge>
        <HudBadge className="top-4 right-4 text-slate-400">
          <span className="flex items-center gap-1"><Gauge className="w-3 h-3 text-neon" /> LIVE</span>
        </HudBadge>
        <HudBadge className="bottom-4 left-4 text-slate-400">
          <span className="flex items-center gap-1"><Gauge className="w-3 h-3 text-neon" /> 94% READY</span>
        </HudBadge>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42%] aspect-square">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="22" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="22" fill="none" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="138" strokeDashoffset="40" opacity="0.9" />
          </svg>
          <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-neon/15 to-neon/5 border border-neon/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,136,0.15)]">
            <Home className="w-[38%] h-[38%] text-neon" />
          </div>
        </div>

        {nodes.map((node) => {
          const Icon = node.icon
          return (
            <div
              key={node.id}
              className="absolute"
              style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className="relative rounded-2xl p-4 border border-white/10 bg-navy-900/90 shadow-lg shadow-black/20 min-w-[100px]">
                {node.stat && (
                  <span
                    className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-md text-[9px] font-bold font-mono border"
                    style={{ color: node.color, borderColor: `${node.color}40`, background: `${node.color}15` }}
                  >
                    {node.stat}
                  </span>
                )}
                {Icon ? (
                  <Icon className="w-7 h-7 mb-1.5" style={{ color: node.color }} />
                ) : (
                  <p className="font-display font-bold text-xl mb-0.5" style={{ color: node.color }}>{node.label}</p>
                )}
                {Icon && <p className="text-xs font-semibold text-white">{node.label}</p>}
                <p className="text-[10px] text-slate-500">{node.sub}</p>
              </div>
            </div>
          )
        })}

        <div className="absolute bottom-4 right-4 left-[38%] text-[9px] font-mono text-slate-600 truncate">
          GRID ◆ STABLE · CHARGE ◆ 7.2 kW · PANEL ◆ 200A
        </div>

        {['top-3 left-3 border-t border-l', 'top-3 right-3 border-t border-r', 'bottom-3 left-3 border-b border-l', 'bottom-3 right-3 border-b border-r'].map((cls) => (
          <div key={cls} className={`absolute w-5 h-5 border-neon/30 ${cls}`} />
        ))}
      </div>
    </div>
  )
}

export default function HeroVisual() {
  return (
    <>
      <div className="lg:hidden"><HeroVisualMobile /></div>
      <div className="hidden lg:block"><HeroVisualDesktop /></div>
    </>
  )
}
