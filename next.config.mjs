/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // /api/og reads these at runtime; make sure Vercel bundles them with the function.
  outputFileTracingIncludes: {
    "/api/og": [
      "./node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff",
      "./node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-400-normal.woff",
      "./node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-600-normal.woff",
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Keep tooling scratch output out of the dev watcher — files that are
      // written while the page is open otherwise trigger endless rebuilds.
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ["**/.git/**", "**/node_modules/**", "**/.next/**", "**/.playwright-mcp/**"],
      };
    }
    return config;
  },
};

export default nextConfig;
