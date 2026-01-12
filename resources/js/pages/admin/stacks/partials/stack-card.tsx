import { Button } from '@/components/auth/form/button';
import { Anchor } from '@/components/user/ui/anchor';
import { StackType } from '@/lib/types/stacks';
import { useDeleteModal } from '@/providers/delete-modal-context';
import { FC } from 'preact/compat';

const StackCard: FC<{ stack: StackType }> = ({ stack }) => {
    const { itemToDelete } = useDeleteModal();
    return (
        <li className="max-w-140 text-base">
            <div class="border-foreground/40 my-4 flex size-20 shrink-0 items-center justify-center rounded-xl border">
                <img src={stack.attributes.image} alt="" />
            </div>

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
        <li className="w-full max-w-140 list-none text-base">
            <div class="skeleton my-4 size-20 shrink-0 rounded-xl"></div>

            <div class="flex items-center gap-2">
                <div class="skeleton w-fit rounded-xl px-3 py-1">
                    Loremmm
                </div>
                <div class="skeleton w-fit rounded-xl px-3 py-1">
                    Loremmm
                </div>
            </div>
        </li>
    );
};
