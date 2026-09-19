import { getSiteUrl } from "@/lib/seo";

/**
 * Explicitly welcomes the AI search crawlers so ChatGPT, Perplexity, Claude,
 * and Gemini can cite the site. CCBot (Common Crawl, training-only) is the
 * one crawler kept out.
 */
export function getServerSideProps({ res }) {
  const siteUrl = getSiteUrl();
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Allow: /api/og",
    "",
    "User-agent: GPTBot",
    "User-agent: ChatGPT-User",
    "User-agent: OAI-SearchBot",
    "User-agent: PerplexityBot",
    "User-agent: ClaudeBot",
    "User-agent: Claude-SearchBot",
    "User-agent: anthropic-ai",
    "User-agent: Google-Extended",
    "User-agent: Bingbot",
    "Allow: /",
    "",
    "User-agent: CCBot",
    "Disallow: /",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    "",
  ].join("\n");

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
  res.write(body);
  res.end();
  return { props: {} };
}

export default function Robots() {
  return null;
}
