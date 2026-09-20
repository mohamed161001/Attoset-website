import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js dev tools indicator (the floating button in the corner).
  devIndicators: false,
  images: {
    // 90 = the hero product screenshot, which needs to stay crisp at retina sizes.
    qualities: [75, 90],
  },
  // /features became /product when the nav was restructured.
  async redirects() {
    return [{ source: "/features", destination: "/product", permanent: true }];
  },
};

export default nextConfig;
