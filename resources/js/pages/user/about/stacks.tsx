import StackBgTiny from '@/assets/images/about/stack-bg-tiny.webp';
import StackBg from '@/assets/images/about/stack-bg.webp';
import ApiError from '@/components/user/ui/api-error';
import LazyImage from '@/components/user/ui/lazy-image';
import { useFetch } from '@/hooks/use-fetch';
import { StackType } from '@/lib/types/stacks';
import { cn } from '@/utils/cn';
import { range } from '@/utils/range';
import { useEffect, useState } from 'preact/compat';
import { ReviewCardSkeleton } from '../home/review-card';
import StackBtn from './stack-btn';

const Stacks = () => {
    const { fetchData, loading, errors } = useFetch();
    const [stacks, setStacks] = useState<StackType[] | null>(null);
    const [active, setActive] = useState<number | null>(null);

    const handleSetActive = (idx: number) => {
        setActive(idx);
    };

    useEffect(() => {
        fetchData({
            url: '/api/stacks',
            onSuccess: (data) => {
                setStacks(data.data);
            },
        });
    }, []);

    if (errors != null)
        return (
            <ApiError
                resourceRu="языков программирования"
                resourceEn="programming languages"
            />
        );

    console.log(stacks);

    return (
        <div>
            <div className="relative mt-16 mb-13 sm:my-19 lg:mb-23">
                <ul
                    className={cn(
                        'border-muted mx-auto flex w-fit flex-wrap items-start gap-1 rounded-xl p-5 shadow-md',
                    )}
                >
                    {!loading
                        ? stacks?.map((stack, idx) => (
                              <StackBtn
                                  onClick={() => handleSetActive(idx)}
                                  key={stack.id}
                                  stack={stack}
                                  active={idx === active}
                              />
                          ))
                        : range(0, 8).map((skeleton) => (
                              <ReviewCardSkeleton
                                  key={`stack-skeleton-${skeleton}`}
                              />
                          ))}
                </ul>

                <div class="lg:py-13.4 relative isolate -mx-5 mt-18 overflow-clip px-5 py-11.5 sm:-mx-20 sm:px-15.5 sm:py-12.5 lg:rounded-xl lg:px-23.5 xl:py-17">
                    <LazyImage
                        img={StackBg}
                        alt=""
                        tinyImg={StackBgTiny}
                        parentClass="absolute -inset-4 -z-4"
                    />
                    <div
                        class="prose sm:prose-base prose-sm max-w-full text-white [&>h2]:text-white"
                        dangerouslySetInnerHTML={{
                            __html: stacks?.[0].attributes.htmlEn || '',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Stacks;
