import { StackType } from '@/lib/types/stacks';
import { appearance } from '@/signals/appearance';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const StackBtn: FC<{
    className?: string;
    stack: StackType;
    active: boolean;
    onClick: () => void;
}> = ({ className, stack, active, onClick }) => {
    return (
        <li>
            <button
                onClick={onClick}
                class={cn(
                    'flex size-16 flex-wrap rounded-md',
                    {
                        'invert-100': appearance.value === 'dark',
                        'cursor-default shadow-sm ring ring-black': active,
                        'transition-all duration-250 hover:scale-105 hover:shadow-md hover:ring hover:ring-black/70':
                            !active,
                    },
                    className,
                )}
            >
                <img
                    src={stack.attributes.image}
                    alt="php"
                    class="m-auto size-3/4 object-contain"
                />
            </button>
        </li>
    );
};

export default StackBtn;
