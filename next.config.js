// next.config.js
const nextConfig = {
    compiler: {
        styledComponents: true, // Enables SSR & better debugging
    },
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
