import AppLayout from '@/layouts/user/app-layout';
import HeroSection from './hero-section';
import IntroSection from './intro-section';
import ServicesSection from './services-section';
import VideosSection from './videos-section';

export default function Home() {
    return (
        <AppLayout>
            <HeroSection />
            <IntroSection />
            <ServicesSection />
            <VideosSection />
        </AppLayout>
    );
}
