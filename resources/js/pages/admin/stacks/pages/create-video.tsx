import AdminLayout from '@/layouts/admin/admin-layout';
import AdminShellLayout from '@/layouts/admin/admin-shell-layout';
import StackUpsert from '../partials/stack-upsert';

const CreateStack = () => {
    return (
        <AdminLayout title="Create Stack">
            <AdminShellLayout>
                <StackUpsert />
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default CreateStack;
