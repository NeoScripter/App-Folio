import HeroBackground from '@/components/user/ui/hero-background';
import AppLayout from '@/layouts/user/app-layout';

import DesktopBg from '@/assets/images/home/hero-desktop.webp';
import TinyMobileBg from '@/assets/images/home/hero-mb-tiny.webp';
import MobileBg from '@/assets/images/home/hero-mb.webp';
import TinyTabletBg from '@/assets/images/home/hero-tablet-tiny.webp';
import TabletBg from '@/assets/images/home/hero-tablet.webp';

export default function Home() {
    return (
        <AppLayout>
            <section class="relative isolate min-h-210 sm:min-h-291 md:min-h-212">
                <HeroBackground
                    className='bg-home-hero-bg'
                    desktopImg={DesktopBg}
                    tinyDesktopImg={TinyTabletBg}
                    tabletImg={TabletBg}
                    tinyTabletImg={TinyTabletBg}
                    mobileImg={MobileBg}
                    tinyMobileImg={TinyMobileBg}
                />
            </section>
        </AppLayout>
    );
}
