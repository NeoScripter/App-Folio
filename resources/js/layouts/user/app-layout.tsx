import LogoRus from '@/components/user/ui/logo-rus';
import { cn } from '@/utils/cn';
import { ComponentChildren } from 'preact';
import { FC } from 'preact/compat';

const AppLayout: FC<{ children: ComponentChildren; className?: string }> = ({
    children,
    className,
}) => {
    return (
        <main class={cn('md:px-4 md:pt-4 xl:px-24', className)}>
            <header class="fixed inset-x-0 top-0 z-10 flex items-center justify-between px-7 py-8 text-white backdrop-blur-md">
                <div class="w-36">
                    <LogoRus />
                </div>
            </header>

            {children}
        </main>
    );
};

export default AppLayout;
