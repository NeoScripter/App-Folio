import Heading from '@/components/admin/ui/heading';
import { Button } from '@/components/auth/form/button';
import { cn } from '@/utils/cn';
import { ComponentChildren } from 'preact';

const sidebarNavItems = [
    {
        title: 'Profile',
        href: '/settings/profile',
        icon: null,
    },
    {
        title: 'Password',
        href: '/settings/password',
        icon: null,
    },
    {
        title: 'Appearance',
        href: '/settings/appearance',
        icon: null,
    },
];

type SettingsLayoutProps = {
    children: ComponentChildren;
};

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    const currentPath = window.location.pathname;

    return (
        <div className="px-4 py-6">
            <Heading title="Settings" description="Manage your profile and account settings" />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item) => (
                            <Button
                                tabindex={-1}
                                key={item.href}
                                size="sm"
                                variant="ghost"
                                class={cn('relative w-full justify-start', {
                                    'bg-muted': currentPath === item.href,
                                })}
                            >
                                <a href={item.href} class="absolute inset-0 z-10" />
                                {item.title}
                            </Button>
                        ))}
                    </nav>
                </aside>

                <hr className="my-6 xl:hidden" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
