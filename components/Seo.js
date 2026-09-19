import Head from "next/head";
import { seo, buildJsonLd } from "@/lib/seo";

/**
 * Homepage <head>: canonical, Open Graph, Twitter card, robots, and a
 * schema.org graph (Person / WebSite / ProfilePage / projects) so search and
 * AI engines can identify who this site is about without parsing the page.
 */
export default function Seo({ siteUrl }) {
  const ogImage = `${siteUrl}${seo.ogImagePath}`;
  const jsonLd = buildJsonLd(siteUrl);

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="author" content={seo.name} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#08080a" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <link rel="canonical" href={`${siteUrl}/`} />

      <meta property="og:type" content="profile" />
      <meta property="profile:first_name" content="Kidus" />
      <meta property="profile:last_name" content="Mesfin" />
      <meta property="og:site_name" content={seo.name} />
      <meta property="og:locale" content={seo.locale} />
      <meta property="og:url" content={`${siteUrl}/`} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${seo.name} — ${seo.title}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={ogImage} />
      {seo.twitter && <meta name="twitter:creator" content={seo.twitter} />}

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="alternate" type="text/plain" href={`${siteUrl}/llms.txt`} title="llms.txt" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
