module.exports = {
  globDirectory: 'static/',
  globPatterns: ['**/*.{png,ico,json,js,woff2}'],
  swDest: 'static/sw.js',
  clientsClaim: true,
  skipWaiting: true,
  mode: 'development',
  runtimeCaching: [
    {
      urlPattern: /\/$/,
      handler: 'NetworkFirst',
    },
    {
      urlPattern: /.woff2$/,
      handler: 'CacheFirst',
    },
  ],
}
