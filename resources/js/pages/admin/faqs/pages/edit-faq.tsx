import { useFetch } from '@/hooks/use-fetch';
import AdminLayout from '@/layouts/admin/admin-layout';
import AdminShellLayout from '@/layouts/admin/admin-shell-layout';
import { FaqType } from '@/lib/types/faqs';
import { FC } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import FaqUpsert from '../partials/faq-upsert';

const EditFaq: FC<{ id: number }> = ({ id }) => {
    const { fetchData, loading, errors } = useFetch();
    const [faq, setFaq] = useState<FaqType | null>(null);

    useEffect(() => {
        fetchData({
            url: `/api/faqs/${id}`,
            onSuccess: (data) => {
                setFaq(data.data);
            },
        });
    }, []);

    if (errors != null) {
        console.error(errors);
    }

    return (
        <AdminLayout title="Edit Faq">
            <AdminShellLayout>
                {errors != null ? (
                    <p>{errors.general}</p>
                ) : loading || faq == null ? (
                    'Loading...'
                ) : (
                    <FaqUpsert faq={faq} />
                )}
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default EditFaq;
