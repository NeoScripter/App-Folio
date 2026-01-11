import { useFetch } from '@/hooks/use-fetch';
import AdminLayout from '@/layouts/admin/admin-layout';
import AdminShellLayout from '@/layouts/admin/admin-shell-layout';
import { ReviewType } from '@/lib/types/reviews';
import { FC } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import ReviewUpsert from '../partials/review-upsert';

const EditReview: FC<{ id: number }> = ({ id }) => {
    const { fetchData, loading, errors } = useFetch();
    const [review, setReview] = useState<ReviewType | null>(null);

    useEffect(() => {
        fetchData({
            url: `/api/reviews/${id}`,
            onSuccess: (data) => {
                setReview(data.data);
            },
        });
    }, []);

    if (errors != null) {
        console.error(errors);
    }

    return (
        <AdminLayout title="Edit Review">
            <AdminShellLayout>
                {errors != null ? (
                    <p>{errors.general}</p>
                ) : loading || review == null ? (
                    'Loading...'
                ) : (
                    <ReviewUpsert review={review} />
                )}
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default EditReview;
