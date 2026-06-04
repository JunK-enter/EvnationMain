import { motion } from 'framer-motion'
import { Zap, Battery, Home, BatteryCharging, Gauge } from 'lucide-react'

const nodes = [
  { id: 'ev', x: 78, y: 18, icon: Zap, color: '#00ff88', label: 'Level 2', sub: '40 mi/hr', stat: '32A', delay: 0 },
  { id: 'battery', x: 14, y: 72, icon: Battery, color: '#34d399', label: 'Powerwall', sub: 'Backup ready', stat: '13.5 kWh', delay: 0.15 },
  { id: 'price', x: 72, y: 78, icon: null, color: '#00ff88', label: '$1,200', sub: 'avg. install', stat: null, delay: 0.3 },
  { id: 'panel', x: 12, y: 22, icon: BatteryCharging, color: '#60a5fa', label: '200A Panel', sub: 'Upgrade ready', stat: 'OK', delay: 0.45 },
]

function ConnectionLines({ nodeList = nodes }) {
  const cx = 50
  const cy = 50
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00ff88" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {nodeList.map((node) => (
        <g key={node.id}>
          <line x1={cx} y1={cy} x2={node.x} y2={node.y} stroke="url(#lineGrad)" strokeWidth="0.15" strokeOpacity="0.4" />
          <motion.line
            x1={cx} y1={cy} x2={node.x} y2={node.y}
            stroke={node.color} strokeWidth="0.2" strokeLinecap="round" strokeDasharray="1.5 3"
            animate={{ opacity: [0.3, 0.8, 0.3], strokeDashoffset: [0, -20] }}
            transition={{ opacity: { duration: 2, repeat: Infinity, delay: node.delay }, strokeDashoffset: { duration: 1.5, repeat: Infinity, ease: 'linear', delay: node.delay } }}
          />
          <motion.circle cx={node.x} cy={node.y} r="0.8" fill={node.color}
            animate={{ opacity: [0.4, 1, 0.4], r: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: node.delay }}
          />
        </g>
      ))}
    </svg>
  )
}

function OrbitRing({ size, duration, reverse, opacity = 0.2, dashed = false, className = '' }) {
  return (
    <motion.div
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      <div className={`absolute inset-0 rounded-full border ${dashed ? 'border-dashed' : ''}`} style={{ borderColor: `rgba(0,255,136,${opacity})` }} />
      {!dashed && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-neon shadow-[0_0_8px_#00ff88]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon/60" />
        </>
      )}
    </motion.div>
  )
}

function ChargeRing() {
  return (
    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="22" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
      <motion.circle cx="50" cy="50" r="22" fill="none" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="138"
        initial={{ strokeDashoffset: 138 }} animate={{ strokeDashoffset: [138, 30, 30] }}
        transition={{ duration: 2.5, delay: 0.5, ease: 'easeOut' }}
      />
    </svg>
  )
}

function HudBadge({ className, children }) {
  return (
    <div className={`absolute glass-light rounded-lg px-2.5 py-1.5 border border-white/5 text-[10px] font-mono tracking-wider ${className}`}>
      {children}
    </div>
  )
}

