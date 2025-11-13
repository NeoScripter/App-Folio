import EmailForm from '@/components/user/form/email-form';
import AppHeaderContext, {
    HeaderVariant,
} from '@/providers/app-header-context';
import { ModalProvider } from '@/providers/modal-context';
import { cn } from '@/utils/cn';
import { signal } from '@preact/signals';
import { ComponentChildren } from 'preact';
import { FC } from 'preact/compat';
import { Toaster } from 'sonner';
import AppFooter from './app-footer';
import AppHeader from './app-header';
import ModalLayout from './modal-layout';

const AppLayout: FC<{
    children: ComponentChildren;
    className?: string;
    hasFooter?: boolean;
    variant?: HeaderVariant;
}> = ({ children, className, hasFooter = true, variant = 'primary' }) => {
    return (
        <ModalProvider>
            <main
                class={cn(
                    'mx-auto max-w-480 overflow-x-clip md:px-4 md:pt-4 xl:px-24',
                    className,
                )}
                id="wrapper"
            >
                <AppHeaderContext.Provider value={{ variant }}>
                    <AppHeader />
                </AppHeaderContext.Provider>

                {children}

                {hasFooter && <AppFooter />}

                <ModalLayout
                    className="flex flex-wrap bg-black/40"
                >
                    <div class="bg-user-background m-auto w-full max-w-100 lg:max-w-160 rounded-sm px-10 py-14">
                        <EmailForm />
                    </div>
                </ModalLayout>

                <Toaster position="top-center" />
            </main>
        </ModalProvider>
    );
};

export default AppLayout;
