import FormBtn from '@/components/admin/form/form-btn';
import FormImage from '@/components/admin/form/form-image';
import FormInput from '@/components/admin/form/form-input';
import FormTextArea from '@/components/admin/form/form-text-area';
import { useFetch } from '@/hooks/use-fetch';
import { useSessionStorage } from '@/hooks/use-session-storage';
import FormLayout from '@/layouts/admin/form-layout';
import { ProjectType } from '@/lib/types/projects';
import { createSessionSignal } from '@/signals/session-store';
import { useLocation } from 'preact-iso';
import { FC } from 'preact/compat';
import { useMemo, useReducer } from 'preact/hooks';
import { toast } from 'sonner';

const projectSignal = createSessionSignal('project', {});

type ProjectUpsertState = {
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
    | { type: 'SET_ALT_RU'; payload: string }
    | { type: 'RESTORE_FROM_BACKUP'; payload: ProjectUpsertState };

function reducer(state: ProjectUpsertState, action: Action): ProjectUpsertState {
    let newState: ProjectUpsertState;

    switch (action.type) {
        case 'SET_TITLE_EN':
            newState = { ...state, name_en: action.payload };
            break;
        case 'SET_TITLE_RU':
            newState = { ...state, name_ru: action.payload };
            break;
        case 'SET_CONTENT_EN':
            newState = { ...state, content_en: action.payload };
            break;
        case 'SET_CONTENT_RU':
            newState = { ...state, content_ru: action.payload };
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
    projectSignal.value = stateWithoutImage;

    return newState;
}

const ProjectUpsert: FC<{ project?: ProjectType }> = ({ project }) => {
    const { route } = useLocation();
    const initialState = useMemo(
        () => ({
            name_en: project?.attributes.author.en ?? '',
            name_ru: project?.attributes.author.ru ?? '',
            content_en: project?.attributes.description.en ?? '',
            content_ru: project?.attributes.description.ru ?? '',
            image: null,
            alt_en: project?.image?.alt.en ?? '',
            alt_ru: project?.image?.alt.ru ?? '',
        }),
        [project],
    );
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleBackupClick = () => {
        dispatch({
            type: 'RESTORE_FROM_BACKUP',
            payload: projectSignal.value as ProjectUpsertState,
        });
    };

    const { fetchData, loading, errors } = useFetch();

    const routeName =
        project != null ? `/admin/projects/${project.id}` : '/admin/projects';

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
        if (project) {
            formData.append('_method', 'PUT');
        }

        await fetchData({
            url: routeName,
            method: 'POST',
            payload: formData,
            onSuccess: () => {
                route('/projects');
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
                label="Project (EN)"
                value={state.content_en}
                onInput={(value) =>
                    dispatch({ type: 'SET_CONTENT_EN', payload: value })
                }
                error={errors?.content_en?.[0]}
            />
            <FormTextArea
                key="content_ru"
                label="Project (RU)"
                value={state.content_ru}
                onInput={(value) =>
                    dispatch({ type: 'SET_CONTENT_RU', payload: value })
                }
                error={errors?.content_ru?.[0]}
            />
            <FormImage
                key="image-input"
                src={project?.image?.dkWebp}
                isEdited={true}
                onChange={(file) =>
                    dispatch({ type: 'SET_IMAGE', payload: file })
                }
                error={errors?.image?.[0]}
                label="Project Image"
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

            <FormBtn cancelLink="/projects" loading={loading} />
        </FormLayout>
    );
};

export default ProjectUpsert;
