import Quote from '@/components/user/svgs/quote';
import AppSection from '@/layouts/user/app-section';
import { NodeProps } from '@/lib/types/nodeProps';
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

                <QuoteGlyph className='-right-10 -bottom-20 xl:-right-20 2xl:-right-5' />
                <QuoteGlyph className='-top-15 -left-10 rotate-180 xl:-left-20 2xl:-left-5' />
            </blockquote>
        </AppSection>
    );
};

export default QuoteSection;

const QuoteGlyph: FC<NodeProps> = ({ className }) => {
    return (
        <span
            aria-hidden="true"
            class={cn(
                'absolute block size-15 select-none xl:size-19 2xl:size-22',
                className,
            )}
        >
            <Quote className="size-full" />
        </span>
    );
};
