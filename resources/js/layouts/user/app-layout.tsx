import AppHeader from '@/components/user/ui/app-header';
import BurgerMenu from '@/components/user/ui/burger-menu';
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

            <AppHeader />

            {children}
        </main>
    );
};

export default AppLayout;
