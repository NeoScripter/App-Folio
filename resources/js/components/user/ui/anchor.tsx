import useFollowCursor from '@/hooks/use-follow-cursor';
import { cn } from '@/utils/cn';
import { VariantProps } from 'class-variance-authority';
import { ArrowDownRight } from 'lucide-preact';
import { JSX } from 'preact';
import { useRef } from 'preact/hooks';
import { buttonVariants } from './button';

type ButtonProps = JSX.IntrinsicElements['a'] &
    VariantProps<typeof buttonVariants>;

const Anchor = ({
    class: className,
    children,
    variant,
    ...props
}: ButtonProps) => {
    const arrowRef = useRef<HTMLDivElement>(null);
    useFollowCursor(arrowRef);

    return (
        <a
            data-slot="button"
            class={cn(buttonVariants({ variant, className }), 'w-fit')}
            {...props}
        >
            {children}

            <div
                ref={arrowRef}
                class="transition-transform duration-100 ease-out"
            >
                <ArrowDownRight class="size-[1.25em] -rotate-45" />
            </div>
        </a>
    );
};

export { Anchor };
