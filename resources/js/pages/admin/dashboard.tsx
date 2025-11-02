import AdminLayout from '@/layouts/admin/admin-layout';

const Dashboard = () => {
    return (
        <AdminLayout title='Dashboard'>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="text">This is the dashboard page</div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
