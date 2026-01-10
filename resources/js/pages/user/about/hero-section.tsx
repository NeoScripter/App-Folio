import AvatarTiny from '@/assets/images/about/avatar-tiny.webp';
import DesktopBgDarkTiny from '@/assets/images/about/hero-bg-dark-desktop-tiny.webp';
import DesktopBgDark from '@/assets/images/about/hero-bg-dark-desktop.webp';
import MobileBgDarkTiny from '@/assets/images/about/hero-bg-dark-mb-tiny.webp';
import MobileBgDark from '@/assets/images/about/hero-bg-dark-mb.webp';
import DesktopBgLightTiny from '@/assets/images/about/hero-bg-light-desktop-tiny.webp';
import DesktopBgLight from '@/assets/images/about/hero-bg-light-desktop.webp';
import MobileBgLightTiny from '@/assets/images/about/hero-bg-light-mb-tiny.webp';
import MobileBgLight from '@/assets/images/about/hero-bg-light-mb.webp';
import AvatarMbAvif from '@/assets/images/about/test/avatar-mb.avif';
import AvatarMbWebp from '@/assets/images/about/test/avatar-mb.webp';
import AvatarTbAvif from '@/assets/images/about/test/avatar-tb.avif';
import AvatarTbWebp from '@/assets/images/about/test/avatar-tb.webp';
import { Button } from '@/components/user/ui/button';
import FluidImage from '@/components/user/ui/fluid-image';
import HeroBackground from '@/components/user/ui/hero-background';
import HeroLayout from '@/layouts/user/hero-layout';
import { useModal } from '@/providers/modal-context';
import { effectiveTheme } from '@/signals/appearance';
import { locale } from '@/signals/locale';

const HeroSection = () => {
    const isLight = effectiveTheme() === 'light';

    return (
        <HeroLayout>
            <HeroBackground
                className="-inset-1 -z-5"
                desktopImg={isLight ? DesktopBgLight : DesktopBgDark}
                tinyDesktopImg={
                    isLight ? DesktopBgLightTiny : DesktopBgDarkTiny
                }
                tabletImg={isLight ? MobileBgLight : MobileBgDark}
                tinyTabletImg={isLight ? MobileBgLightTiny : MobileBgDarkTiny}
                mobileImg={isLight ? MobileBgLight : MobileBgDark}
                tinyMobileImg={isLight ? MobileBgLightTiny : MobileBgDarkTiny}
            />

            <div class="mt-4 lg:mt-0 lg:flex lg:items-start lg:justify-between 2xl:items-center">
                <HeroAvatar />
                <HeroDescription />
            </div>
        </HeroLayout>
    );
};

export default HeroSection;

const HeroAvatar = () => {
    const avatarAlt =
        locale.value === 'en'
            ? 'Мужчина в очках с короткими светлыми волосами смотрит в камеру и слегка улыбается.'
            : 'Man with short light hair and glasses looking at the camera with a slight smile.';

    return (
        <div class="relative isolate mx-auto mb-16 w-fit sm:mb-20 md:mb-24 lg:order-2 lg:mx-0 lg:mb-0 xl:mx-auto">
            <FluidImage
                parentClass="max-w-75 2xl:max-w-95 rounded-3xl w-[50vw]"
                dkWebp={AvatarTbWebp}
                dkAvif={AvatarTbAvif}
                tbWebp={AvatarTbWebp}
                tbAvif={AvatarTbAvif}
                mbWebp={AvatarMbWebp}
                mbAvif={AvatarMbAvif}
                tiny={AvatarTiny}
                alt={avatarAlt}
            />
            <div
                aria-hidden="true"
                class="bg-muted-foreground/20 absolute inset-0 top-[10%] -bottom-[10%] left-[12%] -z-5 rounded-3xl backdrop-blur-sm lg:top-[8%] lg:-right-[8%] lg:-bottom-[8%] lg:left-[8%]"
            />
        </div>
    );
};

const HeroDescription = () => {
    const { showModal } = useModal();

    return (
        <div class="md:mx-auto md:max-w-155 lg:mx-0">
            <h1 class="xs:text-4xl mb-5 text-3xl font-medium text-balance sm:mb-10 sm:text-6xl lg:text-5xl 2xl:text-6xl">
                Илья Андреев, веб-разработчик
            </h1>
            <p class="mb-8 text-balance sm:mb-10 sm:text-lg lg:mb-12 2xl:text-xl">
                с опытом создания full-stack приложений и глубокими знаниями
                паттернов проектирования, оптимизации и основных принципов
                программирования для написания чистого и надежного кода.
            </p>
            <Button
                class="text-foreground hover:ring-muted-foreground/40 focus-visible:ring-muted-foreground/40 border-muted-none hover:bg-zinc-700/20"
                onClick={() => (showModal.value = true)}
                variant="hero"
            >
                Нанять меня
            </Button>
        </div>
    );
};
