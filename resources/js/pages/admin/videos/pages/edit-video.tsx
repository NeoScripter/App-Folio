import { useFetch } from '@/hooks/use-fetch';
import AdminLayout from '@/layouts/admin/admin-layout';
import AdminShellLayout from '@/layouts/admin/admin-shell-layout';
import { VideoType } from '@/lib/types/videos';
import { FC } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import VideoUpsert from '../partials/video-upsert';

const EditVideo: FC<{ id: number }> = ({ id }) => {
    const { fetchData, loading, errors } = useFetch();
    const [video, setVideo] = useState<VideoType | null>(null);

    useEffect(() => {
        fetchData({
            url: `/api/videos/${id}`,
            onSuccess: (data) => {
                setVideo(data.data);
            },
        });
    }, []);

    if (errors != null) {
        console.error(errors);
    }

    return (
        <AdminLayout title="Edit Video">
            <AdminShellLayout>
                {errors != null ? (
                    <p>{errors.general}</p>
                ) : loading || video == null ? (
                    'Loading...'
                ) : (
                    <VideoUpsert video={video} />
                )}
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default EditVideo;
