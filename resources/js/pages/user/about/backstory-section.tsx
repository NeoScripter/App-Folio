import LazyImage from '@/components/user/ui/lazy-image';
import SecondaryHeading from '@/components/user/ui/secondary-heading';
import AppSection from '@/layouts/user/app-section';
import { backstoryItems, BackstoryItemType } from '@/lib/data/backstory-items';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const BackstorySection: FC<{ className?: string }> = ({ className }) => {
    return (
        <AppSection
            className={cn(
                'py-14 sm:pt-19 sm:pb-12 lg:pt-17 lg:pb-22 xl:px-0 xl:pb-18',
                className,
            )}
        >
            <SecondaryHeading className="xs:text-center xs:text-balance">
                Как я стал программистом
            </SecondaryHeading>

            <div class="mt-16 mb-13 space-y-11 sm:my-19 sm:space-y-16 lg:mb-23 xl:mt-25 xl:space-y-22">
                {backstoryItems.map((item, idx) => (
                    <BackstoryItem
                        key={item.id}
                        item={item}
                        isEven={(idx + 1) % 2 === 0}
                    />
                ))}
            </div>
        </AppSection>
    );
};

export default BackstorySection;

const BackstoryItem: FC<{ item: BackstoryItemType; isEven: boolean }> = ({
    item,
    isEven,
}) => {
    const lang = locale.value === 'ru' ? 'Ru' : 'En';

    return (
        <div class="xl:flex xl:gap-16">
            <LazyImage
                img={item.img}
                tinyImg={item.tinyImg}
                alt={item[`text${lang}`]}
                parentClass={cn(
                    '-mx-5 mb-9 max-w-175 sm:mb-16 xl:mb-0 xl:max-w-129 xl:shrink-0',
                    {
                        'sm:-mr-15 sm:ml-auto md:-mr-20 lg:-mr-28 xl:order-2 2xl:-mr-16':
                            isEven,
                        'sm:mr-auto sm:-ml-15 md:-ml-20 lg:-ml-28 2xl:-ml-16':
                            !isEven,
                    },
                )}
                imgClass={cn('2xl:rounded-[2rem]', {
                    'xl:rounded-l-[2rem]': isEven,
                    'xl:rounded-r-[2rem]': !isEven,
                })}
            />
            <div
                class="prose sm:prose-base prose-sm lg:prose-lg 2xl:prose-xl text-foreground [&>h2]:text-foreground max-w-full"
                dangerouslySetInnerHTML={{
                    __html: item[`text${lang}`] || '',
                }}
            />
        </div>
    );
};
