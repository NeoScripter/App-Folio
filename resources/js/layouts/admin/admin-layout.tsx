import Sidebar from '@/components/admin/ui/sidebar';
import { Toaster } from '@/components/shared/ui/sonner';
import { ComponentChildren } from 'preact';
import { FC } from 'preact/compat';

const AdminLayout: FC<{ children: ComponentChildren }> = ({ children }) => {
    return (
        <main class="text-sidebar-foreground bg-sidebar [height:calc(100svh-56px)] text-sm md:flex md:items-start md:p-2">
            <Sidebar>
                <Sidebar.Header />
                <Sidebar.Nav />
                <Sidebar.Footer />
            </Sidebar>

            <div class="bg-background border-muted w-full border shadow-sm md:rounded-lg">{children}</div>
            <Toaster position="top-center" />
        </main>
    );
};

export default AdminLayout;
