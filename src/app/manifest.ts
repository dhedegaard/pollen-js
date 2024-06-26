import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pollen',
    short_name: 'Pollen',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#8bc34a',
    start_url: '/',
    icons: [
      {
        src: '/favicon-256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/favicon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
