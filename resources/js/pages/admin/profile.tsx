import HeadingSmall from '@/components/admin/ui/heading-small';
import { Button } from '@/components/auth/form/button';
import Input from '@/components/auth/form/input';
import InputError from '@/components/auth/form/input-error';
import Label from '@/components/auth/form/label';
import AdminLayout from '@/layouts/admin/admin-layout';
import SettingsLayout from '@/layouts/admin/settings-layout';

interface ProfileForm {
    name: string;
    email: string;
}

export default function Profile({ status }: { status?: string }) {
    const submit = (e) => {
        e.preventDefault();
    };

    return (
        <AdminLayout title="Profile settings">
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Profile information" description="Update your name and email address" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input id="name" class="mt-1 block w-full" value={''} required autoComplete="name" placeholder="Full name" />

                            <InputError className="mt-2" message={''} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>

                            <Input
                                id="email"
                                type="email"
                                class="mt-1 block w-full"
                                value={''}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />

                            <InputError className="mt-2" message={''} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={false}>Save</Button>

                            {false && <p className="text-sm text-neutral-600">Saved</p>}
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AdminLayout>
    );
}
