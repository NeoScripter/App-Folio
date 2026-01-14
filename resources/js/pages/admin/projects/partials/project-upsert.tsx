import FormBtn from '@/components/admin/form/form-btn';
import FormImage from '@/components/admin/form/form-image';
import FormInput from '@/components/admin/form/form-input';
import FormTextArea from '@/components/admin/form/form-text-area';
import { useFetch } from '@/hooks/use-fetch';
import FormLayout from '@/layouts/admin/form-layout';
import { ProjectType } from '@/lib/types/projects';
import { createSessionSignal } from '@/signals/session-store';
import { buildFormData } from '@/utils/form-data';
import { useLocation } from 'preact-iso';
import { FC } from 'preact/compat';
import { useMemo, useReducer } from 'preact/hooks';
import { toast } from 'sonner';
import useFetchCategories from '../hooks/use-fetch-categories';
import useFetchStacks from '../hooks/use-fetch-stacks';
import CategoryPicker from './category-picker';
import MockupPicker from './mockup-picker';
import StackPicker from './stack-picker';

const projectSignal = createSessionSignal('project', {});

type ProjectUpsertState = {
    title_ru: string;
    title_en: string;
    description_en: string;
    description_ru: string;
    link: string;
    category_en: string;
    category_ru: string;
    technologies: string[];
    order: number;
    image: File | null;
    alt_en: string;
    alt_ru: string;
    mockup: number;
};

type Action =
    | { type: 'SET_TITLE_EN'; payload: string }
    | { type: 'SET_TITLE_RU'; payload: string }
    | { type: 'SET_DESCRIPTION_EN'; payload: string }
    | { type: 'SET_DESCRIPTION_RU'; payload: string }
    | { type: 'SET_LINK'; payload: string }
    | { type: 'SET_CATEGORY_RU'; payload: string }
    | { type: 'SET_CATEGORY_EN'; payload: string }
    | { type: 'ADD_STACK'; payload: string }
    | { type: 'REMOVE_STACK'; payload: string }
    | { type: 'SET_ORDER'; payload: number }
    | { type: 'SET_IMAGE'; payload: File | null }
    | { type: 'SET_ALT_EN'; payload: string }
    | { type: 'SET_ALT_RU'; payload: string }
    | { type: 'SET_MOCKUP'; payload: number }
    | { type: 'RESTORE_FROM_BACKUP'; payload: ProjectUpsertState };

