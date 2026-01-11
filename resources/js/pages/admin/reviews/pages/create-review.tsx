import AdminLayout from '@/layouts/admin/admin-layout';
import AdminShellLayout from '@/layouts/admin/admin-shell-layout';
import ReviewUpsert from '../partials/review-upsert';

const CreateReview = () => {
    return (
        <AdminLayout title="Create Review">
            <AdminShellLayout>
                <ReviewUpsert />
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default CreateReview;
