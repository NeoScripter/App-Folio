import AdminLayout from '@/layouts/admin/admin-layout';
import AdminShellLayout from '@/layouts/admin/admin-shell-layout';
import VideoUpsert from '../partials/video-upsert';

const CreateVideo = () => {
    return (
        <AdminLayout title="Create Video">
            <AdminShellLayout>
                <VideoUpsert />
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default CreateVideo;
