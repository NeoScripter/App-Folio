import { useFetch } from '@/hooks/use-fetch';
import AdminLayout from '@/layouts/admin/admin-layout';
import AdminShellLayout from '@/layouts/admin/admin-shell-layout';
import { StackType } from '@/lib/types/stacks';
import { FC } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import StackUpsert from '../partials/stack-upsert';

const EditStack: FC<{ id: number }> = ({ id }) => {
    const { fetchData, loading, errors } = useFetch();
    const [stack, setStack] = useState<StackType | null>(null);

    useEffect(() => {
        fetchData({
            url: `/api/stacks/${id}`,
            onSuccess: (data) => {
                setStack(data.data);
            },
        });
    }, []);

    if (errors != null) {
        console.error(errors);
    }

    return (
        <AdminLayout title="Edit Stack">
            <AdminShellLayout>
                {errors != null ? (
                    <p>{errors.general}</p>
                ) : loading || stack == null ? (
                    'Loading...'
                ) : (
                    <StackUpsert stack={stack} />
                )}
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default EditStack;
