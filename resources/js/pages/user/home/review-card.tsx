import LazyImage from '@/components/user/ui/lazy-image';
import { ReviewType } from '@/lib/types/reviews';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const ReviewCard: FC<{ review: ReviewType; active: boolean }> = ({
    review,
    active,
}) => {
    const lang = locale.value === 'ru' ? 'Ru' : 'En';

    return (
        <li
            class={cn(
                'bg-muted review-slide border-accent-foreground/15 ease flex flex-col items-start gap-8 rounded-xl border py-7.5 pr-7 pl-6 transition-opacity duration-500 ease-in select-none sm:flex-row sm:gap-10.5 sm:py-12 sm:pr-18 sm:pl-8 sm:text-base md:items-center lg:gap-12 lg:pt-12 lg:pr-17 lg:pb-18 lg:pl-10.5 lg:text-xl xl:pb-13',
                !active && 'opacity-30',
            )}
        >
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

export default ReviewCard;

export const ReviewCardSkeleton = () => {
    return (
        <li
            class={cn(
                'bg-muted review-slide border-accent-foreground/15 ease flex flex-col items-start gap-8 rounded-xl border py-7.5 pr-7 pl-6 select-none sm:flex-row sm:gap-10.5 sm:py-12 sm:pr-18 sm:pl-8 sm:text-base md:items-center lg:gap-12 lg:pt-12 lg:pr-17 lg:pb-18 lg:pl-10.5 lg:text-xl xl:pb-13',
            )}
        >
            <div class="skeleton size-32 shrink-0 animate-pulse rounded-full md:size-40 lg:size-51" />
            <div>
                <p class="skeleton mb-6">
                    Lorem ipsum dolor sit amet consectetur. In enim cursus odio
                    accumsan. Id leo urna velit neque mattis id tellus arcu
                    condimentum. Augue dictum dolor elementum convallis
                    dignissim malesuada commodo ultrices.
                </p>

                <p class="skeleton animate-pulse font-bold md:text-xl xl:text-2xl w-40">
                    Lorem
                </p>
            </div>
        </li>
    );
};
