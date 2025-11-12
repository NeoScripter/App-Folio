import ApiError from '@/components/user/ui/api-error';
import { useFetch } from '@/hooks/use-fetch';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { FaqResource } from '@/lib/types/faqs';
import { cn } from '@/utils/cn';
import { range } from '@/utils/range';
import { useEffect, useState } from 'preact/compat';
import FaqCard, { FaqSkeleton } from './faq-card';

const Faqs = () => {
    const { fetchData, loading, errors } = useFetch();
    const [data, setData] = useState<FaqResource | null>(null);
    const [currentIdx, setCurrentIdx] = useState<number | null>(null);
    const [ref, isIntersecting] = useIntersectionObserver<HTMLUListElement>();

    const selectFaq = (idx: number) => {
        setCurrentIdx((prev) => (idx === prev ? null : idx));
    };

    useEffect(() => {
        fetchData({
            url: '/api/faqs',
            onSuccess: (data) => {
                setData(data);
            },
        });
    }, []);

    const faqs = data?.data;

    if (errors != null)
        return <ApiError resourceRu="ответы на вопросы" resourceEn="FAQs" />;

    return (
        <div>
            <div className="relative mt-16 mb-40 sm:mt-19">
                <ul
                    ref={ref}
                    className={cn(
                        'isolate grid items-start gap-7 lg:grid-cols-2 lg:gap-x-11',
                    )}
                >
                    {!loading
                        ? faqs?.map((faq, idx) => (
                              <FaqCard
                                  isReached={isIntersecting}
                                  idx={idx}
                                  key={faq.id}
                                  open={idx === currentIdx}
                                  onClick={() => selectFaq(idx)}
                                  faq={faq}
                              />
                          ))
                        : range(0, 5).map((skeleton) => (
                              <FaqSkeleton key={`faq-skeleton-${skeleton}`} />
                          ))}
                </ul>
            </div>
        </div>
    );
};

export default Faqs;
