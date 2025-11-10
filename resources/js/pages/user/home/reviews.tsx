import ApiError from '@/components/user/ui/api-error';
import LazyImage from '@/components/user/ui/lazy-image';
import { useCarousel } from '@/hooks/use-carousel';
import { useFetch } from '@/hooks/use-fetch';
import { ReviewType } from '@/lib/types/reviews';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { FC, useEffect, useRef } from 'preact/compat';

const Reviews = () => {
    const { fetchData, loading, errors } = useFetch();
    const carouselRef = useRef(null);
    const {
        slides: carouselSlides,
        handleTouchStart,
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
                className="relative mt-16 mb-13 overflow-x-clip sm:my-19 lg:mb-23"
            >
                current slide: {currentSlide}
                <ul
                    ref={carouselRef}
                    className={cn(
                        'flex w-max gap-[10px] sm:gap-[17px] xl:gap-[15px]',
                    )}
                >
                    {carouselSlides?.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </ul>
            </div>

            <div class="flex items-center gap-4">
                <button onClick={handleDecrement}>Left</button>
                <button onClick={handleIncrement}>Right</button>
            </div>
        </div>
    );
};

export default Reviews;

const ReviewCard: FC<{ review: ReviewType }> = ({ review }) => {
    const lang = locale.value === 'ru' ? 'Ru' : 'En';

    return (
        <li class="bg-muted flex max-w-240 flex-col items-start gap-8 rounded-xl py-7.5 pr-7 pl-6 select-none sm:flex-row sm:gap-10.5 sm:py-12 sm:pr-18 sm:pl-8 sm:text-base md:items-center lg:gap-12 lg:pt-12 lg:pr-17 lg:pb-18 lg:pl-10.5 lg:text-xl xl:pb-13">
            {review.image && (
                <LazyImage
                    parentClass="size-32 md:size-40 lg:size-51 shrink-0 rounded-full"
                    alt={review.image[`alt${lang}`]}
                    tinyImg={review.image.tinyPath}
                    img={review.image.path}
                />
            )}
            <div>
                <p class="mb-6">{review.attributes[`description${lang}`]}</p>

                <p class="font-bold md:text-xl xl:text-2xl">
                    {review.attributes[`author${lang}`]}
                </p>
            </div>
        </li>
    );
};
