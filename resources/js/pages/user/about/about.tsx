import ProjectsSection from '@/components/user/sections/projects-section';
import AppTitle from '@/components/user/ui/app-title';
import AppLayout from '@/layouts/user/app-layout';
import BackstorySection from './backstory-section';
import HeroSection from './hero-section';
import IntroSection from './intro-section';
import QuoteSection from './quote-section';
import ServicesSection from './services-section';
import StagesSection from './stages-section';

export default function About() {
    return (
        <AppLayout variant="secondary">
            <AppTitle titleEn="About" titleRu="Обо мне" />
            <HeroSection />
            <IntroSection />
            <BackstorySection />
            <StagesSection />
            <ServicesSection />
            <ProjectsSection title="Мои проекты" />
            <QuoteSection />
        </AppLayout>
    );
}
