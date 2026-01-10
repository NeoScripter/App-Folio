import AppTitle from '@/components/user/ui/app-title';
import AppLayout from '@/layouts/user/app-layout';
import HeroSection from './partials/hero-section';
import ProjectList from './partials/project-list';

export default function Portfolio() {
    return (
        <AppLayout variant="ghost">
            <AppTitle titleEn="Portfolio" titleRu="Порфолио" />
            <HeroSection />
            <ProjectList />
        </AppLayout>
    );
}
