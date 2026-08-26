import Head from "next/head";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import Proof from "@/components/Proof";
import Contact from "@/components/Contact";

const DESCRIPTION =
  "Kidus Mesfin is a systems-minded software engineer in Addis Ababa building end-to-end web, mobile, backend, and applied AI products.";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Kidus Mesfin | Software Engineer</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#08080a" />
        <meta property="og:title" content="Kidus Mesfin | Software Engineer" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

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
