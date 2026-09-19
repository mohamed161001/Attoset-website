import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js dev tools indicator (the floating button in the corner).
  devIndicators: false,
  images: {
    // 90 = the hero product screenshot, which needs to stay crisp at retina sizes.
    qualities: [75, 90],
  },
};

export default nextConfig;
