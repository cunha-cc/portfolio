import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pede aos motores de busca que não indexem nenhuma resposta do site.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
