import { defaultMetadata } from '@/lib/site'
import AppProviders from '@/components/AppProviders'
import GoogleAnalyticsPageView from '@/components/GoogleAnalyticsPageView'
import './globals.css'

export const metadata = defaultMetadata

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function RootLayout({ children }) {
  const isDev = process.env.NODE_ENV === 'development'

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={isDev ? 'js-focus-visible' : undefined}
      data-js-focus-visible={isDev ? '' : undefined}
    >
      <head>
        {GA_ID ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', { send_page_view: true });
                `,
              }}
            />
          </>
        ) : null}
      </head>
      <body suppressHydrationWarning>
        <GoogleAnalyticsPageView />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
