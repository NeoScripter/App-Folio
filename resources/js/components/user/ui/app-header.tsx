import { cn } from '@/utils/cn';
import { FC, useState } from 'preact/compat';
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

            <nav class={cn("fixed top-0 right-0 z-0 h-150 w-80 max-w-full bg-white transition-transform duration-300 ease-in", !showMenu && "translate-x-full")}>
                <header>
                    <div>
                        <div class="w-36 text-black">
                            <LogoRus />
                        </div>
                    </div>
                    <span
                        aria-hidden="true"
                        class="h-0.5 w-4/5 bg-gray-300/50"
                    ></span>
                </header>
            </nav>

            <span
                aria-hidden="true"
                class="absolute inset-x-5 bottom-0 -z-5 h-0.5 bg-gray-300/50"
            ></span>
        </header>
    );
};

export default AppHeader;
