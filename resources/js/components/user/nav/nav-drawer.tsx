import BgDark from '@/assets/images/shared/menu-bg-dark.webp';
import BgLight from '@/assets/images/shared/menu-bg.webp';
import { navLinks } from '@/lib/constants/nav-links';
import { useHeaderVariant } from '@/providers/app-header-context';
import { appearance } from '@/signals/appearance';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';
import LangToggle from '../ui/lang-toggle';
import Logo from '../ui/logo';
import ThemeToggle from '../ui/theme-toggle';
import NavLink from './nav-link';

type NavDrawerProps = { show: boolean };

export default function NavDrawer({ show }: NavDrawerProps) {
    return (
        <div
            id="nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Навигационное меню"
            class={cn(
                'bg-background ease-nav-drawer fixed top-0 right-0 z-0 w-80 max-w-full overflow-y-auto rounded-bl-[2rem] bg-cover bg-top-left bg-no-repeat px-8 py-7 transition-transform duration-1000',
                !show && 'translate-x-full',
            )}
            style={{
                backgroundImage: `url(${appearance.value === 'dark' ? BgDark : BgLight})`,
            }}
        >
            <Header show={show} />
            <Nav show={show} />
            <Footer />
        </div>
    );
}

const Header: FC<{ show: boolean }> = ({ show }) => {
    const { variant } = useHeaderVariant();

    return (
        <header>
            <div>
                <div
                    class={cn('mt-3 mb-8 w-36', show && 'slide-in', {
                        'text-foreground': variant === 'primary',
                    })}
                >
                    <Logo className="w-32" />
                </div>
            </div>
            <span
                aria-hidden="true"
                class="bg-muted-foreground/40 -mx-3 block h-0.5"
            ></span>
        </header>
    );
};

export const Nav: FC<{ show?: boolean; className?: string }> = ({
    show = false,
    className,
}) => {
    const { variant } = useHeaderVariant();

    return (
        <nav
            class={cn('text-foreground', className)}
            aria-label="Основная навигация"
        >
            <ul
                class={cn(
                    'my-17 space-y-13 lg:my-0 lg:flex lg:items-center lg:gap-12 lg:space-y-0 xl:gap-14',
                    {
                        'lg:text-white':
                            variant === 'primary'
                    },
                )}
            >
                {navLinks.map((navLink, idx) => (
                    <NavLink
                        show={show}
                        key={navLink.id}
                        active={idx === 1}
                        idx={idx}
                        link={navLink}
                    />
                ))}
            </ul>
        </nav>
    );
};

const Footer = () => {
    return (
        <footer>
            <div class="text-foreground flex items-center justify-between font-bold">
                <LangToggle />
                <ThemeToggle />
            </div>
        </footer>
    );
};
