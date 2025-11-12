import NavDrawer, { Nav } from '@/components/user/nav/nav-drawer';
import BurgerMenu from '@/components/user/ui/burger-menu';
import LangToggle from '@/components/user/ui/lang-toggle';
import Logo from '@/components/user/ui/logo';
import ThemeToggle from '@/components/user/ui/theme-toggle';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useEscapeKey } from '@/hooks/use-escape-key';
import useScrollOffset from '@/hooks/use-scroll-offset';
import { LG } from '@/lib/constants/breakpoints';
import { cn } from '@/utils/cn';
import { createPortal, FC, useEffect, useState } from 'preact/compat';

const heroBaseOffsets = {
    mobile: 840,
    tablet: 1224 + 16,
    desktop: 648 + 16,
};

const AppHeader: FC<{ className?: string }> = ({ className }) => {
    const { show: showMenu, setShow: setShowMenu } = useClickOutside([
        '#nav-drawer',
        '#burger-menu',
    ]);

    const { isBelow: isBelowPadding } = useScrollOffset(16);

    const screenWidth = window.innerWidth;

    const heroOffset =
        screenWidth < 768
            ? heroBaseOffsets.mobile
            : screenWidth < 1024
              ? heroBaseOffsets.tablet
              : heroBaseOffsets.desktop;
    const { isBelow: isBelowHero } = useScrollOffset(heroOffset);

    useEscapeKey(() => setShowMenu(false));

    const mq = window.matchMedia(`(max-width: ${LG}px)`);

    const [showDrawer, setShowDrawer] = useState(mq.matches);

    const toggleMenu = () => {
        setShowMenu((p) => !p);
    };

    useEffect(() => {
        const updateDrawerStatus = (e: MediaQueryListEvent) =>
            setShowDrawer(e.matches);

        mq.addEventListener('change', updateDrawerStatus);

        return () => mq.removeEventListener('change', updateDrawerStatus);
    }, [mq]);

    return (
        <header
            class={cn(
                'fixed inset-x-0 top-0 isolate z-10',
                isBelowPadding ? 'md:top-0' : 'md:top-4',
                !isBelowHero && 'md:inset-x-4 xl:inset-x-24',
            )}
        >
            <div
                class={cn(
                    'bg-home-hero-bg/40 mx-auto flex max-w-480 items-center justify-between overflow-x-clip px-7 py-8 text-white backdrop-blur-sm sm:px-15 sm:pt-11 sm:pb-9 lg:px-24 xl:pb-12',
                    className,
                    {
                        'max-w-394 md:rounded-t-xl 2xl:max-w-432': !isBelowHero,
                    },
                )}
            >
                <div class="w-36">
                    <Logo />
                </div>

                {showDrawer && (
                    <>
                        {' '}
                        <Overlay show={showMenu} />
                        <BurgerMenu
                            show={showMenu}
                            onClick={toggleMenu}
                            className="z-5"
                            aria-label={
                                showMenu ? 'Закрыть меню' : 'Открыть меню'
                            }
                            aria-expanded={showMenu}
                            aria-controls="nav-drawer"
                        />
                        <NavDrawer show={showMenu} />
                    </>
                )}

                {!showDrawer && (
                    <div class="flex items-center gap-11 xl:w-full xl:gap-14">
                        <LangToggle className="mr-2 xl:ml-auto" />
                        <Nav className="mr-10 xl:mr-auto" />
                        <ThemeToggle />
                    </div>
                )}

                {!isBelowHero && <Separator />}
            </div>
        </header>
    );
};

export default AppHeader;

const Overlay: FC<{ show: boolean }> = ({ show }) => {
    return createPortal(
        <div
            aria-hidden="true"
            class={cn(
                'size-screen fixed inset-0 backdrop-blur-sm transition-opacity duration-300 ease-in-out lg:hidden',
                {
                    'opacity-100': show,
                    'pointer-events-none opacity-0': !show,
                },
            )}
        />,
        document.getElementById('portals')!,
    );
};

const Separator = () => {
    return (
        <span
            aria-hidden="true"
            class="absolute inset-x-5 bottom-0 -z-5 h-0.5 bg-gray-300/50 lg:inset-x-0"
        ></span>
    );
};
