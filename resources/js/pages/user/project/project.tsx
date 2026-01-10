import AppLayout from '@/layouts/user/app-layout';
import { FunctionalComponent } from 'preact';
import HeroSection from './partials/hero-section';
import ProjectsSection from '@/components/user/sections/projects-section';

interface ProjectProps {
    slug: string;
}
const Project: FunctionalComponent<ProjectProps> = ({ slug }) => {
    console.log(slug);

    return (
        <AppLayout variant="ghost">
            <HeroSection />
            <ProjectsSection title="Другие проекты" />
        </AppLayout>
    );
};

export default Project;
