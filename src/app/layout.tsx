import '../styles/global.css'

import { Metadata } from 'next'
import { ReactNode } from 'react'
import { Logo } from '../components/Logo'

export const metadata: Metadata = {
  title: 'Pollen',
  description: 'Pollen',
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
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Pollen RSS feed"
          href="/feed"
        />
      </head>
      <body className="tracking-wide">
        <header className="mb-4 bg-lime-500 py-3 shadow">
          <div className="mx-auto flex max-w-6xl items-center justify-center px-4">
            <h1 className="flex flex-auto items-center gap-1 text-xl tracking-wide">
              <Logo />
              <span>Pollen</span>
            </h1>
          </div>
        </header>

        <main className="mx-auto max-w-6xl">{children}</main>
      </body>
    </html>
  )
}
