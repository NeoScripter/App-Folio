import SidebarLink from '@/components/admin/nav/sidebar-link';
import AppLogo from '@/components/admin/ui/app-logo';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useEscapeKey } from '@/hooks/use-escape-key';
import { hide, isHidden, isMini, isWide } from '@/signals/sidebar-state';
import { cn } from '@/utils/cn';
import { ChevronsUpDown, LayoutGrid } from 'lucide-preact';
import { ComponentChildren } from 'preact';
import { useId } from 'preact/hooks';
import AccountMenu from './account-menu';
import Monogram from './monogram';

function Sidebar({ children }: { children: ComponentChildren }) {
    const id = useId();

    const handleClick = (e: MouseEvent) => {
        const el = e.target as HTMLElement | null;
        if (!el || el.id !== id) return;

        hide();
    };

    return (
        <div
            id={id}
            onClick={handleClick}
            class={cn('md:bg-sidebar fixed inset-0 top-[56px] z-20 bg-black/75 transition-all md:static md:w-full md:shrink-0 md:self-stretch', {
                'pointer-events-none bg-transparent': isHidden.value,
                'transition-colors md:max-w-62': isWide.value,
                'md:max-w-16': isMini.value,
            })}
        >
            <aside
                class={cn(
                    'bg-sidebar inset-y-0 top-[56px] left-0 flex [min-height:calc(100svh-56px)] w-full max-w-72 flex-col px-3 py-2 transition-all md:fixed md:max-w-62',
                    {
                        '-translate-x-full': isHidden.value,
                        'translate-x-0 md:max-w-62': isWide.value,
                        'md:max-w-16': isMini.value,
                    },
                )}
            >
                {children}
            </aside>
        </div>
    );
}

export default Sidebar;

const SidebarHeader = () => {
    return (
        <header
            class={cn('flex items-center gap-4', {
                'm-2': !isMini.value,
                'mx-auto my-2': isMini.value,
            })}
        >
            <div class={cn('bg-sidebar-primary text-sidebar-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-sm')}>
                <AppLogo />
            </div>
            {!isMini.value && <div class="ease font-medium whitespace-nowrap transition-[max-width] duration-500">Laravel Starter Kit</div>}
        </header>
    );
};

const SidebarNav = () => {
    return (
        <div>
            {!isMini.value && <div class="text-sidebar-foreground/70 mx-2 pt-4 pb-1.5 text-xs">Platform</div>}

            <ul class="text-sidebar-accent-foreground/70">
                <SidebarLink url="/dashboard" icon={LayoutGrid} label="Dashboard" />
                <SidebarLink url="/dashboard" icon={LayoutGrid} label="Home" />
            </ul>
        </div>
    );
};

const SidebarFooter = () => {
    const id = useId();
    const menuId = `${id}-menu`,
        btnId = `${id}-btn`;
    const { show, setShow } = useClickOutside([`#${menuId}`, `#${btnId}`]);

    useEscapeKey(() => setShow(false));

    const handleShowClick = () => {
        setShow((o) => !o);
    };

    return (
        <footer class="relative mt-auto mb-2">
            <AccountMenu id={menuId} name="Ilya" show={show} />

            <button
                id={btnId}
                onClick={handleShowClick}
                class={cn(
                    'text-sidebar-foreground active:bg-sidebar-accent hover:bg-sidebar-accent ease flex items-center gap-2 rounded-sm transition-all duration-200',
                    {
                        'w-full px-3 py-2': isWide.value,
                        'w-fit': isMini.value,
                    },
                )}
            >
                <Monogram firstName="Ilya" />

                {isWide.value && (
                    <>
                        <span>Ilya</span>
                        <ChevronsUpDown class="ml-auto size-4" />
                    </>
                )}
            </button>
        </footer>
    );
};

Sidebar.Header = SidebarHeader;
Sidebar.Nav = SidebarNav;
Sidebar.Footer = SidebarFooter;
