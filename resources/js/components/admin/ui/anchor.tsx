import { buttonVariants } from '@/components/auth/form/button';
import { cn } from '@/utils/cn';
import { VariantProps } from 'class-variance-authority';
import { ArrowDownRight } from 'lucide-preact';
import { JSX } from 'preact';
import { useRef } from 'preact/hooks';

type ButtonProps = JSX.IntrinsicElements['a'] &
    VariantProps<typeof buttonVariants>;

const Anchor = ({
    class: className,
    children,
    variant,
    ...props
}: ButtonProps) => {

    return (
        <a
            data-slot="button"
            class={cn(buttonVariants({ variant, className }), 'w-fit')}
            {...props}
        >
            {children}

        </a>
    );
};

export { Anchor };
