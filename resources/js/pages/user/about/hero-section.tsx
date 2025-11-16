import DesktopBg from '@/assets/images/home/hero-desktop.webp';
import TinyMobileBg from '@/assets/images/home/hero-mb-tiny.webp';
import MobileBg from '@/assets/images/home/hero-mb.webp';
import TinyTabletBg from '@/assets/images/home/hero-tablet-tiny.webp';
import TabletBg from '@/assets/images/home/hero-tablet.webp';
import HeroBackground from '@/components/user/ui/hero-background';
import AppSection from '@/layouts/user/app-section';

const HeroSection = () => {
    return (
        <AppSection className="relative isolate overflow-clip rounded-xl">
            <HeroBackground
                className="bg-home-hero-bg -z-5"
                desktopImg={DesktopBg}
                tinyDesktopImg={TinyTabletBg}
                tabletImg={TabletBg}
                tinyTabletImg={TinyTabletBg}
                mobileImg={MobileBg}
                tinyMobileImg={TinyMobileBg}
            />

            <div class="lg:max-w-1/2">
                <h1 class="xs:text-5xl mb-8 text-4xl font-medium text-balance sm:mb-10 sm:text-6xl">
                    Элегантные и быстрые сайты
                </h1>
                <p class="mb-8 sm:mb-10 lg:mb-12">
                    Здравствуйте! Меня зовут Илья и я - веб-разработчик,
                    создающий быстрые и производительные сайты и веб приложения
                    с красивыми и современными интерфейсами.
                </p>

            </div>
        </AppSection>
    );
};

export default HeroSection;
