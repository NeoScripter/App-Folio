import HeadingSmall from '@/components/admin/ui/heading-small';
import { Button } from '@/components/auth/form/button';
import Input from '@/components/auth/form/input';
import InputError from '@/components/auth/form/input-error';
import Label from '@/components/auth/form/label';
import AdminLayout from '@/layouts/admin/admin-layout';
import SettingsLayout from '@/layouts/admin/settings-layout';
import { useRef } from 'preact/hooks';

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const updatePassword = (e) => {
        e.preventDefault();

        // put(route('password.update'), {
        //     preserveScroll: true,
        //     onSuccess: () => reset(),
        //     onError: (errors) => {
        //         if (errors.password) {
        //             reset('password', 'password_confirmation');
        //             passwordInput.current?.focus();
        //         }

        //         if (errors.current_password) {
        //             reset('current_password');
        //             currentPasswordInput.current?.focus();
        //         }
        //     },
        // });
    };

    return (
        <AdminLayout title="Password settings">
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Update password" description="Ensure your account is using a long, random password to stay secure" />

                    <form onSubmit={updatePassword} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="current_password">Current password</Label>

                            <Input
                                id="current_password"
                                ref={currentPasswordInput}
                                value={''}
                                type="password"
                                class="mt-1 block w-full"
                                autoComplete="current-password"
                                placeholder="Current password"
                            />

                            <InputError message={''} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">New password</Label>

                            <Input
                                id="password"
                                ref={passwordInput}
                                value={''}
                                type="password"
                                class="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="New password"
                            />

                            <InputError message={''} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirm password</Label>

                            <Input
                                id="password_confirmation"
                                value={''}
                                type="password"
                                class="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="Confirm password"
                            />

                            <InputError message={''} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={false}>Save password</Button>

                            <p className="text-sm text-neutral-600">Saved</p>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AdminLayout>
    );
}
