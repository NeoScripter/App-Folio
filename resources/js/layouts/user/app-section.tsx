import { cn } from '@/utils/cn';
import { ComponentChildren } from 'preact';
import { FC } from 'preact/compat';

const AppSection: FC<{ className?: string; children: ComponentChildren }> = ({
    className,
    children,
}) => {
    return <section class={cn('px-5 md:text-xl 2xl:text-2xl sm:px-15 lg:px-23', className)}>{children}</section>;
};

export default AppSection;
