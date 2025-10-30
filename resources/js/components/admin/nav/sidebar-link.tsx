import { cn } from '@/utils/cn';
import { ComponentChildren } from 'preact';
import { FC } from 'preact/compat';

const SidebarLink: FC<{ children: ComponentChildren; url: string; className?: string }> = ({ children, url, className }) => {
    return (
        <li>
            <a
                href={url}
                class={cn(
                    'active:bg-sidebar-accent hover:bg-sidebar-accent ease flex items-center gap-2 rounded-sm px-3 py-2 transition-colors duration-200',
                    className,
                )}
            >
                {children}
            </a>
        </li>
    );
};

export default SidebarLink;
