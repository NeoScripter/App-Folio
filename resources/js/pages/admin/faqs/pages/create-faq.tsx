import AdminLayout from '@/layouts/admin/admin-layout';
import AdminShellLayout from '@/layouts/admin/admin-shell-layout';
import FaqUpsert from '../partials/faq-upsert';

const CreateFaq = () => {
    return (
        <AdminLayout title="Create Faq">
            <AdminShellLayout>
                <FaqUpsert />
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default CreateFaq;
