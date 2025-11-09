import { cn } from '@/utils/cn';
import { ComponentChildren } from 'preact';
import { FC } from 'preact/compat';

const SecondaryHeading: FC<{
    className?: string;
    children: ComponentChildren;
}> = ({ className, children }) => {
    return (
        <h2
            class={cn(
                'font-medium text-balance xs:text-4xl xs:mb-8 mb-6 text-3xl sm:mb-10 sm:text-5xl xl:mb-12 xl:text-6xl',
                className,
            )}
        >
            {children}
        </h2>
    );
};

export default SecondaryHeading;
