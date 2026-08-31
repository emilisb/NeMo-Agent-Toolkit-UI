const { configureRuntimeEnv } = require('next-runtime-env/build/configure');

const nextConfig = {
  allowedDevOrigins: process.env.BASE44_PUBLIC_HOST_SUFFIX
    ? ['3000-' + process.env.BASE44_PUBLIC_HOST_SUFFIX, '3099-' + process.env.BASE44_PUBLIC_HOST_SUFFIX]
    : [],
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
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
