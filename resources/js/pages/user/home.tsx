import HeroBackground from '@/components/user/ui/hero-background';
import AppLayout from '@/layouts/user/app-layout';

import DesktopBg from '@/assets/images/home/hero-desktop.webp';
import TinyMobileBg from '@/assets/images/home/hero-mb-tiny.webp';
import MobileBg from '@/assets/images/home/hero-mb.webp';
import TinyTabletBg from '@/assets/images/home/hero-tablet-tiny.webp';
import TabletBg from '@/assets/images/home/hero-tablet.webp';
import AnimatedUnderline from '@/components/user/ui/animated-underline';
import { Button } from '@/components/user/ui/button';
import AppSection from '@/layouts/user/app-section';
import { cn } from '@/utils/cn';

export default function Home() {
    return (
        <AppLayout>
            <AppSection className="relative isolate min-h-210 overflow-clip rounded-xl text-white sm:min-h-291 md:min-h-212">
                <HeroBackground
                    className="bg-home-hero-bg -z-5"
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

                <div class="pt-36 sm:pt-42 lg:max-w-1/2 lg:pt-50">
                    <h1 class="xs:text-5xl mb-8 text-4xl font-medium text-balance sm:mb-10 sm:text-6xl">
                        Элегантные и быстрые сайты
                    </h1>
                    <p class="mb-8 sm:mb-10 lg:mb-12">
                        Здравствуйте! Меня зовут Илья и я - веб-разработчик,
                        создающий быстрые и производительные сайты и веб
                        приложения с красивыми и современными интерфейсами.
                    </p>

                    <nav
                        class="xs:text-base flex flex-wrap items-center gap-x-3 gap-y-6 text-sm lg:gap-x-6 lg:text-lg xl:text-xl"
                        aria-label="Основные действия"
                    >
                        <Button variant="hero">Нанять меня</Button>

                        <a href="/" class="group relative ml-5">
                            Узнать больше

                            <AnimatedUnderline
                                className={cn('z-10 bg-white')}
                            />
                        </a>
                    </nav>
                </div>
            </AppSection>
        </AppLayout>
    );
}
