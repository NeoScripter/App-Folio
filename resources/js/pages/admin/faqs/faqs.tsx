import { useFetch } from '@/hooks/use-fetch';
import AdminLayout from '@/layouts/admin/admin-layout';
import AdminShellLayout from '@/layouts/admin/admin-shell-layout';
import { FaqType } from '@/lib/types/faqs';
import { useEffect, useState } from 'preact/hooks';
import FaqCard from './partials/faq-card';

const Faqs = () => {
    const { fetchData, loading, errors } = useFetch();
    const [faqs, setFaqs] = useState<FaqType[] | null>(null);

    useEffect(() => {
        fetchData({
            url: '/api/faqs',
            onSuccess: (data) => {
                setFaqs(data.data);
            },
        });
    }, []);

    if (errors != null) {
        console.error(errors);
    }

    return (
        <AdminLayout title="Faqs">
            <AdminShellLayout>
                {loading ? (
                    'Loading...'
                ) : (
                    <ul className="space-y-6">
                        {faqs &&
                            faqs.map((faq) => (
                                <FaqCard key={faq.id} faq={faq} />
                            ))}
                    </ul>
                )}
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default Faqs;
