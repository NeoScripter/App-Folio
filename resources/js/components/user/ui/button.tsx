import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { ArrowDownRight } from 'lucide-preact';
import { JSX } from 'preact';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-[0.5em] whitespace-nowrap rounded-xl text-sm xs:text-base group transition-[color,box-shadow,opacity] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
                hero: 'bg-zinc-700/20 hover:bg-zinc-700/60 text-white shadow-xs py-[0.5em] pl-[1.5em] pr-[1em] backdrop-blur-sm border border-white hover:ring-[3px] hover:ring-white focus-visible:ring-white',
                outline:
                    'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
                secondary:
                    'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

type ButtonProps = JSX.IntrinsicElements['button'] &
    VariantProps<typeof buttonVariants>;

const Button = ({
    class: className,
    children,
    variant,
    ...props
}: ButtonProps) => {
    return (
        <button
            data-slot="button"
            class={cn(buttonVariants({ variant, className }))}
            {...props}
        >
            {children}

            <ArrowDownRight class="size-[1.25em] transition-all duration-200 group-hover:-rotate-90" />
        </button>
    );
};

export { Button, buttonVariants };
