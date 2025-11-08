import BgLight from '@/assets/images/shared/menu-bg.webp';
import BgDark from '@/assets/images/shared/menu-bg-dark.webp';
import { navLinks } from '@/lib/constants/nav-links';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';
import LogoRus from '../ui/logo-rus';
import NavLink from './nav-link';
import ThemeToggle from '../ui/theme-toggle';
import { appearance } from '@/signals/appearance';

type NavDrawerProps = { show: boolean };

export default function NavDrawer({ show }: NavDrawerProps) {
    return (
        <div
            id="nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Навигационное меню"
            class={cn(
                'bg-background fixed top-0 right-0 z-0 w-80 max-w-full overflow-y-auto rounded-bl-[2rem] bg-cover bg-top-left bg-no-repeat px-8 py-7 transition-transform duration-300 ease-in',
                !show && 'translate-x-full',
            )}
            style={{ backgroundImage: `url(${appearance.value === 'dark' ? BgDark : BgLight})` }}
        >
            <Header show={show} />
            <Nav />
            <Footer />
        </div>
    );
}

const Header: FC<{ show: boolean }> = ({ show }) => {
    return (
        <header>
            <div>
                <div
                    class={cn(
                        'text-foreground mt-3 mb-8 w-36 transition-opacity duration-300 ease-in-out',
                        !show && 'opacity-0',
                    )}
                >
                    <LogoRus className="w-32" />
                </div>
            </div>
            <span
                aria-hidden="true"
                class="bg-muted-foreground/40 -mx-3 block h-0.5"
            ></span>
        </header>
    );
};

export const Nav = () => {
    return (
        <nav class="text-foreground" aria-label="Основная навигация">
            <ul class="my-17 space-y-13 lg:my-0 lg:flex lg:items-center lg:space-y-0 lg:text-white lg:gap-11">
                {navLinks.map((navLink, idx) => (
                    <NavLink key={navLink.id} active={idx === 0} link={navLink} />
                ))}
            </ul>
        </nav>
    );
};

const Footer = () => {
    return (
        <footer>
            <div class="text-foreground flex items-center justify-between font-bold">
                <div class="divide-foreground flex items-center divide-x-2">
                    <button class="px-2">RU</button>
                    <button class="px-2">EN</button>
                </div>

                <div>
                    <ThemeToggle />
                </div>
            </div>
        </footer>
    );
};
