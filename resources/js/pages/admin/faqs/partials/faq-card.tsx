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

export const FaqCardSkeleton = () => {
    return (
        <li className="w-full list-none max-w-140 text-base">
            <h3 class="skeleton mb-3 w-fit rounded-sm font-bold">
                Lorem ipsum dolor sit
            </h3>
            <div className="skeleton mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                nostrum consequatur quas suscipit possimus temporibus! Quis
                molestias minima illum accusantium! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Tempora, earum!
            </div>
            <div class="flex items-center gap-2">
                <div class="w-fit skeleton rounded-xl px-3 py-1">Lorem Lorem</div>
                <div class="w-fit skeleton rounded-xl px-3 py-1">Lorem Lorem</div>
            </div>
        </li>
    );
};

