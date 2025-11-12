import PlayBtn from '@/assets/svgs/play-btn.svg';
import LazyImage from '@/components/user/ui/lazy-image';
import { VideoType } from '@/lib/types/videos';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { FC, useState } from 'preact/compat';

const VideoCard: FC<{
    video: VideoType;
    active: boolean;
    leftNei: boolean;
    rightNei: boolean;
}> = ({ video, active, leftNei, rightNei }) => {
    const lang = locale.value === 'ru' ? 'Ru' : 'En';

    const [loaded, setLoaded] = useState(false);

    const Iframe = () => {
        return (
            <iframe
                width="100%"
                height="100%"
                src={video.attributes.url}
                title={video.attributes[`title${lang}`]}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
        );
    };

    const Preview = () => {
        return (
            <>
                {' '}
                {video.image && (
                    <LazyImage
                        parentClass="size-full"
                        imgClass="object-top-left"
                        alt={video.image[`alt${lang}`]}
                        tinyImg={video.image.tinyPath}
                        img={video.image.path}
                    />
                )}
                {active && (
                    <>
                        <div class="absolute inset-0 m-auto size-23 translate-y-1/5 xl:size-32">
                            <img
                                aria-hidden="true"
                                class="size-full"
                                src={PlayBtn}
                                alt="play button"
                            />
                        </div>
                        <button
                            type="button"
                            class="absolute inset-0 z-10"
                            onClick={() => setLoaded(true)}
                        />
                    </>
                )}
            </>
        );
    };

    return (
        <li
            class={cn(
                'shadow-video ease-in relative isolate h-85 w-[60vw] max-w-240 overflow-clip rounded-xl transition-all bg-user-background duration-650 lg:h-80 lg:w-[50vw] xl:h-108 2xl:h-120',
                {
                    'translate-x-1/3': leftNei,
                    '-translate-x-1/3': rightNei,
                    'z-10 scale-130 md:scale-120': active,
                    'pointer-event-none opacity-0':
                        !active && !rightNei && !leftNei,
                },
            )}
        >
            {!active && (
                <div
                    aria-hidden="true"
                    class="pointer-events-none absolute inset-0 z-10 bg-black/40"
                />
            )}
            {loaded && active ? <Iframe /> : <Preview />}
        </li>
    );
};

export default VideoCard;

export const VideoCardSkeleton = () => {
    return (
        <li
            class={cn(
                'shadow-video h-85 w-[60vw] max-w-240 rounded-xl lg:h-80 lg:w-[50vw] xl:h-108 2xl:h-120 skeleton shrink-0',
            )}
        />
    );
};
