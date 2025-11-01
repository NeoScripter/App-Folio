import { cn } from '@/utils/cn';
import { LucideIcon } from 'lucide-preact';
import { useLocation } from 'preact-iso/router';
import { FC } from 'preact/compat';

const SidebarLink: FC<{ icon: LucideIcon; label: string; url: string; className?: string }> = ({ icon: Icon, label, url, className }) => {
    const { path } = useLocation();
    // const active = path.startsWith(url);
    const active = false;
    return (
        <li>
            <a
                href={url}
                class={cn(
                    'active:bg-sidebar-accent mx-1 my-0.5 hover:bg-sidebar-accent ease flex items-center gap-2 rounded-sm px-3 py-2 transition-colors duration-200',
                    active && 'bg-sidebar-accent',
                    className,
                )}
            >
                <Icon class="size-4 shrink-0" />
                <span>{label}</span>
            </a>
        </li>
    );
};

export default SidebarLink;
