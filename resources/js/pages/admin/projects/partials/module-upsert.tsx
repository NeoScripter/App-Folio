import FormBtn from '@/components/admin/form/form-btn';
import FormImage from '@/components/admin/form/form-image';
import FormInput from '@/components/admin/form/form-input';
import FormTextArea from '@/components/admin/form/form-text-area';
import { FormWysiwyg } from '@/components/admin/form/form-wysiwyg';
import { Button } from '@/components/auth/form/button';
import { useFetch } from '@/hooks/use-fetch';
import FormLayout from '@/layouts/admin/form-layout';
import { ProjectModuleType } from '@/lib/types/project-module';
import { useDeleteModal } from '@/providers/delete-modal-context';
import { createSessionSignal } from '@/signals/session-store';
import { buildFormData } from '@/utils/form-data';
import { FC } from 'preact/compat';
import { useMemo, useReducer } from 'preact/hooks';
import { toast } from 'sonner';
import LayoutPicker from './layout-picker';

const moduleSignal = createSessionSignal('module', {});

export type ModuleTypeOptions =
    | 'only_text'
    | 'two_image_split'
    | 'two_image_block'
    | 'one_image_split';

type ModuleUpsertState = {
    project_id: number;
    heading_ru: string;
    heading_en: string;
    body_ru: string;
    body_en: string;
    order: number;
    type: ModuleTypeOptions;
    first_image: File | null;
    second_image: File | null;
    first_alt_en: string;
    first_alt_ru: string;
    second_alt_en: string;
    second_alt_ru: string;
};
type Action =
    | { type: 'SET_HEADING_EN'; payload: string }
    | { type: 'SET_HEADING_RU'; payload: string }
    | { type: 'SET_BODY_EN'; payload: string }
    | { type: 'SET_BODY_RU'; payload: string }
    | { type: 'SET_ORDER'; payload: number }
    | { type: 'SET_TYPE'; payload: ModuleTypeOptions }
    | { type: 'SET_FIRST_IMAGE'; payload: File | null }
    | { type: 'SET_SECOND_IMAGE'; payload: File | null }
    | { type: 'SET_FIRST_ALT_EN'; payload: string }
    | { type: 'SET_FIRST_ALT_RU'; payload: string }
    | { type: 'SET_SECOND_ALT_EN'; payload: string }
    | { type: 'SET_SECOND_ALT_RU'; payload: string }
    | { type: 'RESTORE_FROM_BACKUP'; payload: ModuleUpsertState };

function reducer(state: ModuleUpsertState, action: Action): ModuleUpsertState {
    let newState: ModuleUpsertState;

    switch (action.type) {
        case 'SET_HEADING_EN':
            newState = { ...state, heading_en: action.payload };
            break;
        case 'SET_HEADING_RU':
            newState = { ...state, heading_ru: action.payload };
            break;
        case 'SET_BODY_EN':
            newState = { ...state, body_en: action.payload };
            break;
        case 'SET_BODY_RU':
            newState = { ...state, body_ru: action.payload };
            break;
        case 'SET_ORDER':
            newState = { ...state, order: action.payload };
            break;
        case 'SET_TYPE':
            newState = { ...state, type: action.payload };
            break;
        case 'SET_FIRST_IMAGE':
            newState = { ...state, first_image: action.payload };
            break;
        case 'SET_SECOND_IMAGE':
            newState = { ...state, second_image: action.payload };
            break;
        case 'SET_FIRST_ALT_EN':
            newState = { ...state, first_alt_en: action.payload };
            break;
        case 'SET_FIRST_ALT_RU':
            newState = { ...state, first_alt_ru: action.payload };
            break;
        case 'SET_SECOND_ALT_EN':
            newState = { ...state, second_alt_en: action.payload };
            break;
        case 'SET_SECOND_ALT_RU':
            newState = { ...state, second_alt_ru: action.payload };
            break;
        case 'RESTORE_FROM_BACKUP':
            return {
                ...action.payload,
                first_image: null,
                second_image: null,
            };
        default:
            throw new Error('Unexpected action');
    }

    const { first_image, second_image, ...persistable } = newState;
    moduleSignal.value = persistable;

    return newState;
}

