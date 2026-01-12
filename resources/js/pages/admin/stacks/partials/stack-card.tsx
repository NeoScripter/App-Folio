import { Button } from '@/components/auth/form/button';
import { Anchor } from '@/components/user/ui/anchor';
import FluidImage from '@/components/user/ui/fluid-image';
import { StackType } from '@/lib/types/stacks';
import { useDeleteModal } from '@/providers/delete-modal-context';
import { locale } from '@/signals/locale';
import { FC } from 'preact/compat';

const StackCard: FC<{ stack: StackType }> = ({ stack }) => {
    const { itemToDelete } = useDeleteModal();
    return (
        <li className="max-w-140 text-base">
            <h3 class="mb-3 font-bold">{stack.attributes.author.en}</h3>
            <div className="mb-4">{stack.attributes.description.en}</div>
            {stack.image && (
                <FluidImage
                    parentClass="size-40 mb-6 shrink-0 rounded-xl"
                    alt={stack.image.alt[locale.value]}
                    tiny={stack.image.tiny}
                    dkWebp={stack.image.mbWebp}
                    dkAvif={stack.image.mbAvif}
                    tbWebp={stack.image.mbWebp}
                    tbAvif={stack.image.mbAvif}
                    mbWebp={stack.image.mbWebp}
                    mbAvif={stack.image.mbAvif}
                />
            )}

            <div class="flex items-center gap-2">
                <Anchor
                    href={`/stacks/${stack.id}`}
                    class="text-sm"
                    variant="primary"
                >
                    Edit
                </Anchor>
                <Button
                    class="rounded-xl"
                    onClick={() => (itemToDelete.value = stack)}
                    variant="destructive"
                >
                    Delete
                </Button>
            </div>
        </li>
    );
};

export default StackCard;

export const StackCardSkeleton = () => {
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
