import { NavLinkType } from '@/lib/constants/nav-links';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';
import AnimatedUnderline from '../ui/animated-underline';

const NavLink: FC<{
    className?: string;
    link: NavLinkType;
    active?: boolean;
    show: boolean;
    idx: number;
}> = ({ className, idx, link, show, active = false }) => {
    return (
        <li>
            <a
                class={cn(
                    'group relative mx-auto flex w-fit min-w-30 translate-x-[200%] items-center gap-3 opacity-0 transition-all duration-600 ease-nav-drawer lg:min-w-0 lg:translate-x-0 lg:opacity-100',
                    {
                        'font-bold': active,
                        'translate-x-0 opacity-100': show,
                    },
                    className,
                )}
                href={link.path}
                aria-current={active ? 'page' : undefined}
                style={{ transitionDelay: `${show ? idx * 200 : 0}ms` }}
            >
                <link.icon
                    class="size-5 shrink-0 lg:hidden"
                    aria-hidden="true"
                    strokeWidth={active ? 3 : 2}
                />
                <span>{link.label}</span>

                <AnimatedUnderline
                    className={cn('hidden lg:block lg:bg-white', {
                        'h-0.5 w-full': active,
                        'h-px': !active,
                    })}
                />
            </a>
        </li>
    );
};

export default NavLink;