const ModuleUpsert: FC<{ module?: ProjectModuleType; projectId: number }> = ({
    module,
    projectId,
}) => {
    const initialState = useMemo<ModuleUpsertState>(
        () => ({
            project_id: projectId,
            heading_en: module?.attributes.heading?.en ?? '',
            heading_ru: module?.attributes.heading?.ru ?? '',
            body_en: module?.attributes.body?.en ?? '',
            body_ru: module?.attributes.body?.ru ?? '',
            order: module?.attributes.order ?? 1,
            type: module?.attributes.type ?? 'only_text',
            first_image: null,
            second_image: null,
            first_alt_en: module?.firstImage?.alt?.en ?? '',
            first_alt_ru: module?.firstImage?.alt?.ru ?? '',
            second_alt_en: module?.secondImage?.alt?.en ?? '',
            second_alt_ru: module?.secondImage?.alt?.ru ?? '',
        }),
        [module],
    );

    const { itemToDelete } = useDeleteModal();

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleBackupClick = () => {
        dispatch({
            type: 'RESTORE_FROM_BACKUP',
            payload: moduleSignal.value as ModuleUpsertState,
        });
    };

    const { fetchData, loading, errors } = useFetch();

    const routeName =
        module != null
            ? `/admin/project-modules/${module.id}`
            : '/admin/project-modules';

    async function submit() {
        const formData = buildFormData({
            ...state,
            ...(module && { _method: 'PUT' }),
        });

        await fetchData({
            url: routeName,
            method: 'POST',
            payload: formData,
            onSuccess: () => {
                toast.success('Success!');
                document.dispatchEvent(new Event('itemDeleted'));
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
                key="heading_en"
                label="Title (EN)"
                value={state.heading_en}
                onInput={(value) =>
                    dispatch({ type: 'SET_HEADING_EN', payload: value })
                }
                error={errors?.heading_en?.[0]}
            />
            <FormInput
                key="heading_ru"
                label="Title (RU)"
                value={state.heading_ru}
                onInput={(value) =>
                    dispatch({ type: 'SET_HEADING_RU', payload: value })
                }
                error={errors?.heading_ru?.[0]}
            />
            <FormWysiwyg
                key="body_en"
                label="Content (EN)"
                value={state.body_en}
                onInput={(value) =>
                    dispatch({ type: 'SET_BODY_EN', payload: value })
                }
                error={errors?.body_en?.[0]}
            />

            <FormWysiwyg
                key="body_ru"
                label="Content (RU)"
                value={state.body_ru}
                onInput={(value) =>
                    dispatch({ type: 'SET_BODY_RU', payload: value })
                }
                error={errors?.body_ru?.[0]}
            />
            <LayoutPicker
                value={state.type}
                onChange={(type) =>
                    dispatch({ type: 'SET_TYPE', payload: type })
                }
                error={errors?.type?.[0]}
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

            {state.type !== 'only_text' && (
                <>
                    <FormImage
                        label="First Image"
                        src={module?.firstImage?.dkWebp}
                        isEdited
                        onChange={(file) =>
                            dispatch({ type: 'SET_FIRST_IMAGE', payload: file })
                        }
                        error={errors?.first_image?.[0]}
                    />

                    <FormTextArea
                        key="First Alt (EN)"
                        label="Alt (EN)"
                        value={state.first_alt_en}
                        onInput={(v) =>
                            dispatch({ type: 'SET_FIRST_ALT_EN', payload: v })
                        }
                    />

                    <FormTextArea
                        key="First Alt (RU)"
                        label="Alt (RU)"
                        value={state.first_alt_ru}
                        onInput={(v) =>
                            dispatch({ type: 'SET_FIRST_ALT_RU', payload: v })
                        }
                    />
                </>
            )}

            {(state.type === 'two_image_split' ||
                state.type === 'two_image_block') && (
                <>
                    <FormImage
                        key="Second Image"
                        label="Second Image"
                        src={module?.secondImage?.dkWebp}
                        isEdited
                        onChange={(file) =>
                            dispatch({
                                type: 'SET_SECOND_IMAGE',
                                payload: file,
                            })
                        }
                        error={errors?.second_image?.[0]}
                    />

                    <FormTextArea
                        key="Second Alt (EN)"
                        label="Alt (EN)"
                        value={state.second_alt_en}
                        onInput={(v) =>
                            dispatch({ type: 'SET_SECOND_ALT_EN', payload: v })
                        }
                    />

                    <FormTextArea
                        key="Second Alt (RU)"
                        label="Alt (RU)"
                        value={state.second_alt_ru}
                        onInput={(v) =>
                            dispatch({ type: 'SET_SECOND_ALT_RU', payload: v })
                        }
                    />
                </>
            )}

            <FormBtn loading={loading}>
                {module && (
                    <Button
                        type="button"
                        class="rounded-md"
                        onClick={() => (itemToDelete.value = module)}
                        variant="destructive"
                    >
                        Delete
                    </Button>
                )}
            </FormBtn>
        </FormLayout>
    );
};

export default ModuleUpsert;
