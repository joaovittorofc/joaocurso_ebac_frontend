/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['placeholder.com'],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable server-side rendering for components that use browser APIs
  experimental: {
    // This is no longer needed in Next.js 14, but keeping for compatibility
    appDir: true,
  },
  // Add custom webpack config to handle window references
  webpack: (config, { isServer }) => {
    if (isServer) {
      // When on the server, don't bundle modules that use browser-specific globals
      config.externals = [...config.externals, 'canvas', 'jsdom']
    }
    
    return config
  },
}

export default nextConfig
