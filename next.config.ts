import type { NextConfig } from "next";

// GitHub Pages serves the repo under /Any1, so we static-export with a basePath.
const isProd = process.env.NODE_ENV === "production";
const repo = "/Any1";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? repo : "",
  assetPrefix: isProd ? repo : "",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
