import { NavLinkType } from '@/lib/constants/nav-links';
import { useHeaderVariant } from '@/providers/app-header-context';
import { cn } from '@/utils/cn';
import { useLocation } from 'preact-iso';
import { FC } from 'preact/compat';
import AnimatedUnderline from '../ui/animated-underline';

const NavLink: FC<{
    className?: string;
    link: NavLinkType;
    show: boolean;
    idx: number;
}> = ({ className, idx, link, show }) => {
    const { variant } = useHeaderVariant();

    const { path } = useLocation();
    const active = path === link.path;

    return (
        <li class='select-none'>
            <a
                class={cn(
                    'group relative mx-auto flex w-fit min-w-30 items-center gap-3 font-medium lg:min-w-0 lg:font-normal',
                    {
                        'cursor-default lg:font-bold': active,
                        'slide-in': show,
                    },
                    className,
                )}
                href={link.path}
                aria-current={active ? 'page' : undefined}
                style={{
                    '--slide-delay': `${show ? idx * 200 + 100 : 100}ms`,
                }}
            >
                {active && (
                    <span
                        aria-hidden="true"
                        class="border-foreground/30 bg-background pointer-events-none absolute -inset-x-6 -inset-y-2 -z-4 rounded-md border lg:hidden"
                    />
                )}
                <link.icon
                    class="size-5 shrink-0 lg:hidden"
                    aria-hidden="true"
                    strokeWidth={2.5}
                />
                <span>{link.label}</span>

                <AnimatedUnderline
                    className={cn('hidden lg:block lg:bg-foreground', {
                        'hidden group-hover:hidden': active,
                        'h-px': !active,
                        'lg:bg-white': variant === 'primary',
                    })}
                />
            </a>
        </li>
    );
};

export default NavLink;
