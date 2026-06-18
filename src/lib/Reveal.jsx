'use client'

import { motion } from 'framer-motion'
import { useIsMobile } from '@/lib/useMediaQuery'

/** Scroll-reveal wrapper — static on mobile to avoid scroll jank. */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  x = 0,
  as = 'div',
  viewport = { once: true },
  duration = 0.35,
  ...rest
}) {
  const isMobile = useIsMobile()

  if (isMobile) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  const MotionTag = motion[as] || motion.div
  const initial = { opacity: 0 }
  if (y) initial.y = y
  if (x) initial.x = x

  return (
    <MotionTag
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={viewport}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
