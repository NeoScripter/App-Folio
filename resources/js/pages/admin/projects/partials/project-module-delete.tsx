import DeleteConfirmation from '@/components/admin/form/delete-confirmation';
import { useFetch } from '@/hooks/use-fetch';
import FormLayout from '@/layouts/admin/form-layout';
import { useDeleteModal } from '@/providers/delete-modal-context';
import { toast } from 'sonner';

const ProjectModuleDelete = () => {
    const { itemToDelete: module } = useDeleteModal();

    const { fetchData, loading } = useFetch();

    async function submit() {
        if (module.value == null) return;

        console.log(module.value)
        await fetchData({
            url: `/admin/project-modules/${module.value.id}`,
            method: 'DELETE',
            onSuccess: () => {
                module.value = null;
                toast.success('Deleted!');
                document.dispatchEvent(new Event('itemDeleted'));
            },
            onError: () => toast.error('Error'),
        });
    }

    return (
        <FormLayout onSubmit={submit}>
            <DeleteConfirmation
                itemName="module"
                onCancel={() => (module.value = null)}
                loading={loading}
            />
        </FormLayout>
    );
};

export default ProjectModuleDelete;
