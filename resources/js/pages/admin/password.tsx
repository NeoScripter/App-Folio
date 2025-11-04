import HeadingSmall from '@/components/admin/ui/heading-small';
import { Button } from '@/components/auth/form/button';
import Input from '@/components/auth/form/input';
import InputError from '@/components/auth/form/input-error';
import Label from '@/components/auth/form/label';
import PasswordInput from '@/components/auth/form/password-input';
import { useFetch } from '@/hooks/use-fetch';
import AdminLayout from '@/layouts/admin/admin-layout';
import SettingsLayout from '@/layouts/admin/settings-layout';
import { useReducer } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';
import { toast } from 'sonner';

interface State {
    current_password: string;
    password: string;
    password_confirmation: string;
}

type Action =
    | { type: 'SET_CURRENT_PASSWORD'; payload: string }
    | { type: 'SET_PASSWORD'; payload: string }
    | { type: 'SET_PASSWORD_CONFIRMATION'; payload: string }
    | { type: 'RESET' };

const initialState: State = {
    current_password: '',
    password: '',
    password_confirmation: '',
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_CURRENT_PASSWORD':
            return { ...state, current_password: action.payload };
        case 'SET_PASSWORD':
            return { ...state, password: action.payload };
        case 'SET_PASSWORD_CONFIRMATION':
            return { ...state, password_confirmation: action.payload };
        case 'RESET':
            return { ...initialState };
        default:
            throw new Error('Unexpected action type');
    }
}

export default function Password() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { fetchData, loading, resentlySuccessful, errors, reset } = useFetch();

    const updatePassword = async (
        e: JSX.TargetedEvent<HTMLFormElement, Event>,
    ) => {
        e.preventDefault();

        await fetchData({
            url: '/settings/password',
            method: 'PUT',
            payload: state,
            onSuccess: (data) => {
                toast.success(data.message || 'Password updated successfully');
                reset();
                dispatch({ type: 'RESET' });
            },
            onError: () => {
                toast.error('Failed to update password');
            },
        });
    };

    return (
        <AdminLayout title="Password settings">
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Update password"
                        description="Ensure your account is using a long, random password to stay secure"
                    />

                    <form onSubmit={updatePassword} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="current_password">
                                Current password
                            </Label>

                            <PasswordInput
                                id="current_password"
                                value={state.current_password}
                                onInput={(e) =>
                                    dispatch({
                                        type: 'SET_CURRENT_PASSWORD',
                                        payload: e.currentTarget.value,
                                    })
                                }
                                class="mt-1 block w-full"
                                autoComplete="current-password"
                                placeholder="Current password"
                            />

                            <InputError
                                message={errors?.current_password?.[0]}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">New password</Label>

                            <PasswordInput
                                id="password"
                                type="password"
                                value={state.password}
                                onInput={(e) =>
                                    dispatch({
                                        type: 'SET_PASSWORD',
                                        payload: e.currentTarget.value,
                                    })
                                }
                                autoComplete="new-password"
                                placeholder="New password"
                            />
                            <InputError message={errors?.password?.[0]} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">
                                Confirm password
                            </Label>
                            <PasswordInput
                                id="password_confirmation"
                                type="password"
                                value={state.password_confirmation}
                                onInput={(e) =>
                                    dispatch({
                                        type: 'SET_PASSWORD_CONFIRMATION',
                                        payload: e.currentTarget.value,
                                    })
                                }
                                autoComplete="new-password"
                                placeholder="Confirm password"
                            />
                            <InputError
                                message={errors?.password_confirmation?.[0]}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={loading}>Save password</Button>

                            {resentlySuccessful && (
                                <p className="text-sm text-neutral-600">
                                    Saved
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AdminLayout>
    );
}
