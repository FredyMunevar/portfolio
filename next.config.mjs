import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Allow images from Cloudinary
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignores all ESLint errors during the build
  },
};

export default withNextIntl(nextConfig);
