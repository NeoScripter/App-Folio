import CarouselControls from '@/components/user/ui/carousel-controls';
import { useCarousel } from '@/hooks/use-carousel';
import { ReviewType } from '@/lib/types/reviews';
import { cn } from '@/utils/cn';
import { useRef } from 'preact/compat';
import ReviewCard from './review-card';

const Services = () => {
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
                    {carouselSlides?.map((review, idx) => (
                        <ReviewCard
                            key={review.id}
                            active={idx === 3}
                            review={review}
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

export default Services;
