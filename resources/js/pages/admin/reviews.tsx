import AdminLayout from '@/layouts/admin/admin-layout';
import AdminShellLayout from '@/layouts/admin/admin-shell-layout';

const Reviews = () => {
    return (
        <AdminLayout title="Reviews">
            <AdminShellLayout>
                <div className="text">This is the reviews page</div>
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default Reviews;
