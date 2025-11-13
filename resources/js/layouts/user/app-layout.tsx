import { cn } from '@/utils/cn';
import { ComponentChildren } from 'preact';
import { FC } from 'preact/compat';
import AppFooter from './app-footer';
import AppHeader from './app-header';
import { Toaster } from 'sonner';

const AppLayout: FC<{ children: ComponentChildren; className?: string }> = ({
    children,
    className,
}) => {
    return (
        <main
            class={cn(
                'mx-auto max-w-480 overflow-x-clip md:px-4 md:pt-4 xl:px-24',
                className,
            )}
            id="wrapper"
        >
            <AppHeader />

            {children}

            <AppFooter />

            <Toaster position="top-center" />
        </main>
    );
};

export default AppLayout;
