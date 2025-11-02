import { isMini, isWide } from '@/signals/sidebar-state';
import { cn } from '@/utils/cn';
import { LucideIcon } from 'lucide-preact';
import { useLocation } from 'preact-iso/router';
import { FC } from 'preact/compat';

const SidebarLink: FC<{ icon: LucideIcon; label: string; url: string; className?: string; collapses?: boolean }> = ({
    icon: Icon,
    label,
    url,
    className,
    collapses = true,
}) => {
    const { path } = useLocation();
    // const active = path.startsWith(url);
    const active = false;
    return (
        <li>
            <a
                href={url}
                class={cn(
                    'active:bg-sidebar-accent hover:bg-sidebar-accent ease my-0.5 flex items-center gap-2 rounded-sm transition-colors duration-200',
                    active && 'bg-sidebar-accent',
                    {
                        'mx-auto w-fit items-center justify-center p-2': isMini.value && collapses,
                        'mx-1 px-3 py-2': !isMini.value || !collapses,
                    },
                    className,
                )}
            >
                <Icon class="size-4 shrink-0" />
                {(!isMini.value || !collapses) && <span>{label}</span>}
            </a>
        </li>
    );
};

export default SidebarLink;
