// const withImages = require('next-images');
// const optimizedImages = require('next-optimized-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
/**
 * @type {import('next').NextConfig}
 */
const nextConfig =
  // optimizedImages(
  // withImages(
  {
    // use this if you want to use preact to just for prod buidls
    // webpack(config, { dev, isServer }) {
    //   // ${previousConfig...}

    //   // Replace React with Preact only in client production build
    //   if (!dev && !isServer) {
    //     Object.assign(config.resolve.alias, {
    //       react: 'preact/compat',
    //       'react-dom/test-utils': 'preact/test-utils',
    //       'react-dom': 'preact/compat',
    //     });
    //   }

    //   return config;
    // },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    images: {
      domains: [
        'firebasestorage.googleapis.com',
        'https://stg-ndfstarter-v2-nextjs-kfd4sqjjeq-uk.a.run.app/',
      ],
    },
    experimental: {
      styledComponents: true,
      scrollRestoration: true,
    },
    // swcMinify: true,
    swcMinify: false,
    // handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
  };
// ),

module.exports = nextConfig;
