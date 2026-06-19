/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // Important for static export on Cloudflare
  trailingSlash: true,
  images: {
    unoptimized: true,        // Required for static export
  },
};

export default nextConfig;
