// app/page.tsx
'use client';

import HeroPortal from '@/components/HeroPortal';
import AboutSection from '@/components/AboutSection';
import ProjectsGallery from '@/components/ProjectsGallery';

export default function Home() {
    return (
        <main className="relative">
            <HeroPortal />
            <AboutSection />
            <ProjectsGallery />
        </main>
    );
}