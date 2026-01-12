import DeleteConfirmation from '@/components/admin/form/delete-confirmation';
import { useFetch } from '@/hooks/use-fetch';
import FormLayout from '@/layouts/admin/form-layout';
import { useDeleteModal } from '@/providers/delete-modal-context';
import { toast } from 'sonner';

const VideoDelete = () => {
    const { itemToDelete: video } = useDeleteModal();

    const { fetchData, loading } = useFetch();

    async function submit() {
        if (video.value == null) return;

        await fetchData({
            url: `/admin/videos/${video.value.id}`,
            method: 'DELETE',
            onSuccess: () => {
                video.value = null;
                toast.success('Deleted!');
                document.dispatchEvent(new Event('itemDeleted'));
            },
            onError: () => toast.error('Error'),
        });
    }

    return (
        <FormLayout onSubmit={submit}>
            <DeleteConfirmation
                itemName="video"
                onCancel={() => (video.value = null)}
                loading={loading}
            />
        </FormLayout>
    );
};

export default VideoDelete;
