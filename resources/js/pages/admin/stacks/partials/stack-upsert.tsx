import FormBtn from '@/components/admin/form/form-btn';
import FormImage from '@/components/admin/form/form-image';
import FormTextArea from '@/components/admin/form/form-text-area';
import { FormWysiwyg } from '@/components/admin/form/form-wysiwyg';
import { useFetch } from '@/hooks/use-fetch';
import FormLayout from '@/layouts/admin/form-layout';
import { StackType } from '@/lib/types/stacks';
import { createSessionSignal } from '@/signals/session-store';
import { useLocation } from 'preact-iso';
import { FC } from 'preact/compat';
import { useMemo, useReducer } from 'preact/hooks';
import { toast } from 'sonner';

const stackSignal = createSessionSignal('stack', {});

type StackUpsertState = {
    body_en: string;
    body_ru: string;
    image: File | null;
    alt_en: string;
    alt_ru: string;
};

type Action =
    | { type: 'SET_BODY_EN'; payload: string }
    | { type: 'SET_BODY_RU'; payload: string }
    | { type: 'SET_IMAGE'; payload: File | null }
    | { type: 'SET_ALT_EN'; payload: string }
    | { type: 'SET_ALT_RU'; payload: string }
    | { type: 'RESTORE_FROM_BACKUP'; payload: StackUpsertState };

function reducer(state: StackUpsertState, action: Action): StackUpsertState {
    let newState: StackUpsertState;

    switch (action.type) {
        case 'SET_BODY_EN':
            newState = { ...state, body_en: action.payload };
            break;
        case 'SET_BODY_RU':
            newState = { ...state, body_ru: action.payload };
            break;
        case 'SET_IMAGE':
            newState = { ...state, image: action.payload };
            break;
        case 'SET_ALT_EN':
            newState = { ...state, alt_en: action.payload };
            break;
        case 'SET_ALT_RU':
            newState = { ...state, alt_ru: action.payload };
            break;
        case 'RESTORE_FROM_BACKUP':
            return { ...state, ...action.payload, image: null };
        default:
            throw new Error('Unexpected action type');
    }

    const { image, ...stateWithoutImage } = newState;
    stackSignal.value = stateWithoutImage;

    return newState;
}

const StackUpsert: FC<{ stack?: StackType }> = ({ stack }) => {
    const { route } = useLocation();
    const initialState = useMemo(
        () => ({
            body_en: stack?.attributes.body.en ?? '',
            body_ru: stack?.attributes.body.ru ?? '',
            image: null,
            alt_en: stack?.attributes.alt.en ?? '',
            alt_ru: stack?.attributes.alt.ru ?? '',
        }),
        [stack],
    );
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleBackupClick = () => {
        dispatch({
            type: 'RESTORE_FROM_BACKUP',
            payload: stackSignal.value as StackUpsertState,
        });
    };

    const { fetchData, loading, errors } = useFetch();

    const routeName =
        stack != null ? `/admin/stacks/${stack.id}` : '/admin/stacks';

    async function submit() {
        const formData = new FormData();
        formData.append('body_en', state.body_en);
        formData.append('body_ru', state.body_ru);
        formData.append('alt_en', state.alt_en);
        formData.append('alt_ru', state.alt_ru);

        if (state.image) {
            formData.append('image', state.image);
        }
        if (stack) {
            formData.append('_method', 'PUT');
        }

        await fetchData({
            url: routeName,
            method: 'POST',
            payload: formData,
            onSuccess: () => {
                route('/stacks');
                toast.success('Success!');
            },
            onError: () => toast.error('Error'),
        });
    }

    return (
        <FormLayout
            handleBackupClick={handleBackupClick}
            hasFileUpload={true}
            onSubmit={submit}
        >
            <FormWysiwyg
                key="body_en"
                label="Stack (EN)"
                value={state.body_en}
                onInput={(value) =>
                    dispatch({ type: 'SET_BODY_EN', payload: value })
                }
                error={errors?.body_en?.[0]}
            />
            <FormWysiwyg
                key="body_ru"
                label="Stack (RU)"
                value={state.body_ru}
                onInput={(value) =>
                    dispatch({ type: 'SET_BODY_RU', payload: value })
                }
                error={errors?.body_ru?.[0]}
            />
            <FormImage
                key="image-input"
                src={stack?.attributes.image}
                isEdited={true}
                onChange={(file) =>
                    dispatch({ type: 'SET_IMAGE', payload: file })
                }
                error={errors?.image?.[0]}
                label="Stack Image"
            />
            <FormTextArea
                key="alt_en"
                label="Alt Text (EN)"
                value={state.alt_en}
                onInput={(value) =>
                    dispatch({ type: 'SET_ALT_EN', payload: value })
                }
                error={errors?.alt_en?.[0]}
            />
            <FormTextArea
                key="alt_ru"
                label="Alt Text (RU)"
                value={state.alt_ru}
                onInput={(value) =>
                    dispatch({ type: 'SET_ALT_RU', payload: value })
                }
                error={errors?.alt_ru?.[0]}
            />

            <FormBtn cancelLink="/stacks" loading={loading} />
        </FormLayout>
    );
};

export default StackUpsert;
