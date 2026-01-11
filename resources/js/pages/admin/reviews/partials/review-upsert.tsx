import FormBtn from '@/components/admin/form/form-btn';
import FormInput from '@/components/admin/form/form-input';
import FormTextArea from '@/components/admin/form/form-text-area';
import { useFetch } from '@/hooks/use-fetch';
import FormLayout from '@/layouts/admin/form-layout';
import { ReviewType } from '@/lib/types/reviews';
import { useLocation } from 'preact-iso';
import { FC } from 'preact/compat';
import { useMemo, useReducer } from 'preact/hooks';
import { toast } from 'sonner';

type ReviewUpsertState = {
    name_ru: string;
    name_en: string;
    content_en: string;
    content_ru: string;
};

type Action =
    | { type: 'SET_TITLE_EN'; payload: string }
    | { type: 'SET_TITLE_RU'; payload: string }
    | { type: 'SET_CONTENT_EN'; payload: string }
    | { type: 'SET_CONTENT_RU'; payload: string };

function reducer(state: ReviewUpsertState, action: Action): ReviewUpsertState {
    switch (action.type) {
        case 'SET_TITLE_EN':
            return { ...state, name_en: action.payload };
        case 'SET_TITLE_RU':
            return { ...state, name_ru: action.payload };
        case 'SET_CONTENT_EN':
            return { ...state, content_en: action.payload };
        case 'SET_CONTENT_RU':
            return { ...state, content_ru: action.payload };
        default:
            throw new Error('Unexpected action type');
    }
}

const ReviewUpsert: FC<{ review?: ReviewType }> = ({ review }) => {
    const { route } = useLocation();
    const initialState = useMemo(
        () => ({
            name_en: review?.attributes.author.en ?? '',
            name_ru: review?.attributes.author.ru ?? '',
            content_en: review?.attributes.description.en ?? '',
            content_ru: review?.attributes.description.ru ?? '',
        }),
        [review],
    );
    const [state, dispatch] = useReducer(reducer, initialState);

    const { fetchData, loading, errors } = useFetch();

    const routeName =
        review != null ? `/admin/reviews/${review.id}` : '/admin/reviews';
    const method = review != null ? 'PUT' : 'POST';

    async function submit() {
        await fetchData({
            url: routeName,
            method: method,
            payload: state,
            onSuccess: () => {
                route('/reviews');
                toast.success('Success!');
            },
            onError: () => toast.error('Error'),
        });
    }

    return (
        <FormLayout onSubmit={submit}>
            <FormInput
                key="name_en"
                label="Author (EN)"
                value={state.name_en}
                onInput={(value) =>
                    dispatch({ type: 'SET_TITLE_EN', payload: value })
                }
                error={errors?.name_en?.[0]}
            />
            <FormInput
                key="name_ru"
                label="Author (RU)"
                value={state.name_ru}
                onInput={(value) =>
                    dispatch({ type: 'SET_TITLE_RU', payload: value })
                }
                error={errors?.name_ru?.[0]}
            />
            <FormTextArea
                key="content_en"
                label="Review (EN)"
                value={state.content_en}
                onInput={(value) =>
                    dispatch({ type: 'SET_CONTENT_EN', payload: value })
                }
                error={errors?.content_en?.[0]}
            />
            <FormTextArea
                key="content_ru"
                label="Review (RU)"
                value={state.content_ru}
                onInput={(value) =>
                    dispatch({ type: 'SET_CONTENT_RU', payload: value })
                }
                error={errors?.content_ru?.[0]}
            />
            <FormBtn cancelLink="/reviews" loading={loading} />
        </FormLayout>
    );
};

export default ReviewUpsert;
