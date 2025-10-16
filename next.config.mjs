/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;

const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      { source: '/sitemap.xml', destination: '/api/sitemap.xml' },
    ];
  },
};

export default nextConfig;
