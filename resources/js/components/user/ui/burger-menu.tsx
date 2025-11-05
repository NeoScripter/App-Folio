import { cn } from '@/utils/cn';
import { FC, useState } from 'preact/compat';

const BurgerMenu: FC<{ className?: string }> = ({ className }) => {
    const [show, setShow] = useState(false);

    const toggleMenu = () => {
        setShow((p) => !p);
    };

    return (
        <button onClick={toggleMenu} class={cn('', className)}>
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
                            ? 'rotate-45 burger-open'
                            : '-translate-y-[9px] burger-close',
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
                            : 'translate-y-[9px] burger-close',
                    )}
                    d="M0 18h36"
                />
            </svg>
        </button>
    );
};

export default BurgerMenu;
