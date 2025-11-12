import ApiError from '@/components/user/ui/api-error';
import CarouselControls from '@/components/user/ui/carousel-controls';
import { useCarousel } from '@/hooks/use-carousel';
import { useFetch } from '@/hooks/use-fetch';
import { VideoType } from '@/lib/types/videos';
import { cn } from '@/utils/cn';
import { range } from '@/utils/range';
import { useEffect, useRef } from 'preact/compat';
import VideoCard, { VideoCardSkeleton } from './video-card';

const Videos = () => {
    const { fetchData, loading, errors } = useFetch();
    const carouselRef = useRef(null);
    const {
        slides: carouselSlides,
        animatingSlide,
        handleTouchStart,
        handleTouchEnd,
        handleIncrement,
        handleDecrement,
        currentSlide,
        setter,
    } = useCarousel<VideoType>({
        containerRef: carouselRef,
    });

    useEffect(() => {
        fetchData({
            url: '/api/videos',
            onSuccess: (data) => {
                console.log(data);
                setter(data.data);
            },
        });
    }, []);

    if (errors != null)
        return (
            <ApiError resourceRu="видео проектов" resourceEn="video projects" />
        );

    return (
        <div>
            <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative mt-16 mb-40 sm:mt-19"
            >
                <ul
                    ref={carouselRef}
                    className={cn(
                        'flex w-max items-start md:-ml-5 lg:-ml-27 xl:-ml-47',
                        {
                            'gap-2 sm:gap-5 md:gap-8 xl:gap-10' : loading
                        }
                    )}
                >
                    {!loading
                        ? carouselSlides?.map((video, idx) => (
                              <VideoCard
                                  key={video.id}
                                  active={idx === animatingSlide}
                                  leftNei={idx === animatingSlide - 1}
                                  rightNei={idx === animatingSlide + 1}
                                  video={video}
                              />
                          ))
                        : range(0, 8).map((skeleton) => (
                              <VideoCardSkeleton
                                  key={`video-skeleton-${skeleton}`}
                              />
                          ))}
                </ul>
            </div>

            <CarouselControls
                current={currentSlide}
                slides={carouselSlides.length}
                handlePrev={handleDecrement}
                handleNext={handleIncrement}
            />
        </div>
    );
};

export default Videos;
