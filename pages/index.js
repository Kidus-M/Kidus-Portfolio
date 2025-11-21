// src/pages/index.js
"use client"
import Head from 'next/head';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import TechStack from '../components/TechStack';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

export default function Home() {
    return (
        <Layout>
            <Head>
                <title>Kidus Mesfin | Software Engineer</title>
                <meta name="description" content="Portfolio of Kidus Mesfin - Full Stack Engineer"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
            </Head>

            <Hero/>
            <TechStack/>
            <Projects/>
            <Contact/>

        </Layout>
    );
}