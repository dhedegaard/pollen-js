importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
)

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
workbox.routing.registerRoute(
  ({ url }) =>
    url.pathname.startsWith('/fonts') ||
    url.pathname.startsWith('/favicon') ||
    url.pathname === '/manifest.json',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
)

// Use network first for the rest.
workbox.routing.registerRoute(
  ({ url }) => url.pathname === '/' || url.pathname === '/index.html',
  new workbox.strategies.NetworkFirst()
)
