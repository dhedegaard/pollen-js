import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['zod'],
  },
}

export default nextConfig