/** Mobile: compact hub + 2×2 stat grid (no overlapping cards) */
function HeroVisualMobile() {
  return (
    <div className="w-full">
      <div className="relative aspect-[2/1] rounded-2xl neon-border overflow-hidden bg-gradient-to-br from-navy-800/90 via-navy-900/95 to-navy-950">
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: `linear-gradient(rgba(0,255,136,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.05) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,136,0.1),transparent_60%)]" />

        <div className="absolute top-2.5 inset-x-3 flex items-center justify-between text-[9px] font-mono z-10">
          <span className="flex items-center gap-1 text-neon">
            <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
            SYSTEM ONLINE
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Gauge className="w-3 h-3 text-neon" /> 94% READY
          </span>
        </div>

        <OrbitRing size="55%" duration={20} opacity={0.2} dashed className="opacity-60" />

        <div className="absolute inset-0 flex items-center justify-center pt-2">
          <motion.div
            animate={{ boxShadow: ['0 0 24px rgba(0,255,136,0.12)', '0 0 40px rgba(0,255,136,0.25)', '0 0 24px rgba(0,255,136,0.12)'] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-[4.5rem] h-[4.5rem] rounded-full bg-gradient-to-br from-neon/15 to-neon/5 border border-neon/30 flex items-center justify-center"
          >
            <Home className="w-8 h-8 text-neon" />
          </motion.div>
        </div>

        {[
          { pos: 'top-8 left-8', color: '#60a5fa' },
          { pos: 'top-8 right-8', color: '#00ff88' },
          { pos: 'bottom-6 left-8', color: '#facc15' },
          { pos: 'bottom-6 right-8', color: '#00ff88' },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className={`absolute ${dot.pos} w-2 h-2 rounded-full`}
            style={{ backgroundColor: dot.color, boxShadow: `0 0 8px ${dot.color}` }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2.5 mt-3">
        {nodes.map((node) => {
          const Icon = node.icon
          return (
            <div
              key={node.id}
              className={`flex items-center gap-2.5 glass rounded-xl p-3 border border-white/8 active:scale-[0.98] transition-transform ${!Icon ? 'justify-center text-center' : ''}`}
            >
              {Icon ? (
                <>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${node.color}18` }}>
                    <Icon className="w-4 h-4" style={{ color: node.color }} />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-xs font-semibold text-white truncate">{node.label}</p>
                    <p className="text-[10px] text-slate-500 truncate">{node.sub}</p>
                  </div>
                </>
              ) : (
                <div>
                  <p className="font-display font-bold text-lg text-neon leading-none">{node.label}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{node.sub}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/** Desktop: full energy hub dashboard */
function HeroVisualDesktop() {
  return (
    <div className="relative aspect-square max-w-lg mx-auto w-full">
      <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-neon/10 via-transparent to-blue-500/5 blur-xl opacity-60" />

      <div className="relative h-full rounded-3xl neon-border overflow-hidden bg-gradient-to-br from-navy-800/90 via-navy-900/95 to-navy-950">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,136,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.06),transparent_40%)]" />

        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 400 400">
          <path d="M0 200 H120 M280 200 H400 M200 0 V120 M200 280 V400" stroke="#00ff88" strokeWidth="1" fill="none" />
          <circle cx="200" cy="200" r="80" stroke="#00ff88" strokeWidth="0.5" fill="none" />
          <circle cx="200" cy="200" r="140" stroke="#00ff88" strokeWidth="0.5" fill="none" strokeDasharray="4 8" />
        </svg>

        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        <ConnectionLines />

        <OrbitRing size="88%" duration={25} opacity={0.15} dashed />
        <OrbitRing size="68%" duration={18} reverse opacity={0.25} />
        <OrbitRing size="48%" duration={12} opacity={0.35} />

        <HudBadge className="top-4 left-4 flex items-center gap-1.5 text-neon">
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
          SYSTEM ONLINE
        </HudBadge>
        <HudBadge className="top-4 right-4 text-slate-400">
          <span className="flex items-center gap-1"><Gauge className="w-3 h-3 text-neon" /> LIVE</span>
        </HudBadge>
        <HudBadge className="bottom-4 left-4 text-slate-400">
          <span className="flex items-center gap-1"><Gauge className="w-3 h-3 text-neon" /> 94% READY</span>
        </HudBadge>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42%] aspect-square">
          <ChargeRing />
          <motion.div
            animate={{ boxShadow: ['0 0 30px rgba(0,255,136,0.15)', '0 0 50px rgba(0,255,136,0.3)', '0 0 30px rgba(0,255,136,0.15)'] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-[18%] rounded-full bg-gradient-to-br from-neon/15 to-neon/5 border border-neon/30 flex items-center justify-center backdrop-blur-sm"
          >
            <Home className="w-[38%] h-[38%] text-neon drop-shadow-[0_0_12px_rgba(0,255,136,0.5)]" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute inset-[10%] rounded-full border border-neon/20"
          />
        </div>

        {nodes.map((node, i) => {
          const Icon = node.icon
          return (
            <div key={node.id} className="absolute" style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                transition={{
                  opacity: { delay: 0.3 + node.delay, duration: 0.5 },
                  scale: { delay: 0.3 + node.delay, duration: 0.5 },
                  y: { duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: node.delay },
                }}
                className="relative glass rounded-2xl p-4 border border-white/10 backdrop-blur-md shadow-lg shadow-black/20 min-w-[100px]"
              >
                {node.stat && (
                  <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-md text-[9px] font-bold font-mono border"
                    style={{ color: node.color, borderColor: `${node.color}40`, background: `${node.color}15` }}>
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
              </motion.div>
            </div>
          )
        })}

        <div className="absolute bottom-4 right-4 left-[38%] overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="flex gap-6 whitespace-nowrap text-[9px] font-mono text-slate-600"
          >
            {[...Array(2)].map((_, i) => (
              <span key={i} className="flex gap-6">
                <span>GRID ◆ STABLE</span>
                <span>CHARGE ◆ 7.2 kW</span>
                <span>PANEL ◆ 200A</span>
                <span>PERMIT ◆ APPROVED</span>
              </span>
            ))}
          </motion.div>
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
