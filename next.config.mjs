/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
