import { NavLinkType } from '@/lib/constants/nav-links';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const NavLink: FC<{
    className?: string;
    link: NavLinkType;
}> = ({ className, link }) => {
    return (
        <li>
            <a
                class={cn(
                    'flex items-center justify-center gap-3 font-medium',
                    className,
                )}
                href={link.path}
            >
                <link.icon class="size-5 shrink-0" aria-hidden="true" />
                <span>{link.label}</span>
            </a>
        </li>
    );
};

export default NavLink;
