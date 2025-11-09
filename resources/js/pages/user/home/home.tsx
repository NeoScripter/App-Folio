import AppLayout from '@/layouts/user/app-layout';
import HeroSection from './hero-section';
import IntroSection from './intro-section';

export default function Home() {
    return (
        <AppLayout>
            <HeroSection />
            <IntroSection />
        </AppLayout>
    );
}
