'use client'

import ElectricFlowLayer from './ElectricFlowLayer'

/** Fixed viewport backdrop — layered aurora gradients + electricity flow */
export default function FixedPageBackground() {
  return (
    <div className="fixed-page-bg" aria-hidden="true">
      <div className="absolute inset-0 page-bg-base" />
      <div className="absolute inset-0 page-bg-aurora" />
      <ElectricFlowLayer />
      <div className="absolute inset-0 grid-bg opacity-[0.26]" />
      <div className="absolute inset-0 hero-mesh opacity-[0.68]" />

      <div className="glow-orb fixed-page-bg-orb w-[min(720px,95vw)] h-[min(720px,95vw)] bg-neon/10 -top-[22%] -right-[18%]" />
      <div className="glow-orb fixed-page-bg-orb w-[min(520px,75vw)] h-[min(520px,75vw)] bg-sky-400/8 top-[38%] -left-[20%]" />
      <div className="glow-orb fixed-page-bg-orb w-[min(420px,60vw)] h-[min(420px,60vw)] bg-emerald-400/6 bottom-[-8%] right-[18%]" />

      <div className="absolute inset-0 page-bg-vignette" />
      <div className="absolute inset-0 page-bg-shine" />
    </div>
  )
}
