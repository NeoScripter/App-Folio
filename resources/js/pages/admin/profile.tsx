import HeadingSmall from '@/components/admin/ui/heading-small';
import { Button } from '@/components/auth/form/button';
import Input from '@/components/auth/form/input';
import InputError from '@/components/auth/form/input-error';
import Label from '@/components/auth/form/label';
import { useFetch } from '@/hooks/use-fetch';
import AdminLayout from '@/layouts/admin/admin-layout';
import SettingsLayout from '@/layouts/admin/settings-layout';
import { currentUser } from '@/signals/auth';
import { useReducer } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';
import { toast } from 'sonner';

interface State {
    name: string;
    email: string;
}

type Action =
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_EMAIL'; payload: string };

const initialState: State = {
    name: currentUser.value?.name || '',
    email: currentUser.value?.email || '',
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_NAME':
            return { ...state, name: action.payload };
        default:
            throw new Error('Unexpected action type');
    }
}

export default function Profile({ status }: { status?: string }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { fetchData, resentlySuccessful, loading, errors } = useFetch();

    async function submit(e: JSX.TargetedEvent<HTMLFormElement, Event>) {
        e.preventDefault();

        await fetchData({
            url: '/settings/profile',
            method: 'PATCH',
            payload: state,
            onSuccess: (data) => {
                currentUser.value = data.user;
                toast.success(data.message);
            },
            onError: () => toast.error('Login failed'),
        });
    }

    return (
        <AdminLayout title="Profile settings">
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Profile information"
                        description="Update your name and email address"
                    />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                class="mt-1 block w-full"
                                value={state.name}
                                required
                                autoComplete="name"
                                placeholder="Full name"
                                onInput={(e) =>
                                    dispatch({
                                        type: 'SET_NAME',
                                        payload: (e.target as HTMLInputElement)
                                            .value,
                                    })
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors?.name?.[0] || ''}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>

                            <Input
                                id="email"
                                type="email"
                                class="mt-1 block w-full"
                                value={state.email}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                                onInput={(e) =>
                                    dispatch({
                                        type: 'SET_EMAIL',
                                        payload: (e.target as HTMLInputElement)
                                            .value,
                                    })
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors?.email?.[0] || ''}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={loading}>Save</Button>

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
