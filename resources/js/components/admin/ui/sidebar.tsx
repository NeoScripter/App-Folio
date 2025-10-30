import SidebarLink from '@/components/admin/nav/sidebar-link';
import AppLogo from '@/components/admin/ui/app-logo';
import { ChevronsUpDown, LayoutGrid } from 'lucide-preact';
import { ComponentChildren } from 'preact';

function Sidebar({ children }: { children: ComponentChildren }) {
    return <aside class="flex w-full max-w-62 shrink-0 flex-col self-stretch p-2">{children}</aside>;
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
                <SidebarLink url="/dashboard">
                    <LayoutGrid class="size-4" />
                    Dashboard
                </SidebarLink>
                <SidebarLink url="/dashboard">
                    <LayoutGrid class="size-4" />
                    Home
                </SidebarLink>
            </ul>
        </div>
    );
};

const SidebarFooter = () => {
    return (
        <footer class="relative mt-auto">
            <button class="text-sidebar-foreground w-full active:bg-sidebar-accent hover:bg-sidebar-accent ease flex items-center gap-2 rounded-sm py-2 px-3 transition-colors duration-200">
                <span class="bg-sidebar-accent flex size-8 shrink-0 items-center justify-center rounded-sm p-1">I</span>
                <span>Ilya</span>
                <ChevronsUpDown class='size-4 ml-auto' />
            </button>
        </footer>
    );
};

Sidebar.Header = SidebarHeader;
Sidebar.Nav = SidebarNav;
Sidebar.Footer = SidebarFooter;
