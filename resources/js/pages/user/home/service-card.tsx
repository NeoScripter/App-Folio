import LazyImage from '@/components/user/ui/lazy-image';
import { ReviewType } from '@/lib/types/reviews';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const ServiceCard: FC<{ review: ReviewType; active: boolean }> = ({
    review,
    active,
}) => {
    const lang = locale.value === 'ru' ? 'Ru' : 'En';

    return (
        <li
            class={cn(
                'bg-muted review-slide border-accent-foreground/15 ease flex flex-col items-start gap-8 rounded-xl border py-7.5 pr-7 pl-6 transition-opacity duration-150 select-none sm:flex-row sm:gap-10.5 sm:py-12 sm:pr-18 sm:pl-8 sm:text-base md:items-center lg:gap-12 lg:pt-12 lg:pr-17 lg:pb-18 lg:pl-10.5 lg:text-xl xl:pb-13',
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

export default ServiceCard;
