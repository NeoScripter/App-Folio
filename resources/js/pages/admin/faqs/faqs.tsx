import AdminShellNav from '@/components/admin/nav/admin-shell-nav';
import { useFetch } from '@/hooks/use-fetch';
import AdminLayout from '@/layouts/admin/admin-layout';
import AdminShellLayout from '@/layouts/admin/admin-shell-layout';
import ModalLayout from '@/layouts/admin/modal-layout';
import { FaqType } from '@/lib/types/faqs';
import { DeleteModalProvider } from '@/providers/delete-modal-context';
import { useEffect, useState } from 'preact/hooks';
import FaqCard, { FaqCardSkeleton } from './partials/faq-card';
import FaqDelete from './partials/faq-delete';
import { range } from '@/utils/range';

const Faqs = () => {
    const { fetchData, loading, errors } = useFetch();
    const [faqs, setFaqs] = useState<FaqType[] | null>(null);

    useEffect(() => {
        const fetchFaqs = () => {
            fetchData({
                url: '/api/faqs',
                onSuccess: (data) => {
                    setFaqs(data.data);
                },
            });
        };

        fetchFaqs();

        document.addEventListener('itemDeleted', fetchFaqs);

        return () => document.removeEventListener('itemDeleted', fetchFaqs);
    }, []);

    if (errors != null) {
        console.error(errors);
    }

    return (
        <DeleteModalProvider>
            <AdminLayout title="Faqs">
                <AdminShellLayout>
                    <AdminShellNav href={'faqs/create'} />
                    {loading ? (
                        range(0, 8).map((idx) => <FaqCardSkeleton key={idx} />)
                    ) : (
                        <ul className="space-y-6">
                            {faqs &&
                                faqs.map((faq) => (
                                    <FaqCard key={faq.id} faq={faq} />
                                ))}
                        </ul>
                    )}
                    <ModalLayout className="max-w-9/10 px-10 py-14 sm:max-w-100 lg:max-w-160">
                        <FaqDelete />
                    </ModalLayout>
                </AdminShellLayout>
            </AdminLayout>
        </DeleteModalProvider>
    );
};

export default Faqs;
