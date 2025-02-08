/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com', 'localhost', 'temp-event-sport.tibomedia.my.id'], // Domain gambar yang diizinkan
  },
  async headers() {
    if (process.env.NODE_ENV === 'production') {
      return [
        {
          source: '/:path*', // Berlaku untuk semua rute
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=3600, immutable', // Cache selama 1 tahun
            },
          ],
        },
      ];
    }
    return [];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Semua request ke /api di frontend
        destination: 'https://temp-event-sport.tibomedia.my.id/api/:path*', // Diarahkan ke backend Laravel
      },
    ];
  },
};

export default nextConfig;