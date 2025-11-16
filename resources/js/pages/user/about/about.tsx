import AppLayout from "@/layouts/user/app-layout";
import HeroSection from "./hero-section";
import IntroSection from "./intro-section";

export default function About() {
    return (
        <AppLayout variant="secondary">
            <HeroSection />
            <IntroSection />
        </AppLayout>
    );
}