function reducer(
    state: ProjectUpsertState,
    action: Action,
): ProjectUpsertState {
    let newState: ProjectUpsertState;

    switch (action.type) {
        case 'SET_TITLE_EN':
            newState = { ...state, title_en: action.payload };
            break;
        case 'SET_TITLE_RU':
            newState = { ...state, title_ru: action.payload };
            break;
        case 'SET_DESCRIPTION_EN':
            newState = { ...state, description_en: action.payload };
            break;
        case 'SET_DESCRIPTION_RU':
            newState = { ...state, description_ru: action.payload };
            break;
        case 'SET_LINK':
            newState = { ...state, link: action.payload };
            break;
        case 'SET_CATEGORY_RU':
            newState = { ...state, category_ru: action.payload };
            break;
        case 'SET_CATEGORY_EN':
            newState = { ...state, category_en: action.payload };
            break;
        case 'ADD_STACK':
            if (
                state.technologies
                    .map((t) => t.toLowerCase())
                    .includes(action.payload.trim().toLowerCase())
            ) {
                return state;
            }

            newState = {
                ...state,
                technologies: [...state.technologies, action.payload],
            };
            break;
        case 'REMOVE_STACK':
            newState = {
                ...state,
                technologies: state.technologies.filter(
                    (tech) => tech !== action.payload,
                ),
            };
            break;
        case 'SET_ORDER':
            newState = { ...state, order: action.payload };
            break;
        case 'SET_MOCKUP':
            newState = { ...state, mockup: action.payload };
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
            title_en: project?.attributes?.title?.en ?? '',
            title_ru: project?.attributes?.title?.ru ?? '',
            description_en: project?.attributes?.description?.en ?? '',
            description_ru: project?.attributes?.description?.ru ?? '',
            link: project?.attributes?.link ?? '',
            category_ru: project?.attributes?.category?.ru ?? '',
            category_en: project?.attributes?.category?.en ?? '',
            order: project?.attributes?.order ?? 100,
            mockup: 1,
            technologies: project?.attributes?.stacks ?? [],
            image: null,
            alt_en: project?.image?.alt?.en ?? '',
            alt_ru: project?.image?.alt?.ru ?? '',
        }),
        [project],
    );
    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        categories,
        loading: categoriesLoading,
        errors: categoriesErrors,
        invalidCategoryId,
    } = useFetchCategories({
        categoryRu: state.category_ru,
        categoryEn: state.category_en,
    });
    const { stacks, loading: stacksLoading } = useFetchStacks();

    const handleBackupClick = () => {
        dispatch({
            type: 'RESTORE_FROM_BACKUP',
            payload: projectSignal.value as ProjectUpsertState,
        });
    };

    const { fetchData, loading, errors } = useFetch();

    const routeName =
        project != null
            ? `/admin/projects/${project.attributes.slug}`
            : '/admin/projects';

    async function submit() {
        if (invalidCategoryId != null) {
            toast.error('Invalid categories!');
            return;
        }

        const formData = buildFormData({
            ...state,
            ...(project && { _method: 'PUT' }),
        });

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
            <FormTextArea
                key="description_en"
                label="Description (EN)"
                value={state.description_en}
                onInput={(value) =>
                    dispatch({ type: 'SET_DESCRIPTION_EN', payload: value })
                }
                error={errors?.description_en?.[0]}
            />
            <FormTextArea
                key="description_ru"
                label="Description (RU)"
                value={state.description_ru}
                onInput={(value) =>
                    dispatch({ type: 'SET_DESCRIPTION_RU', payload: value })
                }
                error={errors?.description_ru?.[0]}
            />
            <FormInput
                key="link"
                label="Link"
                value={state.link}
                onInput={(value) =>
                    dispatch({ type: 'SET_LINK', payload: value })
                }
                error={errors?.link?.[0]}
            />

            <StackPicker
                selectedStacks={state.technologies}
                availableStacks={stacks.map((s) => s.name)}
                onAdd={(stack) =>
                    dispatch({ type: 'ADD_STACK', payload: stack })
                }
                onRemove={(stack) =>
                    dispatch({ type: 'REMOVE_STACK', payload: stack })
                }
                loading={stacksLoading}
                errors={errors?.technologies?.[0]}
                label="Stacks"
            />
            <FormInput
                key="category_en"
                label="Category (EN)"
                value={state.category_en}
                onInput={(value) =>
                    dispatch({ type: 'SET_CATEGORY_EN', payload: value })
                }
                error={errors?.category_en?.[0]}
            />
            <CategoryPicker
                categories={categories}
                loading={categoriesLoading}
                errors={categoriesErrors}
                invalidId={invalidCategoryId}
                locale="en"
                onSelect={({ en, ru }) => {
                    dispatch({ type: 'SET_CATEGORY_EN', payload: en });
                    dispatch({ type: 'SET_CATEGORY_RU', payload: ru });
                }}
            />
            <FormInput
                key="category_ru"
                label="Category (RU)"
                value={state.category_ru}
                onInput={(value) =>
                    dispatch({ type: 'SET_CATEGORY_RU', payload: value })
                }
                error={errors?.category_ru?.[0]}
            />
            <CategoryPicker
                categories={categories}
                loading={categoriesLoading}
                errors={categoriesErrors}
                invalidId={invalidCategoryId}
                locale="ru"
                onSelect={({ en, ru }) => {
                    dispatch({ type: 'SET_CATEGORY_EN', payload: en });
                    dispatch({ type: 'SET_CATEGORY_RU', payload: ru });
                }}
            />

            <FormInput
                key="Order"
                label="Order"
                value={state.order.toString()}
                className="max-w-40 px-0 [&>input]:h-auto [&>input]:text-center [&>input]:text-3xl! [&>input]:tracking-[0.5em]"
                onInput={(value) =>
                    dispatch({ type: 'SET_ORDER', payload: Number(value) || 0 })
                }
                error={errors?.order?.[0]}
            />
            <MockupPicker
                value={state.mockup}
                onChange={(mockup) =>
                    dispatch({ type: 'SET_MOCKUP', payload: mockup })
                }
                error={errors?.mockup?.[0]}
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
