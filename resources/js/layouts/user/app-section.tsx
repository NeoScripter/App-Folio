import { cn } from '@/utils/cn';
import { ComponentChildren } from 'preact';
import { FC } from 'preact/compat';

const AppSection: FC<{ className?: string; children: ComponentChildren }> = ({
    className,
    children,
}) => {
    return (
        <section
            class={cn(
                'px-5 first-of-type:pt-36 sm:px-15 first-of-type:sm:pt-42 md:text-xl lg:px-23 first-of-type:lg:pt-50 2xl:text-2xl',
                className,
            )}
        >
            {children}
        </section>
    );
};

export default AppSection;
