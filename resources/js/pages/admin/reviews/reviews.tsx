import AdminShellNav from '@/components/admin/nav/admin-shell-nav';
import { useFetch } from '@/hooks/use-fetch';
import AdminLayout from '@/layouts/admin/admin-layout';
import AdminShellLayout from '@/layouts/admin/admin-shell-layout';
import ModalLayout from '@/layouts/admin/modal-layout';
import { ReviewType } from '@/lib/types/reviews';
import { DeleteModalProvider } from '@/providers/delete-modal-context';
import { range } from '@/utils/range';
import { useEffect, useState } from 'preact/hooks';
import ReviewCard, { ReviewCardSkeleton } from './partials/review-card';
import ReviewDelete from './partials/review-delete';

const Reviews = () => {
    const { fetchData, loading, errors } = useFetch();
    const [reviews, setReviews] = useState<ReviewType[] | null>(null);

    useEffect(() => {
        const fetchReviews = () => {
            fetchData({
                url: '/api/reviews',
                onSuccess: (data) => {
                    setReviews(data.data);
                },
            });
        };

        fetchReviews();

        document.addEventListener('itemDeleted', fetchReviews);

        return () => document.removeEventListener('itemDeleted', fetchReviews);
    }, []);

    if (errors != null) {
        console.error(errors);
    }

    return (
        <DeleteModalProvider>
            <AdminLayout title="Reviews">
                <AdminShellLayout>
                    <AdminShellNav href={'reviews/create'} />
                    {loading ? (
                        range(0, 8).map((idx) => (
                            <ReviewCardSkeleton key={idx} />
                        ))
                    ) : (
                        <ul className="space-y-6">
                            {reviews &&
                                reviews.map((review) => (
                                    <ReviewCard
                                        key={review.id}
                                        review={review}
                                    />
                                ))}
                        </ul>
                    )}
                    <ModalLayout className="max-w-9/10 px-10 py-14 sm:max-w-100 lg:max-w-160">
                        <ReviewDelete />
                    </ModalLayout>
                </AdminShellLayout>
            </AdminLayout>
        </DeleteModalProvider>
    );
};

export default Reviews;
