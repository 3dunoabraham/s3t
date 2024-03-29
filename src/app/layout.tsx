import '@/../style/duno-theme.css'
import '@/../style/reset.css'
import '@/../style/css.css'
import AppClientProvider from "@/dom/organ/layout/AppClientProvider"
import { Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Abraham Duno',
  description: 'Abraham Duno Portfolio',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect"href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link rel="stylesheet" href={`
          https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap
        `}/>
      </head>
      <body className="ma-0 h-min-100vh" > 
        <AppClientProvider>
          <> {children}  </>
        </AppClientProvider>
        <Suspense>
          {process.env.NODE_ENV === 'production' && <Analytics />}
      </Suspense>
      </body>
    </html>
  )
}