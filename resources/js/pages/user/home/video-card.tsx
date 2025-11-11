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
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
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
                    <div class="absolute inset-0 translate-y-1/5 m-auto size-23 xl:size-32">
                        <img
                            aria-hidden="true"
                            class="size-full"
                            src={PlayBtn}
                            alt="play button"
                        />
                    </div>
                )}
                <button
                    type="button"
                    class="absolute inset-0 z-10"
                    onClick={() => setLoaded(true)}
                />
            </>
        );
    };

    return (
        <li
            class={cn(
                'shadow-video ease relative isolate h-85 w-[60vw] overflow-clip rounded-xl transition-all duration-300 lg:h-80 lg:w-[50vw] xl:h-108',
                {
                    'translate-x-1/3': leftNei,
                    '-translate-x-1/3': rightNei,
                    'z-10 scale-130 md:scale-120': active,
                },
            )}
        >
            {!active && (
                <div
                    aria-hidden="true"
                    class="pointer-events-none absolute inset-0 z-10 bg-black/40"
                />
            )}
            {loaded ? <Iframe /> : <Preview />}
        </li>
    );
};

export default VideoCard;

export const VideoCardSkeleton = () => {
    return (
        <li
            class={cn(
                'bg-muted video-slide border-accent-foreground/15 ease flex flex-col items-start gap-8 rounded-xl border py-7.5 pr-7 pl-6 select-none sm:flex-row sm:gap-10.5 sm:py-12 sm:pr-18 sm:pl-8 sm:text-base md:items-center lg:gap-12 lg:pt-12 lg:pr-17 lg:pb-18 lg:pl-10.5 lg:text-xl xl:pb-13',
            )}
        >
            <div class="skeleton size-32 shrink-0 animate-pulse rounded-full md:size-40 lg:size-51" />
        </li>
    );
};
