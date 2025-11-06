import { cn } from '@/utils/cn';
import { useState } from 'preact/hooks';

type HeroBackgroundProps = {
    desktopImg: string;
    tabletImg: string;
    mobileImg: string;
    tinyDesktopImg?: string;
    tinyTabletImg?: string;
    tinyMobileImg?: string;
    className?: string;
};

export default function HeroBackground({
    desktopImg,
    tabletImg,
    mobileImg,
    tinyDesktopImg,
    tinyTabletImg,
    tinyMobileImg,
    className,
}: HeroBackgroundProps) {
    const [isLoading, setIsLoading] = useState(true);

    const tinyDesktop = tinyDesktopImg || desktopImg;
    const tinyTablet = tinyTabletImg || tabletImg;
    const tinyMobile = tinyMobileImg || mobileImg;

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
                    'block size-full w-full object-cover object-bottom-right transition-all duration-500 ease-in-out',
                    isLoading && 'opacity-0',
                )}
            >
                <source srcSet={desktopImg} media="(min-width: 900px)" />
                <source srcSet={tabletImg} media="(min-width: 500px)" />
                <img
                    onLoad={() => setIsLoading(false)}
                    src={mobileImg}
                    alt=""
                    className="block size-full object-cover object-bottom-right"
                />
            </picture>

            {/* Loading state with tiny/low-quality images */}
            <div
                role="status"
                aria-label="Фото загружается"
                className={cn(
                    'absolute inset-0 -z-5 flex h-full max-h-screen w-full items-center justify-center',
                    !isLoading && 'opacity-0',
                )}
            >
                <div
                    aria-hidden="true"
                    className={cn(
                        isLoading &&
                            'absolute inset-0 size-full animate-pulse bg-gray-200/50',
                    )}
                ></div>

                <picture
                    aria-hidden="true"
                    className={cn(
                        'block size-full w-full object-cover object-bottom-right transition-all duration-500 ease-in-out',
                    )}
                >
                    <source srcSet={tinyDesktop} media="(min-width: 900px)" />
                    <source srcSet={tinyTablet} media="(min-width: 500px)" />
                    <img
                        onLoad={() => setIsLoading(false)}
                        src={tinyMobile}
                        alt=""
                        className="block size-full object-cover object-bottom-right"
                    />
                </picture>
            </div>
        </div>
    );
}
