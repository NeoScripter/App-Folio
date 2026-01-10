import AppTitle from '@/components/user/ui/app-title';
import AppLayout from '@/layouts/user/app-layout';
import FaqsSection from './faqs-section';
import FeaturedSection from './featured-section';
import HeroSection from './hero-section';
import IntroSection from './intro-section';
import PerksSection from './perks-section';
import ServicesSection from './services-section';
import VideosSection from './videos-section';

export default function Home() {
    return (
        <AppLayout>
            <AppTitle titleEn="Home" titleRu="Главная" />
            <HeroSection />
            <IntroSection />
            <FeaturedSection />
            <ServicesSection />
            <VideosSection />
            <PerksSection />
            <FaqsSection />
        </AppLayout>
    );
}
