
import Head from "next/head";
import "@fontsource/plus-jakarta-sans/300.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {

  return <>
    <Head>
      <meta name="google-site-verification" content="LNwSQuzOjNMQo2bGOXwZXmYFtDpCtH6K29K9QzXlQ9k" />
    </Head>
    <Component {...pageProps} /></>;
}
