import { cn } from '@/utils/cn';
import { createPortal, FC, useState } from 'preact/compat';
import NavDrawer from '../nav/nav-drawer';
import BurgerMenu from './burger-menu';
import LogoRus from './logo-rus';

const AppHeader: FC<{ className?: string }> = ({ className }) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu((p) => !p);
    };

    return (
        <header
            class={cn(
                'fixed inset-x-0 top-0 isolate z-10 flex items-center justify-between px-7 py-8 text-white backdrop-blur-md sm:px-15 sm:pt-11 sm:pb-9 lg:px-24 xl:pb-6',
                className,
            )}
        >
            <div class="w-36">
                <LogoRus />
            </div>

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
                'size-screen fixed inset-0 backdrop-blur-sm transition-opacity duration-300 ease-in-out',
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
