import AppLayout from '@/layouts/user/app-layout';
import { FunctionalComponent } from 'preact';
import HeroSection from './partials/hero-section';

interface ProjectProps {
    id: string;
}
const Project: FunctionalComponent<ProjectProps> = ({ id }) => {
    console.log(id);

    return (
        <AppLayout variant="ghost">
            <HeroSection />
        </AppLayout>
    );
};

export default Project;
