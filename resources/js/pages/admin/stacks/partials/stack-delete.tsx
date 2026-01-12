import DeleteConfirmation from '@/components/admin/form/delete-confirmation';
import { useFetch } from '@/hooks/use-fetch';
import FormLayout from '@/layouts/admin/form-layout';
import { useDeleteModal } from '@/providers/delete-modal-context';
import { toast } from 'sonner';

const StackDelete = () => {
    const { itemToDelete: stack } = useDeleteModal();

    const { fetchData, loading } = useFetch();

    async function submit() {
        if (stack.value == null) return;

        await fetchData({
            url: `/admin/stacks/${stack.value.id}`,
            method: 'DELETE',
            onSuccess: () => {
                stack.value = null;
                toast.success('Deleted!');
                document.dispatchEvent(new Event('itemDeleted'));
            },
            onError: () => toast.error('Error'),
        });
    }

    return (
        <FormLayout onSubmit={submit}>
            <DeleteConfirmation
                itemName="stack"
                onCancel={() => (stack.value = null)}
                loading={loading}
            />
        </FormLayout>
    );
};

export default StackDelete;
