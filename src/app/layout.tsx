import { Metadata } from 'next'
import { ReactNode } from 'react'
import '../styles/global.css'

export const metadata: Metadata = {
  title: 'Pollen',
  description: 'Pollen',
  manifest: '/manifest.json',
  robots: { index: true, follow: true },
  openGraph: {
    siteName: 'Pollen',
    url: 'https://pollen.dhedegaard.dk/',
    title: 'Pollen',
    type: 'website',
    images: [{ url: '/favicon-256.png' }],
  },
}

interface Props {
  children: ReactNode
}
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#fff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon-256.png" />
      </head>
      <body className="tracking-wide">{children}</body>
    </html>
  )
}
