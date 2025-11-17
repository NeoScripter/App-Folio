import AppLayout from "@/layouts/user/app-layout";
import HeroSection from "./hero-section";
import IntroSection from "./intro-section";
import BackstorySection from "./backstory-section";
import StagesSection from "./stages-section";

export default function About() {
    return (
        <AppLayout variant="secondary">
            <HeroSection />
            <IntroSection />
            <BackstorySection />
            <StagesSection />
        </AppLayout>
    );
}
