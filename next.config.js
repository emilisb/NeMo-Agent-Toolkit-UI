const { configureRuntimeEnv } = require('next-runtime-env/build/configure');

// Base44 sandbox only: the preview reaches the dev server through a public host
// that differs from the request Host header, so Next.js blocks dev assets/HMR as
// cross-origin unless that origin is allowlisted. No effect outside the sandbox.
const previewDevOrigins =
  process.env.BASE44_PREVIEW_MODE === '1' && process.env.BASE44_PUBLIC_HOST_SUFFIX
    ? [`3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX}`]
    : [];

const nextConfig = {
  ...(previewDevOrigins.length ? { allowedDevOrigins: previewDevOrigins } : {}),
  env: {
    ...configureRuntimeEnv(),
  },
  output: 'standalone',
  transpilePackages: ['react-syntax-highlighter'],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    // !! WARN !!
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: process.env.NAT_MAX_FILE_SIZE_STRING || '5mb',
    },
  },
  allowedDevOrigins: process.env.BASE44_PUBLIC_HOST_SUFFIX
    ? ['3000-' + process.env.BASE44_PUBLIC_HOST_SUFFIX]
    : [],
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
