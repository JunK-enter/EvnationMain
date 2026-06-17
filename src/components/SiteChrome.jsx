'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import MobileStickyCTA from '@/components/MobileStickyCTA'
import FixedPageBackground from '@/components/FixedPageBackground'

export default function SiteChrome({ children }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  const chromeless = isAdmin
  const mobileBottomPad = !chromeless && pathname !== '/quote'
  const stickyCtaPad = mobileBottomPad

  return (
    <>
      {!chromeless && <FixedPageBackground />}
      <div className={`relative z-[1] min-h-screen${mobileBottomPad ? ' site-mobile-pad' : ''}${stickyCtaPad ? ' site-sticky-cta-pad' : ''}`}>
        {!chromeless && <Navbar />}
        {children}
        {!chromeless && <Footer />}
        {!chromeless && <AIAssistant />}
        {!chromeless && <MobileStickyCTA />}
      </div>
    </>
  )
}
