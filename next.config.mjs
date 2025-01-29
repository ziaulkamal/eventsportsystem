/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com', 'localhost'], // Domain gambar yang diizinkan
  },
  async headers() {
    if (process.env.NODE_ENV === 'production') {
      return [
        {
          source: '/:path*', // Berlaku untuk semua rute
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable', // Cache selama 1 tahun
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
        destination: 'http://localhost:8000/api/:path*', // Diarahkan ke backend Laravel
      },
    ];
  },
};

export default nextConfig;