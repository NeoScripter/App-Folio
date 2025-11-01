import SidebarLink from '@/components/admin/nav/sidebar-link';
import AppLogo from '@/components/admin/ui/app-logo';
import { useClickOutside } from '@/hooks/use-click-outside';
import { showSidebar } from '@/signals/show-sidebar';
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

        showSidebar.value = false;
    };

    return (
        <div
            id={id}
            onClick={handleClick}
            class={cn(
                'md:bg-sidebar fixed inset-0 top-[56px] z-10 bg-black/75 transition-colors md:static md:w-full md:max-w-62 md:shrink-0 md:self-stretch',
                {
                    'pointer-events-none bg-transparent ease-in duration-200': !showSidebar.value,
                    'ease-out duration-300': showSidebar.value,
                },
            )}
        >
            <aside
                class={cn(
                    'bg-sidebar inset-y-0 top-[56px] left-0 flex [min-height:calc(100svh-56px)] w-full max-w-72 flex-col p-2 transition-transform md:fixed md:max-w-62',
                    {
                        '-translate-x-full ease-in duration-300': !showSidebar.value,
                        'translate-x-0 ease-out duration-500': showSidebar.value,
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
        <header class="m-2 flex items-center gap-4">
            <div class="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-sm">
                <AppLogo />
            </div>
            <div class="font-medium">Laravel Starter Kit</div>
        </header>
    );
};

const SidebarNav = () => {
    return (
        <div>
            <div class="text-sidebar-foreground/70 mx-2 py-4 text-xs">Platform</div>

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

    const handleShowClick = () => {
        setShow((o) => !o);
    };

    return (
        <footer class="relative mt-auto">
            <AccountMenu id={menuId} name="Ilya" show={show} />

            <button
                id={btnId}
                onClick={handleShowClick}
                class="text-sidebar-foreground active:bg-sidebar-accent hover:bg-sidebar-accent ease flex w-full items-center gap-2 rounded-sm px-3 py-2 transition-colors duration-200"
            >
                <Monogram firstName="Ilya" />
                <span>Ilya</span>
                <ChevronsUpDown class="ml-auto size-4" />
            </button>
        </footer>
    );
};

Sidebar.Header = SidebarHeader;
Sidebar.Nav = SidebarNav;
Sidebar.Footer = SidebarFooter;
