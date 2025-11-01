import AdminLayout from '@/layouts/admin/admin-layout';
import { showSidebar } from '@/signals/show-sidebar';

const Dashboard = () => {
    return (
        <AdminLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="text">This is the dashboard page</div>
                <button onClick={() => (showSidebar.value = true)}>Toggle sidebar</button>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
