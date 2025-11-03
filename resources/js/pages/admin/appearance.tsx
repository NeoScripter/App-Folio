import AppearanceTabs from '@/components/admin/ui/appearance-tabs';
import HeadingSmall from '@/components/admin/ui/heading-small';
import AdminLayout from '@/layouts/admin/admin-layout';
import SettingsLayout from '@/layouts/admin/settings-layout';

export default function Appearance() {
    return (
        <AdminLayout title="Appearance settings">
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AdminLayout>
    );
}
