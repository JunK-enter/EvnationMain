import { defaultMetadata } from '@/lib/site'
import AppProviders from '@/components/AppProviders'
import GoogleAnalyticsScripts from '@/components/GoogleAnalyticsScripts'
import GoogleAnalyticsPageView from '@/components/GoogleAnalyticsPageView'
import './globals.css'

export const metadata = defaultMetadata

export default function RootLayout({ children }) {
  // Cursor/접근성 확장이 dev에서 <html>에 붙이는 attrs — SSR과 맞춰 hydration 경고 방지
  const isDev = process.env.NODE_ENV === 'development'

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={isDev ? 'js-focus-visible' : undefined}
      data-js-focus-visible={isDev ? '' : undefined}
    >
      <body suppressHydrationWarning>
        <GoogleAnalyticsScripts />
        <GoogleAnalyticsPageView />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
