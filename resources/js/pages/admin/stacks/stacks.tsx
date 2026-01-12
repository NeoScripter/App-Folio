import AdminShellNav from '@/components/admin/nav/admin-shell-nav';
import { useFetch } from '@/hooks/use-fetch';
import AdminLayout from '@/layouts/admin/admin-layout';
import AdminShellLayout from '@/layouts/admin/admin-shell-layout';
import ModalLayout from '@/layouts/admin/modal-layout';
import { StackType } from '@/lib/types/stacks';
import { DeleteModalProvider } from '@/providers/delete-modal-context';
import { range } from '@/utils/range';
import { useEffect, useState } from 'preact/hooks';
import StackCard, { StackCardSkeleton } from './partials/stack-card';
import StackDelete from './partials/stack-delete';

const Stacks = () => {
    const { fetchData, loading, errors } = useFetch();
    const [stacks, setStacks] = useState<StackType[] | null>(null);

    useEffect(() => {
        const fetchStacks = () => {
            fetchData({
                url: '/api/stacks?latest=true',
                onSuccess: (data) => {
                    setStacks(data.data);
                },
            });
        };

        fetchStacks();

        document.addEventListener('itemDeleted', fetchStacks);

        return () => document.removeEventListener('itemDeleted', fetchStacks);
    }, []);

    if (errors != null) {
        console.error(errors);
    }

    return (
        <DeleteModalProvider>
            <AdminLayout title="Stacks">
                <AdminShellLayout>
                    <AdminShellNav href={'stacks/create'} />
                    {loading ? (
                        <ul className="space-y-6">
                            {range(0, 8).map((idx) => (
                                <StackCardSkeleton key={idx} />
                            ))}
                        </ul>
                    ) : (
                        <ul className="space-y-6">
                            {stacks &&
                                stacks.map((stack) => (
                                    <StackCard key={stack.id} stack={stack} />
                                ))}
                        </ul>
                    )}
                    <ModalLayout className="max-w-9/10 px-10 py-14 sm:max-w-100 lg:max-w-160">
                        <StackDelete />
                    </ModalLayout>
                </AdminShellLayout>
            </AdminLayout>
        </DeleteModalProvider>
    );
};

export default Stacks;
