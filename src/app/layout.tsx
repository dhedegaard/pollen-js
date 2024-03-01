import { ReactNode } from 'react'
import '../styles/global.css'

export const metadata = {
  title: 'Pollen',
  description: 'Pollen',
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
        <meta property="og:site_name" content="Pollen" />
        <meta property="og:url" content="https://pollen.dhedegaard.dk/" />
        <meta property="og:title" content="Pollen" />
        <meta property="og:image" content="/favicon-256.png" />
        <title>Pollen</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon-256.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
