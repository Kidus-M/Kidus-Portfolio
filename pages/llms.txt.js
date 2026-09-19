import { getSiteUrl, buildLlmsTxt } from "@/lib/seo";

/** https://llmstxt.org — a plain-text profile generated from the site data. */
export function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
  res.write(buildLlmsTxt(getSiteUrl()));
  res.end();
  return { props: {} };
}

export default function Llms() {
  return null;
}
