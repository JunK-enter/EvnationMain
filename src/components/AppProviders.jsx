'use client'

import { MotionConfig } from 'framer-motion'
import { AuthProvider } from '@/context/AuthContext'
import { QuoteProvider } from '@/context/QuoteContext'
import SiteChrome from '@/components/SiteChrome'

export default function AppProviders({ children }) {
  return (
    <MotionConfig reducedMotion="user" initial={false} transition={{ type: 'tween' }}>
      <AuthProvider>
        <QuoteProvider>
          <SiteChrome>{children}</SiteChrome>
        </QuoteProvider>
      </AuthProvider>
    </MotionConfig>
  )
}
