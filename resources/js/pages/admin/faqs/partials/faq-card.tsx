import { Anchor } from '@/components/user/ui/anchor';
import { FaqType } from '@/lib/types/faqs';
import { FC } from 'preact/compat';

const FaqCard: FC<{ faq: FaqType }> = ({ faq }) => {
    return (
        <li className="max-w-140 text-base">
            <h3 class="font-bold mb-3">{faq.attributes.title.en}</h3>
            <div className="mb-4">{faq.attributes.description.en}</div>
            <Anchor href={`/faqs/${faq.id}`} class="text-sm" variant='primary'>
                Edit
            </Anchor>
        </li>
    );
};

export default FaqCard;
