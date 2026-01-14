import FormBtn from '@/components/admin/form/form-btn';
import FormInput from '@/components/admin/form/form-input';
import FormTextArea from '@/components/admin/form/form-text-area';
import { useFetch } from '@/hooks/use-fetch';
import FormLayout from '@/layouts/admin/form-layout';
import { FaqType } from '@/lib/types/faqs';
import { createSessionSignal } from '@/signals/session-store';
import { useLocation } from 'preact-iso';
import { FC } from 'preact/compat';
import { useMemo, useReducer } from 'preact/hooks';
import { toast } from 'sonner';

type FaqUpsertState = {
    title_en: string;
    title_ru: string;
    content_en: string;
    content_ru: string;
};

const faqSignal = createSessionSignal('faq', {});

type Action =
    | { type: 'SET_TITLE_EN'; payload: string }
    | { type: 'SET_TITLE_RU'; payload: string }
    | { type: 'SET_CONTENT_EN'; payload: string }
    | { type: 'SET_CONTENT_RU'; payload: string }
    | { type: 'RESTORE_FROM_BACKUP'; payload: FaqUpsertState };

function reducer(state: FaqUpsertState, action: Action): FaqUpsertState {
    let newState: FaqUpsertState;

    switch (action.type) {
        case 'SET_TITLE_EN':
            newState = { ...state, title_en: action.payload };
            break;
        case 'SET_TITLE_RU':
            newState = { ...state, title_ru: action.payload };
            break;
        case 'SET_CONTENT_EN':
            newState = { ...state, content_en: action.payload };
            break;
        case 'SET_CONTENT_RU':
            newState = { ...state, content_ru: action.payload };
            break;
        case 'RESTORE_FROM_BACKUP':
            return action.payload;
        default:
            throw new Error('Unexpected action type');
    }

    faqSignal.value = newState;
    return newState;
}

const FaqUpsert: FC<{ faq?: FaqType }> = ({ faq }) => {
    const { route } = useLocation();
    const initialState = useMemo(
        () => ({
            title_en: faq?.attributes.title?.en ?? '',
            title_ru: faq?.attributes.title?.ru ?? '',
            content_en: faq?.attributes.description?.en ?? '',
            content_ru: faq?.attributes.description?.ru ?? '',
        }),
        [faq],
    );
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleBackupClick = () => {
        dispatch({
            type: 'RESTORE_FROM_BACKUP',
            payload: faqSignal.value as FaqUpsertState,
        });
    };
    const { fetchData, loading, errors } = useFetch();

    const routeName = faq != null ? `/admin/faqs/${faq.id}` : '/admin/faqs';
    const method = faq != null ? 'PUT' : 'POST';

    async function submit() {
        await fetchData({
            url: routeName,
            method: method,
            payload: state,
            onSuccess: () => {
                route('/faqs');
                toast.success('Success!');
            },
            onError: () => toast.error('Error'),
        });
    }

    return (
        <FormLayout handleBackupClick={handleBackupClick} onSubmit={submit}>
            <FormInput
                key="title_en"
                label="Question (EN)"
                value={state.title_en}
                onInput={(value) =>
                    dispatch({ type: 'SET_TITLE_EN', payload: value })
                }
                error={errors?.title_en?.[0]}
            />
            <FormInput
                key="title_ru"
                label="Question (RU)"
                value={state.title_ru}
                onInput={(value) =>
                    dispatch({ type: 'SET_TITLE_RU', payload: value })
                }
                error={errors?.title_ru?.[0]}
            />
            <FormTextArea
                key="content_en"
                label="Answer (EN)"
                value={state.content_en}
                onInput={(value) =>
                    dispatch({ type: 'SET_CONTENT_EN', payload: value })
                }
                error={errors?.content_en?.[0]}
            />
            <FormTextArea
                key="content_ru"
                label="Answer (RU)"
                value={state.content_ru}
                onInput={(value) =>
                    dispatch({ type: 'SET_CONTENT_RU', payload: value })
                }
                error={errors?.content_ru?.[0]}
            />
            <FormBtn cancelLink="/faqs" loading={loading} />
        </FormLayout>
    );
};

export default FaqUpsert;
