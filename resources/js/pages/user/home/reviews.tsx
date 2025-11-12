import ApiError from '@/components/user/ui/api-error';
import CarouselControls from '@/components/user/ui/carousel-controls';
import { useCarousel } from '@/hooks/use-carousel';
import { useFetch } from '@/hooks/use-fetch';
import { ReviewType } from '@/lib/types/reviews';
import { cn } from '@/utils/cn';
import { range } from '@/utils/range';
import { useEffect, useRef } from 'preact/compat';
import ReviewCard, { ReviewCardSkeleton } from './review-card';

const Reviews = () => {
    const { fetchData, loading, errors } = useFetch();
    const carouselRef = useRef(null);
    const {
        slides: carouselSlides,
        handleTouchStart,
        animatingSlide,
        handleTouchEnd,
        handleIncrement,
        handleDecrement,
        currentSlide,
        setter,
    } = useCarousel<ReviewType>({
        containerRef: carouselRef,
    });

    useEffect(() => {
        fetchData({
            url: '/api/reviews',
            onSuccess: (data) => {
                setter(data.data);
            },
        });
    }, []);

    if (errors != null)
        return (
            <ApiError
                resourceRu="отзывов клиентов"
                resourceEn="client reviews"
            />
        );

    return (
        <div>
            <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative mt-16 mb-13 sm:my-19 lg:mb-23"
            >
                <ul
                    ref={carouselRef}
                    className={cn(
                        '-ml-5 flex w-max items-start gap-6 sm:-ml-15 sm:gap-10 md:-ml-19 lg:-ml-27 lg:gap-13 xl:-ml-47',
                    )}
                >
                    {!loading
                        ? carouselSlides?.map((review, idx) => (
                              <ReviewCard
                                  key={review.id}
                                  active={idx === animatingSlide}
                                  review={review}
                              />
                          ))
                        : range(0, 8).map((skeleton) => (
                              <ReviewCardSkeleton
                                  key={`review-skeleton-${skeleton}`}
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

export default Reviews;
