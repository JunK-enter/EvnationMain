'use client'

import { MotionConfig } from 'framer-motion'
import { AuthProvider } from '@/context/AuthContext'
import { QuoteProvider } from '@/context/QuoteContext'
import { LocaleProvider } from '@/i18n/LocaleProvider'
import SiteChrome from '@/components/SiteChrome'

export default function AppProviders({ children }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ type: 'tween', duration: 0.35 }}>
      <LocaleProvider>
        <AuthProvider>
          <QuoteProvider>
            <SiteChrome>{children}</SiteChrome>
          </QuoteProvider>
        </AuthProvider>
      </LocaleProvider>
    </MotionConfig>
  )
}
