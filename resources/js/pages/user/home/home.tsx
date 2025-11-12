import AppLayout from '@/layouts/user/app-layout';
import HeroSection from './hero-section';
import IntroSection from './intro-section';
import ServicesSection from './services-section';
import VideosSection from './videos-section';
import PerksSection from './perks-section';
import FaqsSection from './faqs-section';

export default function Home() {
    return (
        <AppLayout>
            <HeroSection />
            <IntroSection />
            <ServicesSection />
            <VideosSection />
            <PerksSection />
            <FaqsSection />
        </AppLayout>
    );
}
