import DeleteConfirmation from '@/components/admin/form/delete-confirmation';
import { useFetch } from '@/hooks/use-fetch';
import FormLayout from '@/layouts/admin/form-layout';
import { useDeleteModal } from '@/providers/delete-modal-context';
import { toast } from 'sonner';

const ProjectDelete = () => {
    const { itemToDelete: project } = useDeleteModal();

    const { fetchData, loading } = useFetch();

    async function submit() {
        if (project.value == null) return;

        await fetchData({
            url: `/admin/projects/${project.value.id}`,
            method: 'DELETE',
            onSuccess: () => {
                project.value = null;
                toast.success('Deleted!');
                document.dispatchEvent(new Event('itemDeleted'));
            },
            onError: () => toast.error('Error'),
        });
    }

    return (
        <FormLayout onSubmit={submit}>
            <DeleteConfirmation
                itemName="project"
                onCancel={() => (project.value = null)}
                loading={loading}
            />
        </FormLayout>
    );
};

export default ProjectDelete;
