import DkAvif from '@/assets/images/home/hero-dk.avif';
import TbAvif from '@/assets/images/home/hero-tb.avif';
import MbAvif from '@/assets/images/home/hero-mb.avif';
import DesktopBg from '@/assets/images/home/hero-desktop.webp';
import TinyMobileBg from '@/assets/images/home/hero-mb-tiny.webp';
import MobileBg from '@/assets/images/home/hero-mb.webp';
import TinyTabletBg from '@/assets/images/home/hero-tablet-tiny.webp';
import TabletBg from '@/assets/images/home/hero-tablet.webp';
import HeroBackground from '@/components/user/ui/hero-background';
import HeroLayout from '@/layouts/user/hero-layout';
import HeroActions from './hero-actions';

const HeroSection = () => {
    return (
        <HeroLayout className="min-h-210 text-white sm:min-h-291 md:min-h-212">
            <HeroBackground
                className="bg-home-hero-bg -z-5"
                dkAvif={DkAvif}
                tbAvif={TbAvif}
                mbAvif={MbAvif}
                desktopImg={DesktopBg}
                tinyDesktopImg={TinyTabletBg}
                tabletImg={TabletBg}
                tinyTabletImg={TinyTabletBg}
                mobileImg={MobileBg}
                tinyMobileImg={TinyMobileBg}
            />

            <span
                aria-hidden="true"
                class="absolute inset-0 -z-5 bg-black/40"
            ></span>

            <div class="lg:max-w-2/3 xl:max-w-1/2">
                <h1 class="xs:text-5xl mb-8 text-4xl font-medium text-balance sm:mb-10 sm:text-6xl">
                    Элегантные и быстрые сайты
                </h1>
                <p class="mb-8 sm:mb-10 lg:mb-12">
                    Здравствуйте! Меня зовут Илья и я - веб-разработчик,
                    создающий быстрые и производительные сайты и веб приложения
                    с красивыми и современными интерфейсами.
                </p>

                <HeroActions />
            </div>
        </HeroLayout>
    );
};

export default HeroSection;
