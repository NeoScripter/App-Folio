import { cn } from '@/utils/cn';
import { useState } from 'preact/hooks';

type FluidImageProps = {
    parentClass?: string;
    imgClass?: string;
    dkWebp: string;
    dkAvif?: string;
    tbWebp: string;
    tbAvif?: string;
    mbWebp: string;
    mbAvif?: string;
    tiny: string;
    alt?: string;
};

export default function FluidImage({
    parentClass,
    imgClass,
    alt,
    dkWebp,
    dkAvif,
    tbWebp,
    tbAvif,
    mbWebp,
    mbAvif,
    tiny,
}: FluidImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div
            className={cn('relative overflow-clip', parentClass)}
            {...(alt == null && { 'aria-hidden': 'true' })}
        >
            <picture className="block size-full">
                {dkAvif && (
                    <source
                        type="image/avif"
                        srcSet={dkAvif}
                        media="(min-width: 56rem)"
                    />
                )}
                <source
                    type="image/webp"
                    srcSet={dkWebp}
                    media="(min-width: 56rem)"
                />
                {tbAvif && (
                    <source
                        type="image/avif"
                        srcSet={tbAvif}
                        media="(min-width: 31rem)"
                    />
                )}
                <source
                    type="image/webp"
                    srcSet={tbWebp}
                    media="(min-width: 31rem)"
                />
                {mbAvif && <source type="image/avif" srcSet={mbAvif} />}

                <img
                    onLoad={() => setIsLoading(false)}
                    src={mbWebp}
                    alt=""
                    loading="lazy"
                    className={cn(
                        'size-full object-cover object-center transition-all duration-500 ease-in-out',
                        imgClass,
                        isLoading && 'opacity-0',
                    )}
                    aria-hidden={isLoading}
                />
            </picture>

            {isLoading && (
                <div
                    role="status"
                    aria-label="Фото загружается"
                    className="absolute inset-0 z-10 flex items-center justify-center"
                >
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 z-10 size-full animate-pulse bg-gray-200/50"
                    ></div>

                    <img
                        aria-hidden={!isLoading}
                        src={tiny}
                        alt={alt}
                        className="size-full object-cover object-center"
                    />
                </div>
            )}
        </div>
    );
}
