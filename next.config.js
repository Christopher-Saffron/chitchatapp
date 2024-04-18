/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
    ],
  },
  experimental: {
    // swcPlugins: [["next-superjson-plugin", {}]],
  },
};

module.exports = nextConfig;
