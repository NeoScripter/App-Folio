import { Button } from '@/components/auth/form/button';
import { Anchor } from '@/components/user/ui/anchor';
import { ReviewType } from '@/lib/types/reviews';
import { useDeleteModal } from '@/providers/delete-modal-context';
import { FC } from 'preact/compat';

const ReviewCard: FC<{ review: ReviewType }> = ({ review }) => {
    const { itemToDelete } = useDeleteModal();
    return (
        <li className="max-w-140 text-base">
            <h3 class="mb-3 font-bold">{review.attributes.author.en}</h3>
            <div className="mb-4">{review.attributes.description.en}</div>
            <div class="flex items-center gap-2">
                <Anchor
                    href={`/reviews/${review.id}`}
                    class="text-sm"
                    variant="primary"
                >
                    Edit
                </Anchor>
                <Button
                    class="rounded-xl"
                    onClick={() => (itemToDelete.value = review)}
                    variant="destructive"
                >
                    Delete
                </Button>
            </div>
        </li>
    );
};

export default ReviewCard;
