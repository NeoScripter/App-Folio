import NavDrawer, { Nav } from '@/components/user/nav/nav-drawer';
import BurgerMenu from '@/components/user/ui/burger-menu';
import LangToggle from '@/components/user/ui/lang-toggle';
import Logo from '@/components/user/ui/logo';
import ThemeToggle from '@/components/user/ui/theme-toggle';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useEscapeKey } from '@/hooks/use-escape-key';
import useScrollOffset from '@/hooks/use-scroll-offset';
import { LG } from '@/lib/constants/breakpoints';
import { useHeaderVariant } from '@/providers/app-header-context';
import { useModal } from '@/providers/modal-context';
import { cn } from '@/utils/cn';
import { createPortal, FC, useEffect, useRef, useState } from 'preact/compat';

const heroBaseOffsets = {
    mobile: 840,
    tablet: 1224 + 16,
    desktop: 648 + 16,
};

const AppHeader: FC<{ className?: string }> = ({ className }) => {
    const { variant } = useHeaderVariant();
    const { showModal } = useModal();

    const { show: showMenu, setShow: setShowMenu } = useClickOutside([
        '#nav-drawer',
        '#burger-menu',
    ]);
    const [hide, setHide] = useState(false);
    const lastScrollTopRef = useRef(0);

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

    const mq = window.matchMedia(`(max-width: ${LG / 16}rem)`);

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

    useEffect(() => {
        const handleScrollDown = () => {
            const currentScrollTop =
                window.scrollY || document.documentElement.scrollTop;

            if (currentScrollTop > lastScrollTopRef.current + 30) {
                // User is scrolling down
                setHide(true);
            } else if (currentScrollTop < lastScrollTopRef.current) {
                // User is scrolling up
                setHide(false);
            }

            lastScrollTopRef.current = currentScrollTop;
        };

        window.addEventListener('scroll', handleScrollDown);

        return () => window.removeEventListener('scroll', handleScrollDown);
    }, []);

    return (
        <header
            inert={showModal.value}
            class={cn(
                'fixed inset-x-0 top-0 isolate z-10',
                isBelowPadding ? 'md:top-0' : 'md:top-4',
                !isBelowHero && 'md:inset-x-4 xl:inset-x-24',
            )}
        >
            <div
                class={cn(
                    'mx-auto flex max-w-480 items-center justify-between overflow-x-clip px-7 py-8 backdrop-blur-sm transition-transform duration-300 ease-in sm:px-15 sm:pt-11 sm:pb-9 lg:px-24 xl:pb-12',
                    className,
                    {
                        'xl:max-w-432 md:rounded-t-xl 2xl:max-w-432': !isBelowHero,
                        '-translate-y-full': hide,
                        'bg-home-hero-bg/40 text-white': variant === 'primary',
                        'bg-muted': variant === 'secondary',
                        'text-foreground': variant === 'ghost',
                    },
                )}
            >
                <div class="w-40">
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

                {!isBelowHero &&
                    (variant === 'primary' || variant === 'ghost') && (
                        <Separator />
                    )}
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
