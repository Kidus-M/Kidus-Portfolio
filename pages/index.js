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
                <meta name="description" content="Portfolio of Kidus Mesfin - Full Stack Engineer" />
            </Head>

            <Hero />
            <TechStack />
            <Projects />
            <Contact />

        </Layout>
    );
}