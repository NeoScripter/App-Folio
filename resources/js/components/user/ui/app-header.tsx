import { useClickOutside } from '@/hooks/use-click-outside';
import { useEscapeKey } from '@/hooks/use-escape-key';
import { LG, MD } from '@/lib/constants/breakpoints';
import { cn } from '@/utils/cn';
import { createPortal, FC, useEffect, useState } from 'preact/compat';
import NavDrawer, { Nav } from '../nav/nav-drawer';
import BurgerMenu from './burger-menu';
import LogoRus from './logo-rus';
import ThemeToggle from './theme-toggle';

const AppHeader: FC<{ className?: string }> = ({ className }) => {
    const { show: showMenu, setShow: setShowMenu } = useClickOutside([
        '#nav-drawer',
        '#burger-menu',
    ]);

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
                'fixed inset-x-0 top-0 isolate z-10 flex items-center justify-between overflow-x-clip px-7 py-8 text-white backdrop-blur-sm sm:px-15 sm:pt-11 sm:pb-9 md:inset-x-4 md:top-4 md:rounded-xl lg:px-24 xl:inset-x-24 xl:pb-6',
                className,
            )}
        >
            <div class="w-36">
                <LogoRus />
            </div>

            {showDrawer && (
                <>
                    {' '}
                    <Overlay show={showMenu} />
                    <BurgerMenu
                        show={showMenu}
                        onClick={toggleMenu}
                        className="z-5"
                        aria-label={showMenu ? 'Закрыть меню' : 'Открыть меню'}
                        aria-expanded={showMenu}
                        aria-controls="nav-drawer"
                    />
                    <NavDrawer show={showMenu} />
                </>
            )}

            {!showDrawer && (
                <div class="flex gap-11 items-center">
                    <Nav />
                    <ThemeToggle />
                </div>
            )}

            <Separator />
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
            class="absolute inset-x-5 bottom-0 -z-5 h-0.5 bg-gray-300/50"
        ></span>
    );
};
