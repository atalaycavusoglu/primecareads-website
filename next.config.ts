import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // The site has two root layouts (TR and EN), so the 404 page brings its own <html>.
  experimental: { globalNotFound: true },
};

export default nextConfig;
