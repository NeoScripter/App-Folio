import StackBgTiny from '@/assets/images/about/stack-bg-tiny.webp';
import StackBg from '@/assets/images/about/stack-bg.webp';
import ApiError from '@/components/user/ui/api-error';
import LazyImage from '@/components/user/ui/lazy-image';
import { useEscapeKey } from '@/hooks/use-escape-key';
import { useFetch } from '@/hooks/use-fetch';
import { StackType } from '@/lib/types/stacks';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { range } from '@/utils/range';
import { FC, useEffect, useRef, useState } from 'preact/compat';
import { ReviewCardSkeleton } from '../home/review-card';
import StackBtn from './stack-btn';

const Stacks = () => {
    const { fetchData, loading, errors } = useFetch();
    const [stacks, setStacks] = useState<StackType[] | null>(null);
    const [active, setActive] = useState<number | null>(null);

    const lang = locale.value === 'ru' ? 'Ru' : 'En';
    const content = active ? stacks?.[active].attributes[`html${lang}`] : null;
    const lastContent = useRef(content);

    useEscapeKey(() => handleSetActive(null));

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const el = e.target as HTMLElement | null;
            if (!el) return;

            const inside = ['#stack-btns', '#stack-content'].some((sel) =>
                el.closest(sel),
            );
            if (!inside) handleSetActive(null);
        };

        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    }, []);

    const handleSetActive = (idx: number | null) => {
        if (idx != null) {
            lastContent.current = stacks?.[idx].attributes[`html${lang}`]
        }
        setActive((prev) => (prev === idx ? null : idx));
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

    return (
        <div>
            <div className="relative mt-16 mb-13 sm:my-19 lg:mb-23">
                <ul
                    id="stack-btns"
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

                <StackContent
                    content={content ?? lastContent.current ?? ''}
                    active={active}
                />
            </div>
        </div>
    );
};

export default Stacks;

const StackContent: FC<{
    content: string | undefined;
    active: number | null;
}> = ({ active, content }) => {
    return (
        <div
            id="stack-content"
            class={cn(
                'relative isolate -mx-5 overflow-clip px-5 sm:-mx-20 sm:px-15.5 lg:rounded-xl lg:px-23.5',
                active
                    ? 'lg:py-13.4 stack-content-open mt-18 max-h-2000 py-11.5 sm:py-12.5 xl:py-17'
                    : 'stack-content-closed mt-0 max-h-0',
            )}
        >
            <LazyImage
                img={StackBg}
                alt=""
                tinyImg={StackBgTiny}
                parentClass="absolute -inset-4 -z-4"
            />
            <div
                class="prose sm:prose-base prose-sm max-w-full text-white [&>h2]:text-white"
                dangerouslySetInnerHTML={{
                    __html: content || '',
                }}
            />
        </div>
    );
};
