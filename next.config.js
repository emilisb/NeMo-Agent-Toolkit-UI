const { configureRuntimeEnv } = require('next-runtime-env/build/configure');

const nextConfig = {
  env: {
    ...configureRuntimeEnv(),
  },
  output: 'standalone',
  transpilePackages: ['react-syntax-highlighter'],
  // Sandbox preview only: accept the preview proxy origin in the dev server.
  ...(process.env.BASE44_PREVIEW_MODE === '1' &&
  process.env.BASE44_PUBLIC_HOST_SUFFIX
    ? {
        allowedDevOrigins: [
          '3000-' + process.env.BASE44_PUBLIC_HOST_SUFFIX,
          '*.' + (process.env.BASE44_SANDBOX_HOST_DOMAIN || 'localhost'),
        ],
      }
    : {}),
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
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
