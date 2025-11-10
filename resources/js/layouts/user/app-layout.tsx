import AppHeader from '@/components/user/ui/app-header';
import { cn } from '@/utils/cn';
import { ComponentChildren } from 'preact';
import { FC } from 'preact/compat';

const AppLayout: FC<{ children: ComponentChildren; className?: string }> = ({
    children,
    className,
}) => {
    return (
        <main
            class={cn('mx-auto max-w-480 md:px-4 md:pt-4 xl:px-24', className)}
            id="wrapper"
        >
            <AppHeader />

            {children}
        </main>
    );
};

export default AppLayout;
