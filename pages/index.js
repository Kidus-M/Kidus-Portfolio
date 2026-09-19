import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import Proof from "@/components/Proof";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <Layout>
      <Seo />

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
