import AdminShellNav from '@/components/admin/nav/admin-shell-nav';
import { useFetch } from '@/hooks/use-fetch';
import AdminLayout from '@/layouts/admin/admin-layout';
import AdminShellLayout from '@/layouts/admin/admin-shell-layout';
import ModalLayout from '@/layouts/admin/modal-layout';
import { VideoType } from '@/lib/types/videos';
import { DeleteModalProvider } from '@/providers/delete-modal-context';
import { range } from '@/utils/range';
import { useEffect, useState } from 'preact/hooks';
import VideoCard, { VideoCardSkeleton } from './partials/video-card';
import VideoDelete from './partials/video-delete';

const Videos = () => {
    const { fetchData, loading, errors } = useFetch();
    const [videos, setVideos] = useState<VideoType[] | null>(null);

    useEffect(() => {
        const fetchVideos = () => {
            fetchData({
                url: '/api/videos?latest=true',
                onSuccess: (data) => {
                    setVideos(data.data);
                },
            });
        };

        fetchVideos();

        document.addEventListener('itemDeleted', fetchVideos);

        return () => document.removeEventListener('itemDeleted', fetchVideos);
    }, []);

    if (errors != null) {
        console.error(errors);
    }

    return (
        <DeleteModalProvider>
            <AdminLayout title="Videos">
                <AdminShellLayout>
                    <AdminShellNav href={'videos/create'} />
                    {loading ? (
                        <ul className="space-y-8">
                            {range(0, 8).map((idx) => (
                                <VideoCardSkeleton key={idx} />
                            ))}
                        </ul>
                    ) : (
                        <ul className="space-y-8">
                            {videos &&
                                videos.map((video) => (
                                    <VideoCard key={video.id} video={video} />
                                ))}
                        </ul>
                    )}
                    <ModalLayout className="max-w-9/10 px-10 py-14 sm:max-w-100 lg:max-w-160">
                        <VideoDelete />
                    </ModalLayout>
                </AdminShellLayout>
            </AdminLayout>
        </DeleteModalProvider>
    );
};

export default Videos;
