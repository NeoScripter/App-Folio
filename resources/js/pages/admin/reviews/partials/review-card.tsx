import { Button } from '@/components/auth/form/button';
import { Anchor } from '@/components/user/ui/anchor';
import FluidImage from '@/components/user/ui/fluid-image';
import { ReviewType } from '@/lib/types/reviews';
import { useDeleteModal } from '@/providers/delete-modal-context';
import { locale } from '@/signals/locale';
import { FC } from 'preact/compat';

const ReviewCard: FC<{ review: ReviewType }> = ({ review }) => {
    const { itemToDelete } = useDeleteModal();
    return (
        <li className="max-w-140 text-base">
            <h3 class="mb-3 font-bold">{review.attributes.author.en}</h3>
            <div className="mb-4">{review.attributes.description.en}</div>
            {review.image && (
                <FluidImage
                    parentClass="size-40 mb-6 shrink-0 rounded-xl"
                    alt={review.image.alt[locale.value]}
                    tiny={review.image.tiny}
                    dkWebp={review.image.mbWebp}
                    dkAvif={review.image.mbAvif}
                    tbWebp={review.image.mbWebp}
                    tbAvif={review.image.mbAvif}
                    mbWebp={review.image.mbWebp}
                    mbAvif={review.image.mbAvif}
                />
            )}

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

export const ReviewCardSkeleton = () => {
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
            <div class="skeleton mb-6 size-40 shrink-0 rounded-xl" />

            <div class="flex items-center gap-2">
                <div class="w-fit skeleton rounded-xl px-3 py-1">Lorem Lorem</div>
                <div class="w-fit skeleton rounded-xl px-3 py-1">Lorem Lorem</div>
            </div>
        </li>
    );
};
