'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'

export default function SiteChrome({ children }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  const chromeless = isAdmin

  return (
    <>
      {!chromeless && <Navbar />}
      {children}
      {!chromeless && <Footer />}
      {!chromeless && <AIAssistant />}
    </>
  )
}
