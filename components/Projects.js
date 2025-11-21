// src/components/Projects.js
import { motion } from 'framer-motion';

const projects = [
    {
        id: '01',
        title: 'E-Commerce Engine',
        category: 'Full Stack Architecture',
        description: 'A headless Shopify storefront optimized for Core Web Vitals.',
        tech: ['Next.js', 'GraphQL', 'Redis'],
        stats: { name: 'Lighthouse Score', value: '98/100' },
        year: '2024'
    },
    {
        id: '02',
        title: 'Fintech Dashboard',
        category: 'Real-time Data',
        description: 'High-frequency data visualization platform with WebSockets.',
        tech: ['React', 'D3.js', 'Node.js'],
        stats: { name: 'Latency', value: '<50ms' },
        year: '2023'
    }
];

const ProjectItem = ({ project }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group border-t border-white/10 py-12 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 cursor-pointer"
        >
            {/* ID & Year - Meta Data */}
            <div className="md:col-span-2 font-mono text-xs text-secondary flex flex-col justify-between h-full">
                <span>/{project.id}</span>
                <span>{project.year}</span>
            </div>

            {/* Main Content */}
            <div className="md:col-span-6">
                <h3 className="font-heading text-3xl md:text-5xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                </h3>
                <p className="text-secondary text-lg mb-6 max-w-md">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                        <span key={t} className="px-3 py-1 border border-white/10 rounded-full text-xs font-mono text-gray-400">
              {t}
            </span>
                    ))}
                </div>
            </div>

            {/* Engineering Metric - The "Dev" Twist */}
            <div className="md:col-span-4 flex items-end justify-end">
                <div className="text-right">
            <span className="block font-mono text-xs text-accent mb-1">
               // {project.stats.name}
            </span>
                    <span className="font-heading text-4xl md:text-6xl">
               {project.stats.value}
            </span>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <section id="work" className="py-32 px-6 md:px-20 bg-background">
            <div className="flex items-end justify-between mb-20">
                <h2 className="font-heading text-4xl md:text-6xl">Selected<br/>Engineering</h2>
                <span className="font-mono text-xs text-secondary hidden md:block">SCROLL FOR CASE STUDIES ↓</span>
            </div>

            <div className="flex flex-col">
                {projects.map((p) => <ProjectItem key={p.id} project={p} />)}
            </div>
        </section>
    );
};

export default Projects;