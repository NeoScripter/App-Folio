import FormBtn from '@/components/admin/form/form-btn';
import FormImage from '@/components/admin/form/form-image';
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
    image: File | null;
    alt_en: string;
    alt_ru: string;
};

type Action =
    | { type: 'SET_TITLE_EN'; payload: string }
    | { type: 'SET_TITLE_RU'; payload: string }
    | { type: 'SET_CONTENT_EN'; payload: string }
    | { type: 'SET_CONTENT_RU'; payload: string }
    | { type: 'SET_IMAGE'; payload: File | null }
    | { type: 'SET_ALT_EN'; payload: string }
    | { type: 'SET_ALT_RU'; payload: string };

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
        case 'SET_IMAGE':
            return { ...state, image: action.payload };
        case 'SET_ALT_EN':
            return { ...state, alt_en: action.payload };
        case 'SET_ALT_RU':
            return { ...state, alt_ru: action.payload };
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
            image: null,
            alt_en: review?.image?.alt.en ?? '',
            alt_ru: review?.image?.alt.ru ?? '',
        }),
        [review],
    );
    const [state, dispatch] = useReducer(reducer, initialState);

    const { fetchData, loading, errors } = useFetch();

    const routeName =
        review != null ? `/admin/reviews/${review.id}` : '/admin/reviews';

    async function submit() {
        const formData = new FormData();
        formData.append('name_en', state.name_en);
        formData.append('name_ru', state.name_ru);
        formData.append('content_en', state.content_en);
        formData.append('content_ru', state.content_ru);
        formData.append('alt_en', state.alt_en);
        formData.append('alt_ru', state.alt_ru);

        if (state.image) {
            formData.append('image', state.image);
        }
        if (review) {
            formData.append('_method', 'PUT');
        }

        await fetchData({
            url: routeName,
            method: 'POST',
            payload: formData,
            onSuccess: () => {
                route('/reviews');
                toast.success('Success!');
            },
            onError: () => toast.error('Error'),
        });
    }

    return (
        <FormLayout hasFileUpload={true} onSubmit={submit}>
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
            <FormImage
                key="image-input"
                src={review?.image?.dkWebp}
                isEdited={true}
                onChange={(file) =>
                    dispatch({ type: 'SET_IMAGE', payload: file })
                }
                error={errors?.image?.[0]}
                label="Review Image"
            />
            <FormInput
                key="alt_en"
                label="Alt Text (EN)"
                value={state.alt_en}
                onInput={(value) =>
                    dispatch({ type: 'SET_ALT_EN', payload: value })
                }
                error={errors?.alt_en?.[0]}
            />
            <FormInput
                key="alt_ru"
                label="Alt Text (RU)"
                value={state.alt_ru}
                onInput={(value) =>
                    dispatch({ type: 'SET_ALT_RU', payload: value })
                }
                error={errors?.alt_ru?.[0]}
            />

            <FormBtn cancelLink="/reviews" loading={loading} />
        </FormLayout>
    );
};

export default ReviewUpsert;
