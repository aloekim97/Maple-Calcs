// next.config.js
module.exports = {
    images: {
      domains: ['5pd8q9yvpv.ufs.sh', 'cz2xuzbi4m.ufs.sh'], // Add your external domain
      formats: ['image/webp', 'image/avif'], // Prioritize modern formats
      minimumCacheTTL: 86400, // Cache optimized images for 1 day
      dangerouslyAllowSVG: true, // Required for SVG optimization
      contentDispositionType: 'inline', // Properly serve all image types
    },
  async headers() {
    return [
      {
        source: '/image/items/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};