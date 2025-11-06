import Bg from '@/assets/images/shared/menu-bg.webp';
import { cn } from '@/utils/cn';
import { createPortal, FC, useState } from 'preact/compat';
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

            <BurgerMenu show={showMenu} onClick={toggleMenu} className="z-5" />

            {createPortal(
                <div
                    aria-hidden="true"
                    class={cn(
                        'size-screen fixed inset-0 backdrop-blur-sm transition-opacity duration-300 ease-in-out',
                        {
                            'opacity-100': showMenu,
                            'pointer-events-none opacity-0': !showMenu,
                        },
                    )}
                />,
                document.getElementById('portals')!,
            )}

            <div
                class={cn(
                    'bg-background rounded-bl-[2rem] fixed top-0 right-0 z-0 h-150 w-80 max-w-full overflow-y-auto bg-cover bg-top-left bg-no-repeat px-8 py-7 transition-transform duration-300 ease-in',
                    !showMenu && 'translate-x-full',
                )}
                style={{ backgroundImage: `url(${Bg})` }}
            >
                <header>
                    <div>
                        <div class="text-foreground mt-3 mb-8 w-36">
                            <LogoRus className="w-32" />
                        </div>
                    </div>
                    <span
                        aria-hidden="true"
                        class="bg-muted-foreground/40 -mx-3 block h-0.5"
                    ></span>
                </header>
            </div>

            <span
                aria-hidden="true"
                class="absolute inset-x-5 bottom-0 -z-5 h-0.5 bg-gray-300/50"
            ></span>
        </header>
    );
};

export default AppHeader;
