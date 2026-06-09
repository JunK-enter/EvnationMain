'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'

export default function SiteChrome({ children }) {
  const pathname = usePathname()
  const isPortal = pathname.startsWith('/employee')
  const isAdmin = pathname.startsWith('/admin')
  const isLogin = pathname === '/login'
  const chromeless = isPortal || isAdmin || isLogin

  return (
    <>
      {!chromeless && <Navbar />}
      {children}
      {!chromeless && <Footer />}
      {!chromeless && <AIAssistant />}
    </>
  )
}
