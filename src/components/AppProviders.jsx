'use client'

import { MotionConfig } from 'framer-motion'
import { AuthProvider } from '@/context/AuthContext'
import { QuoteProvider } from '@/context/QuoteContext'
import { LocaleProvider } from '@/i18n/LocaleProvider'
import SiteChrome from '@/components/SiteChrome'
import { useIsMobile } from '@/lib/useMediaQuery'

function MotionShell({ children }) {
  const isMobile = useIsMobile()

  return (
    <MotionConfig
      reducedMotion={isMobile ? 'always' : 'user'}
      transition={isMobile ? { duration: 0 } : { type: 'tween', duration: 0.35 }}
    >
      {children}
    </MotionConfig>
  )
}

export default function AppProviders({ children }) {
  return (
    <MotionShell>
      <LocaleProvider>
        <AuthProvider>
          <QuoteProvider>
            <SiteChrome>{children}</SiteChrome>
          </QuoteProvider>
        </AuthProvider>
      </LocaleProvider>
    </MotionShell>
  )
}
