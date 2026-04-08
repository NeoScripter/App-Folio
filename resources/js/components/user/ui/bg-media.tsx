import { ImageSrcSet } from '@/lib/types/shared';
import { buildSrcSet } from '@/utils/buildSrcSet';
import { cn } from '@/utils/cn';
import { useState } from 'preact/hooks';

type BgMediaProps = {
    srcs: ImageSrcSet | undefined;
    className?: string;
};

export default function BgMedia({ srcs, className }: BgMediaProps) {
    const [isLoading, setIsLoading] = useState(true);

    if (!srcs) {
        return null;
    }

    return (
        <div
            aria-hidden="true"
            className={cn(
                'pointer-events-none absolute inset-0 -z-5 overflow-clip select-none',
                className,
            )}
        >
            {/* Main high-quality images */}
            <picture
                className={cn(
                    'block size-full transition-all duration-500 ease-in-out',
                    isLoading && 'opacity-0',
                )}
            >
                {srcs.dkAvif && (
                    <source
                        type="image/avif"
                        srcSet={buildSrcSet([
                            [srcs.dkAvif, '1x'],
                            [srcs.dkAvif2x, '2x'],
                            [srcs.dkAvif3x, '3x'],
                        ])}
                        media="(min-width: 56rem)"
                    />
                )}
                <source
                    type="image/webp"
                    srcSet={buildSrcSet([
                        [srcs.dk, '1x'],
                        [srcs.dk2x, '2x'],
                        [srcs.dk3x, '3x'],
                    ])}
                    media="(min-width: 56rem)"
                />
                {srcs.tbAvif && (
                    <source
                        type="image/avif"
                        srcSet={buildSrcSet([
                            [srcs.tbAvif, '1x'],
                            [srcs.tbAvif2x, '2x'],
                            [srcs.tbAvif3x, '3x'],
                        ])}
                        media="(min-width: 31rem)"
                    />
                )}
                <source
                    type="image/webp"
                    srcSet={buildSrcSet([
                        [srcs.tb, '1x'],
                        [srcs.tb2x, '2x'],
                        [srcs.tb3x, '3x'],
                    ])}
                    media="(min-width: 31rem)"
                />
                {srcs.mbAvif && (
                    <source
                        type="image/avif"
                        srcSet={buildSrcSet([
                            [srcs.mbAvif, '1x'],
                            [srcs.mbAvif2x, '2x'],
                            [srcs.mbAvif3x, '3x'],
                        ])}
                    />
                )}
                <img
                    onLoad={() => setIsLoading(false)}
                    srcSet={buildSrcSet([
                        [srcs.mb, '1x'],
                        [srcs.mb2x, '2x'],
                        [srcs.mb3x, '3x'],
                    ])}
                    alt=""
                    className="block size-full object-cover object-bottom-right"
                />
            </picture>

            {/* Loading state with tiny placeholder */}
            {isLoading && (
                <div
                    role="status"
                    aria-label="Фото загружается"
                    className="absolute inset-0 -z-5 flex h-full max-h-screen w-full items-center justify-center"
                >
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 size-full animate-pulse bg-gray-200/50"
                    />
                    <img
                        aria-hidden="true"
                        src={srcs.mbTiny}
                        alt=""
                        className="block size-full object-cover object-bottom-right"
                    />
                </div>
            )}
        </div>
    );
}
