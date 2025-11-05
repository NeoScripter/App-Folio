import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const BurgerMenu: FC<{
    className?: string;
    onClick: () => void;
    show: boolean;
}> = ({ className, onClick, show }) => {
    return (
        <button
            onClick={onClick}
            class={cn(
                '',
                {
                    'text-black': show,
                    'text-white': !show,
                },
                className,
            )}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                class={cn(
                    'lucide lucide-menu-icon lucide-menu overflow-visible',
                )}
            >
                <path
                    class={cn(
                        'burger',
                        show
                            ? 'burger-open rotate-45'
                            : 'burger-close -translate-y-[9px]',
                    )}
                    d="M0 18h36"
                />
                <path
                    class={cn(
                        'transition-opacity duration-300 ease-in',
                        show && 'opacity-0',
                    )}
                    d="M0 18h36"
                />
                <path
                    class={cn(
                        'burger',
                        show
                            ? 'burger-open -rotate-45'
                            : 'burger-close translate-y-[9px]',
                    )}
                    d="M0 18h36"
                />
            </svg>
        </button>
    );
};

export default BurgerMenu;
