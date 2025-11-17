import Quote from '@/components/user/svgs/quote';
import AppSection from '@/layouts/user/app-section';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const QuoteSection: FC<{ className?: string }> = ({ className }) => {
    return (
        <AppSection
            className={cn(
                'relative isolate flex flex-wrap pt-25 pb-34 sm:pt-38 sm:pb-48 lg:pt-46 lg:pb-44.5 xl:pt-76 xl:pb-73',
                className,
            )}
        >
            <blockquote class="relative isolate m-auto mx-auto max-w-9/10 sm:max-w-147 lg:max-w-208 2xl:max-w-307">
                <p class="text-center text-balance sm:text-xl xl:text-3xl 2xl:text-4xl">
                    Я специализируюсь на создании качественных и надежных
                    сайтов. За годы работы я помог многим клиентам реализовать
                    их проекты — от простых портфолио до сложных
                    интернет-магазинов.
                </p>

                <span aria-hidden="true" class="absolute -right-10 -bottom-20 block size-15 select-none xl:-right-20 xl:size-19 2xl:-right-5 2xl:size-22">
                    <Quote className="size-full" />
                </span>
                <span aria-hidden="true" class="absolute -top-15 -left-10 block size-15 rotate-180 xl:-left-20 xl:size-19 2xl:-left-5 2xl:size-22">
                    <Quote className="size-full" />
                </span>
            </blockquote>
        </AppSection>
    );
};

export default QuoteSection;
