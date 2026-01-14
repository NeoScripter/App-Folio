import FormBtn from '@/components/admin/form/form-btn';
import FormImage from '@/components/admin/form/form-image';
import FormInput from '@/components/admin/form/form-input';
import FormTextArea from '@/components/admin/form/form-text-area';
import { useFetch } from '@/hooks/use-fetch';
import FormLayout from '@/layouts/admin/form-layout';
import { VideoType } from '@/lib/types/videos';
import { createSessionSignal } from '@/signals/session-store';
import { buildFormData } from '@/utils/form-data';
import { useLocation } from 'preact-iso';
import { FC } from 'preact/compat';
import { useMemo, useReducer } from 'preact/hooks';
import { toast } from 'sonner';

const videoSignal = createSessionSignal('video', {});

type VideoUpsertState = {
    title_ru: string;
    title_en: string;
    url: string;
    image: File | null;
    alt_en: string;
    alt_ru: string;
};

type Action =
    | { type: 'SET_TITLE_EN'; payload: string }
    | { type: 'SET_TITLE_RU'; payload: string }
    | { type: 'SET_URL'; payload: string }
    | { type: 'SET_IMAGE'; payload: File | null }
    | { type: 'SET_ALT_EN'; payload: string }
    | { type: 'SET_ALT_RU'; payload: string }
    | { type: 'RESTORE_FROM_BACKUP'; payload: VideoUpsertState };

function reducer(state: VideoUpsertState, action: Action): VideoUpsertState {
    let newState: VideoUpsertState;

    switch (action.type) {
        case 'SET_TITLE_EN':
            newState = { ...state, title_en: action.payload };
            break;
        case 'SET_TITLE_RU':
            newState = { ...state, title_ru: action.payload };
            break;
        case 'SET_URL':
            newState = { ...state, url: action.payload };
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
    videoSignal.value = stateWithoutImage;

    return newState;
}

const VideoUpsert: FC<{ video?: VideoType }> = ({ video }) => {
    const { route } = useLocation();
    const initialState = useMemo(
        () => ({
            title_en: video?.attributes?.title?.en ?? '',
            title_ru: video?.attributes?.title?.ru ?? '',
            url: video?.attributes?.url ?? '',
            image: null,
            alt_en: video?.image?.alt?.en ?? '',
            alt_ru: video?.image?.alt?.ru ?? '',
        }),
        [video],
    );
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleBackupClick = () => {
        dispatch({
            type: 'RESTORE_FROM_BACKUP',
            payload: videoSignal.value as VideoUpsertState,
        });
    };

    const { fetchData, loading, errors } = useFetch();

    const routeName =
        video != null ? `/admin/videos/${video.id}` : '/admin/videos';

    async function submit() {
        const formData = buildFormData({
            ...state,
            ...(video && { _method: 'PUT' }),
        });

        await fetchData({
            url: routeName,
            method: 'POST',
            payload: formData,
            onSuccess: () => {
                route('/videos');
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
            <FormInput
                key="title_en"
                label="Title (EN)"
                value={state.title_en}
                onInput={(value) =>
                    dispatch({ type: 'SET_TITLE_EN', payload: value })
                }
                error={errors?.title_en?.[0]}
            />
            <FormInput
                key="title_ru"
                label="Title (RU)"
                value={state.title_ru}
                onInput={(value) =>
                    dispatch({ type: 'SET_TITLE_RU', payload: value })
                }
                error={errors?.title_ru?.[0]}
            />
            <FormInput
                key="url"
                label="Url"
                value={state.url}
                onInput={(value) =>
                    dispatch({ type: 'SET_URL', payload: value })
                }
                error={errors?.url?.[0]}
            />
            <FormImage
                key="image-input"
                src={video?.image?.dkWebp}
                isEdited={true}
                onChange={(file) =>
                    dispatch({ type: 'SET_IMAGE', payload: file })
                }
                error={errors?.image?.[0]}
                label="Video Image"
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

            <FormBtn cancelLink="/videos" loading={loading} />
        </FormLayout>
    );
};

export default VideoUpsert;
