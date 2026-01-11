import { Button } from '@/components/auth/form/button';
import { Anchor } from '@/components/user/ui/anchor';
import { FaqType } from '@/lib/types/faqs';
import { useDeleteModal } from '@/providers/delete-modal-context';
import { FC } from 'preact/compat';

const FaqCard: FC<{ faq: FaqType }> = ({ faq }) => {
    const { itemToDelete } = useDeleteModal();
    return (
        <li className="max-w-140 text-base">
            <h3 class="mb-3 font-bold">{faq.attributes.title.en}</h3>
            <div className="mb-4">{faq.attributes.description.en}</div>
            <div class="flex items-center gap-2">
                <Anchor
                    href={`/faqs/${faq.id}`}
                    class="text-sm"
                    variant="primary"
                >
                    Edit
                </Anchor>
                <Button
                    class="rounded-xl"
                    onClick={() => (itemToDelete.value = faq)}
                    variant="destructive"
                >
                    Delete
                </Button>
            </div>
        </li>
    );
};

export default FaqCard;
