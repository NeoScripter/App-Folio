import AdminLayout from '@/layouts/admin/admin-layout';
import AdminShellLayout from '@/layouts/admin/admin-shell-layout';
import ProjectUpsert from '../partials/project-upsert';

const CreateProject = () => {
    return (
        <AdminLayout title="Create Project">
            <AdminShellLayout>
                <ProjectUpsert />
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default CreateProject;
