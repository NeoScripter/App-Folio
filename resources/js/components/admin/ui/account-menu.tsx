import SidebarLink from '@/components/admin/nav/sidebar-link';
import { hide } from '@/signals/sidebar-state';
import { cn } from '@/utils/cn';
import { LogOut, Settings } from 'lucide-preact';
import { FC } from 'preact/compat';
import Monogram from './monogram';
import { useLogout } from '@/hooks/use-logout';

const AccountMenu: FC<{ id: string; name: string; show: boolean }> = ({ id, name, show }) => {
    const { logout } = useLogout();

    const handleLogOut = async (e: Event) => {
        e.preventDefault();
        logout();
    };

    return (
        <div
            id={id}
            class={cn(
                'bg-background border-muted divide-muted absolute bottom-13 left-0 z-10 [width:max(100%,14rem)] origin-bottom-right divide-y-1 border shadow-sm transition-[opacity,scale] md:rounded-lg',
                {
                    'pointer-events-none scale-90 opacity-0': !show,
                    'scale-100': show,
                },
            )}
        >
            <ul class="divide-muted divide-y-1">
                <li class="flex items-center gap-3 px-3 py-2">
                    <Monogram firstName={name} />
                    <div>
                        <div class="text-sm font-bold">{name}</div>
                        <div class="text-muted-foreground text-xs">example@gmail.com</div>
                    </div>
                </li>

                <SidebarLink onClick={hide} url="/settings/profile" icon={Settings} label="Settings" collapses={false} />
                <SidebarLink onClick={handleLogOut} url="/logout" icon={LogOut} label="Log out" collapses={false} />
            </ul>
        </div>
    );
};

export default AccountMenu;
