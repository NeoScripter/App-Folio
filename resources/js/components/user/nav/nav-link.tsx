import { NavLinkType } from '@/lib/constants/nav-links';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const NavLink: FC<{
    className?: string;
    link: NavLinkType;
    active?: boolean;
}> = ({ className, link, active = false }) => {
    return (
        <li>
            <a
                class={cn(
                    'group relative mx-auto flex w-fit min-w-30 items-center gap-3 md:min-w-0',
                    {
                        'font-bold': active,
                    },
                    className,
                )}
                href={link.path}
                aria-current={active ? 'page' : undefined}
            >
                <link.icon
                    class="size-5 shrink-0 md:hidden"
                    aria-hidden="true"
                    strokeWidth={active ? 3 : 2}
                />
                <span>{link.label}</span>

                <span
                    aria-hidden="true"
                    class={cn(
                        'bg-foreground absolute -bottom-1 left-0 hidden w-[0%] rounded-[10rem] transition-[width] duration-300 group-hover:w-[100%] md:block md:bg-white',
                        {
                            'h-0.5 w-full': active,
                            'h-px': !active,
                        },
                    )}
                />
            </a>
        </li>
    );
};

export default NavLink;
