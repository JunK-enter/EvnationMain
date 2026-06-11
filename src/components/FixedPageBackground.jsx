'use client'

/** Fixed viewport backdrop — static on desktop for scroll performance */
export default function FixedPageBackground() {
  return (
    <div className="fixed-page-bg" aria-hidden="true">
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute inset-0 grid-bg opacity-[0.4] fixed-page-bg-grid" />
      <div className="absolute inset-0 hero-mesh opacity-80 fixed-page-bg-mesh" />

      <div className="glow-orb fixed-page-bg-orb w-[min(640px,80vw)] h-[min(640px,80vw)] bg-neon/6 -top-[20%] -right-[12%]" />
      <div className="glow-orb fixed-page-bg-orb w-[min(480px,60vw)] h-[min(480px,60vw)] bg-blue-500/5 bottom-[8%] -left-[14%]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_45%,transparent_0%,rgba(4,6,15,0.55)_100%)]" />
    </div>
  )
}
