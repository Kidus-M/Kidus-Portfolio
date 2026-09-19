import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import Proof from "@/components/Proof";
import Contact from "@/components/Contact";
import { getSiteUrl } from "@/lib/seo";

export default function Home({ siteUrl }) {
  return (
    <Layout>
      <Seo siteUrl={siteUrl} />

      <Hero />
      <Manifesto />
      <Work />
      <Experience />
      <Stack />
      <Proof />
      <Contact />
    </Layout>
  );
}

export function getStaticProps() {
  return { props: { siteUrl: getSiteUrl() } };
}
