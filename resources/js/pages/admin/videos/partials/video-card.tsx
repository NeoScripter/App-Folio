import { Button } from '@/components/auth/form/button';
import { Anchor } from '@/components/user/ui/anchor';
import FluidImage from '@/components/user/ui/fluid-image';
import { VideoType } from '@/lib/types/videos';
import { useDeleteModal } from '@/providers/delete-modal-context';
import { locale } from '@/signals/locale';
import { FC } from 'preact/compat';

const VideoCard: FC<{ video: VideoType }> = ({ video }) => {
    const { itemToDelete } = useDeleteModal();
    return (
        <li className="max-w-140 text-base">
            {video.image && (
                <FluidImage
                    parentClass="w-60 shadow-md aspect-video mb-6 shrink-0 rounded-xl"
                    alt={video.image.alt[locale.value]}
                    tiny={video.image.tiny}
                    dkWebp={video.image.mbWebp}
                    dkAvif={video.image.mbAvif}
                    tbWebp={video.image.mbWebp}
                    tbAvif={video.image.mbAvif}
                    mbWebp={video.image.mbWebp}
                    mbAvif={video.image.mbAvif}
                />
            )}

            <div class="flex items-center gap-2">
                <Anchor
                    href={`/videos/${video.id}`}
                    class="text-sm"
                    variant="primary"
                >
                    Edit
                </Anchor>
                <Button
                    class="rounded-xl"
                    onClick={() => (itemToDelete.value = video)}
                    variant="destructive"
                >
                    Delete
                </Button>
            </div>
        </li>
    );
};

export default VideoCard;

export const VideoCardSkeleton = () => {
    return (
        <li className="w-full max-w-140 list-none text-base">
            <div class="skeleton mb-6 w-60 aspect-video shrink-0 rounded-xl" />

            <div class="flex items-center gap-2">
                <div class="skeleton w-fit rounded-xl px-3 py-1">
                    Lorem Lorem
                </div>
                <div class="skeleton w-fit rounded-xl px-3 py-1">
                    Lorem Lorem
                </div>
            </div>
        </li>
    );
};
